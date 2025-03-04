import express from 'express';
import cors from 'cors';
import { submitContactForm } from './src/api/contact';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Verify critical environment variables
if (!process.env.DATABASE_URL) {
  console.error('ERROR: DATABASE_URL environment variable is not set!');
  console.error('Please make sure your .env file is properly configured.');
}

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc)
    if (!origin) return callback(null, true);
    return callback(null, true); // Allow all origins for troubleshooting
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON bodies with increased size limit
app.use(express.json({ limit: '1mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  if (req.method === 'POST' && req.body) {
    console.log('Request body:', JSON.stringify(req.body));
  }
  next();
});

// API Routes
app.post('/api/contact', submitContactForm);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Database health check
app.get('/api/db-health', async (req, res) => {
  try {
    const { pool } = await import('./src/lib/db');
    const result = await pool.query('SELECT NOW()');
    res.json({ 
      status: 'ok', 
      db_connected: true,
      server_time: result.rows[0].now
    });
  } catch (err) {
    console.error('Database health check failed:', err);
    res.status(500).json({ 
      status: 'error', 
      db_connected: false,
      message: err instanceof Error ? err.message : 'Unknown database error'
    });
  }
});

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);

  if (!res.headersSent) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : (err?.message || 'Unknown error')
    });
  }
  next(err);
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://0.0.0.0:${PORT}/api/health`);
});

// Handle process termination
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  app.use(express.static(path.join(__dirname, 'dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}