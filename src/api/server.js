import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { initDb, saveContactSubmission } from '../lib/db.js';
import sgMail from '@sendgrid/mail';

// Load environment variables
dotenv.config();

// Get directory name (ESM workaround)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up ports
const PORT = process.env.PORT || 3001;

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Configure SendGrid
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || 'your_sender_email@example.com';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'your_recipient_email@example.com';

// Initialize SendGrid if API key is available
if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
  console.log('SendGrid API key configured');
} else {
  console.warn('SendGrid API key not configured');
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    time: new Date().toISOString(),
    sendgrid: SENDGRID_API_KEY ? 'configured' : 'not configured'
  });
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  try {
    console.log('Received contact form submission:', req.body);

    const { name, email, company, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        details: 'Name, email, and message are required'
      });
    }

    // Try to save to database if available
    try {
      await saveContactSubmission({ name, email, company, message });
      console.log('Form submission saved to database');
    } catch (dbError) {
      console.warn('Could not save to database:', dbError.message);
      // Continue with email sending even if database save fails
    }

    // Check if SendGrid is configured
    if (!SENDGRID_API_KEY) {
      console.error('SendGrid API key not configured - cannot send email');
      return res.status(500).json({
        success: false,
        error: 'Email service not configured',
        details: 'The server is not configured to send emails'
      });
    }

    // Prepare email to admin
    const adminMsg = {
      to: ADMIN_EMAIL,
      from: FROM_EMAIL,
      subject: `New contact form submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Company: ${company || 'Not provided'}

        Message:
        ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <h3>Message:</h3>
        <p>${message}</p>
      `
    };

    // Send email notification to admin
    try {
      console.log('Attempting to send email to admin...');
      await sgMail.send(adminMsg);
      console.log('Email sent to admin successfully');

      // Return success response
      return res.status(200).json({
        success: true,
        message: 'Contact form submission received and notification sent'
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);

      // Check if error has response for more details
      if (emailError.response) {
        console.error('SendGrid API error details:', emailError.response.body);
      }

      return res.status(500).json({
        success: false,
        error: 'Failed to send email notification',
        details: emailError.message
      });
    }
  } catch (error) {
    console.error('Server error in contact endpoint:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error occurred',
      details: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error',
    details: err.message
  });
});

// Start the server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`API Server running on port ${PORT}`);
});

// Handle server shutdown
process.on('SIGINT', () => {
  console.log('Shutting down API server...');
  server.close();
  process.exit(0);
});

// Export the app for testing
export default app;