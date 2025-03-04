
// Initialize SendGrid
const sgMail = require('@sendgrid/mail');

// Get the SendGrid API key from environment variables
const apiKey = process.env.SENDGRID_API_KEY;

// Configure SendGrid if API key is available
if (apiKey) {
  sgMail.setApiKey(apiKey);
  console.log('SendGrid API key: Present and length:', apiKey.length);
  console.log('Key prefix:', apiKey.substring(0, 5) + '....');
} else {
  console.error('SENDGRID_API_KEY is not set in environment variables');
}

/**
 * Test if the SendGrid API key is configured and valid
 */
async function testSendGridApiKey() {
  if (!apiKey) {
    return { 
      success: false, 
      error: 'SendGrid API key is not configured' 
    };
  }
  
  // A valid SendGrid API key starts with "SG." and is typically 69 characters long
  if (!apiKey.startsWith('SG.') || apiKey.length < 50) {
    return { 
      success: false, 
      error: 'SendGrid API key format appears to be invalid' 
    };
  }
  
  return { success: true };
}

/**
 * Send an email notification for contact form submissions
 */
async function sendContactFormEmail({ name, email, company, message }) {
  // Check if SendGrid is configured
  if (!apiKey) {
    return { 
      success: false, 
      error: 'Email service is not configured' 
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

    console.log('Sending email via SendGrid...');
    
    // Send email
    const response = await sgMail.send(emailContent);
    console.log('SendGrid API response:', response[0].statusCode);

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
