
import { Request, Response } from 'express';
import pool from '../lib/db';

export const submitContactForm = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: 'Invalid email format' });
    }
    
    // Insert data into the database
    const query = `
      INSERT INTO contact_messages (name, email, message)
      VALUES ($1, $2, $3)
      RETURNING id, created_at
    `;
    
    const result = await pool.query(query, [name, email, message]);
    
    return res.status(200).json({
      success: true,
      message: 'Message sent successfully',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to submit contact form'
    });
  }
};
