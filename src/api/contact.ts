
import { Request, Response } from 'express';
import pool from '../lib/db';
import { ContactFormData } from './types';

export const submitContactForm = async (req: Request, res: Response) => {
  // Log the start of this request processing
  console.log('====== CONTACT FORM SUBMISSION ======');
  console.log('Received contact form submission request');
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Body:', JSON.stringify(req.body, null, 2));
  
  try {
    // Validate request body exists
    if (!req.body) {
      console.error('Missing request body');
      return res.status(400).json({ 
        success: false, 
        error: 'Missing request body' 
      });
    }

    const { name, email, phone, message } = req.body as ContactFormData;

    // Validate required fields
    if (!name || !email || !message) {
      console.error('Validation failed: Missing required fields');
      return res.status(400).json({ 
        success: false, 
        error: 'Name, email and message are required' 
      });
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error('Validation failed: Invalid email format');
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid email format' 
      });
    }

    console.log('Form data validated successfully, proceeding to database insertion');
    
    try {
      // Check if database connection is available
      if (!pool) {
        throw new Error('Database connection not available');
      }
      
      // Use parameterized query to prevent SQL injection
      const sql = `
        INSERT INTO contact_messages(name, email, phone, message)
        VALUES($1, $2, $3, $4)
        RETURNING id
      `;
      
      const values = [name, email, phone || null, message];
      console.log('Executing SQL:', sql);
      console.log('With values:', values);
      
      const result = await pool.query(sql, values);
      console.log('Database insertion result:', result);
      
      if (!result || !result.rows || result.rows.length === 0) {
        throw new Error('Database insertion did not return an ID');
      }
      
      console.log('Contact message inserted successfully with ID:', result.rows[0]?.id);
      
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
      details: error.message || 'Unknown error'
    });
  }
};
