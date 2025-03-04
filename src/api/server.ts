
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { initDb, saveContactSubmission } from '../lib/db';
import { sendContactConfirmationEmail, sendAdminNotificationEmail } from '../lib/emailService';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('Server environment variables:');
console.log('- SENDGRID_API_KEY exists:', !!process.env.SENDGRID_API_KEY);
console.log('- ADMIN_EMAIL:', process.env.ADMIN_EMAIL || 'Not set, using default');

// Initialize database
initDb().catch(error => {
  console.error('Failed to initialize database:', error);
});

const app = express();

// Configure middleware
app.use(cors());
app.use(bodyParser.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
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
    
    // Check if SendGrid API key is configured
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SendGrid API key is not configured. Please add it to Replit Secrets.');
      return res.status(500).json({
        success: false,
        message: 'Email service is not properly configured. Please contact the administrator.'
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
    console.log('User email result:', JSON.stringify(userEmailResult, null, 2));
    
    // Send notification email to admin
    console.log('Attempting to send notification email to admin...');
    const adminEmailResult = await sendAdminNotificationEmail({ name, email, company, message });
    console.log('Admin email result:', JSON.stringify(adminEmailResult, null, 2));
    
    // Check email results
    if (userEmailResult.success || adminEmailResult.success) {
      return res.json({ 
        success: true, 
        message: 'Contact form submitted successfully' 
      });
    } else {
      let errorMessage = 'Failed to send confirmation emails';
      let errorDetails = null;
      
      if (userEmailResult.error) {
        errorDetails = userEmailResult.error;
        errorMessage = userEmailResult.message || errorMessage;
      } else if (adminEmailResult.error) {
        errorDetails = adminEmailResult.error;
        errorMessage = adminEmailResult.message || errorMessage;
      }
      
      console.error('Failed to send emails:', { 
        userEmailResult, 
        adminEmailResult,
        errorDetails: errorDetails ? JSON.stringify(errorDetails, null, 2) : 'Unknown error'
      });
      
      return res.status(500).json({ 
        success: false, 
        message: errorMessage,
        error: errorDetails ? errorDetails.message || JSON.stringify(errorDetails) : 'Unknown error'
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

// Start the API server
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running on port ${PORT}`);
});

export default app;
