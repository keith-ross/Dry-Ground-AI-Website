import pg from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const { Pool } = pg;

async function setupDatabase() {
  console.log('===== Database Setup =====');

  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL is not set in environment variables!');
    process.exit(1);
  }

  console.log('🔍 Connecting to database...');

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false
  });

  try {
    // Test connection
    const connResult = await pool.query('SELECT NOW()');
    console.log('✅ Database connected successfully');
    console.log(`✅ Server time: ${connResult.rows[0].now}`);

    // Check if contact_messages table exists
    const tableResult = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'contact_messages'
      );
    `);

    const tableExists = tableResult.rows[0].exists;

    if (tableExists) {
      console.log('✅ contact_messages table already exists');
    } else {
      console.log('⚠️ contact_messages table does not exist, creating it...');

      // Create the contact_messages table
      await pool.query(`
        CREATE TABLE contact_messages (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(100) NOT NULL,
          phone VARCHAR(20),
          message TEXT NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
      `);

      console.log('✅ contact_messages table created successfully');
    }

    // Apply Row Level Security
    console.log('🔒 Setting up Row Level Security...');

    await pool.query('ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;');

    // Drop existing policies to avoid conflicts
    await pool.query('DROP POLICY IF EXISTS "public_insert_policy" ON contact_messages;');
    await pool.query('DROP POLICY IF EXISTS "auth_select_policy" ON contact_messages;');

    // Create new policies
    await pool.query(`
      CREATE POLICY "public_insert_policy" 
      ON contact_messages
      FOR INSERT
      TO public
      WITH CHECK (true);
    `);

    await pool.query(`
      CREATE POLICY "auth_select_policy"
      ON contact_messages
      FOR SELECT
      TO authenticated
      USING (true);
    `);

    console.log('✅ Row Level Security policies configured');
    console.log('✅ Database setup completed successfully');

  } catch (error) {
    console.error('❌ Database setup failed:', error);
  } finally {
    await pool.end();
    console.log('Database connection closed');
  }
}

// Run the setup
setupDatabase().catch(console.error);