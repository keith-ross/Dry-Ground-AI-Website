
// contactServer.js - A simplified API server for the contact form
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sendContactFormEmail } = require('../lib/sendgridService');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    message: 'API server is running' 
  });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    console.log('Received contact form submission:', req.body);
    
    const { name, email, company, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }
    
    // Send email notification
    const emailResult = await sendContactFormEmail({ name, email, company, message });
    
    if (!emailResult.success) {
      console.error('Failed to send email:', emailResult.error);
      return res.status(500).json({
        success: false,
        message: 'Failed to send email notification',
        error: emailResult.error
      });
    }
    
    // Return success
    return res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully'
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message || 'Unknown error'
    });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Contact API server running on http://0.0.0.0:${PORT}`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
});
