import { Pool } from 'pg';

// Create a singleton database connection pool
let _pool: Pool | null = null;

// Get the database connection pool, creating it if necessary
export const pool = (() => {
  if (!_pool) {
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL environment variable is not set');
      throw new Error('Database configuration missing: DATABASE_URL environment variable is not set');
    }

    console.log('Creating database connection pool');

    try {
      _pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        max: 20, // maximum number of clients
        idleTimeoutMillis: 30000, // how long a client is allowed to remain idle
        connectionTimeoutMillis: 5000, // how long to wait for a connection
      });

      // Add error handler to the pool
      _pool.on('error', (err) => {
        console.error('Unexpected error on idle client', err);
      });

      // Test the connection
      testDatabaseConnection(_pool).catch(err => {
        console.error('Failed to connect to database:', err);
      });

    } catch (error) {
      console.error('Error creating database pool:', error);
      throw error;
    }
  }

  return _pool;
})();

// Test the database connection
export async function testDatabaseConnection(testPool = pool) {
  try {
    const client = await testPool.connect();
    const result = await client.query('SELECT NOW()');
    console.log('Database connection test successful:', result.rows[0].now);
    client.release();
    return true;
  } catch (error) {
    console.error('Database connection test failed:', error);
    throw error;
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  if (_pool) {
    console.log('Closing database pool');
    await _pool.end();
  }
  process.exit(0);
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

export {  testDatabaseConnection };