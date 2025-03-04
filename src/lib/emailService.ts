
import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@drygroundai.com';

if (!SENDGRID_API_KEY) {
  console.error('WARNING: SendGrid API key is missing in environment variables. Emails will not be sent.');
} else {
  sgMail.setApiKey(SENDGRID_API_KEY);
  console.log('SendGrid client initialized');
}

export async function sendContactConfirmationEmail({ name, email }) {
  try {
    if (!SENDGRID_API_KEY) {
      return { 
        success: false, 
        message: 'SendGrid API key not configured',
        error: new Error('SendGrid API key missing') 
      };
    }

    console.log(`Sending confirmation email to ${email}`);
    
    const msg = {
      to: email,
      from: ADMIN_EMAIL,
      subject: 'Thank you for contacting Dry Ground AI',
      text: `Hello ${name},\n\nThank you for reaching out to us. We have received your message and will get back to you as soon as possible.\n\nBest regards,\nThe Dry Ground AI Team`,
      html: `<p>Hello ${name},</p><p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p><p>Best regards,<br>The Dry Ground AI Team</p>`,
    };

    const result = await sgMail.send(msg);
    console.log('Confirmation email sent successfully');
    return { success: true, result };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    
    // Extract useful error information
    const errorInfo = {
      message: error.message,
      code: error.code,
      response: error.response ? {
        body: error.response.body,
        statusCode: error.response.statusCode
      } : null
    };
    
    return { 
      success: false, 
      message: error.message || 'Failed to send email',
      error: errorInfo
    };
  }
}

export async function sendAdminNotificationEmail({ name, email, company, message }) {
  try {
    if (!SENDGRID_API_KEY) {
      return { 
        success: false, 
        message: 'SendGrid API key not configured',
        error: new Error('SendGrid API key missing')
      };
    }

    console.log(`Sending admin notification email to ${ADMIN_EMAIL}`);
    
    const msg = {
      to: ADMIN_EMAIL,
      from: ADMIN_EMAIL,
      subject: 'New Contact Form Submission',
      text: `New contact form submission:\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nMessage: ${message}`,
      html: `<h3>New contact form submission</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Company:</strong> ${company || 'N/A'}</p><p><strong>Message:</strong> ${message}</p>`,
    };

    const result = await sgMail.send(msg);
    console.log('Admin notification email sent successfully');
    return { success: true, result };
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    
    // Extract useful error information
    const errorInfo = {
      message: error.message,
      code: error.code,
      response: error.response ? {
        body: error.response.body,
        statusCode: error.response.statusCode
      } : null
    };
    
    return { 
      success: false, 
      message: error.message || 'Failed to send admin notification',
      error: errorInfo
    };
  }
}
