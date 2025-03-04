import axios from 'axios';

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

export async function sendContactEmail(formData: ContactFormData): Promise<{
  success: boolean;
  error?: string;
  details?: any;
}> {
  try {
    // Send the request to our API endpoint
    const response = await axios.post('/api/contact', formData);

    // Return success response
    return { 
      success: true,
      details: response.data
    };
  } catch (error: any) {
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