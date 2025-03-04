import { Request, Response } from 'express';
import pool from '../lib/db';

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

    // Insert data into the database only (email functionality disabled)
    const query = `
      INSERT INTO contact_messages (name, email, phone, message)
      VALUES ($1, $2, $3, $4)
      RETURNING id, created_at
    `;

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