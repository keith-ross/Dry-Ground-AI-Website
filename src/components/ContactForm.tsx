
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Sending form data: ', formData);
      
      // Get the base URL from the current window location
      const baseUrl = window.location.origin;
      const apiUrl = `${baseUrl}/api/contact`;
      
      console.log('Submitting to:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      
      let responseText = '';
      try {
        responseText = await response.text();
        console.log('Response text:', responseText);
      } catch (e) {
        console.error('Error reading response text:', e);
      }
      
      // Try to parse JSON response if available
      let responseData = {};
      if (responseText) {
        try {
          responseData = JSON.parse(responseText);
          console.log('Response data:', responseData);
        } catch (e) {
          console.error('Error parsing JSON:', e);
        }
      }
      
      if (response.ok) {
        // Success handling
        toast.success(responseData?.message || 'Message sent successfully!');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        // Error handling
        const errorMsg = responseData?.message || 'Failed to send message. Please try again.';
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error('Error submitting form: ', error);
      toast.error('Network error. Please check your connection and try again.');
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
