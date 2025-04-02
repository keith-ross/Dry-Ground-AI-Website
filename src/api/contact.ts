
import { Request, Response } from 'express';
import { pool } from '../lib/db';

export async function submitContactForm(req: Request, res: Response) {
  console.log('Contact form submission received:', req.body);
  
  try {
    // Validate request body
    const { name, email, phone, message } = req.body;
    
    if (!name || !email || !phone || !message) {
      console.error('Missing required fields in contact form submission');
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
    }

    // Validate phone format (minimum 10 digits)
    const phoneRegex = /^\+?[\d\s-()]{10,}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid phone number (minimum 10 digits)'
      });
    }
    
    // Insert into database
    const result = await pool.query(
      `INSERT INTO contact_messages (name, email, phone, message) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id`,
      [name, email, phone || null, message]
    );
    
    console.log('Contact form submission saved with ID:', result.rows[0].id);
    
    // Return success response
    return res.status(200).json({ 
      success: true, 
      message: 'Your message has been submitted successfully',
      id: result.rows[0].id
    });
    
  } catch (error) {
    console.error('Error saving contact form submission:', error);
    return res.status(500).json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to save your message'
    });
  }
}
