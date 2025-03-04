
import { Request, Response } from 'express';
import { ContactFormData } from '../api/types';
import { db } from '../lib/db';

export async function submitContactForm(req: Request, res: Response) {
  try {
    console.log('Received contact form submission:', req.body);
    
    // Validate request body
    const { name, email, phone, message } = req.body as ContactFormData;
    
    if (!name || !email || !message) {
      console.log('Missing required fields in form submission');
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        message: 'Name, email and message are required'
      });
    }
    
    // Store form data in database
    try {
      const result = await db.query(
        'INSERT INTO contact_messages (name, email, phone, message) VALUES ($1, $2, $3, $4) RETURNING id',
        [name, email, phone || null, message]
      );
      
      const insertedId = result.rows[0]?.id;
      console.log(`Successfully inserted contact message with ID: ${insertedId}`);
      
      return res.status(200).json({
        success: true,
        message: 'Contact form submitted successfully',
        data: { id: insertedId }
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      return res.status(500).json({
        success: false,
        error: 'Database error',
        message: 'Failed to store contact message'
      });
    }
  } catch (error) {
    console.error('Error in submitContactForm:', error);
    return res.status(500).json({
      success: false, 
      error: 'Server error',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
}
