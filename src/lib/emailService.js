
const sgMail = require('@sendgrid/mail');

// Set SendGrid API key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('SendGrid API key found with length:', process.env.SENDGRID_API_KEY.length);
} else {
  console.error('SENDGRID_API_KEY not found in environment variables');
}

/**
 * Send contact form emails (to both admin and user)
 */
async function sendContactEmail({ name, email, message, company = '' }) {
  if (!process.env.SENDGRID_API_KEY) {
    return { 
      success: false, 
      error: 'SendGrid API key not configured' 
    };
  }
  
  try {
    console.log('Preparing to send emails for contact form submission');
    
    // Admin notification email
    const adminMsg = {
      to: 'info@dryground.ai',
      from: {
        email: 'info@dryground.ai',
        name: 'Dry Ground AI Website'
      },
      subject: `New Contact Form Submission from ${name}`,
      text: `
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
    
    // Confirmation email to user
    const userMsg = {
      to: email,
      from: {
        email: 'info@dryground.ai',
        name: 'Dry Ground AI'
      },
      subject: 'Thank you for contacting Dry Ground AI',
      text: `
        Dear ${name},
        
        Thank you for contacting Dry Ground AI. We have received your message and will get back to you as soon as possible.
        
        Best regards,
        The Dry Ground AI Team
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank you for contacting us!</h2>
          <p>Dear ${name},</p>
          <p>Thank you for reaching out to Dry Ground AI. We have received your message and will get back to you as soon as possible.</p>
          <p>Best regards,<br>The Dry Ground AI Team</p>
        </div>
      `
    };
    
    // Send emails one at a time to isolate any issues
    try {
      console.log('Sending admin notification email');
      await sgMail.send(adminMsg);
      console.log('Admin notification email sent successfully');
    } catch (adminError) {
      console.error('Error sending admin notification email:', adminError);
      if (adminError.response) {
        console.error('SendGrid API error (admin):', adminError.response.body);
      }
      // Continue to try sending user email even if admin email fails
    }
    
    try {
      console.log('Sending user confirmation email');
      await sgMail.send(userMsg);
      console.log('User confirmation email sent successfully');
    } catch (userError) {
      console.error('Error sending user confirmation email:', userError);
      if (userError.response) {
        console.error('SendGrid API error (user):', userError.response.body);
      }
      return { 
        success: false, 
        error: 'Failed to send confirmation email',
        details: userError.message
      };
    }
    
    return { success: true };
    
  } catch (error) {
    console.error('Error in sendContactEmail function:', error);
    
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
