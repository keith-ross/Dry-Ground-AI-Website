import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { saveContactSubmission, initDb } from '../lib/db.js';
import { sendContactConfirmationEmail } from '../lib/emailService.js';

// Create Express API server
const app = express();
const PORT = process.env.PORT || 3001;

// Initialize database on startup
initDb().catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, message } = req.body;
    
    console.log('Received contact form submission:', { name, email, company, message });
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message are required' 
      });
    }
    
    try {
      // Save to database
      const saveResult = await saveContactSubmission({ name, email, company, message });
      console.log('Saved to database with ID:', saveResult.id);
    } catch (dbError) {
      console.error('Database error:', dbError);
      // Continue processing even if database save fails
    }
    
    try {
      // Send confirmation email
      const emailResult = await sendContactConfirmationEmail({ name, email });
      console.log('User email sending result:', emailResult);
      
      // Send admin notification
      const adminEmailResult = await sendAdminNotificationEmail({ name, email, company, message });
      console.log('Admin email sending result:', adminEmailResult);
    } catch (emailError) {
      console.error('Email error:', emailError);
      // Continue processing even if email sending fails
    }
    
    // Return success response
    return res.status(200).json({ 
      success: true, 
      message: 'Contact form submission received'
    });
    
  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'An error occurred while processing your submission'
    });
  }
});

// Start the server
export default app;
const app = express();

// Initialize database on startup
(async () => {
  try {
    await initDb();
    console.log('Database initialized on server startup');
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
})();

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  try {
    console.log('Received contact form submission:', req.body);

    const { name, email, company, message } = req.body;

    if (!name || !email || !message) {
      console.log('Missing required fields in submission');
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message are required' 
      });
    }

    // Save to database
    try {
      const result = await saveContactSubmission({ name, email, company, message });
      console.log('Saved to database:', result);
    } catch (dbError) {
      console.error('Error saving to database:', dbError);
      return res.status(500).json({
        success: false,
        message: 'Failed to save your message. Please try again later.'
      });
    }

    // Send confirmation email
    try {
      await sendContactConfirmationEmail({ name, email, message });
      console.log('Confirmation email sent');
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
      // We'll continue even if email fails
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!'
    });
  } catch (error) {
    console.error('Unexpected error in contact endpoint:', error);
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred. Please try again later.'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    error: err.message
  });
});

// Start the API server
// Add environment variables loading for local development
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3001;

// For debugging
console.log('Environment variables loaded:', {
  port: PORT,
  hasSendGridKey: !!process.env.SENDGRID_API_KEY,
  adminEmail: process.env.ADMIN_EMAIL
});

export default app;