const express = require('express');
const cors = require('cors');
const { sendContactFormEmail } = require('../lib/emailService');

// Create Express app
const app = express();

// Configure middleware
app.use(cors());
app.use(express.json());

// Set port
const PORT = process.env.PORT || 3001;

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  console.log('Received contact form submission:', req.body);

  const { name, email, company, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    console.log('Validation failed:', { name, email, message });
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide name, email, and message'
    });
  }

  try {
    console.log('Attempting to send email...');
    const result = await sendContactFormEmail({ name, email, company, message });

    if (result.success) {
      console.log('Email sent successfully');
      return res.status(200).json({ 
        success: true, 
        message: 'Thank you! Your message has been received.'
      });
    } else {
      console.error('Email sending failed:', result.error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to send email',
        error: result.error
      });
    }
  } catch (error) {
    console.error('Server error:', error);
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