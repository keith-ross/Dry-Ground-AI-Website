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

// Create Express app
const app = express();

// Configure middleware
app.use(cors());
app.use(bodyParser.json());

// API routes
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    // Import after environment variables are loaded
    const { sendContactConfirmationEmail, sendAdminNotificationEmail } = await import('../lib/emailService.js');

    // Log environment variables for debugging (redacted for security)
    console.log('Email service environment:', {
      hasApiKey: !!process.env.SENDGRID_API_KEY,
      adminEmail: process.env.ADMIN_EMAIL || 'not set'
    });

    // Send confirmation email to the user
    const userEmailResult = await sendContactConfirmationEmail({ name, email });

    // Send notification email to admin
    const adminEmailResult = await sendAdminNotificationEmail({ 
      name, 
      email, 
      company, 
      message 
    });

    console.log('Email sending results:', {
      user: userEmailResult.success ? 'success' : 'failed',
      admin: adminEmailResult.success ? 'success' : 'failed'
    });

    if (!userEmailResult.success || !adminEmailResult.success) {
      return res.status(500).json({
        success: false,
        error: 'Failed to send one or more emails',
        details: {
          userEmail: userEmailResult,
          adminEmail: adminEmailResult
        }
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Contact form submission successful' 
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'Internal server error'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start the API server
const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running on port ${PORT}`);
  console.log('Environment variables loaded:', {
    port: PORT,
    hasSendGridKey: !!process.env.SENDGRID_API_KEY,
    adminEmail: process.env.ADMIN_EMAIL
  });
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