import sgMail from '@sendgrid/mail';

// Get the API key from environment variables
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || 'contact@drygroundai.com';
const TO_EMAIL = process.env.ADMIN_EMAIL || 'notifications@drygroundai.com';

// Initialize SendGrid if API key is provided
if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

export async function sendContactConfirmationEmail({ name, email, message }) {
  if (!SENDGRID_API_KEY) {
    console.log('SendGrid API key not configured, skipping email send');
    return;
  }

  try {
    // Email to sender (confirmation)
    const userMsg = {
      to: email,
      from: FROM_EMAIL,
      subject: 'Thank you for contacting Dry Ground AI',
      text: `Hi ${name},\n\nThank you for reaching out to us. We've received your message and will get back to you shortly.\n\nBest regards,\nThe Dry Ground AI Team`,
      html: `<p>Hi ${name},</p><p>Thank you for reaching out to us. We've received your message and will get back to you shortly.</p><p>Best regards,<br>The Dry Ground AI Team</p>`
    };

    // Email to admin (notification)
    const adminMsg = {
      to: TO_EMAIL,
      from: FROM_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`
    };

    await Promise.all([
      sgMail.send(userMsg),
      sgMail.send(adminMsg)
    ]);

    return true;
  } catch (error) {
    console.error('SendGrid Error:', error);
    if (error.response) {
      console.error('SendGrid Error Response:', error.response.body);
    }
    throw error;
  }
}