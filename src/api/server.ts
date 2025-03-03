
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { storeContactSubmission } from '../lib/db';
import { sendConfirmationEmail, sendAdminNotificationEmail } from '../lib/emailService';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Name, email, and message are required' 
      });
    }
    
    // Store submission in database
    const dbResult = await storeContactSubmission(name, email, message);
    if (!dbResult.success) {
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to store contact submission' 
      });
    }
    
    // Send confirmation email to user
    const userEmailResult = await sendConfirmationEmail(name, email, message);
    
    // Send notification email to admin
    const adminEmailResult = await sendAdminNotificationEmail(name, email, message);
    
    // Return success response
    res.status(200).json({
      success: true,
      message: 'Contact form submission processed successfully',
      emailSent: userEmailResult.success && adminEmailResult.success
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to process contact form submission' 
    });
  }
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`API server running on port ${port}`);
});
