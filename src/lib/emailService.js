
const sgMail = require('@sendgrid/mail');

// Get API key from environment variables
const apiKey = process.env.SENDGRID_API_KEY;
if (apiKey) {
  sgMail.setApiKey(apiKey);
} else {
  console.warn('SENDGRID_API_KEY not found in environment variables');
}

/**
 * Sends a confirmation email to the user who submitted the contact form
 */
async function sendContactConfirmationEmail({ name, email }) {
  if (!apiKey) {
    return { 
      success: false, 
      error: 'SendGrid API key is not configured' 
    };
  }
  
  try {
    const msg = {
      to: email,
      from: 'noreply@dryground.ai', // Replace with your verified sender
      subject: 'Thank you for contacting Dry Ground AI!',
      text: `
        Hello ${name},
        
        Thank you for reaching out to us. We've received your message and will get back to you as soon as possible.
        
        Best regards,
        Dry Ground AI Team
      `,
      html: `
        <h2>Thank you for contacting us!</h2>
        <p>Hello ${name},</p>
        <p>Thank you for reaching out to us. We've received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br>Dry Ground AI Team</p>
      `,
    };
    
    console.log('Sending confirmation email to:', email);
    
    const response = await sgMail.send(msg);
    console.log('Confirmation email sent successfully:', response[0].statusCode);
    
    return { success: true };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    
    if (error.response) {
      console.error('SendGrid API error response:', error.response.body);
    }
    
    return { 
      success: false, 
      error: error.message || 'Unknown error sending confirmation email'
    };
  }
}

/**
 * Sends a notification email to the admin about a new contact form submission
 */
async function sendAdminNotificationEmail({ name, email, company, message }) {
  if (!apiKey) {
    return { 
      success: false, 
      error: 'SendGrid API key is not configured' 
    };
  }
  
  try {
    const msg = {
      to: 'info@dryground.ai', // Admin email address
      from: 'noreply@dryground.ai', // Replace with your verified sender
      subject: 'New Contact Form Submission',
      text: `
        New contact form submission:
        
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
      `,
    };
    
    console.log('Sending admin notification to:', msg.to);
    
    const response = await sgMail.send(msg);
    console.log('Admin notification sent successfully:', response[0].statusCode);
    
    return { success: true };
  } catch (error) {
    console.error('Error sending admin notification:', error);
    
    if (error.response) {
      console.error('SendGrid API error response:', error.response.body);
    }
    
    return { 
      success: false, 
      error: error.message || 'Unknown error sending admin notification'
    };
  }
}

module.exports = {
  sendContactConfirmationEmail,
  sendAdminNotificationEmail
};
