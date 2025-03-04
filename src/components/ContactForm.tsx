import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import type { ContactFormData } from '../api/types';

interface ContactFormProps {
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ className }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null); // Added state for form status

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);

    try {
      console.log('Sending form data: ', formData);

      // Build the correct API URL based on current location
      const apiUrl = `${window.location.origin}/api/contact`;
      console.log('Submitting to:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        // Add credentials for CORS if needed
        credentials: 'include'
      });

      console.log('Response status:', response.status);

      // Try to parse the response as JSON first
      let responseData;
      const responseText = await response.text();
      console.log('Response text:', responseText);

      try {
        if (responseText) {
          responseData = JSON.parse(responseText);
          console.log('Response data:', responseData);
        }
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
      }

      if (response.ok) {
        setFormStatus({
          type: 'success',
          message: responseData?.message || 'Thank you! Your message has been sent.',
        });
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
      } else {
        // Use the error message from the server if available
        const errorMessage = responseData?.message || 'Error sending message. Please try again later.';
        setFormStatus({
          type: 'error',
          message: errorMessage,
        });
      }
    } catch (error) {
      console.error('Error submitting form: ', error);
      setFormStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={className}>
      <Toaster position="top-right" />
      <h3 className="text-xl font-bold text-white mb-4">Get in Touch</h3>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-brand-darker border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-brand-darker border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            placeholder="your.email@example.com"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-brand-darker border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            placeholder="(123) 456-7890"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
            Message
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 bg-brand-darker border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            placeholder="How can we help you?"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold rounded-md transition-colors ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;