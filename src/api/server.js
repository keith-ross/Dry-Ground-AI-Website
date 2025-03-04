
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import email service
import { sendContactConfirmationEmail, sendAdminNotificationEmail } from '../lib/emailService.js';

// Load environment variables from .env file
const envPath = path.join(__dirname, '../../.env');
if (fs.existsSync(envPath)) {
  console.log(`Loading environment variables from ${envPath}`);
  dotenv.config({ path: envPath });
} else {
  console.log('No .env file found, using environment variables directly');
  dotenv.config();
}

// Verify critical environment variables
console.log('API Server Environment:');
console.log('- NODE_ENV:', process.env.NODE_ENV);
console.log('- PORT:', process.env.PORT || 3001);
console.log('- SENDGRID_API_KEY exists:', !!process.env.SENDGRID_API_KEY);
console.log('- SENDGRID_API_KEY length:', process.env.SENDGRID_API_KEY ? process.env.SENDGRID_API_KEY.length : 0);

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
  methods: ['GET', 'POST'],
  credentials: true
}));

// Basic database mock (replace with actual DB when ready)
const contactSubmissions = [];

// Function to save contact form submissions
async function saveContactSubmission(data) {
  const submission = {
    id: Date.now(),
    ...data,
    createdAt: new Date().toISOString()
  };
  
  contactSubmissions.push(submission);
  console.log('Saved submission to memory store:', submission);
  return submission;
}

// Define routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    env: process.env.NODE_ENV,
    emailServiceConfigured: !!process.env.SENDGRID_API_KEY
  });
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
        message: 'Missing required fields' 
      });
    }
    
    // Save to database first
    console.log('Saving contact submission to database...');
    const saveResult = await saveContactSubmission({ name, email, company, message });
    console.log('Saved to database with ID:', saveResult.id);
    
    // Send email notifications
    let emailResults = { confirmation: null, admin: null };
    
    if (process.env.SENDGRID_API_KEY) {
      try {
        // Send confirmation email to the user
        console.log('Sending confirmation email to user...');
        emailResults.confirmation = await sendContactConfirmationEmail({ name, email });
        
        // Send notification to admin
        console.log('Sending notification to admin...');
        emailResults.admin = await sendAdminNotificationEmail({ name, email, company, message });
        
        console.log('Both emails sent successfully');
      } catch (emailError) {
        console.error('Error sending emails:', emailError);
        // Don't fail the request, just log the error
        emailResults.error = emailError.message;
      }
    } else {
      console.log('Email sending skipped: SendGrid API key not configured');
      emailResults.skipped = true;
    }
    
    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Contact form submission received',
      data: {
        submission: {
          id: saveResult.id,
          timestamp: saveResult.createdAt
        },
        emailSent: emailResults.skipped ? false : !!emailResults.confirmation
      }
    });
    
  } catch (error) {
    console.error('Error processing contact form submission:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error processing form submission',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server listening on port ${PORT}`);
});

// Export the app for testing
export default app;
