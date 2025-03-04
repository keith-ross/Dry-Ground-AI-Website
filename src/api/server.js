
const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables from .env file
const envPath = path.join(__dirname, '../../.env');
if (fs.existsSync(envPath)) {
  console.log(`Loading environment variables from ${envPath}`);
  dotenv.config({ path: envPath });
} else {
  console.log('No .env file found, using environment variables directly');
  dotenv.config();
}

// Set up SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('SendGrid API key configured');
} else {
  console.warn('WARNING: SendGrid API key not found - email functionality will not work');
}

// Create Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Configure middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'API server is running' });
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  console.log('Received contact form submission:', req.body);
  
  // Validate request body
  const { name, email, company, message } = req.body;
  
  if (!name || !email || !message) {
    console.error('Missing required fields in contact form submission');
    return res.status(400).json({
      success: false,
      message: 'Missing required fields. Please provide name, email, and message.'
    });
  }
  
  try {
    // Verify SendGrid API key is configured
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error('SendGrid API key not configured');
    }
    
    // Send notification email to admin
    console.log('Attempting to send admin notification email...');
    const adminEmailResult = await sendAdminNotificationEmail({ name, email, company, message });
    
    // Send confirmation email to user
    console.log('Attempting to send user confirmation email...');
    const userConfirmationResult = await sendContactConfirmationEmail({ name, email });
    
    if (!adminEmailResult.success) {
      console.error('Failed to send admin notification:', adminEmailResult.error);
      return res.status(500).json({
        success: false,
        message: 'Failed to process your request due to email service issues',
        error: adminEmailResult.error
      });
    }
    
    if (!userConfirmationResult.success) {
      console.error('Failed to send user confirmation:', userConfirmationResult.error);
      // We'll continue since the admin notification was sent successfully
      console.log('Continuing since admin notification was sent successfully');
    }
    
    // Return success
    console.log('Contact form submission processed successfully');
    return res.status(200).json({ 
      success: true, 
      message: 'Thank you for your message! We will get back to you soon.' 
    });
  } catch (error) {
    console.error('Error processing contact form submission:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error processing your request',
      error: error.message || 'Unknown error'
    });
  }
});

// Start the API server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running on http://0.0.0.0:${PORT}`);
});

/**
 * Send a confirmation email to the contact form submitter
 */
async function sendContactConfirmationEmail({ name, email }) {
  if (!process.env.SENDGRID_API_KEY) {
    return { 
      success: false, 
      error: 'SendGrid API key not configured' 
    };
  }
  
  try {
    const msg = {
      to: email,
      from: {
        email: 'info@dryground.ai',
        name: 'Dry Ground AI'
      },
      subject: 'Thank you for contacting Dry Ground AI',
      text: `Hi ${name},\n\nThank you for reaching out to us. We've received your message and will get back to you as soon as possible.\n\nBest regards,\nThe Dry Ground AI Team`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank you for contacting us!</h2>
          <p>Hi ${name},</p>
          <p>Thank you for reaching out to Dry Ground AI. We've received your message and will get back to you as soon as possible.</p>
          <p>Best regards,<br>The Dry Ground AI Team</p>
        </div>
      `
    };
    
    console.log('Sending confirmation email to:', email);
    await sgMail.send(msg);
    console.log('Confirmation email sent successfully');
    
    return { success: true };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to send confirmation email' 
    };
  }
}

/**
 * Send a notification email to the admin
 */
async function sendAdminNotificationEmail({ name, email, company, message }) {
  if (!process.env.SENDGRID_API_KEY) {
    return { 
      success: false, 
      error: 'SendGrid API key not configured' 
    };
  }
  
  try {
    const msg = {
      to: 'info@dryground.ai',
      from: {
        email: 'info@dryground.ai',
        name: 'Dry Ground AI Website'
      },
      subject: 'New Contact Form Submission',
      text: `
        New contact form submission:
        
        Name: ${name}
        Email: ${email}
        Company: ${company || 'N/A'}
        
        Message:
        ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Company:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${company || 'N/A'}</td>
            </tr>
          </table>
          <div style="margin-top: 20px;">
            <h3 style="color: #333;">Message:</h3>
            <p style="white-space: pre-line;">${message}</p>
          </div>
        </div>
      `
    };
    
    console.log('Sending admin notification email to:', msg.to);
    await sgMail.send(msg);
    console.log('Admin notification email sent successfully');
    
    return { success: true };
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to send admin notification email' 
    };
  }
}
