// src/api/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { handleContactForm, checkEmailConfig } from '../lib/emailService.js';
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

// Create the Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Configure CORS to allow requests from any origin
app.use(cors({
  origin: '*',  // Allow all origins for testing
  methods: ['GET', 'POST'],
  credentials: true
}));

// Log important environment values
console.log('API Server Configuration:');
console.log('- PORT:', PORT);
console.log('- SENDGRID_API_KEY exists:', !!process.env.SENDGRID_API_KEY);
console.log('- FROM_EMAIL:', process.env.FROM_EMAIL || 'not set (using default)');
console.log('- ADMIN_EMAIL:', process.env.ADMIN_EMAIL || 'not set (using default)');

// Health check endpoint
app.get('/api/health', (req, res) => {
  const emailStatus = checkEmailConfig();
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    emailService: emailStatus
  });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  console.log('Received contact form submission:', req.body);

  try {
    // Handle the contact form submission
    const result = await handleContactForm(req.body);

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'Contact form submitted successfully'
      });
    } else {
      return res.status(400).json({
        success: false,
        message: result.error || 'Failed to process contact form'
      });
    }
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ API server running at http://0.0.0.0:${PORT}`);
  console.log(`Health check available at http://0.0.0.0:${PORT}/api/health`);
});

// Handle process termination gracefully
process.on('SIGINT', () => {
  console.log('API server shutting down...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('API server shutting down...');
  process.exit(0);
});