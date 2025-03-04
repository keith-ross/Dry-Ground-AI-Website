
const express = require('express');
const cors = require('cors');
const { sendContactConfirmationEmail, sendAdminNotificationEmail } = require('../lib/emailService');
const path = require('path');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Check API status
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  console.log('Contact form submission received:', req.body);
  
  const { name, email, company, message } = req.body;
  
  // Validate required fields
  if (!name || !email || !message) {
    console.log('Missing required fields');
    return res.status(400).json({ 
      success: false, 
      message: 'Name, email, and message are required fields' 
    });
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.log('Invalid email format');
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide a valid email address' 
    });
  }
  
  try {
    // Send notification email to admin
    console.log('Attempting to send admin notification email...');
    const adminNotificationResult = await sendAdminNotificationEmail({ 
      name, 
      email, 
      company, 
      message 
    });
    
    if (!adminNotificationResult.success) {
      console.error('Failed to send admin notification:', adminNotificationResult.error);
      return res.status(500).json({
        success: false,
        message: 'Error sending notification email',
        error: adminNotificationResult.error
      });
    }
    
    // Send confirmation email to user
    console.log('Attempting to send user confirmation email...');
    const userConfirmationResult = await sendContactConfirmationEmail({ 
      name, 
      email 
    });
    
    if (!userConfirmationResult.success) {
      console.error('Failed to send user confirmation:', userConfirmationResult.error);
      // We'll continue since the admin notification was sent successfully
      console.log('Continuing since admin notification was sent successfully');
    }
    
    // Return success
    console.log('Contact form submission processed successfully');
    return res.status(200).json({ 
      success: true, 
      message: 'Thank you for your message! We will get back to you soon.' 
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

// For handling client-side routing in production
app.get('*', (req, res, next) => {
  // Skip API routes
  if (req.path.startsWith('/api/')) {
    return next();
  }
  
  // Send the index.html for all other routes
  res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});

// Start the API server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running on http://0.0.0.0:${PORT}`);
});

module.exports = app;
