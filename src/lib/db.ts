
import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Create data directory if it doesn't exist
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'contact_submissions.db');

// Initialize database
async function initializeDb() {
  try {
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
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

// Save contact submission to database
export async function saveContactSubmission(name, email, message) {
  let db;
  
  try {
    db = await initializeDb();
    
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
  } catch (error) {
    console.error('Error saving contact submission:', error);
    throw error;
  } finally {
    if (db) await db.close();
  }
}

// Get all contact submissions
export async function getAllContactSubmissions() {
  let db;
  
  try {
    db = await initializeDb();
    return await db.all('SELECT * FROM contact_submissions ORDER BY created_at DESC');
  } catch (error) {
    console.error('Error getting contact submissions:', error);
    throw error;
  } finally {
    if (db) await db.close();
  }
}
