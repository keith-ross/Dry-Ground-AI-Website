import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Send } from 'lucide-react';

interface ContactFormProps {
  className?: string;
}

export default function ContactForm({ className = '' }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({...prev, [name]: ''})); //clear error on change
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+?[\d\s-()]{10,}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let formErrors = {name: '', email: '', phone: '', message: ''};

    if (!formData.name) {
      formErrors.name = 'Name is required';
    }
    if (!validateEmail(formData.email)) {
      formErrors.email = 'Please enter a valid email address';
    }
    if (!formData.email) {
      formErrors.email = 'Email is required';
    }
    if (!validatePhone(formData.phone)) {
      formErrors.phone = 'Please enter a valid phone number (minimum 10 digits)';
    }
    if (!formData.phone) {
      formErrors.phone = 'Phone number is required';
    }
    if (!formData.message) {
      formErrors.message = 'Message is required';
    }

    setErrors(formErrors);

    if (Object.values(formErrors).some(err => err !== '')) return;


    setIsSubmitting(true);

    try {
      console.log('Sending form data: ', formData);

      // Determine if we're in production based on the URL
      const isProduction = window.location.hostname.includes('replit.app');

      // In production, use the full URL; in development, use the relative URL
      const apiUrl = isProduction 
        ? `${window.location.origin}/api/contact` 
        : '/api/contact';

      console.log('Submitting to:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      console.log('Response status:', response.status);

      const data = await response.json().catch(() => null);
      console.log('Response data:', data);
      
      if (response.ok) {
        toast.success(
          data.message || 'Thank you for your message! We will be in contact with you shortly.',
          {
            duration: 5000,
            style: {
              background: '#10B981',
              color: '#fff',
              padding: '16px',
            }
          }
        );
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        toast.error(data?.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Connection error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${className} space-y-4`}>
      <h3 className="text-xl font-semibold text-gray-100">Send Us a Message</h3>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className={`mt-1 block w-full rounded-md bg-gray-800 border ${errors.name ? 'border-red-500' : 'border-gray-700'} shadow-sm py-2 px-3 text-gray-200 focus:ring-brand-primary focus:border-brand-primary sm:text-sm`}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={`mt-1 block w-full rounded-md bg-gray-800 border ${errors.email ? 'border-red-500' : 'border-gray-700'} shadow-sm py-2 px-3 text-gray-200 focus:ring-brand-primary focus:border-brand-primary sm:text-sm`}
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className={`mt-1 block w-full rounded-md bg-gray-800 border ${errors.phone ? 'border-red-500' : 'border-gray-700'} shadow-sm py-2 px-3 text-gray-200 focus:ring-brand-primary focus:border-brand-primary sm:text-sm`}
        />
        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          required
          className={`mt-1 block w-full rounded-md bg-gray-800 border ${errors.message ? 'border-red-500' : 'border-gray-700'} shadow-sm py-2 px-3 text-gray-200 focus:ring-brand-primary focus:border-brand-primary sm:text-sm`}
        />
        {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-primary hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:opacity-70"
      >
        {isSubmitting ? 'Sending...' : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}