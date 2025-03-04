// src/lib/emailService.js
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize SendGrid with API key
const initSendGrid = () => {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    console.warn('SENDGRID_API_KEY is not set in environment variables');
    return false;
  }

  try {
    sgMail.setApiKey(apiKey);
    return true;
  } catch (error) {
    console.error('Failed to initialize SendGrid:', error);
    return false;
  }
};

/**
 * Send contact form email
 * @param {Object} data - Contact form data
 * @returns {Promise<Object>} - Result object
 */
export const sendContactEmail = async (data) => {
  try {
    // Validate SendGrid is initialized
    const isInitialized = initSendGrid();
    if (!isInitialized) {
      return { 
        success: false, 
        error: 'Email service not properly configured' 
      };
    }

    // Validate required data
    if (!data.name || !data.email || !data.message) {
      return { 
        success: false, 
        error: 'Missing required fields' 
      };
    }

    // Get email settings from environment variables
    const fromEmail = process.env.FROM_EMAIL || 'noreply@example.com';
    const toEmail = process.env.ADMIN_EMAIL || 'admin@example.com';

    // Create email content
    const emailContent = {
      to: toEmail,
      from: fromEmail,
      subject: `New Contact Form Submission from ${data.name}`,
      text: `
Name: ${data.name}
Email: ${data.email}
Company: ${data.company || 'Not provided'}

Message:
${data.message}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${data.name}</p>
<p><strong>Email:</strong> ${data.email}</p>
<p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
<h3>Message:</h3>
<p>${data.message.replace(/\n/g, '<br>')}</p>
      `
    };

    console.log('Attempting to send email with data:', {
      to: emailContent.to,
      from: emailContent.from,
      subject: emailContent.subject
    });

    // Send email
    const result = await sgMail.send(emailContent);

    console.log('Email sent successfully:', result);
    return { 
      success: true,
      message: 'Your message has been sent successfully' 
    };
  } catch (error) {
    console.error('Error sending email:', error);

    // Extract meaningful error message
    let errorMessage = 'Failed to send email';
    if (error.response) {
      console.error(error.response.body);
      errorMessage = error.response.body.errors?.[0]?.message || errorMessage;
    }

    return { 
      success: false, 
      error: errorMessage 
    };
  }
};

// For testing purposes
export const testEmailService = () => {
  const isInitialized = initSendGrid();
  return {
    success: isInitialized,
    apiKeyExists: !!process.env.SENDGRID_API_KEY,
    fromEmail: process.env.FROM_EMAIL || 'not set',
    adminEmail: process.env.ADMIN_EMAIL || 'not set'
  };
};