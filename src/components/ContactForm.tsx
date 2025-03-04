import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface SubmitResult {
  success: boolean | null;
  message: string;
  error?: any;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitResult, setSubmitResult] = useState<SubmitResult>({
    success: null,
    message: ''
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field if it exists
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset submit result
    setSubmitResult({
      success: null,
      message: ''
    });
    
    // Validate form before submission
    if (!validateForm()) {
      setSubmitResult({
        success: false,
        message: 'Please fix the errors in the form.'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Use the API endpoint from the correct port
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Clear form on success
        setFormData({
          name: '',
          email: '',
          company: '',
          message: ''
        });
        
        setSubmitResult({
          success: true,
          message: data.message || 'Thank you for your message! We will get back to you soon.'
        });
      } else {
        throw new Error(data.message || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitResult({
        success: false,
        message: error.message || 'An error occurred while submitting the form. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Submitting form data:', formData);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Response from server:', data);

      if (response.ok && data.success) {
        setSubmitResult({ 
          success: true, 
          message: data.message || 'Thank you for your message! We will get back to you soon.'
        });
        // Reset form on success
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        const errorMsg = data.message || `Server error (${response.status})`;
        console.error('Form submission error:', errorMsg);
        throw new Error(errorMsg);
      }
    } catch (error) {
      console.error('Error submitting form:', error);

      let errorMessage = 'Failed to submit the form. Please try again later.';

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      setSubmitResult({ 
        success: false, 
        message: errorMessage,
        error: error
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>

      {submitResult.success === true && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 border border-green-400 rounded">
          {submitResult.message}
        </div>
      )}

      {submitResult.success === false && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded">
          <p><strong>Error:</strong> {submitResult.message}</p>
          {submitResult.error && 
            <p className="text-sm mt-1">
              Please try again or contact us directly at info@dryground.ai
            </p>
          }
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="company" className="block text-gray-700 font-medium mb-2">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;