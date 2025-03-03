import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key from environment variable
const initSendgrid = () => {
  const apiKey = process.env.SENDGRID_API_KEY;

  if (!apiKey) {
    console.error('SENDGRID_API_KEY is not set in environment variables');
    throw new Error('SendGrid API key is missing');
  }

  sgMail.setApiKey(apiKey);
};

export async function sendEmail(to: string, subject: string, htmlContent: string) {
  try {
    // Initialize SendGrid if not already initialized
    initSendgrid();

    const msg = {
      to,
      from: process.env.FROM_EMAIL || 'info@drygroundai.com',
      subject,
      html: htmlContent,
    };

    const result = await sgMail.send(msg);
    console.log('Email sent successfully');
    return { success: true, result };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
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

  return await sendEmail(email, subject, html);
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

  return await sendEmail(adminEmail, subject, html);
};