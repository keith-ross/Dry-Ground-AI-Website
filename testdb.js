
const { Pool } = require('pg');
require('dotenv').config();

async function testDatabase() {
  console.log('===== Database Connection Test =====');
  
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL is not set in environment variables!');
    process.exit(1);
  }
  
  console.log('DATABASE_URL is set. Attempting connection...');
  
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false
  });
  
  try {
    // Test connection
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connected successfully at:', result.rows[0].now);
    
    // Check if table exists
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'contact_messages'
      );
    `);
    
    if (tableCheck.rows[0].exists) {
      console.log('✅ contact_messages table exists');
      
      // Count records
      const countResult = await pool.query('SELECT COUNT(*) FROM contact_messages');
      console.log(`ℹ️ Current record count: ${countResult.rows[0].count}`);
      
      // Show table structure
      console.log('Table structure:');
      const columns = await pool.query(`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_name = 'contact_messages'
        ORDER BY ordinal_position;
      `);
      
      console.table(columns.rows);
    } else {
      console.error('❌ contact_messages table does not exist!');
    }
  } catch (err) {
    console.error('❌ Database error:', err);
  } finally {
    await pool.end();
  }
}

testDatabase().catch(console.error);
