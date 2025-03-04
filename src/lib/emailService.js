
// src/lib/emailService.js

// Function for client-side to send email via API endpoint
export const sendContactEmail = async (data) => {
  try {
    console.log('Submitting form data:', data);
    
    // Determine the correct API URL based on the environment
    let apiUrl;
    
    if (window.location.hostname === 'localhost') {
      // Local development
      apiUrl = 'http://localhost:3001/api/contact';
    } else if (window.location.hostname.includes('replit.dev')) {
      // Replit development environment
      // Replace the subdomain portion for API requests
      const replitId = window.location.hostname.split('.')[0];
      // Extract the base ID without the "-00-" part
      const baseId = replitId.replace('-00-', '-');
      // Construct API URL with "-01-" for the API server
      const apiHostname = baseId.replace('-', '-01-');
      apiUrl = `${window.location.protocol}//${apiHostname}.${window.location.hostname.split('.').slice(1).join('.')}/api/contact`;
    } else {
      // Production environment - use relative URL
      apiUrl = '/api/contact';
    }
    
    console.log('Using API URL:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Check if the response is empty
    const responseText = await response.text();
    if (!responseText) {
      throw new Error('Empty response from server');
    }

    // Try to parse the response as JSON
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse server response:', responseText);
      throw new Error(`Invalid JSON response: ${parseError.message}`);
    }

    console.log('API result:', result);
    
    if (!result.success) {
      throw new Error(result.error || 'Unknown error');
    }
    
    return result;
  } catch (error) {
    console.error('Form submission error:', error.message);
    return {
      success: false,
      error: error.message || 'Unknown error',
      details: error.toString()
    };
  }
};
