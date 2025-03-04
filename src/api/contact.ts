
import { Request, Response } from 'express';
import { ContactFormData } from './types';
import { query } from '../lib/db';

/**
 * Handles form submission from the contact form
 */
export async function submitContactForm(req: Request, res: Response) {
  const { name, email, phone, message } = req.body as ContactFormData;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields'
    });
  }

  try {
    // Insert the contact message into the database
    const result = await query(
      'INSERT INTO contact_messages (name, email, phone, message) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, email, phone || null, message]
    );

    // Return success response
    return res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      id: result.rows[0].id
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
}
