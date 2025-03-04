import { Request, Response } from 'express';
import { pool } from '../lib/db';
import type { ContactFormData } from './types';

/**
 * Handle contact form submission
 */
export async function submitContactForm(req: Request, res: Response) {
  try {
    console.log('Received contact form submission:', req.body);

    // Basic validation
    const { name, email, message, phone } = req.body as ContactFormData;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message'
      });
    }

    // Insert into database
    const result = await pool.query(
      `INSERT INTO contact_submissions (name, email, phone, message) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, created_at`,
      [name, email, phone || null, message]
    );

    console.log('Saved contact submission to database:', result.rows[0]);

    // Respond to client
    return res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been received.',
      data: {
        id: result.rows[0].id,
        timestamp: result.rows[0].created_at
      }
    });

  } catch (error) {
    console.error('Error processing contact form submission:', error);

    return res.status(500).json({
      success: false,
      message: 'There was a problem processing your request. Please try again later.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}