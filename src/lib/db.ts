
import pg from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get database connection string
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('ERROR: DATABASE_URL environment variable is not set!');
  console.error('Please make sure your .env file is properly configured.');
  // Don't throw here - let the application handle it gracefully
}

// Create a database pool
const pool = new pg.Pool({
  connectionString: databaseUrl,
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

// Export the pool as db
export const db = {
  query: (text, params) => {
    console.log('Executing query:', text);
    return pool.query(text, params);
  },
  getClient: async () => {
    const client = await pool.connect();
    const release = client.release;
    
    // Override the release method to keep track of released clients
    client.release = () => {
      release.apply(client);
      console.log('Client returned to pool');
    };
    
    return client;
  },
  end: async () => {
    await pool.end();
    console.log('Database connection closed');
  }
};
