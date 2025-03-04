import express from 'express';
import cors from 'cors';
import { sendContactEmail } from '../lib/emailService.js';
import dotenv from 'dotenv';

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

// Health check endpoint (from original code)
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    emailServiceConfigured: !!process.env.SENDGRID_API_KEY //Added from original code
  });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, message } = req.body;

    console.log('Received contact form submission:', { name, email, company });

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    // Send email
    const result = await sendContactEmail({ name, email, company, message });

    if (result.success) {
      return res.status(200).json({ 
        success: true, 
        message: 'Contact form submission successful' 
      });
    } else {
      console.error('Email sending failed:', result);
      return res.status(500).json({ 
        success: false, 
        error: result.message || 'Failed to send email',
        details: process.env.NODE_ENV === 'production' ? null : result
      });
    }
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Server error processing contact form',
      message: process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message
    });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running at http://0.0.0.0:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Export the app for testing
export default app;