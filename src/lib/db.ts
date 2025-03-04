
import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get database connection string
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('ERROR: DATABASE_URL environment variable is not set!');
  console.error('Please make sure your .env file is properly configured.');
  process.exit(1); // Exit if DATABASE_URL is not set
}

console.log('Creating database connection pool...');

// Create a database pool
const pool = new Pool({
  connectionString: databaseUrl,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Log database connection status
pool.on('connect', () => {
  console.log('Connected to the database');
});

pool.on('error', (err) => {
  console.error('Unexpected database error:', err.message);
});

/**
 * Execute a query against the database
 */
export async function query(text: string, params?: any[]) {
  console.log('Executing query:', text);
  try {
    return await pool.query(text, params);
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Test database connection on module load
pool.query('SELECT NOW()')
  .then(() => console.log('✅ Database connection verified'))
  .catch(err => console.error('❌ Database connection failed:', err));

export { pool };
