
import { Request, Response } from 'express';
import { pool } from '../lib/db';
import type { ContactFormData } from './types';

import { Request, Response } from 'express';
import { ContactFormData } from './types';
import { pool, testDatabaseConnection } from '../lib/db';

/**
 * Handles form submission from the contact form
 */
export async function submitContactForm(req: Request, res: Response) {
  console.log('Contact form handler called');
  console.log('Request body:', req.body);
  
  if (!req.body || Object.keys(req.body).length === 0) {
    console.error('Empty request body received');
    return res.status(400).json({
      success: false,
      error: 'Bad request',
      message: 'Request body is empty or malformed'
    });
  }
  
  try {
    // Test database connection first
    const dbTest = await testDatabaseConnection();
    if (!dbTest.connected) {
      console.error('Database connection failed:', dbTest.error);
      return res.status(500).json({
        success: false,
        error: 'Database connection error',
        message: 'Unable to connect to the database. Please try again later.'
      });
    }
    
    const { name, email, phone, message } = req.body as ContactFormData;
    
    // Enhanced logging
    console.log('Form data received:', { name, email, phone, message });
    
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
    
    console.log('Attempting to insert contact message into database...');
    
    // Query to check if the contact_messages table exists
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'contact_messages'
      );
    `);
    
    if (!tableCheck.rows[0].exists) {
      console.error('contact_messages table does not exist');
      
      // Create the table if it doesn't exist
      await pool.query(`
        CREATE TABLE IF NOT EXISTS contact_messages (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone TEXT,
          message TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `);
      console.log('Created contact_messages table');
    }
    
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
    
    // Send a properly formatted error response with detailed information
    return res.status(500).json({
      success: false,
      error: 'Server error',
      message: 'There was an error processing your request. Please try again later.',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
