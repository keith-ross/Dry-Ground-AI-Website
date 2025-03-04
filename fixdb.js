
const { Pool } = require('pg');
require('dotenv').config();

async function fixDatabase() {
  console.log('===== Database Schema Fix =====');
  
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL is not set in environment variables!');
    process.exit(1);
  }
  
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false
  });
  
  try {
    // Test connection
    await pool.query('SELECT NOW()');
    console.log('✅ Database connected successfully');
    
    // Create contact_messages table if it doesn't exist
    console.log('Creating/updating contact_messages table...');
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
    
    console.log('✅ Table schema verified/updated');
    
    // Count records
    const countResult = await pool.query('SELECT COUNT(*) FROM contact_messages');
    console.log(`ℹ️ Current record count: ${countResult.rows[0].count}`);
    
    console.log('✅ Database schema fix completed successfully');
  } catch (err) {
    console.error('❌ Error fixing database schema:', err);
  } finally {
    await pool.end();
  }
}

fixDatabase().catch(console.error);
