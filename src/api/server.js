import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { sendEmail } from '../lib/emailService.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Log all requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API server is running' });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    console.log('Received contact form submission:', req.body);

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      console.log('Missing required fields');
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    // Send email
    const emailResult = await sendEmail({ name, email, message });
    console.log('Email send result:', emailResult);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error processing contact form submission:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to process form submission',
      details: error.toString()
    });
  }
});

// Start the server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running on http://0.0.0.0:${PORT}`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down API server gracefully...');
  server.close(() => {
    console.log('API server closed');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down API server gracefully...');
  server.close(() => {
    console.log('API server closed');
    process.exit(0);
  });
});

export default app;