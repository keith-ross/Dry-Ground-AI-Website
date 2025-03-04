
// src/api/server.js
import express from 'express';
import cors from 'cors';
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
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Configure CORS
app.use(cors({
  origin: '*', // Allow all origins for testing
  methods: ['GET', 'POST'],
  credentials: true
}));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    emailServiceConfigured: !!process.env.SENDGRID_API_KEY
  });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  console.log('Received contact form submission:', req.body);
  
  try {
    const { name, email, company, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      console.log('Missing required fields:', { name: !!name, email: !!email, message: !!message });
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    // Send email
    const result = await sendContactEmail({ name, email, company, message });
    
    if (result.success) {
      console.log('Contact email sent successfully');
      return res.status(200).json({
        success: true,
        message: result.message || 'Message sent successfully'
      });
    } else {
      console.log('Failed to send contact email:', result.error);
      return res.status(500).json({
        success: false,
        error: result.error || 'Failed to send message'
      });
    }
  } catch (error) {
    console.error('Error processing contact form submission:', error);
    res.status(500).json({
      success: false,
      error: 'Server error processing contact form'
    });
  }
});

// Start the server
if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`API server running on http://0.0.0.0:${PORT}`);
  });

  // Handle server errors
  server.on('error', (error) => {
    console.error('Server error:', error);
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Please use a different port.`);
    }
  });
}

// Export the app for testing
export default app;
