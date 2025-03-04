
// src/api/server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { sendContactEmail } from '../lib/emailService.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Get the directory name properly in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file if it exists
const envPath = path.join(__dirname, '../../.env');
if (fs.existsSync(envPath)) {
  console.log(`Loading environment variables from ${envPath}`);
  dotenv.config({ path: envPath });
} else {
  console.log('No .env file found, using environment variables directly');
  dotenv.config();
}

// Log environment configuration
console.log('API Server Environment:');
console.log('- NODE_ENV:', process.env.NODE_ENV);
console.log('- PORT:', process.env.PORT || 3001);
console.log('- SENDGRID_API_KEY exists:', !!process.env.SENDGRID_API_KEY);

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: '*', // Allow all origins in development
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Simple health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  try {
    console.log('Received contact form submission:', req.body);
    
    const { name, email, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      console.log('Missing required fields in form submission');
      return res.status(400).json({
        success: false,
        error: 'Missing required fields. Please provide name, email, and message.'
      });
    }
    
    // Send email using service
    const result = await sendContactEmail(req.body);
    
    if (result.success) {
      console.log('Email sent successfully');
      return res.json({
        success: true,
        message: 'Your message has been sent successfully!'
      });
    } else {
      console.error('Email sending failed:', result.error);
      return res.status(500).json({
        success: false,
        error: 'Failed to send email. Please try again later.'
      });
    }
  } catch (error) {
    console.error('Error processing contact form submission:', error);
    res.status(500).json({
      success: false,
      error: 'An unexpected error occurred. Please try again later.'
    });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server is running on port ${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/api/health`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down API server...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Shutting down API server...');
  process.exit(0);
});
