
import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();

async function setupDatabase() {
  console.log('=== Setting up database ===');
  
  if (!process.env.DATABASE_URL) {
    console.error('❌ ERROR: DATABASE_URL environment variable is not set!');
    process.exit(1);
  }
  
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });
  
  try {
    console.log('🔍 Testing database connection...');
    const client = await pool.connect();
    console.log('✅ Connected to database successfully!');
    
    console.log('🔍 Checking if contact_messages table exists...');
    const tableExists = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'contact_messages'
      )
    `);
    
    if (tableExists.rows[0].exists) {
      console.log('✅ contact_messages table already exists');
    } else {
      console.log('🔧 Creating contact_messages table...');
      await client.query(`
        CREATE TABLE contact_messages (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(50),
          message TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('✅ contact_messages table created!');
    }
    
    client.release();
    console.log('✅ Database setup complete!');
  } catch (error) {
    console.error('❌ Database error:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

setupDatabase();
