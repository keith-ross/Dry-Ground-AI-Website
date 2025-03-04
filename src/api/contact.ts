
import { Request, Response } from 'express';
import { query } from '../lib/db';

/**
 * Handles form submission from the contact form
 */
export async function submitContactForm(req: Request, res: Response) {
  try {
    const { name, email, phone, message } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
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
    
    // Insert the message into the database
    const result = await query(
      'INSERT INTO contact_messages (name, email, phone, message, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING id',
      [name, email, phone || null, message]
    );
    
    // Return success response
    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received.',
      data: {
        id: result.rows[0].id,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error',
      message: 'There was an error processing your request. Please try again later.'
    });
  }
}
