
// src/lib/emailService.js

// Function for client-side to send email via API endpoint
export const sendContactEmail = async (data) => {
  try {
    console.log('Submitting form data:', data);
    
    const response = await fetch('/api/contact', {
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

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(result.error || `Server error: ${response.status}`);
    }

    return result;
  } catch (error) {
    console.error('Form submission exception: ', error);
    return { 
      success: false, 
      error: error.message || 'Failed to submit form',
      details: error.toString()
    };
  }
};
