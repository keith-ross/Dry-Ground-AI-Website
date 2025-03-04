
import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('SendGrid client initialized');
} else {
  console.warn('SENDGRID_API_KEY not found in environment variables');
}

/**
 * Send a confirmation email to the contact form submitter
 */
export async function sendContactConfirmationEmail({ name, email }) {
  if (!process.env.SENDGRID_API_KEY) {
    console.error('Cannot send email: SENDGRID_API_KEY not configured');
    return { 
      success: false, 
      error: 'Email service not configured' 
    };
  }

  try {
    const msg = {
      to: email,
      from: process.env.ADMIN_EMAIL || 'info@dryground.ai',
      subject: 'Thank you for contacting us',
      text: `Hello ${name},\n\nThank you for reaching out to us. We have received your message and will get back to you as soon as possible.\n\nBest regards,\nDry Ground AI Team`,
      html: `<p>Hello ${name},</p>
             <p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p>
             <p>Best regards,<br>Dry Ground AI Team</p>`
    };

    await sgMail.send(msg);
    console.log(`Confirmation email sent to ${email}`);
    return { success: true };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to send confirmation email' 
    };
  }
}

/**
 * Send a notification email to the admin
 */
export async function sendAdminNotificationEmail({ name, email, company, message }) {
  if (!process.env.SENDGRID_API_KEY) {
    console.error('Cannot send email: SENDGRID_API_KEY not configured');
    return { 
      success: false, 
      error: 'Email service not configured' 
    };
  }

  const adminEmail = process.env.ADMIN_EMAIL || 'info@dryground.ai';
  
  try {
    const msg = {
      to: adminEmail,
      from: adminEmail, // Must be the same as verified sender
      subject: 'New Contact Form Submission',
      text: `
        New contact form submission:
        
        Name: ${name}
        Email: ${email}
        Company: ${company || 'N/A'}
        
        Message:
        ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };

    await sgMail.send(msg);
    console.log(`Notification email sent to admin (${adminEmail})`);
    return { success: true };
  } catch (error) {
    console.error('Error sending admin notification:', error);
    if (error.response) {
      console.error('SendGrid API response error:', error.response.body);
    }
    return { 
      success: false, 
      error: error.message || 'Failed to send admin notification' 
    };
  }
}

// Export a function to test the SendGrid API key configuration
export async function testSendGridApiKey() {
  if (!process.env.SENDGRID_API_KEY) {
    return { 
      success: false, 
      error: 'SENDGRID_API_KEY not found in environment variables' 
    };
  }
  
  try {
    // Just check if the key is properly formatted
    const apiKeyLength = process.env.SENDGRID_API_KEY.length;
    const apiKeyPrefix = process.env.SENDGRID_API_KEY.substring(0, 3);
    
    return { 
      success: true, 
      message: 'SendGrid API key is configured', 
      keyLength: apiKeyLength,
      keyPrefix: apiKeyPrefix
    };
  } catch (error) {
    return { 
      success: false, 
      error: error.message 
    };
  }
}
