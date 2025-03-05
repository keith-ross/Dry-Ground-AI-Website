
// Script to verify database connectivity in deployment environment
import pg from 'pg';
import dotenv from 'dotenv';
const { Pool } = pg;

dotenv.config();

// Log important environment variables (without showing sensitive values)
console.log('=== DEPLOYMENT VERIFICATION ===');
console.log('NODE_ENV:', process.env.NODE_ENV || 'development');
console.log('PORT:', process.env.PORT || '3001');
console.log('DATABASE_URL configured:', !!process.env.DATABASE_URL);

if (!process.env.DATABASE_URL) {
  console.error('❌ ERROR: DATABASE_URL is not set!');
  console.error('Please add DATABASE_URL to your Deployment secrets');
  process.exit(1);
}

// Test database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function testDatabaseConnection() {
  try {
    const client = await pool.connect();
    console.log('✅ Successfully connected to the database');
    
    // Check if contact_messages table exists
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'contact_messages'
      );
    `);
    
    if (tableCheck.rows[0].exists) {
      console.log('✅ contact_messages table exists');
    } else {
      console.error('❌ contact_messages table does not exist!');
      console.log('Creating contact_messages table...');
      
      await client.query(`
        CREATE TABLE IF NOT EXISTS contact_messages (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(50),
          message TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('✅ contact_messages table created');
    }
    
    client.release();
  } catch (err) {
    console.error('❌ Error connecting to database:', err.message);
    if (err.message.includes('does not exist')) {
      console.error('Database might not exist or credentials are incorrect');
    }
    if (err.message.includes('password authentication failed')) {
      console.error('Database password authentication failed');
    }
    process.exit(1);
  } finally {
    await pool.end();
  }
}

testDatabaseConnection().catch(console.error);
