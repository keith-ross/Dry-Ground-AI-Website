
import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key from environment variable
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@drygroundai.com';

// Debug variables
console.log('Email service initialization:');
console.log('- API Key exists:', !!SENDGRID_API_KEY);
console.log('- Admin email:', ADMIN_EMAIL);

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
  console.log('SendGrid API key set successfully');
} else {
  console.error('⚠️ SendGrid API key not found in environment variables');
}

/**
 * Send confirmation email to the user who submitted the contact form
 */
export async function sendContactConfirmationEmail({ name, email }) {
  console.log(`Attempting to send confirmation email to ${email}`);
  
  try {
    if (!SENDGRID_API_KEY) {
      console.error('⚠️ SendGrid API key is missing for confirmation email');
      return { 
        success: false, 
        message: 'Email service not configured - API key missing' 
      };
    }

    const msg = {
      to: email,
      from: ADMIN_EMAIL,
      subject: 'Thank you for contacting Dry Ground AI',
      text: `Hello ${name},\n\nThank you for reaching out to us. We have received your message and will get back to you as soon as possible.\n\nBest regards,\nThe Dry Ground AI Team`,
      html: `<p>Hello ${name},</p><p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p><p>Best regards,<br>The Dry Ground AI Team</p>`,
    };

    console.log('Sending confirmation email with payload:', JSON.stringify(msg, null, 2));
    
    const response = await sgMail.send(msg);
    console.log('Confirmation email sent successfully:', JSON.stringify(response, null, 2));
    
    return { success: true };
  } catch (error) {
    console.error('⚠️ Error sending confirmation email:', error?.response?.body || error);
    return { 
      success: false, 
      message: error.message || 'Failed to send email',
      error: error?.response?.body || error.toString()
    };
  }
}

/**
 * Send notification email to admin about a new contact form submission
 */
export async function sendAdminNotificationEmail({ name, email, company, message }) {
  console.log(`Attempting to send admin notification email to ${ADMIN_EMAIL}`);
  
  try {
    if (!SENDGRID_API_KEY) {
      console.error('⚠️ SendGrid API key is missing for admin notification');
      return { 
        success: false, 
        message: 'Email service not configured - API key missing' 
      };
    }

    const msg = {
      to: ADMIN_EMAIL,
      from: ADMIN_EMAIL,
      subject: 'New Contact Form Submission',
      text: `New contact form submission:\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nMessage: ${message}`,
      html: `<h3>New contact form submission</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Company:</strong> ${company || 'N/A'}</p><p><strong>Message:</strong> ${message}</p>`,
    };

    console.log('Sending admin notification email with payload:', JSON.stringify(msg, null, 2));
    
    const response = await sgMail.send(msg);
    console.log('Admin notification email sent successfully:', JSON.stringify(response, null, 2));
    
    return { success: true };
  } catch (error) {
    console.error('⚠️ Error sending admin notification email:', error?.response?.body || error);
    return { 
      success: false, 
      message: error.message || 'Failed to send admin notification',
      error: error?.response?.body || error.toString()
    };
  }
}
