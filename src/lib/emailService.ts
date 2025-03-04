
import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
  console.log('SendGrid API key configured');
} else {
  console.warn('SendGrid API key not found. Email functionality will not work.');
}

interface ContactData {
  name: string;
  email: string;
  message: string;
  company?: string;
}

// Send confirmation email to user
export async function sendContactConfirmationEmail({ name, email, message }: ContactData) {
  if (!SENDGRID_API_KEY) {
    console.log('SendGrid API key not configured. Skipping email send.');
    return { success: false, message: 'Email service not configured' };
  }
  
  try {
    const msg = {
      to: email,
      from: 'info@dryground.ai', // Replace with your verified sender email
      subject: 'Thank you for contacting Dry Ground AI',
      text: `Dear ${name},\n\nThank you for contacting us. We have received your message and will get back to you shortly.\n\nBest regards,\nThe Dry Ground AI Team`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Thank you for contacting Dry Ground AI</h2>
          <p>Dear ${name},</p>
          <p>We have received your message and will get back to you shortly.</p>
          <p>Your message:</p>
          <blockquote style="border-left: 2px solid #ccc; padding-left: 1em; margin-left: 1em;">
            ${message}
          </blockquote>
          <p>Best regards,<br/>The Dry Ground AI Team</p>
        </div>
      `,
    };
    
    const response = await sgMail.send(msg);
    console.log('Email sent successfully:', response[0].statusCode);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}

// For admin notification (optional)
export async function sendAdminNotificationEmail({ name, email, company, message }: ContactData) {
  if (!SENDGRID_API_KEY) {
    console.log('SendGrid API key not configured. Skipping admin email send.');
    return { success: false, message: 'Email service not configured' };
  }
  
  try {
    const msg = {
      to: 'admin@dryground.ai', // Replace with admin email
      from: 'info@dryground.ai', // Replace with your verified sender email
      subject: 'New Contact Form Submission',
      text: `New contact form submission from ${name} (${email}):\n\nCompany: ${company || 'N/A'}\n\nMessage: ${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Company:</strong> ${company || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="border-left: 2px solid #ccc; padding-left: 1em; margin-left: 1em;">
            ${message}
          </blockquote>
        </div>
      `,
    };
    
    const response = await sgMail.send(msg);
    console.log('Admin notification email sent successfully:', response[0].statusCode);
    return { success: true };
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    return { success: false, error };
  }
}
