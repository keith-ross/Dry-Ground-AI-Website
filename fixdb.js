
const { Client } = require('pg');
require('dotenv').config();

async function fixDatabase() {
  console.log('🔍 Checking database configuration...');
  
  if (!process.env.DATABASE_URL) {
    console.error('❌ ERROR: DATABASE_URL not found in environment variables');
    console.error('Please create a .env file with your DATABASE_URL');
    process.exit(1);
  }
  
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? 
      { rejectUnauthorized: false } : 
      false
  });

  try {
    console.log('📊 Connecting to database...');
    await client.connect();
    console.log('✅ Connected to database successfully!');
    
    console.log('📋 Checking if contact_messages table exists...');
    const tableCheckResult = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'contact_messages'
      );
    `);
    
    const tableExists = tableCheckResult.rows[0].exists;
    
    if (!tableExists) {
      console.log('⚠️ contact_messages table does not exist, creating it...');
      await client.query(`
        CREATE TABLE contact_messages (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          name text NOT NULL,
          email text NOT NULL,
          phone text,
          message text NOT NULL,
          created_at timestamptz DEFAULT now()
        );
      `);
      console.log('✅ contact_messages table created!');
      
      console.log('🔒 Enabling Row Level Security...');
      await client.query(`ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;`);
      
      console.log('🔑 Creating RLS policies...');
      await client.query(`
        CREATE POLICY "public_insert_policy" 
        ON contact_messages
        FOR INSERT
        TO public
        WITH CHECK (true);
      `);
      
      await client.query(`
        CREATE POLICY "auth_select_policy"
        ON contact_messages
        FOR SELECT
        TO authenticated
        USING (true);
      `);
      
      console.log('✅ RLS policies created!');
    } else {
      console.log('✅ contact_messages table exists!');
      
      // Check if phone column exists
      console.log('📋 Checking if phone column exists...');
      const phoneColumnResult = await client.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.columns 
          WHERE table_schema = 'public'
          AND table_name = 'contact_messages'
          AND column_name = 'phone'
        );
      `);
      
      const phoneColumnExists = phoneColumnResult.rows[0].exists;
      
      if (!phoneColumnExists) {
        console.log('⚠️ phone column does not exist, adding it...');
        await client.query(`ALTER TABLE contact_messages ADD COLUMN phone text;`);
        console.log('✅ phone column added!');
      } else {
        console.log('✅ phone column exists!');
      }
      
      // Verify RLS is enabled and policies exist
      console.log('📋 Checking RLS settings...');
      
      const rlsResult = await client.query(`
        SELECT relrowsecurity FROM pg_class WHERE relname = 'contact_messages';
      `);
      
      if (!rlsResult.rows[0] || !rlsResult.rows[0].relrowsecurity) {
        console.log('⚠️ RLS is not enabled, enabling it...');
        await client.query(`ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;`);
        console.log('✅ RLS enabled!');
      } else {
        console.log('✅ RLS is enabled!');
      }
      
      // Check for policies
      const policiesResult = await client.query(`
        SELECT polname FROM pg_policy WHERE polrelid = 'contact_messages'::regclass;
      `);
      
      if (policiesResult.rows.length === 0) {
        console.log('⚠️ No RLS policies found, creating them...');
        
        await client.query(`
          CREATE POLICY "public_insert_policy" 
          ON contact_messages
          FOR INSERT
          TO public
          WITH CHECK (true);
        `);
        
        await client.query(`
          CREATE POLICY "auth_select_policy"
          ON contact_messages
          FOR SELECT
          TO authenticated
          USING (true);
        `);
        
        console.log('✅ RLS policies created!');
      } else {
        console.log('✅ Found RLS policies:', policiesResult.rows.map(row => row.polname).join(', '));
      }
    }
    
    console.log('🧪 Testing database insertion...');
    await client.query(`
      INSERT INTO contact_messages(name, email, phone, message)
      VALUES('Test User', 'test@example.com', '123-456-7890', 'This is a test message')
      RETURNING id;
    `);
    console.log('✅ Test insertion successful!');
    
    console.log('🧹 Cleaning up test data...');
    await client.query(`DELETE FROM contact_messages WHERE email = 'test@example.com';`);
    console.log('✅ Test data cleaned up!');
    
    console.log('✅ Database is properly configured and working!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
  } finally {
    await client.end();
    console.log('📊 Database connection closed');
  }
}

fixDatabase();
