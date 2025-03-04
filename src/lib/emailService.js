
const sgMail = require('@sendgrid/mail');

/**
 * Test if the SendGrid API key is configured correctly
 * @returns {Object} Result of the test
 */
async function testSendGridApiKey() {
  try {
    const apiKey = process.env.SENDGRID_API_KEY;

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
  } catch (error) {
    return { 
      success: false, 
      error: error.message || 'Unknown error testing SendGrid API key'
    };
  }
}

/**
 * Send an email using SendGrid
 * @param {Object} data Form data from the contact form
 * @returns {Object} Result of the email sending operation
 */
async function sendContactFormEmail(data) {
  try {
    const { name, email, company, message } = data;
    
    // Set the API key
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error('SendGrid API key is not configured');
    }
    
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
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
