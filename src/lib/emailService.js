// src/lib/emailService.js
import sgMail from '@sendgrid/mail';

// Create a version that works in both browser and Node.js environments
const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;

// Initialize the SendGrid client with the API key
export function initSendGrid() {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    console.error('ERROR: SendGrid API key is not set. Email functionality will not work.');
    return false;
  }

  try {
    sgMail.setApiKey(apiKey);
    console.log('SendGrid initialized successfully');
    return true;
  } catch (error) {
    console.error('Failed to initialize SendGrid:', error);
    return false;
  }
}

/**
 * Send contact form data to the backend API
 * @param {Object} formData - Contact form data
 * @returns {Promise<Object>} - Response from the API
 */
export async function sendContactEmail(formData) {
  try {
    // In browser, call the API
    const apiUrl = '/api/contact';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      let errorText = await response.text();
      try {
        const errorJson = JSON.parse(errorText);
        return { success: false, error: errorJson.error || 'Server error' };
      } catch (e) {
        return { success: false, error: errorText || 'Server error' };
      }
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending contact email:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to connect to server' 
    };
  }
}

// Check email service configuration
export function checkEmailConfig() {
  return {
    apiKeyExists: Boolean(process.env.SENDGRID_API_KEY),
    fromEmail: process.env.FROM_EMAIL || 'Not configured',
    adminEmail: process.env.ADMIN_EMAIL || 'Not configured',
    success: Boolean(process.env.SENDGRID_API_KEY && process.env.FROM_EMAIL && process.env.ADMIN_EMAIL)
  };
}