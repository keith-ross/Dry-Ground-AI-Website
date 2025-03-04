
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const emailService = require('../lib/emailService');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../../dist')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API server is running' });
});

// Test SendGrid endpoint
app.get('/api/test-sendgrid', (req, res) => {
  try {
    const apiKey = process.env.SENDGRID_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ 
        success: false, 
        message: 'SendGrid API key is not configured'
      });
    }
    
    const maskedKey = `${apiKey.substring(0, 5)}...${apiKey.substring(apiKey.length - 4)}`;
    
    return res.json({ 
      success: true, 
      message: 'SendGrid API key is configured',
      keyInfo: {
        length: apiKey.length,
        prefix: apiKey.substring(0, 3),
        masked: maskedKey
      }
    });
  } catch (error) {
    console.error('Error testing SendGrid API:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error testing SendGrid API', 
      error: error.message
    });
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }
    
    console.log('Processing contact form submission from:', email);
    
    // Send confirmation email to the user
    const userEmailResult = await emailService.sendContactConfirmationEmail({ 
      name, 
      email 
    });
    
    if (!userEmailResult.success) {
      console.error('Failed to send confirmation email:', userEmailResult.error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to send confirmation email. Please try again later.' 
      });
    }
    
    // Send notification email to admin
    const adminEmailResult = await emailService.sendAdminNotificationEmail({ 
      name, 
      email, 
      company, 
      message 
    });
    
    if (!adminEmailResult.success) {
      console.error('Failed to send admin notification:', adminEmailResult.error);
      // We continue since the user already got their confirmation
    }
    
    return res.status(200).json({ 
      success: true, 
      message: 'Contact form submitted successfully' 
    });
    
  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Server error processing your request. Please try again later.' 
    });
  }
});

// For React Router - serve index.html for any non-API routes
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
  } else {
    res.status(404).json({ error: 'API endpoint not found' });
  }
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`- API URL: http://0.0.0.0:${PORT}/api/health`);
  
  if (process.env.SENDGRID_API_KEY) {
    console.log('- SendGrid API is configured');
  } else {
    console.warn('- WARNING: SendGrid API key is missing. Contact form will not work!');
  }
});

module.exports = app;
