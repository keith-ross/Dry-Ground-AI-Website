import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
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

// Define contact form submission handler
async function submitContactForm(req, res) {
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
}

const app = express();
const PORT = process.env.PORT || 3001;
const WS_PORT = 3003;

// Create HTTP server
const server = createServer(app);

// WebSocket server for agent commands
const wss = new WebSocketServer({ port: WS_PORT, host: '0.0.0.0' });

// Store session connections
const sessionConnections = new Map<string, any>();

wss.on('connection', (ws, req) => {
  console.log('WebSocket connection established');
  
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString());
      if (data.type === 'register_session' && data.sessionId) {
        sessionConnections.set(data.sessionId, ws);
        console.log(`Session ${data.sessionId} registered for WebSocket`);
        ws.send(JSON.stringify({ type: 'session_registered', sessionId: data.sessionId }));
      }
    } catch (error) {
      console.error('Error processing WebSocket message:', error);
    }
  });
  
  ws.on('close', () => {
    // Remove connection from session map
    for (const [sessionId, connection] of sessionConnections.entries()) {
      if (connection === ws) {
        sessionConnections.delete(sessionId);
        console.log(`Session ${sessionId} disconnected`);
        break;
      }
    }
  });
});

console.log(`🔌 WebSocket server running on port ${WS_PORT}`);

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

// Agent interaction endpoints
app.post('/api/interact/:pageName/navigate', async (req, res) => {
  try {
    const { pageName } = req.params;
    const { sessionId, section } = req.body;
    
    console.log(`Navigation request: ${pageName} -> ${section} for session ${sessionId}`);
    
    if (!sessionId || !section) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing sessionId or section' 
      });
    }
    
    // Get WebSocket connection for this session
    const ws = sessionConnections.get(sessionId);
    
    if (!ws || ws.readyState !== 1) {
      return res.status(404).json({ 
        success: false, 
        error: 'Session not connected' 
      });
    }
    
    // Define valid sections for each page
    const validSections = {
      'home': ['hero', 'services', 'strategy', 'testimonials', 'contact'],
      'healthcare': ['hero', 'how-it-works', 'benefits', 'contact'],
      'property-management': ['hero', 'how-it-works', 'benefits', 'contact'],
      'home-services': ['hero', 'how-it-works', 'benefits', 'contact'],
      'ai-velocity': ['hero', 'what-is-full-stack', 'benefits', 'plan-tiers', 'contact']
    };
    
    const allowedSections = validSections[pageName] || [];
    
    if (!allowedSections.includes(section)) {
      return res.status(400).json({ 
        success: false, 
        error: `Invalid section "${section}" for page "${pageName}"`,
        validSections: allowedSections
      });
    }
    
    // Send navigation command via WebSocket
    ws.send(JSON.stringify({
      type: 'navigate',
      section: section,
      pageName: pageName
    }));
    
    res.json({ 
      success: true, 
      message: `Navigation to ${section} sent successfully` 
    });
    
  } catch (error) {
    console.error('Error in navigation endpoint:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
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
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔌 WebSocket server running on port ${WS_PORT}`);
  console.log(`📊 Health check: http://0.0.0.0:${PORT}/api/health`);
  console.log(`📑 API endpoints: http://0.0.0.0:${PORT}/api/contact`);
  console.log(`🤖 Agent interaction: http://0.0.0.0:${PORT}/api/interact/{page}/navigate`);
  console.log(`💻 Server address: 0.0.0.0:${PORT}`);
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