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
app.use(express.urlencoded({ extended: true }));

// Configure CORS to allow requests from any origin
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

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

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  try {
    console.log('Received contact form submission:', req.body);
    const { name, email, company, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      console.log('Missing required fields:', { name: !!name, email: !!email, message: !!message });
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

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
        message: 'Form submitted and saved, but email notification failed',
        emailError: emailResult.error 
      });
    }
  } catch (error) {
    console.error('Error processing form submission:', error);
    // Ensure we're sending a proper JSON response even in error cases
    return res.status(500).json({ 
      success: false, 
      error: error?.message || 'Server error occurred'
    });
  }
});

// Start the server - binding to 0.0.0.0 makes it accessible from outside
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running on port ${PORT} and listening on all interfaces`);
  console.log(`Health endpoint: http://localhost:${PORT}/api/health`);
  console.log(`Contact endpoint: http://localhost:${PORT}/api/contact`);
});

export default app;