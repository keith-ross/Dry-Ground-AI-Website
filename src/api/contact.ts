
import { Request, Response } from 'express';
import pool from '../lib/db';

export const submitContactForm = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
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
