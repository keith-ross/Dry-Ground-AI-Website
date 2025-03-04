// @ts-check
import pg from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get database connection string
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('ERROR: DATABASE_URL environment variable is not set!');
  console.error('Please make sure your .env file is properly configured.');
  process.exit(1);
}

async function fixDatabase() {
  console.log('===== Database Setup =====');
  const pool = new pg.Pool({
    connectionString: databaseUrl,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });

  try {
    console.log('🔍 Connecting to database...');
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connected successfully');
    console.log(`✅ Server time: ${result.rows[0].now}`);

    // Check if contact_messages table exists
    const tableExists = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'contact_messages'
      )
    `);

    if (tableExists.rows[0].exists) {
      console.log('✅ contact_messages table already exists');

      // Verify table schema
      console.log('Verifying table schema...');
      const columns = await pool.query(`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'contact_messages'
      `);

      console.log('Current table columns:');
      columns.rows.forEach(col => {
        console.log(`- ${col.column_name} (${col.data_type})`);
      });
    } else {
      console.log('🔧 Creating contact_messages table...');
      await pool.query(`
        CREATE TABLE contact_messages (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(100) NOT NULL,
          phone VARCHAR(20),
          message TEXT NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT NOW(),
          status VARCHAR(20) DEFAULT 'new'
        )
      `);
      console.log('✅ contact_messages table created successfully');
    }

    console.log('✅ Database setup completed successfully!');
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
    console.log('Database connection closed');
  }
}

// Run the fix
fixDatabase();