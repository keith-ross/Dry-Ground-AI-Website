
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ContactFormData } from '../api/types';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Phone validation
    const phoneRegex = /^[0-9\-\+\s\(\)]+$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error('Please enter a valid phone number');
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading('Sending your message...');

    try {
      // Send the form data to our API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Parse response text only if content exists
      let data;
      const responseText = await response.text();
      
      if (responseText) {
        data = JSON.parse(responseText);
      }

      if (!response.ok) {
        throw new Error(data?.error || 'Failed to submit the form');
      }

      // Success! Clear the form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });

      toast.success('Message sent successfully!', {
        id: toastId,
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again later.', {
        id: toastId,
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
            placeholder="Your phone number"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-brand-darker border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            placeholder="Your message"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand-primary hover:bg-brand-primary-dark text-white font-medium py-2 px-4 rounded-md transition duration-300 disabled:opacity-50"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
