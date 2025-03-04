// Email service using SendGrid
import sgMail from '@sendgrid/mail';

// Configure SendGrid if API key is available
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

/**
 * Sends an email using SendGrid
 * @param {Object} params - Email parameters
 * @param {string} params.name - Sender's name
 * @param {string} params.email - Sender's email
 * @param {string} params.message - Email message
 * @returns {Promise<Object>} - Result of the email operation
 */
export async function sendEmail({ name, email, message }) {
  // Check if SendGrid is configured
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('SENDGRID_API_KEY is not configured. Email sending is disabled.');
    return { success: false, error: 'Email service not configured' };
  }

  if (!process.env.FROM_EMAIL || !process.env.ADMIN_EMAIL) {
    console.warn('FROM_EMAIL or ADMIN_EMAIL is not configured.');
    return { success: false, error: 'Email configuration incomplete' };
  }

  try {
    // Prepare email data
    const msg = {
      to: process.env.ADMIN_EMAIL,
      from: process.env.FROM_EMAIL,
      subject: `Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<h3>Message:</h3>
<p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send email
    console.log('Sending email with data:', JSON.stringify(msg, null, 2));
    const response = await sgMail.send(msg);
    console.log('Email sent successfully', response[0].statusCode);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);

    // Detailed error logging
    if (error.response) {
      console.error('SendGrid error details:', error.response.body);
    }

    return { 
      success: false, 
      error: error.message || 'Failed to send email',
      details: error.toString()
    };
  }
}