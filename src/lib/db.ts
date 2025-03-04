import { Pool } from 'pg';

// Create database connection pool with more detailed configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? 
    { rejectUnauthorized: false } : 
    false,
  // Add connection timeout and retry logic
  connectionTimeoutMillis: 5000,
  max: 20,
  idleTimeoutMillis: 30000,
  retryDelay: 1000,
});

// Log pool events for debugging
pool.on('connect', () => {
  console.log('✅ New client connected to PostgreSQL');
});

pool.on('error', (err) => {
  console.error('⚠️ Unexpected error on idle PostgreSQL client', err);
});

// Test the database connection
(async () => {
  try {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT NOW()');
      console.log('✅ Database connected successfully at:', result.rows[0].now);
      console.log('✅ Database URL parsed correctly, connection established');
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    console.error('❌ Connection details:', {
      // Print a sanitized version of the connection string (hide credentials)
      connectionString: process.env.DATABASE_URL ? 
        process.env.DATABASE_URL.replace(/:[^:]*@/, ':***@') : 
        'Not provided'
    });
  }
})();

export default pool;