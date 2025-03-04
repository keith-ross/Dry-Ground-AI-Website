// src/lib/emailService.js
import '@sendgrid/mail'; // Import for type checking but don't use directly

// Function for client-side to send email via API endpoint
export const sendContactEmail = async (data) => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Server error occurred');
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