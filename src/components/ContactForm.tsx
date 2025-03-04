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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Sending form data: ', formData);

      // Use relative URL for API endpoint to work with Vite proxy
      const apiUrl = '/api/contact';
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
        toast.success('Message sent successfully!');
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
          className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 shadow-sm py-2 px-3 text-gray-200 focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
        />
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
          className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 shadow-sm py-2 px-3 text-gray-200 focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
          Phone (optional)
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 shadow-sm py-2 px-3 text-gray-200 focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
        />
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
          className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 shadow-sm py-2 px-3 text-gray-200 focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
        />
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