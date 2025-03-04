
import pg from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function setupDatabase() {
  console.log('===== Database Setup =====');
  
  // Get database connection string
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    console.error('❌ ERROR: DATABASE_URL environment variable is not set!');
    console.error('Please make sure your .env file is properly configured.');
    process.exit(1);
  }
  
  console.log('🔍 Connecting to database...');
  
  // Create a new client
  const client = new pg.Client({
    connectionString: databaseUrl,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });
  
  try {
    // Connect to the database
    await client.connect();
    console.log('✅ Database connected successfully');
    
    // Test the connection
    const timeResult = await client.query('SELECT NOW() as time');
    console.log(`✅ Server time: ${timeResult.rows[0].time}`);
    
    // Check if contact_messages table exists
    const tableExists = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'contact_messages'
      )
    `);
    
    // If the table doesn't exist, create it
    if (!tableExists.rows[0].exists) {
      console.log('📝 Creating contact_messages table...');
      
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
      
      console.log('✅ contact_messages table created successfully');
    } else {
      console.log('✅ contact_messages table already exists');
    }
    
    // Add security policy for RLS (Row Level Security) if needed
    try {
      console.log('🔒 Setting up Row Level Security...');
      
      // Create contact_messages RLS policy
      await client.query(`
        ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
      `);
      
      // Create policy to allow authenticated users to select
      await client.query(`
        DO $$ 
        BEGIN
          -- Check if the role exists
          IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'service_role') THEN
            CREATE ROLE service_role;
          END IF;
        END $$;
        
        DROP POLICY IF EXISTS "Allow service role select" ON contact_messages;
        CREATE POLICY "Allow service role select" ON contact_messages 
          FOR SELECT USING (true);
      `);
      
      console.log('✅ Row Level Security configured successfully');
    } catch (error) {
      console.error('❌ Error setting up RLS:', error.message);
    }
    
    console.log('✅ Database setup completed successfully!');
  } catch (error) {
    console.error('❌ Database setup failed:', error);
  } finally {
    // Close the database connection
    await client.end();
    console.log('Database connection closed');
  }
}

// Run the setup
setupDatabase();
