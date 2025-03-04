import { Request, Response } from 'express';
import { pool } from '../lib/db';
import type { ContactFormData } from './types';

export async function submitContactForm(req: Request, res: Response) {
  console.log('Contact form submission received:', req.body);

  try {
    // Test database connection first
    const dbTest = await pool.query('SELECT NOW()'); //Simplified connection test
    if (!dbTest.rows || dbTest.rows.length === 0) {
      console.error('Database connection failed');
      return res.status(500).json({
        success: false,
        error: 'Database connection error',
        message: 'Unable to connect to the database. Please try again later.'
      });
    }

    // Validate request body
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      console.error('Missing required fields');
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        message: 'Name, email, and message are required'
      });
    }

    // Query to check if the contact_messages table exists
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'contact_messages'
      );
    `);

    if (!tableCheck.rows[0].exists) {
      console.error('contact_messages table does not exist');

      // Create the table if it doesn't exist
      await pool.query(`
        CREATE TABLE IF NOT EXISTS contact_messages (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone TEXT,
          message TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `);
      console.log('Created contact_messages table');
    }

    // Insert into database
    const query = `
      INSERT INTO contact_messages (name, email, phone, message)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `;

    const values = [name, email, phone || '', message];
    console.log('Executing query with values:', values);

    const result = await pool.query(query, values);

    console.log('Query executed successfully, result:', result.rows[0]);

    return res.status(200).json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      id: result.rows[0].id
    });
  } catch (error) {
    // Log the full error for debugging
    console.error('Error submitting contact form:', error);

    // Detailed error response
    return res.status(500).json({
      success: false,
      error: 'Database error',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
}