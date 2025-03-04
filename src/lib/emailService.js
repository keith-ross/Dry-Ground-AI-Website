// src/lib/emailService.js
import sgMail from '@sendgrid/mail';
import axios from 'axios';

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
    console.log('Submitting form data: ', formData);
    // Send the request to our API endpoint
    const response = await axios.post('/api/contact', formData);

    // Return success response
    return { 
      success: true,
      details: response.data
    };
  } catch (error) {
    console.log('Form submission exception: ', error);
    // Handle error responses
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API error response:', error.response.data);
      return { 
        success: false, 
        error: error.response?.data?.error || 'Server error occurred', 
        details: error.response.data 
      };
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      return { 
        success: false, 
        error: 'No response from server. Please try again later.' 
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request setup error:', error.message);
      return { 
        success: false, 
        error: error.message || 'Unknown error sending request' 
      };
    }
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