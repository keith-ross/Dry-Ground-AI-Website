
import { Request, Response } from 'express';
import { pool } from '../lib/db';
import type { ContactFormData } from './types';

/**
 * Handles form submission from the contact form
 */
export async function submitContactForm(req: Request, res: Response) {
  console.log('Contact form handler started with body:', req.body);
  
  try {
    const { name, email, phone, message } = req.body as ContactFormData;
    
    // Basic validation
    if (!name || !email || !message) {
      console.log('Missing required fields:', { name, email, message });
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        message: 'Please provide name, email, and message'
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format',
        message: 'Please provide a valid email address'
      });
    }
    
    console.log('Inserting contact message into database...');
    
    // Insert the message into the database
    const result = await pool.query(
      'INSERT INTO contact_messages (name, email, phone, message, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING id',
      [name, email, phone || null, message]
    );
    
    const insertId = result.rows[0]?.id;
    console.log('Contact message saved successfully with ID:', insertId);
    
    // Return success response
    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received.',
      data: {
        id: insertId,
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('Error submitting contact form:', error);
    
    // Send a properly formatted error response
    return res.status(500).json({
      success: false,
      error: 'Server error',
      message: 'There was an error processing your request. Please try again later.'
    });
  }
}
