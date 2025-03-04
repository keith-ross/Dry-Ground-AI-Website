
import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key from environment variable
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@drygroundai.com';

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
} else {
  console.warn('SendGrid API key not found in environment variables');
}

/**
 * Send confirmation email to the user who submitted the contact form
 */
export async function sendContactConfirmationEmail({ name, email }) {
  try {
    if (!SENDGRID_API_KEY) {
      console.warn('Skipping email send: SendGrid API key not configured');
      return { success: false, message: 'Email service not configured' };
    }

    const msg = {
      to: email,
      from: ADMIN_EMAIL,
      subject: 'Thank you for contacting Dry Ground AI',
      text: `Hello ${name},\n\nThank you for reaching out to us. We have received your message and will get back to you as soon as possible.\n\nBest regards,\nThe Dry Ground AI Team`,
      html: `<p>Hello ${name},</p><p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p><p>Best regards,<br>The Dry Ground AI Team</p>`,
    };

    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
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
      return { success: false, message: 'Email service not configured' };
    }

    const msg = {
      to: ADMIN_EMAIL,
      from: ADMIN_EMAIL,
      subject: 'New Contact Form Submission',
      text: `New contact form submission:\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nMessage: ${message}`,
      html: `<h3>New contact form submission</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Company:</strong> ${company || 'N/A'}</p><p><strong>Message:</strong> ${message}</p>`,
    };

    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    return { 
      success: false, 
      message: error.message || 'Failed to send admin notification',
      error 
    };
  }
}
