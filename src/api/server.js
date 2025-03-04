import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import emailService from '../lib/emailService.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for all routes (can be configured more specifically for production)
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  try {
    console.log('Contact form submission received:', req.body);

    const { name, email, company, message } = req.body;

    if (!name || !email || !message) {
      console.log('Missing required fields');
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    // Send email using the email service
    const result = await emailService.sendContactEmail({
      name,
      email,
      company,
      message
    });

    if (result.success) {
      console.log('Email sent successfully');
      return res.json({ success: true });
    } else {
      console.error('Email sending failed:', result.error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to send email',
        details: result.error
      });
    }
  } catch (error) {
    console.error('Contact endpoint error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Server error processing your request',
      details: error.message
    });
  }
});

// Start the server
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`API Server running on http://0.0.0.0:${port}`);
})
.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. The API server cannot start.`);
    // Allow the process to exit naturally
  } else {
    console.error('Server error:', err);
  }
});

// Handle shutdown gracefully
process.on('SIGINT', () => {
  console.log('API Server shutting down...');
  server.close(() => {
    console.log('API Server closed');
    process.exit(0);
  });
});

export default app;