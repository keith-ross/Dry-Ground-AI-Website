
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

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://0a7dca1c-cfdc-4c3c-bfa6-7217f9fb242a-00-391hf8iljn7rk.janeway.replit.dev'],
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// API Routes
app.post('/api/contact', submitContactForm);

// Test endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
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
