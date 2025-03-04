
const express = require('express');
const cors = require('cors');
const { sendContactConfirmationEmail, sendAdminNotificationEmail } = require('../lib/emailService');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields'
      });
    }

    console.log('Processing contact form submission from:', email);

    // Send notification email to admin
    console.log('Sending admin notification email...');
    const adminEmailResult = await sendAdminNotificationEmail({ 
      name, 
      email, 
      company, 
      message 
    });

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

module.exports = app;
