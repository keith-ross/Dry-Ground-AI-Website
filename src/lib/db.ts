
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import fs from 'fs';
import path from 'path';

// Ensure database directory exists
const dbDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'contact_submissions.db');

// Initialize the database connection
export const getDbConnection = async () => {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });
  
  // Create the contact_submissions table if it doesn't exist
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
};

// Function to store a new contact submission
export const storeContactSubmission = async (name: string, email: string, message: string) => {
  const db = await getDbConnection();
  
  try {
    const result = await db.run(
      'INSERT INTO contact_submissions (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );
    
    return { success: true, id: result.lastID };
  } catch (error) {
    console.error('Error storing contact submission:', error);
    return { success: false, error };
  } finally {
    await db.close();
  }
};

// Function to get all contact submissions
export const getAllContactSubmissions = async () => {
  const db = await getDbConnection();
  
  try {
    return await db.all('SELECT * FROM contact_submissions ORDER BY created_at DESC');
  } catch (error) {
    console.error('Error retrieving contact submissions:', error);
    return [];
  } finally {
    await db.close();
  }
};
