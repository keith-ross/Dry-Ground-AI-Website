// src/api/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initSendGrid, sendContactEmail, checkEmailConfig } from '../lib/emailService.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize SendGrid
const sendGridInitialized = initSendGrid();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    emailService: checkEmailConfig()
  });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, and message are required'
      });
    }

    // Send email
    const result = await sendContactEmail(req.body);

    if (result.success) {
      return res.json({
        success: true,
        message: 'Message sent successfully'
      });
    } else {
      return res.status(500).json({
        success: false,
        error: result.error || 'Failed to send message'
      });
    }
  } catch (error) {
    console.error('Error in contact API:', error);
    res.status(500).json({
      success: false,
      error: 'Server error processing your request'
    });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running on http://0.0.0.0:${PORT}`);
  console.log('Email service initialized:', sendGridInitialized ? 'Yes' : 'No');
});