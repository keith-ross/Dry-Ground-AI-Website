
const express = require('express');
const cors = require('cors');
const { sendContactConfirmationEmail, sendAdminNotificationEmail } = require('../lib/emailService');
const { saveContactSubmission } = require('../lib/db');

// Configure environment variables
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configure CORS
app.use(cors({
  origin: '*', // In production, you would restrict this to your domain
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON request body
app.use(express.json());

// Server health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API server is running' });
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  console.log('Received contact form submission');
  
  const { name, email, company, message } = req.body;
  
  // Validate required fields
  if (!name || !email || !message) {
    console.error('Missing required fields in contact form submission');
    return res.status(400).json({ 
      success: false, 
      message: 'Name, email, and message are required fields' 
    });
  }

  try {
    // Save submission to database if db module is available
    try {
      if (typeof saveContactSubmission === 'function') {
        console.log('Saving contact submission to database...');
        await saveContactSubmission({ name, email, company, message });
        console.log('Contact submission saved to database');
      }
    } catch (dbError) {
      console.error('Error saving to database, continuing with email sending:', dbError);
      // Continue with email sending even if database saving fails
    }

    // Send notification email to admin
    console.log('Sending admin notification email...');
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
    console.log('Sending user confirmation email...');
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
      error: error.message || 'Unknown error'
    });
  }
});

// Start the API server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running on http://0.0.0.0:${PORT}`);
});

module.exports = app; // Export for testing
