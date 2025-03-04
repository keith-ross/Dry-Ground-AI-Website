/**
 * Email service for contact form
 */

/**
 * Send contact form data to the API
 * @param {Object} formData - Form data containing name, email, company, and message
 * @returns {Promise<Object>} Result of sending the email
 */
export async function sendContactEmail(formData) {
  console.log('Submitting form data:', formData);

  try {
    // Use relative API URL for both local and production environments
    const apiUrl = '/api/contact';
    console.log('Sending form data to API:', formData);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData),
    });

    console.log('API response status:', response.status);

    // Handle non-JSON responses gracefully
    const responseText = await response.text();
    console.log('Raw API response:', responseText);

    let data;
    try {
      // Only try to parse if there's actual content
      if (responseText && responseText.trim()) {
        data = JSON.parse(responseText);
        console.log('Parsed API response:', data);
      } else {
        console.log('Empty API response');
        return { 
          success: false, 
          error: 'Empty response from server' 
        };
      }
    } catch (e) {
      console.error('Failed to parse API response as JSON:', e);
      return { 
        success: false, 
        error: 'Invalid response from server' 
      };
    }

    if (!response.ok) {
      return { 
        success: false, 
        error: data?.error || `Server returned error: ${response.status}` 
      };
    }

    return { 
      success: true, 
      message: data?.message || 'Message sent successfully' 
    };
  } catch (error) {
    console.error('Contact form API error:', error);
    return {
      success: false, 
      error: error.message || 'Failed to fetch'
    };
  }
}

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
 * Send contact form data to the API
 * @param {Object} formData The form data to send
 * @returns {Promise<Object>} Result of the API call
 */
export async function submitContactForm(formData) {
  try {
    console.log('Submitting form data:', formData);
    
    // Determine the API URL based on the current environment
    // Get the current URL from the window location
    const currentUrl = window.location.href;
    const currentDomain = window.location.hostname;
    
    // Determine the base URL for the API
    let apiBase;
    if (currentDomain.includes('replit.dev')) {
      // If running on Replit, use the same domain but different port
      apiBase = `${window.location.protocol}//${currentDomain}`;
    } else {
      apiBase = ''; // Use relative URL for production
    }
    
    // Build the full API URL
    const apiUrl = `${apiBase}/api/contact`;
    
    console.log('Using API URL:', apiUrl);
    
    // Send the request to the API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    console.log('API response status:', response.status);
    console.log('API response headers:', response.headers);
    
    // Get the raw response text
    const responseText = await response.text();
    console.log('Raw API response:', responseText);
    
    // Try to parse the response as JSON
    let data;
    try {
      data = JSON.parse(responseText);
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

/**
 * Send email to the admin with contact form data
 * This function would typically be called from the server
 */
export async function sendAdminNotificationEmail({ name, email, company, message }) {
  // This is a server-side function mock
  // In a real implementation, this would use SendGrid or another email service
  console.log('Would send admin notification email with:', { name, email, company, message });
  
  // Check for SendGrid API key
  if (!process.env.SENDGRID_API_KEY) {
    return {
      success: false,
      error: 'SendGrid API key is not configured'
    };
  }
  
  // In a real implementation, this would send an actual email
  return {
    success: true,
    message: 'Admin notification email sent'
  };
}

/**
 * Send confirmation email to the user
 * This function would typically be called from the server
 */
export async function sendContactConfirmationEmail({ name, email }) {
  // This is a server-side function mock
  // In a real implementation, this would use SendGrid or another email service
  console.log('Would send confirmation email to:', { name, email });
  
  // Check for SendGrid API key
  if (!process.env.SENDGRID_API_KEY) {
    return {
      success: false,
      error: 'SendGrid API key is not configured'
    };
  }
  
  // In a real implementation, this would send an actual email
  return {
    success: true,
    message: 'Confirmation email sent to user'
  };
}