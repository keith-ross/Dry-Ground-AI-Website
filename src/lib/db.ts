import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables if not already loaded
dotenv.config();

if (!process.env.DATABASE_URL) {
  console.error('ERROR: DATABASE_URL environment variable is missing!');
  console.error('Make sure your .env file is properly configured.');
  process.exit(1); // Exit if DATABASE_URL is not set
}

// Create a singleton pool instance for database connections
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  // Add connection pool settings
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection can't be established
});

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

export default { pool };