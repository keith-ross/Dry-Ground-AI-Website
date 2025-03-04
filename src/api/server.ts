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
  console.log('Received contact form submission:', req.body);
  try {
    const { name, email, company, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      console.log('Validation failed:', { name, email, message });
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message are required' 
      });
    }

    // Log current environment status
    console.log('Processing contact form with:');
    console.log('- SENDGRID_API_KEY exists:', !!process.env.SENDGRID_API_KEY);
    console.log('- SENDGRID_API_KEY length:', process.env.SENDGRID_API_KEY ? process.env.SENDGRID_API_KEY.length : 0);

    // Save to database
    try {
      const dbResult = await saveContactSubmission({ name, email, company, message });
      console.log('Saved to database with ID:', dbResult.id);
    } catch (dbError) {
      console.error('Database error when saving contact:', dbError);
      // Continue processing to still try sending emails
    }

    // Send admin notification
    console.log('Attempting to send admin notification email...');
    const adminEmailResult = await sendAdminNotificationEmail({ name, email, company, message });

    if (!adminEmailResult.success) {
      console.error('Failed to send admin notification:', adminEmailResult.error);
      return res.status(500).json({
        success: false,
        message: 'Failed to process your request due to email service issues',
        error: adminEmailResult.error
      });
    }

    // Send confirmation email to the user
    console.log('Attempting to send user confirmation email...');
    const userEmailResult = await sendContactConfirmationEmail({ name, email });

    if (!userEmailResult.success) {
      console.error('Failed to send user confirmation:', userEmailResult.error);
      // Continue since the admin notification was sent successfully
    }

    // Return success
    console.log('Contact form submission processed successfully');
    return res.status(200).json({ 
      success: true, 
      message: 'Form submitted successfully' 
    });
  } catch (error) {
    console.error('Error processing contact form submission:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error processing your request',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Start the API server
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running on port ${PORT}`);
});

export default app;