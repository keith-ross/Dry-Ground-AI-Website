const express = require('express');
const cors = require('cors');
const { sendContactConfirmationEmail, sendAdminNotificationEmail } = require('../lib/emailService');

const app = express();
const PORT = process.env.PORT || 3001;

// Check if SendGrid API key is configured
console.log('Testing SendGrid API key:', process.env.SENDGRID_API_KEY ? 
  `Present (length: ${process.env.SENDGRID_API_KEY.length})` : 'Missing');

// Configure middleware
app.use(cors());
app.use(express.json());

// Simple health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API server is running' });
});

// Handle contact form submissions
app.post('/api/contact', async (req, res) => {
  console.log('Received contact form submission');

  try {
    // Extract form data
    const { name, email, company, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      console.error('Missing required fields');
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    console.log('Processing submission for:', email);

    // Send notification email to admin
    console.log('Attempting to send admin notification email...');
    const adminEmailResult = await sendAdminNotificationEmail({ name, email, company, message });

    if (!adminEmailResult.success) {
      console.error('Failed to send admin notification:', adminEmailResult.error);
    }

    // Send confirmation email to the user
    console.log('Attempting to send user confirmation email...');
    const userEmailResult = await sendContactConfirmationEmail({ name, email });

    if (!userEmailResult.success) {
      console.error('Failed to send user confirmation:', userEmailResult.error);
    }

    // Return success even if only one email worked or both failed
    // This prevents the form from showing an error to the user
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