
import sgMail from '@sendgrid/mail';

// Set the API key for SendGrid
const apiKey = process.env.SENDGRID_API_KEY;
if (apiKey) {
  sgMail.setApiKey(apiKey);
} else {
  console.error('SENDGRID_API_KEY is not set in environment variables');
}

/**
 * Sends an email notification to the admin about a new contact form submission
 */
export async function sendAdminNotificationEmail({ name, email, company, message }) {
  if (!apiKey) {
    return { 
      success: false, 
      error: 'SendGrid API key is not configured' 
    };
  }
  
  try {
    const msg = {
      to: 'admin@yourdomain.com', // Replace with your admin email
      from: 'noreply@yourdomain.com', // Replace with your verified sender
      subject: `New Contact Form Submission from ${name}`,
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
    
    console.log('Sending admin notification email with data:', {
      to: msg.to,
      from: msg.from,
      subject: msg.subject
    });
    
    const response = await sgMail.send(msg);
    console.log('Admin notification email sent successfully:', response[0].statusCode);
    
    return { success: true };
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    
    if (error.response) {
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

/**
 * Sends a confirmation email to the user who submitted the contact form
 */
export async function sendContactConfirmationEmail({ name, email }) {
  if (!apiKey) {
    return { 
      success: false, 
      error: 'SendGrid API key is not configured' 
    };
  }
  
  try {
    const msg = {
      to: email,
      from: 'noreply@yourdomain.com', // Replace with your verified sender
      subject: 'Thank you for contacting us!',
      text: `
        Hello ${name},
        
        Thank you for reaching out to us. We've received your message and will get back to you as soon as possible.
        
        Best regards,
        Your Company Name
      `,
      html: `
        <h2>Thank you for contacting us!</h2>
        <p>Hello ${name},</p>
        <p>Thank you for reaching out to us. We've received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br>Your Company Name</p>
      `,
    };
    
    console.log('Sending confirmation email with data:', {
      to: msg.to,
      from: msg.from,
      subject: msg.subject
    });
    
    const response = await sgMail.send(msg);
    console.log('Confirmation email sent successfully:', response[0].statusCode);
    
    return { success: true };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    
    if (error.response) {
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
