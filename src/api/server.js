// src/api/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { handleContactForm } from '../lib/emailService.js';
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
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  const apiKey = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.FROM_EMAIL;
  const adminEmail = process.env.ADMIN_EMAIL;

  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    emailService: {
      success: !!apiKey && !!fromEmail && !!adminEmail,
      apiKeyExists: !!apiKey,
      fromEmail: fromEmail || 'not set',
      adminEmail: adminEmail || 'not set'
    }
  });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    console.log('Received contact form submission:', req.body);

    const { name, email, company, message } = req.body;

    if (!name || !email || !message) {
      console.log('Missing required fields');
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    const result = await handleContactForm({ name, email, company, message });

    console.log('Email sending result:', result);

    if (result.success) {
      return res.status(200).json({ 
        success: true, 
        message: 'Contact form submitted successfully' 
      });
    } else {
      return res.status(500).json({ 
        success: false, 
        error: result.error || 'Failed to send email' 
      });
    }
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Internal server error'
    });
  }
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running on port ${PORT}`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('API server shutting down');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('API server shutting down');
  process.exit(0);
});

// Export the app for testing
export default app;