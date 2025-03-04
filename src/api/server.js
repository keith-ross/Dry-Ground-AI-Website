
const express = require('express');
const cors = require('cors');
const { sendContactConfirmationEmail, sendAdminNotificationEmail } = require('../lib/emailService');

// Configure environment variables
const PORT = process.env.PORT || 3001;

// Create Express app
const app = express();

// Configure CORS - Allow requests from all origins during development
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  return res.status(200).json({ status: 'ok', message: 'API server is running' });
});

// Testing endpoint for SendGrid
app.get('/api/test-sendgrid', (req, res) => {
  const apiKey = process.env.SENDGRID_API_KEY;
  const keyStatus = apiKey ? `Present (length: ${apiKey.length})` : 'Missing';
  
  return res.status(200).json({
    status: 'ok',
    sendgridApiKey: keyStatus,
    message: 'This endpoint helps verify if the SendGrid API key is configured'
  });
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  console.log('Received contact form submission:', JSON.stringify(req.body, null, 2));
  
  // Extract form data
  const { name, email, company = '', message } = req.body;
  
  // Validate required fields
  if (!name || !email || !message) {
    console.error('Missing required fields in form submission');
    return res.status(400).json({
      success: false,
      message: 'Missing required fields. Please provide name, email, and message.'
    });
  }
  
  try {
    // Send notification email to admin
    console.log('Sending admin notification email...');
    const adminEmailResult = await sendAdminNotificationEmail({ name, email, company, message });
    
    // Log admin email result
    console.log('Admin email result:', adminEmailResult);
    
    // Even if admin email fails, try to send user confirmation
    // Send confirmation email to the user
    console.log('Sending user confirmation email...');
    const userEmailResult = await sendContactConfirmationEmail({ name, email });
    
    // Log user email result
    console.log('User email result:', userEmailResult);
    
    // If both emails failed, return error
    if (!adminEmailResult.success && !userEmailResult.success) {
      console.error('Both emails failed to send');
      return res.status(500).json({
        success: false,
        message: 'Could not process your request due to email service issues',
        error: adminEmailResult.error || userEmailResult.error
      });
    }

    // Return success even if only one email worked
    console.log('Contact form submission processed (at least partially)');
    return res.status(200).json({ 
      success: true, 
      message: 'Form submitted successfully',
      adminEmailSent: adminEmailResult.success,
      userEmailSent: userEmailResult.success
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
