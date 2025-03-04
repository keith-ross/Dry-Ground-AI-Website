import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { initDb, saveContactSubmission } from '../lib/db';
import { sendContactConfirmationEmail, sendAdminNotificationEmail } from '../lib/emailService';

// Load environment variables from .env file
const envPath = path.join(__dirname, '../../.env');
if (fs.existsSync(envPath)) {
  console.log(`Loading environment variables from ${envPath}`);
  dotenv.config({ path: envPath });
} else {
  console.log('No .env file found, using environment variables directly');
  dotenv.config();
}

// Verify critical environment variables
console.log('API Server Environment:');
console.log('- NODE_ENV:', process.env.NODE_ENV);
console.log('- PORT:', process.env.PORT);
console.log('- SENDGRID_API_KEY exists:', !!process.env.SENDGRID_API_KEY);


// Initialize database
initDb().catch(error => {
  console.error('Failed to initialize database:', error);
});

const app = express();

// Configure middleware
app.use(cors());
app.use(express.json()); // Use express.json() instead of bodyParser.json()

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, message } = req.body;

    console.log('Received contact form submission:', { name, email, company, message });

    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message are required' 
      });
    }

    // Check if SendGrid API key is available
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SendGrid API key is missing. Form will be processed, but emails cannot be sent.');
      return res.status(500).json({
        success: false,
        message: 'Email service not configured properly - contact form cannot be processed'
      });
    }

    // Send admin notification email
    const adminEmailResult = await sendAdminNotificationEmail({ 
      name, email, company, message 
    });

    if (!adminEmailResult.success) {
      console.error('Failed to send admin notification:', adminEmailResult.error);

      // If there's a SendGrid API error with a response, log it
      if (adminEmailResult.error && adminEmailResult.error.response) {
        console.error('SendGrid API response:', adminEmailResult.error.response.body);
      }

      return res.status(500).json({
        success: false,
        message: 'Failed to process your request due to email service issues'
      });
    }

    // Send confirmation email to the user
    const userEmailResult = await sendContactConfirmationEmail({ name, email });

    if (!userEmailResult.success) {
      console.error('Failed to send user confirmation:', userEmailResult.error);
      // Continue since the admin notification was sent successfully
    }

    // Return success
    return res.status(200).json({ 
      success: true, 
      message: 'Form submitted successfully' 
    });
  } catch (error) {
    console.error('Error processing contact form submission:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error processing your request',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Start the API server
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running on port ${PORT}`);
});

export default app;