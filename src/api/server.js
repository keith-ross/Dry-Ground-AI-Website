
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
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

// Configure SendGrid
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || 'your_sender_email@example.com';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'your_recipient_email@example.com';

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
  console.log('SendGrid API key configured');
} else {
  console.warn('SendGrid API key not found. Email functionality will not work.');
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  const apiKeyExists = !!SENDGRID_API_KEY;
  const apiKeyFormatValid = SENDGRID_API_KEY?.startsWith('SG.');
  
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    emailService: {
      success: apiKeyExists && apiKeyFormatValid && !!FROM_EMAIL && !!ADMIN_EMAIL,
      apiKeyExists,
      apiKeyFormatValid,
      fromEmail: FROM_EMAIL,
      adminEmail: ADMIN_EMAIL
    }
  });
});

// Helper functions for email
async function sendAdminNotificationEmail({ name, email, company, message }) {
  if (!SENDGRID_API_KEY) {
    return { success: false, error: 'SendGrid API key not configured' };
  }

  try {
    const msg = {
      to: ADMIN_EMAIL,
      from: FROM_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nMessage: ${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    return { success: false, error: error.message || 'Failed to send admin email' };
  }
}

async function sendContactConfirmationEmail({ name, email }) {
  if (!SENDGRID_API_KEY) {
    return { success: false, error: 'SendGrid API key not configured' };
  }

  try {
    const msg = {
      to: email,
      from: FROM_EMAIL,
      subject: 'We received your message',
      text: `Hi ${name},\n\nThank you for contacting us. We've received your message and will get back to you soon.\n\nBest regards,\nThe Team`,
      html: `
        <h2>Thank you for contacting us</h2>
        <p>Hi ${name},</p>
        <p>Thank you for contacting us. We've received your message and will get back to you soon.</p>
        <p>Best regards,<br>The Team</p>
      `,
    };

    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return { success: false, error: error.message || 'Failed to send confirmation email' };
  }
}

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, company, message } = req.body;

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and message are required'
    });
  }

  try {
    // Initialize the database and save submission
    await initDb();
    await saveContactSubmission({ name, email, company, message });

    // Send notification email to admin
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
      error: error?.message || 'Unknown error'
    });
  }
});

// Start the API server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running on http://0.0.0.0:${PORT}`);
});
