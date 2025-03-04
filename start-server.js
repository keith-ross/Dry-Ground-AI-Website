
import { createServer } from 'http';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { saveContactSubmission, initDb } from './src/lib/db.js';
import { sendContactConfirmationEmail } from './src/lib/emailService.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Ensure data directory exists
const dataDir = join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  console.log('Creating data directory...');
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize database on startup
(async () => {
  try {
    await initDb();
    console.log('Database initialized on server startup');
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
})();

// Create Express API server
const app = express();

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  try {
    console.log('Received contact form submission:', req.body);

    const { name, email, company, message } = req.body;

    if (!name || !email || !message) {
      console.log('Missing required fields in submission');
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message are required' 
      });
    }

    // Save to database
    const result = await saveContactSubmission({ name, email, company, message });
    console.log('Saved to database:', result);

    // Send confirmation email
    try {
      await sendContactConfirmationEmail({ name, email, message });
      console.log('Confirmation email sent');
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
      // We'll continue even if email fails
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Contact form submission successful' 
    });
  } catch (error) {
    console.error('Error processing contact form submission:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'An error occurred processing your request',
      error: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    error: err.message
  });
});

// Start the API server
const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running on port ${PORT}`);
});

// Create a simple health check server
const healthServer = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'ok', message: 'Server is running' }));
});

healthServer.listen(3002, '0.0.0.0', () => {
  console.log('Health check server running on port 3002');
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down servers...');
  server.close();
  healthServer.close();
  process.exit();
});

process.on('SIGTERM', () => {
  console.log('Shutting down servers...');
  server.close();
  healthServer.close();
  process.exit();
});
