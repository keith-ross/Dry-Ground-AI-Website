import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { sendEmail } from './emailService.js';
import { initDb, saveContactSubmission } from './database.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configure CORS to allow requests from any origin in development
app.use(cors());

// Parse JSON and URL-encoded request bodies
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Log all incoming requests for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});


// Initialize database
initDb().catch(error => {
  console.error('Failed to initialize database:', error);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  const healthData = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    emailService: {
      apiKeyExists: !!process.env.SENDGRID_API_KEY,
      fromEmail: process.env.FROM_EMAIL || 'not configured',
      adminEmail: process.env.ADMIN_EMAIL || 'not configured',
      success: !!(process.env.SENDGRID_API_KEY && process.env.FROM_EMAIL && process.env.ADMIN_EMAIL)
    }
  };

  res.json(healthData);
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Name, email, and message are required' 
      });
    }

    // Log the received data
    console.log('Received contact form submission:', { name, email, company, message });

    // Save to database
    console.log('Saving contact submission to database...');
    const dbResult = await saveContactSubmission({ name, email, company, message });
    console.log('Saved to database with ID:', dbResult?.id || 'unknown');

    // Send email notification
    console.log('Sending email notification...');
    const emailResult = await sendEmail({ name, email, company, message });

    if (emailResult.success) {
      console.log('Email sent successfully');
      return res.status(200).json({ 
        success: true, 
        message: 'Contact form submitted successfully' 
      });
    } else {
      console.error('Email sending failed:', emailResult.error);
      // Still return success since we saved to DB
      return res.status(200).json({ 
        success: true,
        message: 'Form submitted and saved, but email notification failed',
        emailError: emailResult.error 
      });
    }
  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({ 
      success: false, 
      error: error?.message || 'Server error processing your request' 
    });
  }
});

// Start the server - binding to 0.0.0.0 makes it accessible from outside
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running on http://0.0.0.0:${PORT}`);
  console.log(`Health endpoint: http://localhost:${PORT}/api/health`);
  console.log(`Contact endpoint: http://localhost:${PORT}/api/contact`);
});

// Log environment info
console.log('Environment:', {
  NODE_ENV: process.env.NODE_ENV,
  PORT: PORT,
  HOST: process.env.HOST || '0.0.0.0'
});

export default app;