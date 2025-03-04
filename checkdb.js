
const { Pool } = require('pg');
require('dotenv').config();

// Function to check database connection and schema
async function checkDatabase() {
  console.log('===== Database Connection Check =====');
  
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL is not set in environment variables!');
    process.exit(1);
  }
  
  console.log('🔍 Attempting to connect using DATABASE_URL...');
  
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false
  });
  
  try {
    // Test basic connection
    const connResult = await pool.query('SELECT NOW()');
    console.log('✅ Database connected successfully');
    console.log(`✅ Server time: ${connResult.rows[0].now}`);
    
    // Check for contact_messages table
    try {
      const tableResult = await pool.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public'
          AND table_name = 'contact_messages'
        );
      `);
      
      const tableExists = tableResult.rows[0].exists;
      
      if (tableExists) {
        console.log('✅ contact_messages table exists');
        
        // Check table structure
        const columnsResult = await pool.query(`
          SELECT column_name, data_type 
          FROM information_schema.columns 
          WHERE table_schema = 'public' 
          AND table_name = 'contact_messages';
        `);
        
        console.log('📋 Table structure:');
        columnsResult.rows.forEach(col => {
          console.log(`   - ${col.column_name} (${col.data_type})`);
        });
      } else {
        console.log('❌ contact_messages table does not exist');
        
        // Offer to create the table
        console.log('🛠️ Creating contact_messages table...');
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
        console.log('✅ contact_messages table created successfully');
      }
    } catch (err) {
      console.error('❌ Error checking table schema:', err.message);
    }
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    console.error('Details:', err);
  } finally {
    await pool.end();
  }
}

// Run the check
checkDatabase().catch(console.error);
