import { Pool } from 'pg';

// Log database connection info (without sensitive parts)
const dbUrl = process.env.DATABASE_URL || '';
const maskedUrl = dbUrl.replace(/(postgres:\/\/)([^:]+):([^@]+)@/, '$1****:****@');
console.log('Connecting to database:', maskedUrl);

// Create a new pool with better error handling
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Set reasonable pool limits and timeouts
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// Add error listener to the pool
pool.on('error', (err) => {
  console.error('Unexpected database pool error:', err);
});

// Verify connection on startup
pool.query('SELECT NOW()')
  .then(res => console.log('✅ Database connected successfully at:', res.rows[0].now))
  .catch(err => console.error('❌ Database connection failed:', err.message));

export default pool;