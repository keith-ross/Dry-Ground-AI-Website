import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create a database connection
const dbPromise = open({
  filename: path.join(process.cwd(), 'data', 'contacts.db'),
  driver: sqlite3.Database
});

// Initialize database
export async function initializeDatabase() {
  const db = await dbPromise;

  // Create contacts table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('Database initialized');
}

// Add a new contact to the database
export async function addContact({ name, email, message }) {
  const db = await dbPromise;

  try {
    // Ensure the database is initialized
    await initializeDatabase();

    // Insert the contact
    const result = await db.run(
      'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );

    return { id: result.lastID };
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to save contact to database');
  }
}

// Get all contacts
export async function getAllContacts() {
  const db = await dbPromise;

  try {
    return await db.all('SELECT * FROM contacts ORDER BY created_at DESC');
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to retrieve contacts from database');
  }
}