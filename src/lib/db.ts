
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import fs from 'fs';

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Define the database path
const dbPath = path.join(dataDir, 'contact_submissions.db');

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
  
  console.log('Database initialized successfully at', dbPath);
  return db;
}

// Save a contact form submission
export async function saveContactSubmission({ name, email, company, message }) {
  try {
    if (!db) await initDb();
    
    const result = await db.run(
      'INSERT INTO contact_submissions (name, email, company, message) VALUES (?, ?, ?, ?)',
      [name, email, company || '', message]
    );
    
    return { id: result.lastID };
  } catch (error) {
    console.error('Error saving contact submission:', error);
    throw error;
  }
}

// Get all contact submissions
export async function getAllContactSubmissions() {
  try {
    if (!db) await initDb();
    
    return await db.all('SELECT * FROM contact_submissions ORDER BY created_at DESC');
  } catch (error) {
    console.error('Error getting contact submissions:', error);
    throw error;
  }
}
