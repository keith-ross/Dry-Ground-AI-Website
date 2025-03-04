
const sgMail = require('@sendgrid/mail');

// Initialize SendGrid if API key is available
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('SendGrid API key configured');
} else {
  console.warn('SendGrid API key not found in environment variables');
}

/**
 * Test the SendGrid API key
 */
async function testSendGridApiKey() {
  if (!process.env.SENDGRID_API_KEY) {
    return { 
      success: false,
      error: 'SendGrid API key not configured'
    };
  }

  try {
    // Just log the key info without showing the actual key
    const keyPrefix = process.env.SENDGRID_API_KEY.substring(0, 5);
    console.log(`SendGrid API key: Present and length: ${process.env.SENDGRID_API_KEY.length}`);
    console.log(`Key prefix: ${keyPrefix}....`);
    
    return { 
      success: true,
      message: 'SendGrid API key is present' 
    };
  } catch (error) {
    console.error('Error testing SendGrid API key:', error);
    return { 
      success: false,
      error: error.message || 'Unknown error testing SendGrid API key'
    };
  }
}

/**
 * Send email notification for contact form submissions
 */
async function sendContactFormEmail({ name, email, company, message }) {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('SendGrid API key not configured, cannot send email');
    return { 
      success: false, 
      error: 'Email service not configured'
    };
  }

  try {
    // Simplified email content
    const emailContent = {
      to: 'contact@anchoredup.org', // Change this to your actual email
      from: 'noreply@anchoredup.org', // This should be a verified sender
      subject: `New Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ''}
Message: ${message}
      `,
      html: `
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
<p><strong>Message:</strong> ${message}</p>
      `
    };

    console.log('Sending email via SendGrid:', JSON.stringify(emailContent, null, 2));
    
    // Send email
    await sgMail.send(emailContent);
    console.log('Email sent successfully');

    return { 
      success: true 
    };
  } catch (error) {
    // Log detailed error information for debugging
    console.error('SendGrid error:', error);
    
    if (error.response) {
      console.error('SendGrid API error response:', {
        body: error.response.body,
        statusCode: error.response.statusCode
      });
    }
    
    return { 
      success: false, 
      error: error.message || 'Unknown error sending email'
    };
  }
}

module.exports = {
  testSendGridApiKey,
  sendContactFormEmail
};
