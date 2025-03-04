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
  // Add more connection options
  max: 20, // Maximum number of clients the pool should contain
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 5000, // How long to wait for a connection to become available
});

// Pool error handling
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
});

// Test query function with better error handling
export const query = async (text, params) => {
  const client = await pool.connect();
  try {
    console.log('Executing SQL:', text);
    console.log('With params:', params);
    const start = Date.now();
    const result = await client.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query in', duration, 'ms. Rows:', result.rowCount);
    return result;
  } catch (err) {
    console.error('Database query error:', err);
    // Rethrow with additional info
    throw new Error(`Database error: ${err.message}`);
  } finally {
    // Always release the client back to the pool
    client.release();
  }
};


// Simple connection test
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
  } else {
    console.log('✅ Database connected successfully at:', res.rows[0].now);
  }
});

export default pool;