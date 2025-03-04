import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create a connection pool to our PostgreSQL database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20, // maximum number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 2000, // how long to wait when connecting a new client
});

// Log connection events for debugging
pool.on('connect', () => {
  console.log('Database connection established');
});

pool.on('error', (err) => {
  console.error('Unexpected database error:', err.message);
});


/**
 * Execute a query against the PostgreSQL database
 * @param text SQL query text
 * @param params Query parameters
 * @returns Query result
 */
export async function query(text: string, params?: any[]) {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log(`Executed query: ${text} (${duration}ms)`);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Test the database connection on module import
pool.query('SELECT NOW()')
  .then(() => console.log('✅ Database connected successfully'))
  .catch(err => console.error('❌ Database connection failed:', err));

export const db = {
    query,
    end: async () => {
      await pool.end();
      console.log('Database connection closed');
    }
  };