import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables if not already loaded
dotenv.config();

if (!process.env.DATABASE_URL) {
  console.error('ERROR: DATABASE_URL environment variable is missing!');
  console.error('Make sure your .env file is properly configured.');
  process.exit(1); // Exit if DATABASE_URL is not set
}

// Initialize the pool with error handling
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Additional pool configuration if needed
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

// Add event listeners for connection issues
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

// Simple function to test database connection
export async function testDatabaseConnection() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT NOW() as now');
    return { 
      connected: true, 
      time: result.rows[0].now,
      message: 'Successfully connected to database'
    };
  } catch (error) {
    console.error('Database connection test failed:', error);
    return { 
      connected: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Failed to connect to database'
    };
  } finally {
    client.release();
  }
}

// Test the database connection on startup
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
    process.exit(1); // Exit if connection fails
  } else {
    console.log('Database connected successfully at:', res.rows[0].now);
  }
});

// Handle connection errors
pool.on('error', (err) => {
  console.error('Unexpected database error:', err);
});

// Helper function for making queries
export async function query(text: string, params: any[] = []) {
  try {
    const client = await pool.connect();
    try {
      const result = await client.query(text, params);
      return result;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

export { pool, testDatabaseConnection };