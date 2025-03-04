
// Database connection test script
require('dotenv').config();
const { Pool } = require('pg');

async function testDatabaseConnection() {
  console.log('===== Database Connection Test =====');
  
  if (!process.env.DATABASE_URL) {
    console.error('❌ ERROR: DATABASE_URL environment variable is not set!');
    console.error('Please check your .env file.');
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });

  try {
    console.log('🔍 Testing database connection...');
    
    // Test basic connection
    const result = await pool.query('SELECT NOW() as time');
    console.log('✅ Database connection successful!');
    console.log('✅ Server time:', result.rows[0].time);
    
    // Check if contact_messages table exists
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'contact_messages'
      );
    `);
    
    if (tableCheck.rows[0].exists) {
      console.log('✅ contact_messages table exists');
      
      // Test RLS permissions by attempting an insert
      try {
        const testInsert = await pool.query(`
          INSERT INTO contact_messages (name, email, message, created_at) 
          VALUES ('Test User', 'test@example.com', 'This is a test message', NOW())
          RETURNING id;
        `);
        console.log('✅ Successfully inserted test message with ID:', testInsert.rows[0].id);
        
        // Clean up test data
        await pool.query('DELETE FROM contact_messages WHERE email = $1', ['test@example.com']);
        console.log('✅ Test data cleaned up');
      } catch (insertErr) {
        console.error('❌ Error testing insert:', insertErr.message);
        console.log('This might indicate Row Level Security issues.');
      }
    } else {
      console.error('❌ contact_messages table does not exist!');
      console.log('You may need to run database migrations.');
    }
    
  } catch (err) {
    console.error('❌ Database connection failed:', err);
    process.exit(1);
  } finally {
    await pool.end();
    console.log('Database connection closed');
  }
}

testDatabaseConnection().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
});
