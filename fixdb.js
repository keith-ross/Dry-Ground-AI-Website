
const { Pool } = require('pg');
require('dotenv').config();

// Create database connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function runDiagnostics() {
  console.log('Running database diagnostics...');
  console.log(`DATABASE_URL length: ${process.env.DATABASE_URL ? process.env.DATABASE_URL.length : 0}`);
  
  try {
    console.log('Testing connection...');
    const result = await pool.query('SELECT NOW()');
    console.log('Connection successful:', result.rows[0].now);
    
    console.log('Checking for contact_messages table...');
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'contact_messages'
      );
    `);
    
    if (tableCheck.rows[0].exists) {
      console.log('Table exists, checking structure...');
      const tableInfo = await pool.query(`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = 'contact_messages';
      `);
      console.log('Table structure:', tableInfo.rows);
    } else {
      console.log('Table does not exist, creating it...');
      await pool.query(`
        CREATE TABLE IF NOT EXISTS contact_messages (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(50),
          message TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log('Table created successfully.');
    }
    
    console.log('All diagnostics passed!');
  } catch (error) {
    console.error('Error during diagnostics:', error);
  } finally {
    await pool.end();
  }
}

runDiagnostics();
