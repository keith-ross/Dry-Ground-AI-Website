import sgMail from '@sendgrid/mail';

// Get API key from environment variables
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@drygroundai.com';

// Initialize SendGrid client
if (!SENDGRID_API_KEY) {
  console.error('ERROR: SendGrid API key is missing. Make sure SENDGRID_API_KEY is set in Replit Secrets');
} else {
  sgMail.setApiKey(SENDGRID_API_KEY);
  console.log('SendGrid client initialized successfully');
}

/**
 * Send confirmation email to the user who submitted the contact form
 */
export async function sendContactConfirmationEmail({ name, email }) {
  try {
    if (!SENDGRID_API_KEY) {
      console.error('SendGrid API key not found, skipping email send');
      return { success: false, error: new Error('SendGrid API key not configured') };
    }

    console.log(`Sending confirmation email to ${email}`);

    const msg = {
      to: email,
      from: ADMIN_EMAIL,
      subject: 'Thank you for contacting Dry Ground AI',
      text: `Hello ${name},\n\nThank you for reaching out to us. We have received your message and will get back to you as soon as possible.\n\nBest regards,\nThe Dry Ground AI Team`,
      html: `<p>Hello ${name},</p><p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p><p>Best regards,<br>The Dry Ground AI Team</p>`,
    };

    const response = await sgMail.send(msg);
    console.log('Confirmation email sent successfully', response);
    return { success: true, response };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return { 
      success: false,
      error,
      message: error.message || 'Failed to send email'
    };
  }
}

/**
 * Send notification email to admin about a new contact form submission
 */
export async function sendAdminNotificationEmail({ name, email, company, message }) {
  try {
    if (!SENDGRID_API_KEY) {
      console.error('SendGrid API key not found, skipping admin notification');
      return { success: false, error: new Error('SendGrid API key not configured') };
    }

    console.log(`Sending admin notification to ${ADMIN_EMAIL}`);

    const msg = {
      to: ADMIN_EMAIL,
      from: ADMIN_EMAIL,
      subject: 'New Contact Form Submission',
      text: `New contact form submission:\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nMessage: ${message}`,
      html: `<h3>New contact form submission</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Company:</strong> ${company || 'N/A'}</p><p><strong>Message:</strong> ${message}</p>`,
    };

    const response = await sgMail.send(msg);
    console.log('Admin notification email sent successfully', response);
    return { success: true, response };
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    return { 
      success: false,
      error,
      message: error.message || 'Failed to send admin notification'
    };
  }
}