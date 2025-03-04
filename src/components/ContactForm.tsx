
import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<{
    status: 'idle' | 'submitting' | 'success' | 'error';
    message: string;
  }>({
    status: 'idle',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        status: 'error',
        message: 'Please fill in all required fields.'
      });
      return;
    }
    
    setFormStatus({
      status: 'submitting',
      message: 'Submitting your message...'
    });
    
    console.log('Submitting form:', formData);
    
    try {
      // Use fetch with improved error handling
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      console.log('Response status:', response.status);
      
      // First try to get the raw response text for debugging
      let responseText;
      try {
        responseText = await response.text();
        console.log('Raw response:', responseText);
      } catch (textError) {
        console.error('Error getting response text:', textError);
      }
      
      // Then parse the response as JSON if possible
      let responseData;
      if (responseText) {
        try {
          responseData = JSON.parse(responseText);
        } catch (parseError) {
          console.error('Error parsing response as JSON:', parseError);
        }
      }
      
      if (response.ok && responseData?.success) {
        // Handle success
        setFormStatus({
          status: 'success',
          message: responseData.message || 'Your message has been sent successfully!'
        });
        
        // Reset form data
        setFormData({
          name: '',
          email: '',
          company: '',
          message: ''
        });
      } else {
        // Handle error with detailed message
        const errorMessage = responseData?.message || 
                            'Something went wrong. Please try again later.';
        
        setFormStatus({
          status: 'error',
          message: errorMessage
        });
      }
    } catch (error) {
      console.error('Network error submitting form:', error);
      
      setFormStatus({
        status: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Contact Us</h2>
      
      {formStatus.status === 'success' ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <p>{formStatus.message}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {formStatus.status === 'error' && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p>{formStatus.message}</p>
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="company" className="block text-gray-700 font-medium mb-1">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 font-medium mb-1">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>
          
          <button
            type="submit"
            disabled={formStatus.status === 'submitting'}
            className={`w-full py-2 px-4 ${
              formStatus.status === 'submitting'
                ? 'bg-gray-400'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white font-medium rounded-md transition duration-200`}
          >
            {formStatus.status === 'submitting' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
