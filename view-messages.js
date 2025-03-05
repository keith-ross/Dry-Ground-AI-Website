
import pg from 'pg';
import dotenv from 'dotenv';
const { Pool } = pg;

dotenv.config();

// Get database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function viewMessages() {
  try {
    const client = await pool.connect();
    try {
      console.log('Fetching contact messages...');
      const result = await client.query('SELECT * FROM contact_messages ORDER BY created_at DESC');
      
      if (result.rows.length === 0) {
        console.log('No messages found in the database.');
      } else {
        console.log(`Found ${result.rows.length} messages:`);
        result.rows.forEach((row, i) => {
          console.log(`\n--- Message ${i+1} ---`);
          console.log(`ID: ${row.id}`);
          console.log(`Name: ${row.name}`);
          console.log(`Email: ${row.email}`);
          console.log(`Phone: ${row.phone || 'Not provided'}`);
          console.log(`Message: ${row.message}`);
          console.log(`Date: ${row.created_at}`);
        });
      }
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('Error connecting to database:', err);
  } finally {
    await pool.end();
  }
}

viewMessages().catch(console.error);
