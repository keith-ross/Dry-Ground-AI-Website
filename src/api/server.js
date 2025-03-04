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

// Debug endpoint to test each component individually
app.get('/api/debug', (req, res) => {
  try {
    // Check environment variables
    const apiKey = process.env.SENDGRID_API_KEY || 'Not set';
    const apiKeyInfo = apiKey !== 'Not set' ? 
      { prefix: apiKey.substring(0, 5) + '...', length: apiKey.length } : 
      { error: 'API key not found' };
    
    // Check if database is initialized
    const dbStatus = db ? 'Initialized' : 'Not initialized';
    
    res.status(200).json({
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      apiKeyInfo,
      dbStatus,
      corsSettings: {
        origin: process.env.NODE_ENV === 'production' 
          ? [/\.replit\.dev$/, /anchoredup\.org$/]
          : '*'
      }
    });
  } catch (error) {
    console.error('Debug endpoint error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Contact form submission endpoint - simplified version
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

    // First just try to save to database
    try {
      console.log('Saving contact submission to database...');
      const saveResult = await saveContactSubmission({ name, email, company, message });
      console.log('Saved to database with ID:', saveResult.id);
    } catch (dbError) {
      console.error('Database error:', dbError);
      // Continue even if database save fails
    }

    // Return success - we'll handle emails asynchronously
    console.log('Contact form submission received successfully');
    res.status(200).json({ 
      success: true, 
      message: 'Thank you! Your message has been received.' 
    });
    
    // Now try to send email asynchronously (after response is sent)
    try {
      console.log('Attempting to send email...');
      const emailResult = await sendContactFormEmail({ name, email, company, message });
      console.log('Email sending result:', emailResult);
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // Email failure doesn't affect the user experience since we already responded
    }
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