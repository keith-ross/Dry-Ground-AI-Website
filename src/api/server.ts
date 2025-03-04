import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load environment variables from .env file if it exists
if (fs.existsSync(path.resolve('.env'))) {
  dotenv.config();
  console.log('Loaded environment variables from .env file');
} else {
  console.log('No .env file found, using environment variables from system');
}

// Log environment variables for debugging
console.log('API Key exists:', !!process.env.SENDGRID_API_KEY);
console.log('Admin email:', process.env.ADMIN_EMAIL || 'Not set');

const app = express();

// Enable CORS
app.use(cors());

// Parse JSON request body
app.use(bodyParser.json());

// Check API route
app.get('/api/health', (req, res) => {
  res.json({ status: 'API is running' });
});

// Import email service after environment setup
import { sendContactConfirmationEmail, sendAdminNotificationEmail } from '../lib/emailService.js';

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email and message are required' 
      });
    }

    console.log('Received contact form submission:', { name, email, company, message });

    // Send confirmation email to user
    const userEmailResult = await sendContactConfirmationEmail({ name, email });

    // Send notification email to admin
    const adminEmailResult = await sendAdminNotificationEmail({ name, email, company, message });

    console.log('Email sending results:', { userEmailResult, adminEmailResult });

    if (userEmailResult.success || adminEmailResult.success) {
      return res.json({ 
        success: true, 
        message: 'Contact form submitted successfully' 
      });
    } else {
      console.error('Failed to send emails:', { userEmailResult, adminEmailResult });
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to send confirmation emails',
        error: userEmailResult.error || adminEmailResult.error
      });
    }
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred while processing your request',
      error: error.message 
    });
  }
});

// Start the API server
const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running on port ${PORT}`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down API server...');
  server.close(() => {
    console.log('API server closed');
    process.exit(0);
  });
});

export default app;