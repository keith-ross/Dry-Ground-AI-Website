// src/lib/emailService.js
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

// Load environment variables
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

    if (!process.env.FROM_EMAIL || !process.env.ADMIN_EMAIL) {
      throw new Error('Missing required environment variables: FROM_EMAIL or ADMIN_EMAIL');
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

// Function for client-side to send email via API endpoint
export const sendContactEmail = async (data) => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Server error occurred');
    }

    return result;
  } catch (error) {
    console.error('Form submission exception: ', error);
    return { 
      success: false, 
      error: error.message || 'Failed to submit form',
      details: error.toString()
    };
  }
};