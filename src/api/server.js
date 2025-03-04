
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const emailService = require('../lib/emailService');

// Load environment variables
const envPath = path.join(__dirname, '../../.env');
if (fs.existsSync(envPath)) {
  console.log(`Loading environment variables from ${envPath}`);
  dotenv.config({ path: envPath });
} else {
  console.log('No .env file found, using environment variables directly');
  dotenv.config();
}

// Create Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Log all requests for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    environment: process.env.NODE_ENV || 'development',
    sendgridConfigured: !!process.env.SENDGRID_API_KEY
  });
});

// Test SendGrid API key
app.get('/api/test-sendgrid', (req, res) => {
  const key = process.env.SENDGRID_API_KEY;
  if (!key) {
    return res.status(500).json({
      success: false,
      message: 'SendGrid API key not configured'
    });
  }

  res.json({
    success: true,
    message: 'SendGrid API key configured',
    keyInfo: {
      length: key.length,
      prefix: key.substring(0, 3) + '...',
      isValid: key.startsWith('SG.')
    }
  });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    console.log('Contact form submission received:', req.body);
    
    const { name, email, company, message } = req.body;

    if (!name || !email || !message) {
      console.log('Missing required fields:', { name: !!name, email: !!email, message: !!message });
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }

    // Send notification email to admin
    console.log('Attempting to send admin notification email...');
    const adminEmailResult = await emailService.sendAdminNotificationEmail({ 
      name, 
      email, 
      company, 
      message 
    });

    if (!adminEmailResult.success) {
      console.error('Failed to send admin notification:', adminEmailResult.error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to send admin notification', 
        error: adminEmailResult.error || 'Unknown error' 
      });
    }

    // Send confirmation email to the user
    console.log('Attempting to send user confirmation email...');
    const userEmailResult = await emailService.sendContactConfirmationEmail({ 
      name, 
      email 
    });

    if (!userEmailResult.success) {
      console.error('Failed to send confirmation email:', userEmailResult.error);
      // Continue anyway since we already sent the admin notification
      console.log('Continuing despite user email failure since admin was notified');
    }

    console.log('Contact form submission processed successfully');
    return res.status(200).json({ 
      success: true, 
      message: 'Form submitted successfully' 
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
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
