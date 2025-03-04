
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the database path - go up to project root then to data directory
const dbPath = join(dirname(dirname(__dirname)), 'data', 'contact_submissions.db');

// Database connection
let db = null;

// Initialize the database
export async function initDb() {
  if (db) return db;
  
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });
  
  // Create tables if they don't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  console.log('Database initialized successfully');
  return db;
}

// Save a contact form submission
export async function saveContactSubmission({ name, email, company, message }) {
  if (!db) await initDb();
  
  return await db.run(
    'INSERT INTO contact_submissions (name, email, company, message) VALUES (?, ?, ?, ?)',
    [name, email, company || '', message]
  );
}

// Get all contact submissions
export async function getAllContactSubmissions() {
  if (!db) await initDb();
  
  return await db.all('SELECT * FROM contact_submissions ORDER BY created_at DESC');
}
