import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key from environment variable
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

if (!SENDGRID_API_KEY) {
  console.error('SendGrid API key is missing. Please add it to your secrets.');
} else {
  sgMail.setApiKey(SENDGRID_API_KEY);
  console.log('SendGrid client initialized successfully');
}

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    if (!SENDGRID_API_KEY) {
      throw new Error('SendGrid API key is missing');
    }

    const msg = {
      to,
      from: process.env.ADMIN_EMAIL || 'info@drygroundai.com',
      subject,
      html,
    };

    const response = await sgMail.send(msg);
    console.log('Email sent successfully', response);
    return { success: true, response };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};

export async function sendContactConfirmationEmail({ name, email }) {
  try {
    const html = `<p>Hello ${name},</p><p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p><p>Best regards,<br>The Dry Ground AI Team</p>`;
    const response = await sendEmail(email, 'Thank you for contacting Dry Ground AI', html);
    return response;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return { success: false, error };
  }
}


export async function sendAdminNotificationEmail({ name, email, company, message }) {
  try {
    const html = `<h3>New contact form submission</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Company:</strong> ${company || 'N/A'}</p><p><strong>Message:</strong> ${message}</p>`;
    const response = await sendEmail(process.env.ADMIN_EMAIL || 'info@drygroundai.com', 'New Contact Form Submission', html);
    return response;
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    return { success: false, error };
  }
}