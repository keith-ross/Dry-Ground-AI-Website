const express = require('express');
const cors = require('cors');
const { initDb, saveContactSubmission } = require('../lib/db');
const { sendContactFormEmail } = require('../lib/emailService');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Initialize database
initDb().catch(err => {
  console.error('Failed to initialize database:', err);
});

// Middleware
app.use(cors());
app.use(express.json());

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// API health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API server is running' });
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  console.log('Received contact form submission:', req.body);

  const { name, email, company, message } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    console.log('Missing required fields in submission');
    return res.status(400).json({ 
      success: false, 
      message: 'Name, email, and message are required fields' 
    });
  }

  try {
    // First save to database
    console.log('Saving contact submission to database...');
    try {
      const saveResult = await saveContactSubmission({ name, email, company, message });
      console.log('Saved to database with ID:', saveResult.id);
    } catch (dbError) {
      console.error('Database error:', dbError);
      // Log but continue - we want to try sending the email even if DB fails
    }

    // Return success immediately - we'll handle email sending asynchronously
    res.status(200).json({ 
      success: true, 
      message: 'Thank you! Your message has been received.' 
    });

    // Now attempt to send email (after we've already responded to the client)
    try {
      console.log('Attempting to send notification email...');
      const emailResult = await sendContactFormEmail({ name, email, company, message });
      console.log('Email sending result:', emailResult);
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // This doesn't affect the client since we already sent the response
    }

  } catch (error) {
    console.error('Error processing contact form submission:', error);
    // Make sure we're not trying to send headers if they've already been sent
    if (!res.headersSent) {
      return res.status(500).json({ 
        success: false, 
        message: 'Server error processing your request',
        error: error.message || 'Unknown server error'
      });
    }
  }
});

// Start the API server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running on http://0.0.0.0:${PORT}`);
});