
import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key from environment variable
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@drygroundai.com';

if (!SENDGRID_API_KEY) {
  console.error('SendGrid API key is missing! Please add SENDGRID_API_KEY to your Replit Secrets.');
} else {
  try {
    sgMail.setApiKey(SENDGRID_API_KEY);
    console.log('SendGrid client initialized successfully');
  } catch (error) {
    console.error('Error initializing SendGrid client:', error);
  }
}

/**
 * Send an email using SendGrid
 */
export async function sendEmail(options) {
  try {
    if (!SENDGRID_API_KEY) {
      throw new Error('SendGrid API key is missing');
    }

    const { to, subject, text, html } = options;
    
    const msg = {
      to,
      from: ADMIN_EMAIL,
      subject,
      text,
      html: html || text,
    };

    console.log(`Attempting to send email to ${to} with subject "${subject}"`);
    const [response] = await sgMail.send(msg);
    
    console.log('Email sent successfully:', {
      statusCode: response.statusCode,
      to,
      subject
    });
    
    return { 
      success: true, 
      statusCode: response.statusCode 
    };
  } catch (error) {
    console.error('Error sending email:', {
      message: error.message,
      response: error.response ? {
        body: error.response.body,
        statusCode: error.response.statusCode
      } : 'No response data'
    });
    
    return { 
      success: false, 
      error: error.message,
      details: error.response ? error.response.body : null
    };
  }
}

/**
 * Send confirmation email to the user who submitted the contact form
 */
export async function sendContactConfirmationEmail({ name, email }) {
  try {
    const text = `Hello ${name},\n\nThank you for reaching out to us. We have received your message and will get back to you as soon as possible.\n\nBest regards,\nThe Dry Ground AI Team`;
    const html = `<p>Hello ${name},</p><p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p><p>Best regards,<br>The Dry Ground AI Team</p>`;
    
    return await sendEmail({
      to: email,
      subject: 'Thank you for contacting Dry Ground AI',
      text,
      html
    });
  } catch (error) {
    console.error('Error in sendContactConfirmationEmail:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
}

/**
 * Send notification email to admin about a new contact form submission
 */
export async function sendAdminNotificationEmail({ name, email, company, message }) {
  try {
    const text = `New contact form submission:\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nMessage: ${message}`;
    const html = `<h3>New contact form submission</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Company:</strong> ${company || 'N/A'}</p><p><strong>Message:</strong> ${message}</p>`;
    
    return await sendEmail({
      to: ADMIN_EMAIL,
      subject: 'New Contact Form Submission',
      text,
      html
    });
  } catch (error) {
    console.error('Error in sendAdminNotificationEmail:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
}
