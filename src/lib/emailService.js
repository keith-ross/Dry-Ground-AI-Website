// src/lib/emailService.js
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Configure SendGrid
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

/**
 * Send an email notification for a contact form submission
 * @param {Object} data The contact form data
 * @returns {Promise<Object>} Result of the email sending operation
 */
export async function sendEmail(data) {
  const { name, email, company, message } = data;

  // Check if SendGrid is configured
  if (!SENDGRID_API_KEY) {
    console.warn('SendGrid API key not configured. Email will not be sent.');
    return { 
      success: false, 
      error: 'Email service not configured' 
    };
  }

  const FROM_EMAIL = process.env.FROM_EMAIL;
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

  if (!FROM_EMAIL || !ADMIN_EMAIL) {
    console.warn('FROM_EMAIL or ADMIN_EMAIL not configured.');
    return { 
      success: false, 
      error: 'Email configuration incomplete' 
    };
  }

  // Prepare email content
  const emailContent = {
    to: ADMIN_EMAIL,
    from: FROM_EMAIL,
    subject: `New Contact Form Submission from ${name}`,
    text: `
Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}

Message:
${message}
    `,
    html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Company:</strong> ${company || 'Not provided'}</p>
<h3>Message:</h3>
<p>${message.replace(/\n/g, '<br>')}</p>
    `
  };

  try {
    console.log('Sending email via SendGrid...');
    const response = await sgMail.send(emailContent);
    console.log('Email sent successfully!', response[0].statusCode);
    return { 
      success: true,
      statusCode: response[0].statusCode 
    };
  } catch (error) {
    console.error('Error sending email:', error);

    // More detailed error report
    let errorDetails = 'Unknown error';
    if (error.response) {
      errorDetails = `${error.code || 'Error'}: ${error.message}`;

      if (error.response.body && error.response.body.errors) {
        errorDetails += ' - ' + error.response.body.errors.map(e => e.message).join(', ');
      }
    }

    return { 
      success: false, 
      error: 'Failed to send email',
      details: errorDetails
    };
  }
}