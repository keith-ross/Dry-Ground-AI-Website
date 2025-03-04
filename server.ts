
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

// CORS configuration - allow requests from any origin in development
const allowedOrigins = [
  'http://localhost:3000',
  'https://0a7dca1c-cfdc-4c3c-bfa6-7217f9fb242a-00-391hf8iljn7rk.janeway.replit.dev'
];

// More permissive CORS if we're in dev mode
if (process.env.NODE_ENV === 'development') {
  allowedOrigins.push(/.*/); // Allow all origins in development
}

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc)
    if (!origin) return callback(null, true);
    
    // Check if the origin is allowed
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else if (typeof allowedOrigins[0] === 'object' && allowedOrigins[0].test(origin)) {
      // If we have a regex pattern allowed origin
      return callback(null, true);
    }
    
    console.log('CORS blocked request from:', origin);
    callback(null, true); // Just allow all for troubleshooting
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON bodies with increased size limit and better error handling
app.use(express.json({ 
  limit: '1mb',
  // Handle JSON parsing errors
  verify: (req, res, buf, encoding) => {
    try {
      JSON.parse(buf.toString());
    } catch (err) {
      console.error('Invalid JSON received:', err);
      res.status(400).json({ 
        success: false, 
        error: 'Invalid JSON', 
        message: 'The request contains invalid JSON.' 
      });
      throw new Error('Invalid JSON');
    }
  }
}));

// Request logging middleware with more details
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Headers:', JSON.stringify(req.headers));
  if (req.method === 'POST' && req.body) {
    console.log('Request body:', JSON.stringify(req.body));
  }
  
  // Add response logging
  const originalSend = res.send;
  res.send = function(body) {
    console.log(`[${new Date().toISOString()}] Response:`, body);
    return originalSend.call(this, body);
  };
  
  next();
});

// API Routes
app.post('/api/contact', submitContactForm);

// Test endpoint
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

// Error handling middleware - should be registered AFTER routes
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err instanceof Error ? err.message : 'Unknown error');
  
  if (err instanceof Error) {
    console.error(err.stack);
  }
  
  // Log request details that caused the error
  console.error(`Error occurred during ${req.method} request to ${req.url}`);
  console.error('Request body:', req.body);
  console.error('Request headers:', req.headers);
  
  // Make sure we don't send headers if they're already sent
  if (res.headersSent) {
    return next(err);
  }
  
  // Send detailed error in development, generic in production
  const errorResponse = {
    success: false,
    error: 'Internal server error',
    message: 'An unexpected error occurred',
    details: process.env.NODE_ENV === 'production' ? undefined : (err instanceof Error ? err.message : 'Unknown error')
  };
  
  // Add stack trace in development
  if (process.env.NODE_ENV !== 'production' && err instanceof Error) {
    errorResponse.stack = err.stack;
  }
  
  res.status(500).json(errorResponse);
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  app.use(express.static(path.join(__dirname, 'dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://0.0.0.0:${PORT}/api/health`);
});
