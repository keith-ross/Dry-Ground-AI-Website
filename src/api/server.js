const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sendContactEmail } = require('../lib/emailService.js');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Debugging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API server is running' });
});

app.post('/api/contact', async (req, res) => {
  console.log('Received contact form submission:', req.body);

  const { name, email, message } = req.body;

  // Validate inputs
  if (!name || !email || !message) {
    console.log('Missing required fields');
    return res.status(400).json({ 
      success: false, 
      error: 'Please fill in all required fields' 
    });
  }

  try {
    const result = await sendContactEmail({
      name,
      email,
      message
    });

    console.log('Email sending result:', result);

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'Contact message sent successfully'
      });
    } else {
      return res.status(500).json({
        success: false,
        error: result.error || 'Failed to send email',
        details: result.details || {}
      });
    }
  } catch (error) {
    console.error('Error in /api/contact endpoint:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Server error',
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running on port ${PORT}`);
});

module.exports = app;