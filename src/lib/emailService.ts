import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
const apiKey = process.env.SENDGRID_API_KEY;
if (!apiKey) {
  console.warn('SendGrid API key is not set. Email functionality will not work.');
} else {
  sgMail.setApiKey(apiKey);
}

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export async function sendEmail({ to, subject, text, html }: EmailOptions) {
  if (!apiKey) {
    console.warn('Skipping email send because SENDGRID_API_KEY is not set');
    return;
  }

  const msg = {
    to,
    from: process.env.ADMIN_EMAIL || 'info@drygroundai.com',
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent to ${to}`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    if (error.response) {
      console.error(error.response.body);
    }
    throw new Error('Failed to send email');
  }
}

// Function to send confirmation email to user
export const sendConfirmationEmail = async (name: string, email: string, message: string) => {
  const subject = 'Thank You for Contacting Dry Ground AI';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #00A3E0;">Thank You for Contacting Us</h2>
      <p>Hi ${name},</p>
      <p>Thank you for reaching out to Dry Ground AI. We have received your message and our team will review it promptly.</p>
      <p>Here's a copy of your message:</p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p>${message}</p>
      </div>
      <p>We'll get back to you as soon as possible.</p>
      <p>Best regards,<br>The Dry Ground AI Team</p>
    </div>
  `;
  const text = `Thank you for contacting us, ${name}! We've received your message and will get back to you soon.`;

  return await sendEmail({ email, subject, html, text });
};

// Function to send notification email to admin
export const sendAdminNotificationEmail = async (name: string, email: string, message: string) => {
  const adminEmail = process.env.ADMIN_EMAIL || 'info@drygroundai.com';
  const subject = `New Contact Form Submission from ${name}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #00A3E0;">New Contact Form Submission</h2>
      <p><strong>From:</strong> ${name} (${email})</p>
      <p><strong>Message:</strong></p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p>${message}</p>
      </div>
      <p>This message was submitted via the Dry Ground AI website contact form.</p>
    </div>
  `;
  const text = `New contact form submission from ${name} (${email}):\n\n${message}`;
  return await sendEmail({ to: adminEmail, subject, html, text });
};