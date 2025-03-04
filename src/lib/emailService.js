const sgMail = require('@sendgrid/mail');

// Initialize SendGrid with API key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('SendGrid API key: Present and length:', process.env.SENDGRID_API_KEY.length);
  console.log('Key prefix:', process.env.SENDGRID_API_KEY.substring(0, 7) + '....');
} else {
  console.warn('SENDGRID_API_KEY not found in environment variables');
}

/**
 * Basic function to test if SendGrid API key is valid
 */
async function testSendGridApiKey() {
  if (!process.env.SENDGRID_API_KEY) {
    return {
      success: false,
      message: 'SendGrid API key not configured'
    };
  }

  try {
    // Just check if the API key is present and has a valid format
    if (process.env.SENDGRID_API_KEY.startsWith('SG.') && 
        process.env.SENDGRID_API_KEY.length > 50) {
      return {
        success: true,
        message: 'SendGrid API key found with valid format',
        keyInfo: {
          prefix: process.env.SENDGRID_API_KEY.substring(0, 7) + '....',
          length: process.env.SENDGRID_API_KEY.length
        }
      };
    } else {
      return {
        success: false,
        message: 'SendGrid API key has invalid format',
        keyInfo: {
          prefix: process.env.SENDGRID_API_KEY.substring(0, 4) + '....',
          length: process.env.SENDGRID_API_KEY.length
        }
      };
    }
  } catch (error) {
    return {
      success: false,
      message: 'Error testing SendGrid API key',
      error: error.message
    };
  }
}

/**
 * Send email notification for contact form submissions
 */
async function sendContactFormEmail({ name, email, company, message }) {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('SendGrid API key not found, cannot send email');
    return { 
      success: false, 
      error: 'Email service not configured'
    };
  }

  try {
    // Simplified email content
    const emailContent = {
      to: 'recipients@anchoredup.org', // This should be configurable
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

    // Send email
    await sgMail.send(emailContent);

    return { 
      success: true 
    };
  } catch (error) {
    console.error('SendGrid error:', error);
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