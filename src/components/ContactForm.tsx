import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sendContactEmail } from '../lib/emailService.js';

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const initialFormState = {
    name: '',
    email: '',
    company: '',
    message: ''
  };

  const [formStatus, setFormStatus] = useState<{
    loading: boolean;
    success: boolean | null;
    error: string | null;
  }>({
    loading: false,
    success: null,
    error: null
  });

  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  const validateForm = (): { [key: string]: string } => {
    const errors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }

    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear validation error for this field when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset status
    setFormStatus({ loading: true, success: false, error: null });

    // Validate form
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setFormStatus({ loading: false, success: false, error: 'Please fix the form errors' });
      return;
    }

    // Clear validation errors
    setValidationErrors({});

    try {
      console.log('Submitting form data:', formData);

      // Submit form
      const result = await sendContactEmail(formData);
      console.log('API result:', result);

      if (result.success) {
        // Reset form
        setFormData(initialFormState);
        setFormStatus({ loading: false, success: true, error: null });
        console.log('Form submitted successfully:', result);
      } else {
        // Handle error
        console.error('Form submission error:', result.error);
        setFormStatus({ loading: false, success: false, error: result.error || 'Failed to send message' });
      }
    } catch (error) {
      console.error('Form submission exception:', error);
      setFormStatus({ 
        loading: false, 
        success: false, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred' 
      });
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form status message */}
        {formStatus.error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-md bg-red-100 text-red-800`}
          >
            {formStatus.error}
          </motion.div>
        )}
        {formStatus.success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-md bg-green-100 text-green-800`}
          >
            Your message has been sent successfully!
          </motion.div>
        )}

        {/* Name input */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-100">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 bg-gray-750 border ${
              validationErrors.name ? 'border-red-500' : 'border-gray-600'
            } rounded-md shadow-sm text-gray-100 focus:outline-none focus:ring-brand-primary focus:border-brand-primary`}
          />
          {validationErrors.name && (
            <p className="mt-1 text-sm text-red-500">{validationErrors.name}</p>
          )}
        </div>

        {/* Email input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-100">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 bg-gray-750 border ${
              validationErrors.email ? 'border-red-500' : 'border-gray-600'
            } rounded-md shadow-sm text-gray-100 focus:outline-none focus:ring-brand-primary focus:border-brand-primary`}
          />
          {validationErrors.email && (
            <p className="mt-1 text-sm text-red-500">{validationErrors.email}</p>
          )}
        </div>

        {/* Company input */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-100">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-gray-750 border border-gray-600 rounded-md shadow-sm text-gray-100 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
          />
        </div>

        {/* Message textarea */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-100">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            value={formData.message}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 bg-gray-750 border ${
              validationErrors.message ? 'border-red-500' : 'border-gray-600'
            } rounded-md shadow-sm text-gray-100 focus:outline-none focus:ring-brand-primary focus:border-brand-primary`}
          />
          {validationErrors.message && (
            <p className="mt-1 text-sm text-red-500">{validationErrors.message}</p>
          )}
        </div>

        {/* Submit button */}
        <div>
          <motion.button
            type="submit"
            disabled={formStatus.loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-brand-primary hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition duration-150 ${
              formStatus.loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {formStatus.loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : (
              'Send Message'
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;