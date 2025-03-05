
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

// Load environment variables
dotenv.config();

// Verify critical environment variables
if (!process.env.DATABASE_URL) {
  console.error('ERROR: DATABASE_URL environment variable is not set!');
  console.error('Please make sure your .env file is properly configured.');
  process.exit(1);
}

// Setup database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test database connection
(async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Database connected successfully');
    client.release();
  } catch (err) {
    console.error('❌ Database connection error:', err.message);
  }
})();

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

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    console.log('Received contact form submission:', req.body);
    
    const { name, email, phone, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields',
        message: 'Name, email and message are required'
      });
    }
    
    const result = await pool.query(
      'INSERT INTO contact_messages (name, email, phone, message) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, email, phone, message]
    );
    
    console.log('✅ Message saved to database with ID:', result.rows[0].id);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Your message has been received. Thank you for contacting us!' 
    });
  } catch (err) {
    console.error('❌ Error processing contact form:', err);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      message: err.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Database health check
app.get('/api/db-health', async (req, res) => {
  try {
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
app.use((err, req, res, next) => {
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

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  import('path').then(path => {
    import('url').then(({ fileURLToPath }) => {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      
      console.log('🌐 Serving static files from:', path.join(__dirname, 'dist'));
      app.use(express.static(path.join(__dirname, 'dist')));
      
      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist', 'index.html'));
      });
    });
  });
}

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://0.0.0.0:${PORT}/api/health`);
  console.log(`📑 API endpoints: http://0.0.0.0:${PORT}/api/contact`);
  console.log(`💻 Server address: 0.0.0.0:${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  
  // Log DATABASE_URL presence (not the actual value for security)
  console.log(`💾 Database URL configured: ${process.env.DATABASE_URL ? 'Yes' : 'No'}`);
});

// Handle process termination
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});
