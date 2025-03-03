
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { promises as fs } from 'fs';
import path from 'path';

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
fs.mkdir(dataDir, { recursive: true }).catch(console.error);

const dbPath = path.join(dataDir, 'contact_submissions.db');

// Initialize database
async function initializeDb() {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  // Create contact_submissions table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return db;
}

// Save contact submission to database
export async function saveContactSubmission(name, email, message) {
  const db = await initializeDb();
  
  try {
    const result = await db.run(
      'INSERT INTO contact_submissions (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );
    
    return {
      id: result.lastID,
      name,
      email,
      message,
      created_at: new Date().toISOString()
    };
  } finally {
    await db.close();
  }
}

// Get all contact submissions
export async function getAllContactSubmissions() {
  const db = await initializeDb();
  
  try {
    return await db.all('SELECT * FROM contact_submissions ORDER BY created_at DESC');
  } finally {
    await db.close();
  }
}

// Get a single contact submission by ID
export async function getContactSubmissionById(id) {
  const db = await initializeDb();
  
  try {
    return await db.get('SELECT * FROM contact_submissions WHERE id = ?', [id]);
  } finally {
    await db.close();
  }
}
