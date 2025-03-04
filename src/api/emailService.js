
// Server-side email service
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

// Configure environment variables - only runs on the server
dotenv.config();

// Configure SendGrid
const apiKey = process.env.SENDGRID_API_KEY;
if (apiKey) {
  sgMail.setApiKey(apiKey);
} else {
  console.error('SendGrid API key not found. Check your .env file');
}

// Function for server-side API to send emails
export const sendEmail = async (data) => {
  try {
    const { name, email, company, message } = data;

    // Check for environment variables
    if (!process.env.FROM_EMAIL || !process.env.ADMIN_EMAIL) {
      console.warn('Missing required environment variables: FROM_EMAIL or ADMIN_EMAIL');
      return { 
        success: false, 
        error: 'Email configuration is incomplete. Check server environment variables.'
      };
    }

    // Check if SendGrid is properly initialized
    if (!sgMail || typeof sgMail.send !== 'function') {
      console.error('SendGrid client is not properly initialized');
      return { 
        success: false, 
        error: 'Email service is not properly configured'
      };
    }

    const msg = {
      to: process.env.ADMIN_EMAIL,
      from: process.env.FROM_EMAIL,
      subject: `Contact Form: ${name} from ${company || 'N/A'}`,
      text: `From: ${name} (${email})\nCompany: ${company || 'N/A'}\n\nMessage:\n${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    const response = await sgMail.send(msg);
    return { success: true, response };
  } catch (error) {
    console.error('Email sending error:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to send email', 
      details: error.response?.body?.errors || error.toString()
    };
  }
};
