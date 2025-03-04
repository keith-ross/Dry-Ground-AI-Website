const express = require('express');
const cors = require('cors');
const { sendContactEmail } = require('../lib/emailService');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message, company } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    console.log('Received contact form submission:', { name, email, company });

    // Send emails
    const result = await sendContactEmail({ name, email, message, company });

    if (result.success) {
      return res.json({ 
        success: true, 
        message: 'Contact form submitted successfully' 
      });
    } else {
      console.error('Email sending failed:', result.error);
      return res.status(500).json({ 
        success: false, 
        error: result.error,
        details: result.details
      });
    }
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'An unexpected error occurred' 
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
  console.log(`Health check available at: http://0.0.0.0:${PORT}/api/health`);
});