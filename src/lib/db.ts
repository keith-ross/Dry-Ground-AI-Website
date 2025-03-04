
import { Pool } from 'pg';

// Ensure DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is not set!');
  console.error('Please make sure your .env file exists and contains DATABASE_URL');
  // Continue but log the error - don't exit to prevent build failures
}

// Create database connection pool with better error handling
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Only enable SSL in production environments
  ssl: process.env.NODE_ENV === 'production' 
    ? { rejectUnauthorized: false } 
    : false,
  // Connection timeout
  connectionTimeoutMillis: 10000,
  // Set a reasonable pool size
  max: 20
});

// Log pool events for debugging
pool.on('connect', () => {
  console.log('New client connected to database');
});

pool.on('error', (err) => {
  console.error('Unexpected database pool error:', err);
});

// Export a function that performs the query and handles errors consistently
export const query = async (text, params) => {
  try {
    const start = Date.now();
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    
    console.log('Executed query', { 
      text: text.substring(0, 60) + (text.length > 60 ? '...' : ''), 
      duration, 
      rows: result.rowCount 
    });
    
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    // Add context to the error for better debugging
    error.query = text;
    error.params = params;
    throw error;
  }
};

// Test the database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
  } else {
    console.log('✅ Database connected successfully at:', res.rows[0].now);
  }
});

export default pool;
