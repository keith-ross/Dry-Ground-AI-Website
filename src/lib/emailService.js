// src/lib/emailService.js
import sgMail from '@sendgrid/mail';

// Initialize the SendGrid client with the API key
export function initSendGrid() {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    console.error('ERROR: SendGrid API key is not set. Email functionality will not work.');
    return false;
  }

  try {
    sgMail.setApiKey(apiKey);
    console.log('SendGrid initialized successfully');
    return true;
  } catch (error) {
    console.error('Failed to initialize SendGrid:', error);
    return false;
  }
}

// Send contact form email
export async function sendContactEmail(formData) {
  if (!process.env.SENDGRID_API_KEY) {
    return { 
      success: false, 
      error: 'SendGrid API key is not configured' 
    };
  }

  if (!process.env.FROM_EMAIL || !process.env.ADMIN_EMAIL) {
    return { 
      success: false, 
      error: 'Email addresses not properly configured' 
    };
  }

  const { name, email, company, message } = formData;

  try {
    const emailContent = {
      to: process.env.ADMIN_EMAIL,
      from: process.env.FROM_EMAIL,
      subject: `Contact Form: ${name}`,
      text: `
Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}
Message: ${message}
      `,
      html: `
<h3>New Contact Form Submission</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Company:</strong> ${company || 'Not provided'}</p>
<p><strong>Message:</strong> ${message}</p>
      `
    };

    await sgMail.send(emailContent);

    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);

    if (error.response) {
      console.error('SendGrid API error:', error.response.body);
    }

    return { 
      success: false, 
      error: 'Failed to send email. Please try again later.' 
    };
  }
}

// Check email service configuration
export function checkEmailConfig() {
  return {
    apiKeyExists: Boolean(process.env.SENDGRID_API_KEY),
    fromEmail: process.env.FROM_EMAIL || 'Not configured',
    adminEmail: process.env.ADMIN_EMAIL || 'Not configured',
    success: Boolean(process.env.SENDGRID_API_KEY && process.env.FROM_EMAIL && process.env.ADMIN_EMAIL)
  };
}