import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sendEmail } from './emailService.js';
import { initDb, saveContactSubmission } from './database.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Configure CORS to allow requests from any origin during development
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [/\.replit\.dev$/, /anchoredup\.org$/] // Restrict in production
    : '*',                                   // Allow all in development
  methods: ['GET', 'POST'],
  credentials: true
}));

// Initialize database
initDb().catch(error => {
  console.error('Failed to initialize database:', error);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const FROM_EMAIL = process.env.FROM_EMAIL;
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

  // Check email service configuration
  const emailService = {
    success: !!(SENDGRID_API_KEY && FROM_EMAIL && ADMIN_EMAIL),
    apiKeyExists: !!SENDGRID_API_KEY,
    apiKeyValid: SENDGRID_API_KEY?.startsWith('SG.') || false,
    fromEmail: FROM_EMAIL || 'not configured',
    adminEmail: ADMIN_EMAIL || 'not configured'
  };

  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development',
    emailService
  });
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  console.log('Received contact form submission:', req.body);

  // Input validation
  const { name, email, company, message } = req.body;

  if (!name || !email || !message) {
    console.log('Missing required fields:', { name: !!name, email: !!email, message: !!message });
    return res.status(400).json({ 
      success: false, 
      error: 'Missing required fields' 
    });
  }

  try {
    // Save to database first
    console.log('Saving contact submission to database...');
    const dbResult = await saveContactSubmission({ name, email, company, message });
    console.log('Saved to database with ID:', dbResult?.id || 'unknown');

    // Send email
    console.log('Sending email notification...');
    const emailResult = await sendEmail({ name, email, company, message });

    if (emailResult.success) {
      console.log('Email sent successfully');
      return res.status(200).json({ 
        success: true, 
        message: 'Form submitted successfully' 
      });
    } else {
      console.error('Email sending failed:', emailResult.error);
      // Still return success since we saved to DB
      return res.status(200).json({ 
        success: true,
        message: 'Form submitted and saved, but email notification failed' 
      });
    }
  } catch (error) {
    console.error('Error processing form submission:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Server error occurred',
      details: error.message
    });
  }
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API Server running on 0.0.0.0:${PORT}`);
  console.log(`Health check available at: http://localhost:${PORT}/api/health`);
  console.log(`Contact endpoint available at: http://localhost:${PORT}/api/contact`);
});

export default app;