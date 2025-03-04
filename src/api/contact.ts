import { Request, Response } from 'express';
import pool from '../lib/db';

export async function submitContactForm(req: Request, res: Response) {
  console.log('Contact form submission received:', req.body);

  try {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      console.log('Missing required fields');
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    // Insert into database
    const result = await pool.query(
      `INSERT INTO contact_messages (name, email, phone, message, created_at) 
       VALUES ($1, $2, $3, $4, NOW()) RETURNING id`,
      [name, email, phone, message]
    );

    console.log('Contact message saved successfully, ID:', result.rows[0].id);

    return res.status(200).json({ 
      success: true, 
      messageId: result.rows[0].id 
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);

    // Send detailed error in development
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to submit contact form',
      details: process.env.NODE_ENV === 'production' ? 'Server error' : error.message
    });
  }
}