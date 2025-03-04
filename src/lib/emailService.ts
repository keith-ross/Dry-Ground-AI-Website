
import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key from environment variables
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export async function sendConfirmationEmail(toEmail: string, name: string) {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('SENDGRID_API_KEY not set, skipping email sending');
    return;
  }
  
  const msg = {
    to: toEmail,
    from: 'no-reply@dryground.ai', // Use verified sender in SendGrid
    subject: 'Thank you for contacting Dry Ground AI',
    text: `Hello ${name},\n\nThank you for reaching out to Dry Ground AI. We have received your message and will get back to you as soon as possible.\n\nBest regards,\nThe Dry Ground AI Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #00A3E0;">Thank You for Contacting Us</h2>
        <p>Hello ${name},</p>
        <p>Thank you for reaching out to Dry Ground AI. We have received your message and will get back to you as soon as possible.</p>
        <p>Best regards,</p>
        <p>The Dry Ground AI Team</p>
      </div>
    `,
  };
  
  try {
    await sgMail.send(msg);
    console.log(`Confirmation email sent to ${toEmail}`);
    return true;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw error;
  }
}
