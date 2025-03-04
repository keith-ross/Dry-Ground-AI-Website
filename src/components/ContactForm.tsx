import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface ContactFormProps {
  className?: string;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface SubmitResult {
  success: boolean | null;
  message: string;
  error?: any;
}

const ContactForm: React.FC<ContactFormProps> = ({ className = '' }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<SubmitResult>({
    success: null,
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult({ success: null, message: '' });

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
      console.log('Response:', data);

      if (response.ok) {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
        setResult({
          success: true,
          message: 'Your message has been sent successfully. We will get back to you soon!'
        });
      } else {
        toast.error('Failed to send message: ' + (data.error || 'Unknown error'));
        setResult({
          success: false,
          message: data.error || 'Something went wrong. Please try again later.',
          error: data
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error submitting form');
      setResult({
        success: false,
        message: 'Failed to connect to the server. Please try again later.',
        error
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-gray-900 rounded-lg p-6 shadow-lg ${className}`}>
      <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white"
            placeholder="Your message here..."
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isSubmitting ? 'bg-indigo-700' : 'bg-indigo-600 hover:bg-indigo-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>

      {result.success === true && (
        <div className="mt-4 p-3 bg-green-800 rounded text-white">
          {result.message}
        </div>
      )}

      {result.success === false && (
        <div className="mt-4 p-3 bg-red-800 rounded text-white">
          {result.message}
        </div>
      )}
    </div>
  );
};

export default ContactForm;