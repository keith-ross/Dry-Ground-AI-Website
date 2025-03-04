
const sgMail = require('@sendgrid/mail');

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('SendGrid API key loaded successfully');
} else {
  console.warn('WARNING: SendGrid API key not found in environment variables');
}

// Admin email to receive notifications
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@dryground.ai';

/**
 * Send a notification email to the admin
 */
async function sendAdminNotificationEmail({ name, email, company, message }) {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      return { 
        success: false, 
        error: 'SendGrid API key not configured' 
      };
    }

    const mailOptions = {
      to: ADMIN_EMAIL,
      from: {
        email: 'no-reply@dryground.ai',
        name: 'Dry Ground AI Contact Form'
      },
      subject: `New contact form submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}

Message:
${message}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Company:</strong> ${company || 'Not provided'}</p>
<h3>Message:</h3>
<p>${message.replace(/\n/g, '<br>')}</p>
      `
    };

    console.log('Sending admin notification email with options:', JSON.stringify(mailOptions, null, 2));
    
    const response = await sgMail.send(mailOptions);
    console.log('Admin notification email sent successfully', response?.[0]?.statusCode);
    
    return { 
      success: true 
    };
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    return { 
      success: false, 
      error: error.message || 'Unknown error sending admin email' 
    };
  }
}

/**
 * Send a confirmation email to the user who submitted the form
 */
async function sendContactConfirmationEmail({ name, email }) {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      return { 
        success: false, 
        error: 'SendGrid API key not configured' 
      };
    }

    const mailOptions = {
      to: email,
      from: {
        email: 'no-reply@dryground.ai',
        name: 'Dry Ground AI'
      },
      subject: 'Thank you for contacting Dry Ground AI',
      text: `
Hello ${name},

Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.

Best regards,
The Dry Ground AI Team
      `,
      html: `
<h2>Thank You for Contacting Us</h2>
<p>Hello ${name},</p>
<p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p>
<p>Best regards,<br>The Dry Ground AI Team</p>
      `
    };

    console.log('Sending confirmation email with options:', JSON.stringify(mailOptions, null, 2));
    
    const response = await sgMail.send(mailOptions);
    console.log('Confirmation email sent successfully', response?.[0]?.statusCode);
    
    return { 
      success: true 
    };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return { 
      success: false, 
      error: error.message || 'Unknown error sending confirmation email' 
    };
  }
}

module.exports = {
  sendAdminNotificationEmail,
  sendContactConfirmationEmail
};
