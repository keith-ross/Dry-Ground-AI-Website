
const sgMail = require('@sendgrid/mail');

// Initialize SendGrid with API key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('SendGrid API key configured');
} else {
  console.warn('SENDGRID_API_KEY is not set! Email functionality will not work.');
}

/**
 * Send contact form email to site admin and confirmation to user
 * @param {Object} contactData 
 * @param {string} contactData.name - Name of the person submitting form
 * @param {string} contactData.email - Email of the person submitting form
 * @param {string} contactData.message - Message content
 * @returns {Promise<{success: boolean, error?: string, details?: any}>}
 */
async function sendContactEmail(contactData) {
  const { name, email, message } = contactData;
  
  if (!process.env.SENDGRID_API_KEY) {
    console.error('Cannot send email: SENDGRID_API_KEY is not configured');
    return { 
      success: false, 
      error: 'Email service is not configured. Please contact the administrator.' 
    };
  }

  try {
    console.log('Preparing to send emails for contact submission from:', email);
    
    // Email to admin
    const adminMsg = {
      to: 'info@dryground.ai', // Replace with your actual admin email
      from: 'noreply@dryground.ai', // Must be verified sender in SendGrid
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };
    
    // Confirmation email to user
    const userMsg = {
      to: email,
      from: 'noreply@dryground.ai', // Must be verified sender in SendGrid
      subject: 'Thank you for contacting Dry Ground AI',
      text: `
        Dear ${name},
        
        Thank you for contacting Dry Ground AI. We have received your message and will get back to you as soon as possible.
        
        For your reference, here is a copy of your message:
        
        ${message}
        
        Best regards,
        The Dry Ground AI Team
      `,
      html: `
        <h2>Thank you for contacting Dry Ground AI</h2>
        <p>Dear ${name},</p>
        <p>Thank you for contacting Dry Ground AI. We have received your message and will get back to you as soon as possible.</p>
        <p>For your reference, here is a copy of your message:</p>
        <blockquote>${message.replace(/\n/g, '<br>')}</blockquote>
        <p>Best regards,<br>The Dry Ground AI Team</p>
      `,
    };

    console.log('Sending admin email to:', adminMsg.to);
    await sgMail.send(adminMsg);
    
    console.log('Sending confirmation email to:', userMsg.to);
    await sgMail.send(userMsg);
    
    console.log('Both emails sent successfully');
    return { success: true };
    
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Better error handling
    if (error.response && error.response.body) {
      console.error('SendGrid API error response:', error.response.body);
      return { 
        success: false, 
        error: `SendGrid API error: ${error.code || error.message}`, 
        details: error.response.body 
      };
    }
    
    return { 
      success: false, 
      error: error.message || 'Unknown error sending email' 
    };
  }
}

module.exports = {
  sendContactEmail
};
