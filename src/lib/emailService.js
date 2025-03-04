
// src/lib/emailService.js
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize SendGrid with API key
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || 'your_sender_email@example.com';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'your_recipient_email@example.com';

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
  console.log('Email service: SendGrid API key configured');
} else {
  console.warn('Email service: SendGrid API key not configured');
}

/**
 * Send a contact form submission via email
 * @param {Object} formData - Contact form data
 * @returns {Promise<Object>} - Result of the operation
 */
export async function sendContactForm(formData) {
  if (!SENDGRID_API_KEY) {
    console.error('SendGrid API key not configured');
    return {
      success: false,
      error: 'Email service not configured properly'
    };
  }

  if (!FROM_EMAIL || !ADMIN_EMAIL) {
    console.error('FROM_EMAIL or ADMIN_EMAIL not configured');
    return {
      success: false,
      error: 'Email service not configured properly (missing sender or recipient)'
    };
  }

  // Create email message
  const { name, email, company, message } = formData;
  
  const msg = {
    to: ADMIN_EMAIL,
    from: FROM_EMAIL,
    subject: `Contact Form Submission from ${name}`,
    text: `
Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}

Message:
${message}
    `,
    html: `
<h3>Contact Form Submission</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Company:</strong> ${company || 'Not provided'}</p>
<h4>Message:</h4>
<p>${message.replace(/\n/g, '<br>')}</p>
    `
  };

  console.log('Sending email with data:', {
    to: ADMIN_EMAIL,
    from: FROM_EMAIL,
    subject: `Contact Form Submission from ${name}`,
    // Omit content for brevity
  });

  try {
    const response = await sgMail.send(msg);
    console.log('Email sent successfully:', response[0].statusCode);
    
    // Return success response
    return { 
      success: true,
      details: response[0]
    };
  } catch (error) {
    console.error('Form submission exception: ', error);
    
    // Handle error responses
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('SendGrid API error:', error.response.body);
      return { 
        success: false, 
        error: 'Email service error: ' + (error.response.body?.errors?.[0]?.message || 'Unknown error'), 
        details: error.response.body 
      };
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from SendGrid:', error.request);
      return { 
        success: false, 
        error: 'No response from email service. Please try again later.' 
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request setup error:', error.message);
      return { 
        success: false, 
        error: error.message || 'Unknown error sending email' 
      };
    }
  }
}

// Check email service configuration
export function checkEmailConfig() {
  return {
    apiKeyExists: Boolean(SENDGRID_API_KEY),
    apiKeyValid: Boolean(SENDGRID_API_KEY?.startsWith('SG.')),
    fromEmail: FROM_EMAIL || 'Not configured',
    adminEmail: ADMIN_EMAIL || 'Not configured',
    success: Boolean(SENDGRID_API_KEY && FROM_EMAIL && ADMIN_EMAIL)
  };
}
