
const sgMail = require('@sendgrid/mail');

// Set SendGrid API key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log(`SendGrid API key configured (${process.env.SENDGRID_API_KEY.substring(0, 3)}...)`);
} else {
  console.warn('⚠️ SENDGRID_API_KEY not found in environment variables. Email service will not work.');
}

/**
 * Send a confirmation email to the contact form submitter
 */
async function sendContactConfirmationEmail({ name, email }) {
  if (!process.env.SENDGRID_API_KEY) {
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
    
    console.log('Sending confirmation email to:', email);
    const response = await sgMail.send(msg);
    console.log('Confirmation email sent successfully with status:', response[0]?.statusCode);
    
    return { success: true };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    
    // Extract useful error information
    let errorMessage = 'Failed to send confirmation email';
    if (error.response) {
      console.error('SendGrid API error response:', error.response.body);
      errorMessage = error.response.body?.message || errorMessage;
    }
    
    return { 
      success: false, 
      error: errorMessage
    };
  }
}

/**
 * Send a notification email to the admin about a new contact form submission
 */
async function sendAdminNotificationEmail({ name, email, company, message }) {
  if (!process.env.SENDGRID_API_KEY) {
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
    
    console.log('Sending admin notification email to: info@dryground.ai');
    const response = await sgMail.send(msg);
    console.log('Admin notification email sent successfully with status:', response[0]?.statusCode);
    
    return { success: true };
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    
    // Extract useful error information
    let errorMessage = 'Failed to send admin notification email';
    if (error.response) {
      console.error('SendGrid API error response:', error.response.body);
      errorMessage = error.response.body?.message || errorMessage;
    }
    
    return { 
      success: false, 
      error: errorMessage
    };
  }
}

module.exports = {
  sendContactConfirmationEmail,
  sendAdminNotificationEmail
};
