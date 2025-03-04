const express = require('express');
const cors = require('cors');
const { initDb, saveContactSubmission } = require('../lib/db');
const { 
  sendContactFormEmail, 
  testSendGridApiKey, 
  sendAdminNotificationEmail,
  sendContactConfirmationEmail 
} = require('../lib/emailService');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Configure CORS to allow requests from any origin during development
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [/\.replit\.dev$/, /anchoredup\.org$/] // Restrict in production
    : '*',                                   // Allow all in development
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));

// Handle preflight requests
app.options('*', cors());

// Initialize database
initDb().catch(error => {
  console.error('Failed to initialize database:', error);
});

// Define routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    env: process.env.NODE_ENV,
    emailServiceConfigured: !!process.env.SENDGRID_API_KEY,
    timestamp: new Date().toISOString()
  });
});

// Test SendGrid configuration
app.get('/api/test-sendgrid', async (req, res) => {
  try {
    const result = await testSendGridApiKey();
    res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    console.error('Error testing SendGrid API:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Unknown error testing SendGrid API'
    });
  }
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  console.log('Received contact form submission:', req.body);

  try {
    // Input validation
    const { name, email, company, message } = req.body;

    if (!name || !email || !message) {
      console.log('Missing required fields:', { name: !!name, email: !!email, message: !!message });
      return res.status(400).json({ 
        success: false, 
        message: 'Required fields missing. Please provide name, email, and message.' 
      });
    }

    // Save to database first
    console.log('Saving contact submission to database...');
    const saveResult = await saveContactSubmission({ name, email, company, message });
    console.log('Saved to database with ID:', saveResult.id);

    // Send email
    console.log('Attempting to send email...');
    const emailResult = await sendContactFormEmail({ name, email, company, message });
    console.log('Email sending result:', emailResult);

    if (!emailResult.success) {
      console.error('Failed to send email:', emailResult.error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to send your message', 
        error: emailResult.error 
      });
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