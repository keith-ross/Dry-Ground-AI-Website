import { Request, Response } from 'express';
import pool from '../lib/db';
import { ContactFormData } from './types';

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

    // Insert data into the database
    try {
      const queryText = `
        INSERT INTO contact_messages (name, email, phone, message)
        VALUES ($1, $2, $3, $4)
        RETURNING id;
      `;
      const values = [name, email, phone || '', message];

      console.log('Executing SQL query:', queryText);
      console.log('With values:', values);

      const result = await pool.query(queryText, values);

      console.log('Database insertion successful:', result.rows[0]);

      // Return success response
      return res.status(200).json({
        success: true,
        message: 'Contact form submitted successfully',
        id: result.rows[0]?.id
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      return res.status(500).json({
        success: false,
        error: 'Database error',
        details: dbError.message
      });
    }
  } catch (error) {
    console.error('Unhandled error in contact form submission:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error',
      details: error.message
    });
  }
};