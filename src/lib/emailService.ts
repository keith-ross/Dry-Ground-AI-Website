import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
const sendgridApiKey = process.env.SENDGRID_API_KEY;

if (!sendgridApiKey) {
  console.warn('SENDGRID_API_KEY not found. Email functionality will not work.');
} else {
  sgMail.setApiKey(sendgridApiKey);
}

// Send confirmation email to user
export async function sendConfirmationEmail(to: string, name: string) {
  if (!sendgridApiKey) {
    throw new Error('SendGrid API key not configured');
  }

  const msg = {
    to,
    from: 'noreply@yourdomain.com', // Update with your verified sender
    subject: 'Thank you for contacting us',
    text: `Hi ${name},\n\nThank you for contacting us. We have received your message and will get back to you shortly.\n\nBest regards,\nThe Dry Ground AI Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Thank You for Contacting Us</h2>
        <p>Hi ${name},</p>
        <p>Thank you for reaching out to us. We have received your message and will respond as soon as possible.</p>
        <p>Best regards,<br>The Dry Ground AI Team</p>
      </div>
    `
  };

  try {
    await sgMail.send(msg);
    console.log(`Confirmation email sent to ${to}`);
    return true;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw error;
  }
}