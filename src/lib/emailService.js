
// Email Service
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize SendGrid with API key
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

// Configuration validation
let serviceReady = false;
let configErrors = [];

if (!SENDGRID_API_KEY) {
  configErrors.push('SENDGRID_API_KEY is missing');
} else {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

if (!FROM_EMAIL) {
  configErrors.push('FROM_EMAIL is missing');
}

if (!ADMIN_EMAIL) {
  configErrors.push('ADMIN_EMAIL is missing');
}

serviceReady = configErrors.length === 0;

if (!serviceReady) {
  console.warn('⚠️ Email service not properly configured:', configErrors.join(', '));
  console.warn('Email functionality will not work correctly!');
}

/**
 * Sends an email notification for contact form submissions
 * @param {Object} contactData - Contact form data
 * @returns {Promise<Object>} Result of the operation
 */
async function sendContactEmail(contactData) {
  // If service is not configured properly, return error
  if (!serviceReady) {
    console.error('Email service not properly configured. Cannot send emails.');
    return {
      success: false,
      error: 'Email service not configured properly',
      details: configErrors.join(', ')
    };
  }

  try {
    const { name, email, company, message } = contactData;
    
    console.log(`Preparing to send contact email from ${name} <${email}>`);
    
    // Prepare email to admin
    const adminMsg = {
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
    
    // Prepare confirmation email to the contact
    const confirmationMsg = {
      to: email,
      from: FROM_EMAIL,
      subject: 'Thank you for contacting us',
      text: `
        Hello ${name},
        
        Thank you for reaching out to us. We have received your message and will get back to you shortly.
        
        Best regards,
        The Anchored Up Innovation Team
      `,
      html: `
        <h2>Thank you for contacting us</h2>
        <p>Hello ${name},</p>
        <p>Thank you for reaching out to us. We have received your message and will get back to you shortly.</p>
        <p>Best regards,<br>The Anchored Up Innovation Team</p>
      `
    };
    
    console.log('Sending emails...');
    
    // Send both emails
    const results = await Promise.allSettled([
      sgMail.send(adminMsg),
      sgMail.send(confirmationMsg)
    ]);
    
    // Check results
    const adminResult = results[0];
    const confirmationResult = results[1];
    
    if (adminResult.status === 'fulfilled' && confirmationResult.status === 'fulfilled') {
      console.log('All emails sent successfully');
      return { success: true };
    } 
    
    // If either email failed, log and return the error
    const errors = [];
    
    if (adminResult.status === 'rejected') {
      console.error('Failed to send admin notification:', adminResult.reason);
      errors.push(`Admin email error: ${adminResult.reason.message || JSON.stringify(adminResult.reason)}`);
    }
    
    if (confirmationResult.status === 'rejected') {
      console.error('Failed to send confirmation email:', confirmationResult.reason);
      errors.push(`Confirmation email error: ${confirmationResult.reason.message || JSON.stringify(confirmationResult.reason)}`);
    }
    
    return {
      success: false,
      error: 'Email sending failed',
      details: errors.join('; ')
    };
    
  } catch (error) {
    console.error('Email service error:', error);
    return {
      success: false,
      error: error.message || 'Unknown error sending email',
      details: error
    };
  }
}

// Export the service
export default {
  sendContactEmail,
  isConfigured: () => serviceReady,
  getConfigErrors: () => [...configErrors]
};
