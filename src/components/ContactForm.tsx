
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import toast from 'react-hot-toast';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill out all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Message sent successfully!');
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          message: ''
        });
      } else {
        toast.error(data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred while sending your message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-300">
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? (
            'Sending...'
          ) : (
            <>
              Send Message <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
