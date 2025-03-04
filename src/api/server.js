
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { initDb, saveContactSubmission } from '../lib/db';
import { sendContactConfirmationEmail, sendAdminNotificationEmail, testSendGridApiKey } from '../lib/emailService';

// Load environment variables from .env file
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
    emailServiceConfigured: !!process.env.SENDGRID_API_KEY
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
  
  // Input validation
  const { name, email, company, message } = req.body;
  
  if (!name || !email || !message) {
    console.log('Missing required fields:', { name: !!name, email: !!email, message: !!message });
    return res.status(400).json({ 
      success: false, 
      message: 'Missing required fields' 
    });
  }
  
  try {
    // Save to database first
    console.log('Saving contact submission to database...');
    const saveResult = await saveContactSubmission({ name, email, company, message });
    console.log('Saved to database with ID:', saveResult.id);

    // Send notification email to admin
    console.log('Attempting to send admin notification email...');
    const adminEmailResult = await sendAdminNotificationEmail({ name, email, company, message });

    if (!adminEmailResult.success) {
      console.error('Failed to send admin notification:', adminEmailResult.error);
      return res.status(500).json({
        success: false,
        message: 'Failed to process your request due to email service issues',
        error: adminEmailResult.error
      });
    }

    // Send confirmation email to the user
    console.log('Attempting to send user confirmation email...');
    const userEmailResult = await sendContactConfirmationEmail({ name, email });

    if (!userEmailResult.success) {
      console.error('Failed to send user confirmation:', userEmailResult.error);
      // Continue since the admin notification was sent successfully
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
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running on http://0.0.0.0:${PORT}`);
});

// Export for testing
export { app, server };
