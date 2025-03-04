
import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key from environment variable
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@drygroundai.com';

// Debug logging for environment variables
console.log('EmailService initialization:');
console.log('- SENDGRID_API_KEY exists:', !!SENDGRID_API_KEY);
console.log('- ADMIN_EMAIL:', ADMIN_EMAIL);

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
  console.log('SendGrid API key set successfully');
} else {
  console.error('⚠️ SendGrid API key is missing! Please add it to your Replit Secrets.');
}

/**
 * Send confirmation email to the user who submitted the contact form
 */
export async function sendContactConfirmationEmail({ name, email }) {
  try {
    if (!SENDGRID_API_KEY) {
      console.warn('Skipping email send: SendGrid API key not configured');
      return { 
        success: false, 
        message: 'Email service not configured - missing API key',
        error: new Error('SendGrid API key not found')
      };
    }

    console.log(`Attempting to send confirmation email to ${email}`);
    
    const msg = {
      to: email,
      from: ADMIN_EMAIL,
      subject: 'Thank you for contacting Dry Ground AI',
      text: `Hello ${name},\n\nThank you for reaching out to us. We have received your message and will get back to you as soon as possible.\n\nBest regards,\nThe Dry Ground AI Team`,
      html: `<p>Hello ${name},</p><p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p><p>Best regards,<br>The Dry Ground AI Team</p>`,
    };

    try {
      const response = await sgMail.send(msg);
      console.log('Confirmation email sent successfully:', response[0].statusCode);
      return { success: true };
    } catch (sendError) {
      console.error('SendGrid error:', sendError);
      if (sendError.response) {
        console.error('SendGrid API error response:', sendError.response.body);
      }
      return { 
        success: false, 
        message: 'Failed to send confirmation email', 
        error: sendError
      };
    }
  } catch (error) {
    console.error('Error in sendContactConfirmationEmail:', error);
    return { 
      success: false, 
      message: error.message || 'Failed to send email',
      error 
    };
  }
}

/**
 * Send notification email to admin about a new contact form submission
 */
export async function sendAdminNotificationEmail({ name, email, company, message }) {
  try {
    if (!SENDGRID_API_KEY) {
      console.warn('Skipping admin notification: SendGrid API key not configured');
      return { 
        success: false, 
        message: 'Email service not configured - missing API key',
        error: new Error('SendGrid API key not found')  
      };
    }

    console.log(`Attempting to send admin notification email to ${ADMIN_EMAIL}`);
    
    const msg = {
      to: ADMIN_EMAIL,
      from: ADMIN_EMAIL,
      subject: 'New Contact Form Submission',
      text: `New contact form submission:\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nMessage: ${message}`,
      html: `<h3>New contact form submission</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Company:</strong> ${company || 'N/A'}</p><p><strong>Message:</strong> ${message}</p>`,
    };

    try {
      const response = await sgMail.send(msg);
      console.log('Admin notification email sent successfully:', response[0].statusCode);
      return { success: true };
    } catch (sendError) {
      console.error('SendGrid error:', sendError);
      if (sendError.response) {
        console.error('SendGrid API error response:', sendError.response.body);
      }
      return { 
        success: false, 
        message: 'Failed to send admin notification email', 
        error: sendError
      };
    }
  } catch (error) {
    console.error('Error in sendAdminNotificationEmail:', error);
    return { 
      success: false, 
      message: error.message || 'Failed to send admin notification',
      error 
    };
  }
}
