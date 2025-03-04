
/**
 * Email service for contact form
 */

/**
 * Tests if the SendGrid API is configured and working
 * @returns {Promise<Object>} Result of the test
 */
export async function testSendGridApiKey() {
  try {
    const response = await fetch('/api/health');
    if (!response.ok) {
      return { 
        success: false, 
        error: `API server returned ${response.status}` 
      };
    }
    
    const data = await response.json();
    
    if (!data.sendgridConfigured) {
      return { 
        success: false, 
        error: 'SendGrid API key is not configured on the server' 
      };
    }
    
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error.message || 'Failed to connect to API server'
    };
  }
}

/**
 * Sends a contact form submission
 * @param {Object} formData - The form data to send
 * @returns {Promise<Object>} Result of the submission
 */
export async function sendContactEmail(formData) {
  try {
    // Log the data being sent
    console.log('Sending form data to API:', formData);
    
    // Update the API URL to use the Replit domain
    // Get the current hostname and construct the API URL
    const hostname = window.location.hostname;
    const apiUrl = hostname.includes('replit.dev') || hostname.includes('replit.app')
      ? `https://${hostname}/api/contact`  // Use HTTPS with the same domain
      : '/api/contact';                   // For production/deployment
    
    console.log('Using API URL:', apiUrl);
    
    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    // Log the response status and headers for debugging
    console.log('API response status:', response.status);
    console.log('API response headers:', Object.fromEntries([...response.headers]));
    
    // Get the raw response text
    const responseText = await response.text();
    console.log('Raw API response:', responseText);
    
    // Try to parse the response as JSON
    let data;
    try {
      data = responseText ? JSON.parse(responseText) : null;
      console.log('Parsed API response:', data);
    } catch (e) {
      console.error('Failed to parse API response as JSON:', e);
      return {
        success: false,
        error: 'Invalid response from server'
      };
    }
    
    // Check if the request was successful
    if (!response.ok) {
      return {
        success: false,
        error: data?.error || `Server returned error: ${response.status}`
      };
    }
    
    // Return the result
    return {
      success: data?.success === true,
      message: data?.message || 'Message sent successfully',
      error: data?.error || null
    };
  } catch (error) {
    console.error('Contact form API error:', error);
    return {
      success: false,
      error: error.message || 'Failed to send message'
    };
  }
}
