
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Configure SendGrid
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@example.com';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';

// Initialize SendGrid if API key is available
if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
  console.log('SendGrid API key configured in emailService');
} else {
  console.warn('SendGrid API key not configured in emailService');
}

/**
 * Send a notification email to the admin about a new contact form submission
 */
export async function sendContactNotification({ name, email, company, message }) {
  if (!SENDGRID_API_KEY) {
    throw new Error('SendGrid API key not configured');
  }

  // Prepare email to admin
  const emailContent = {
    to: ADMIN_EMAIL,
    from: FROM_EMAIL,
    subject: `New contact form submission from ${name}`,
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
    console.log('Sending notification email to admin...');
    await sgMail.send(emailContent);
    console.log('Email sent successfully');
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Log detailed error if available
    if (error.response) {
      console.error('SendGrid API error details:', error.response.body);
    }
    
    throw error;
  }
}

/**
 * Send a confirmation email to the user who submitted the contact form
 */
export async function sendUserConfirmation({ name, email }) {
  if (!SENDGRID_API_KEY) {
    throw new Error('SendGrid API key not configured');
  }

  // Prepare email to user
  const emailContent = {
    to: email,
    from: FROM_EMAIL,
    subject: 'Thank you for contacting us',
    text: `
      Hello ${name},
      
      Thank you for contacting us. We have received your message and will get back to you as soon as possible.
      
      Best regards,
      The Team
    `,
    html: `
      <h2>Thank You for Contacting Us</h2>
      <p>Hello ${name},</p>
      <p>Thank you for contacting us. We have received your message and will get back to you as soon as possible.</p>
      <p>Best regards,<br>The Team</p>
    `
  };

  try {
    console.log('Sending confirmation email to user...');
    await sgMail.send(emailContent);
    console.log('Confirmation email sent successfully');
    return { success: true };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    
    // Log detailed error if available
    if (error.response) {
      console.error('SendGrid API error details:', error.response.body);
    }
    
    throw error;
  }
}

export default {
  sendContactNotification,
  sendUserConfirmation
};
