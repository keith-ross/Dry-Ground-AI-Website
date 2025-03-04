
import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get database connection string
const connectionString = process.env.DATABASE_URL;

// Log database connection info (without exposing credentials)
console.log('Initializing database connection...');
if (!connectionString) {
  console.error('⚠️ DATABASE_URL is not set in environment variables');
  console.error('Make sure you have created a .env file with the DATABASE_URL variable');
} else {
  // Log only the host, not the full connection string for security
  try {
    const url = new URL(connectionString);
    console.log(`Database host: ${url.hostname}`);
    console.log(`Database name: ${url.pathname.replace('/', '')}`);
  } catch (e) {
    console.error('Invalid DATABASE_URL format:', e.message);
  }
}

// Create a new pool
const pool = new Pool({
  connectionString,
  // Adjust pool settings for better reliability
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 10000, // How long to wait before timing out when connecting a new client
  ssl: process.env.NODE_ENV === 'production' ? 
    { rejectUnauthorized: false } : 
    false
});

// Handle pool errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

// Test database connection
pool.query('SELECT NOW()')
  .then(res => {
    console.log('✅ Database connected successfully! Server time:', res.rows[0].now);
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err.message);
    console.error('Please check your DATABASE_URL and make sure your database is running');
  });

export default pool;

// Helper function for queries with better error handling
export const query = async (text, params) => {
  const client = await pool.connect();
  try {
    const start = Date.now();
    const res = await client.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Query error', { text, error });
    throw error;
  } finally {
    client.release();
  }
};
