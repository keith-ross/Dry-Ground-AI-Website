
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
 * Send contact form email
 * @param {Object} formData - Form data containing name, email, and message
 * @returns {Promise<Object>} - Result of the email sending operation
 */
async function sendContactEmail(formData) {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.error || 'Failed to send message'
      };
    }
    
    const data = await response.json();
    return {
      success: true,
      data
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'An unexpected error occurred'
    };
  }
}

// Using ES modules style export for compatibility with TypeScript imports
module.exports.testSendGridApiKey = testSendGridApiKey;
module.exports.sendContactEmail = sendContactEmail;
