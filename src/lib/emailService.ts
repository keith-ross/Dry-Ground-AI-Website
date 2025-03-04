import sgMail from '@sendgrid/mail';

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('SendGrid initialized successfully');
} else {
  console.error('SENDGRID_API_KEY is not set in environment variables');
}

// Send email to admin when a contact form is submitted
export async function sendAdminNotificationEmail({ name, email, company, message }) {
  try {
    console.log('Preparing to send admin notification email');
    console.log(`SENDGRID_API_KEY exists: ${!!process.env.SENDGRID_API_KEY}`);
    console.log(`SENDGRID_API_KEY length: ${process.env.SENDGRID_API_KEY ? process.env.SENDGRID_API_KEY.length : 0}`);

    if (!process.env.SENDGRID_API_KEY) {
      throw new Error('SendGrid API key not configured');
    }

    const msg = {
      to: 'admin@drygoundai.com', // Replace with your admin email
      from: 'noreply@drygoundai.com', // Replace with verified sender
      subject: 'New Contact Form Submission',
      text: `
        Name: ${name}
        Email: ${email}
        Company: ${company || 'N/A'}
        Message: ${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    const response = await sgMail.send(msg);
    console.log('Admin notification email sent successfully', response[0].statusCode);
    return { success: true };
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    console.error('Error details:', error.response ? error.response.body : 'No response details');
    return { 
      success: false, 
      error: error.message || 'Failed to send admin notification'
    };
  }
}

// Send confirmation email to user who submitted the contact form
export async function sendContactConfirmationEmail({ name, email }) {
  try {
    console.log('Preparing to send user confirmation email');

    if (!process.env.SENDGRID_API_KEY) {
      throw new Error('SendGrid API key not configured');
    }

    const msg = {
      to: email,
      from: 'noreply@drygoundai.com', // Replace with verified sender
      subject: 'Thank you for contacting us',
      text: `
        Dear ${name},

        Thank you for contacting Dry Ground AI. We have received your inquiry and will respond as soon as possible.

        Best regards,
        The Dry Ground AI Team
      `,
      html: `
        <p>Dear ${name},</p>
        <p>Thank you for contacting Dry Ground AI. We have received your inquiry and will respond as soon as possible.</p>
        <p>Best regards,<br>The Dry Ground AI Team</p>
      `,
    };

    const response = await sgMail.send(msg);
    console.log('User confirmation email sent successfully', response[0].statusCode);
    return { success: true };
  } catch (error) {
    console.error('Error sending user confirmation email:', error);
    console.error('Error details:', error.response ? error.response.body : 'No response details');
    return { 
      success: false, 
      error: error.message || 'Failed to send confirmation email'
    };
  }
}