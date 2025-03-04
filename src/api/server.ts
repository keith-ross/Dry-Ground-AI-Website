
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { initDb, saveContactSubmission } from '../lib/db';
import { sendContactConfirmationEmail, sendAdminNotificationEmail } from '../lib/emailService';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize database
initDb().catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});

// Debug environment variables
console.log('Environment variables loaded:', {
  hasSendGridKey: !!process.env.SENDGRID_API_KEY,
  adminEmail: process.env.ADMIN_EMAIL || 'Not set'
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  console.log('Received contact form submission:', req.body);
  
  try {
    const { name, email, company, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message are required' 
      });
    }
    
    // Save to database
    try {
      await saveContactSubmission({ name, email, company, message });
      console.log('Saved contact submission to database');
    } catch (dbError) {
      console.error('Database error:', dbError);
      // Continue even if database save fails
    }
    
    // Send confirmation email to user
    console.log('Attempting to send confirmation email to user...');
    const userEmailResult = await sendContactConfirmationEmail({ name, email });
    console.log('User email result:', userEmailResult);
    
    // Send notification email to admin
    console.log('Attempting to send notification email to admin...');
    const adminEmailResult = await sendAdminNotificationEmail({ name, email, company, message });
    console.log('Admin email result:', adminEmailResult);
    
    // Check email results
    if (userEmailResult.success || adminEmailResult.success) {
      return res.json({ 
        success: true, 
        message: 'Contact form submitted successfully' 
      });
    } else {
      const errorDetails = userEmailResult.error || adminEmailResult.error;
      console.error('Failed to send emails:', { 
        userEmailResult, 
        adminEmailResult,
        errorDetails: JSON.stringify(errorDetails)
      });
      
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to send confirmation emails',
        errorDetails: errorDetails ? errorDetails.toString() : 'Unknown error'
      });
    }
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred while processing your request',
      error: error.message 
    });
  }
});

// For health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// For debugging
app.get('/api/env', (req, res) => {
  res.json({ 
    hasSendGridKey: !!process.env.SENDGRID_API_KEY,
    adminEmail: process.env.ADMIN_EMAIL || 'Not set',
    nodeEnv: process.env.NODE_ENV
  });
});

const PORT = process.env.PORT || 3001;
export default app;
