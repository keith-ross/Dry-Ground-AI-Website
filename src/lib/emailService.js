
const sgMail = require('@sendgrid/mail');

// Set SendGrid API key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('SendGrid API key found with length:', process.env.SENDGRID_API_KEY.length);
} else {
  console.warn('SENDGRID_API_KEY not found in environment variables. Email service will not work.');
}

/**
 * Send a confirmation email to the contact form submitter
 */
async function sendContactConfirmationEmail({ name, email }) {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('SendContactConfirmationEmail: No SENDGRID_API_KEY found');
    return { 
      success: false, 
      error: 'SendGrid API key not configured' 
    };
  }
  
  try {
    const msg = {
      to: email,
      from: {
        email: 'info@dryground.ai',
        name: 'Dry Ground AI'
      },
      subject: 'Thank you for contacting Dry Ground AI',
      text: `Hi ${name},\n\nThank you for reaching out to us. We've received your message and will get back to you as soon as possible.\n\nBest regards,\nThe Dry Ground AI Team`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank you for contacting us!</h2>
          <p>Hi ${name},</p>
          <p>Thank you for reaching out to Dry Ground AI. We've received your message and will get back to you as soon as possible.</p>
          <p>Best regards,<br>The Dry Ground AI Team</p>
        </div>
      `
    };
    
    console.log('Attempting to send confirmation email to:', email);
    const [response] = await sgMail.send(msg);
    
    if (response && response.statusCode && response.statusCode >= 200 && response.statusCode < 300) {
      console.log('Confirmation email sent successfully, status code:', response.statusCode);
      return { success: true };
    } else {
      console.error('Unexpected response from SendGrid:', response);
      return {
        success: false,
        error: `Unexpected response: ${JSON.stringify(response)}`
      };
    }
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    // Extract the detailed SendGrid error if available
    const sgError = error.response && error.response.body ? 
      JSON.stringify(error.response.body) : 
      error.message || 'Unknown error';
    
    return { 
      success: false, 
      error: `Failed to send confirmation email: ${sgError}`
    };
  }
}

/**
 * Send a notification email to the admin about a new contact form submission
 */
async function sendAdminNotificationEmail({ name, email, company, message }) {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('SendAdminNotificationEmail: No SENDGRID_API_KEY found');
    return { 
      success: false, 
      error: 'SendGrid API key not configured' 
    };
  }
  
  try {
    const msg = {
      to: 'info@dryground.ai',
      from: {
        email: 'info@dryground.ai',
        name: 'Dry Ground AI Website'
      },
      subject: 'New Contact Form Submission',
      text: `
        New contact form submission:
        
        Name: ${name}
        Email: ${email}
        Company: ${company || 'Not specified'}
        
        Message:
        ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || 'Not specified'}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
      `
    };
    
    console.log('Attempting to send admin notification email to: info@dryground.ai');
    const [response] = await sgMail.send(msg);
    
    if (response && response.statusCode && response.statusCode >= 200 && response.statusCode < 300) {
      console.log('Admin notification email sent successfully, status code:', response.statusCode);
      return { success: true };
    } else {
      console.error('Unexpected response from SendGrid:', response);
      return {
        success: false,
        error: `Unexpected response: ${JSON.stringify(response)}`
      };
    }
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    // Extract the detailed SendGrid error if available
    const sgError = error.response && error.response.body ? 
      JSON.stringify(error.response.body) : 
      error.message || 'Unknown error';
    
    return { 
      success: false, 
      error: `Failed to send admin notification email: ${sgError}`
    };
  }
}

module.exports = {
  sendContactConfirmationEmail,
  sendAdminNotificationEmail
};
