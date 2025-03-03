
import express from 'express';
import cors from 'cors';
import { sendEmail } from '../lib/emailService';
import { saveContactSubmission } from '../lib/db';

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please provide name, email, and message' 
      });
    }

    // Save to database
    const savedSubmission = await saveContactSubmission(name, email, message);

    // Send confirmation email to user
    const userEmailResult = await sendEmail(
      email,
      'Thank you for contacting Dry Ground AI',
      `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Thank you for reaching out!</h2>
        <p>Hello ${name},</p>
        <p>We've received your message and will get back to you as soon as possible.</p>
        <p>For your reference, here's a copy of your message:</p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p>${message}</p>
        </div>
        <p>Best regards,</p>
        <p>The Dry Ground AI Team</p>
      </div>
      `
    );

    // Send notification email to admin
    const adminEmail = process.env.ADMIN_EMAIL || 'info@drygroundai.com';
    
    const adminEmailResult = await sendEmail(
      adminEmail,
      'New Contact Form Submission',
      `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p>${message}</p>
        </div>
      </div>
      `
    );

    return res.status(200).json({ 
      success: true, 
      message: 'Contact form submission processed successfully',
      submission: savedSubmission
    });
  } catch (error) {
    console.error('Error processing contact form submission:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'An error occurred while processing your submission' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
