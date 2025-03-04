import sgMail from '@sendgrid/mail';

/**
 * Tests if the SendGrid API key is valid
 * @returns {Promise<boolean>} True if the API key is valid
 */
export async function testSendGridApiKey() {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    return true;
  } catch (error) {
    console.error('Error testing SendGrid API key:', error);
    return false;
  }
}

/**
 * Sends a contact form submission via the API
 * @param {Object} formData - The contact form data
 * @returns {Promise<Object>} The result of the API call
 */
export async function sendContactEmail(formData) {
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