import { Request, Response } from 'express';
import pool from '../lib/db';
import { ContactFormData } from './types'; // Import the type

export const submitContactForm = async (req: Request, res: Response) => {
  try {
    // Log incoming request for debugging
    console.log('Received contact form submission:', req.body);

    const { name, email, phone, message } = req.body as ContactFormData;

    // Validate input
    if (!name || !email || !message) {
      console.log('Validation failed: Missing required fields');
      return res.status(400).json({ success: false, error: 'Name, email and message are required' });
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Validation failed: Invalid email format');
      return res.status(400).json({ success: false, error: 'Invalid email format' });
    }

    // Test the database connection first
    try {
      await pool.query('SELECT NOW()');
      console.log('Database connection successful');
    } catch (dbConnError) {
      console.error('Database connection error:', dbConnError);
      return res.status(500).json({ 
        success: false, 
        error: 'Database connection failed', 
        details: dbConnError.message 
      });
    }

    // Check if the table exists
    try {
      await pool.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public'
          AND table_name = 'contact_messages'
        );
      `);
    } catch (tableCheckError) {
      console.error('Error checking table existence:', tableCheckError);
      // Try to create the table if it doesn't exist
      try {
        await pool.query(`
          CREATE TABLE IF NOT EXISTS contact_messages (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(50),
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
        `);
        console.log('Created contact_messages table');
      } catch (createTableError) {
        console.error('Failed to create table:', createTableError);
        return res.status(500).json({ 
          success: false, 
          error: 'Failed to create database table', 
          details: createTableError.message 
        });
      }
    }

    // Insert data into the database only (email functionality disabled)
    const query = `
      INSERT INTO contact_messages (name, email, phone, message)
      VALUES ($1, $2, $3, $4)
      RETURNING id, created_at
    `;

    console.log('Executing query with params:', [name, email, phone, message]);
    const result = await pool.query(query, [name, email, phone, message]);

    // Log successful database insertion
    console.log('Contact message saved to database:', result.rows[0]);

    return res.status(200).json({
      success: true,
      message: 'Contact information saved successfully',
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Error saving contact information:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to save contact information'
    });
  }
};