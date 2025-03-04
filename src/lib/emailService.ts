import sgMail from '@sendgrid/mail';

// Get the API key from environment variables
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || 'contact@drygroundai.com';
const TO_EMAIL = process.env.ADMIN_EMAIL || 'notifications@drygroundai.com';

// Initialize SendGrid if API key is provided
if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

export async function sendContactConfirmationEmail({ name, email, company, message }) {
  try {
    if (!SENDGRID_API_KEY) {
      console.log('SendGrid API key not found, skipping email send');
      return { success: false, message: 'Email service not configured' };
    }

    const msg = {
      to: email,
      from: 'noreply@yourdomain.com', // Replace with your verified sender
      subject: 'Thanks for contacting us!',
      text: `Hello ${name},\n\nThank you for reaching out to us. We have received your message and will get back to you shortly.\n\nBest regards,\nDry Ground AI Team`,
      html: `<p>Hello ${name},</p><p>Thank you for reaching out to us. We have received your message and will get back to you shortly.</p><p>Best regards,<br>Dry Ground AI Team</p>`,
    };

    console.log('Attempting to send email to:', email);
    await sgMail.send(msg);
    console.log('Email sent successfully to:', email);

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    if (error.response) {
      console.error('SendGrid API error:', error.response.body);
    }
    return { 
      success: false, 
      message: 'Failed to send email',
      error: error.message
    };
  }
}