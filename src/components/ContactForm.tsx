import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface ContactFormProps {
  className?: string;
}

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

const ContactForm: React.FC<ContactFormProps> = ({ className = '' }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error for this field if it exists
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const validationErrors: FormErrors = {};

    if (!formData.name.trim()) {
      validationErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = 'Email is invalid';
    }

    if (!formData.message.trim()) {
      validationErrors.message = 'Message is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear any previous errors
    setErrors({});

    // Set submitting state
    setStatus('submitting');

    try {
      console.log('Submitting form: ', formData);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Form submission response status:', response.status);

      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        let errorMessage = 'Server error. Please try again later.';
        try {
          // Try to parse the error response as JSON
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (parseError) {
          console.error('Error parsing error response:', parseError);
        }

        setStatus('error');
        setErrorMessage(errorMessage);
        return;
      }

      // Handle successful response
      try {
        const data = await response.json();
        setStatus('success');
        const reset = () => {
          setFormData({
            name: '',
            email: '',
            company: '',
            message: ''
          });
          setTimeout(() => {
            setStatus('idle');
          }, 5000);
        };
        reset();

        // Log detailed information for debugging
        if (data.adminEmailSent === false || data.userEmailSent === false) {
          console.warn('Form submitted but some emails failed to send', data);
        }
      } catch (jsonError) {
        console.error('Error parsing success response:', jsonError);
        // Still mark as success if the response was 200 OK
        setStatus('success');
        const reset = () => {
          setFormData({
            name: '',
            email: '',
            company: '',
            message: ''
          });
          setTimeout(() => {
            setStatus('idle');
          }, 5000);
        };
        reset();
      }
    } catch (error) {
      console.error('Error submitting form: ', error);
      setStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
      setTimeout(() => {
        setStatus('idle');
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <div className={className}>
      <h3 className="text-xl font-semibold text-white mb-4">Get in Touch</h3>

      {status === 'success' ? (
        <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 text-green-200">
          <p className="font-medium">Thank you for your message!</p>
          <p className="text-sm mt-1">We'll get back to you as soon as possible.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {status === 'error' && (
            <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-200">
              <p className="font-medium">Submission failed</p>
              <p className="text-sm mt-1">{errorMessage || 'Please try again or contact us directly.'}</p>
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Your Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full bg-brand-darker text-white px-4 py-2 rounded-md border ${
                errors.name ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-brand-primary`}
              disabled={status === 'submitting'}
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email Address*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full bg-brand-darker text-white px-4 py-2 rounded-md border ${
                errors.email ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-brand-primary`}
              disabled={status === 'submitting'}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
              Company (Optional)
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full bg-brand-darker text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-primary"
              disabled={status === 'submitting'}
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
              Message*
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className={`w-full bg-brand-darker text-white px-4 py-2 rounded-md border ${
                errors.message ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-brand-primary`}
              disabled={status === 'submitting'}
            />
            {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full py-2.5 px-4 bg-brand-primary hover:bg-brand-primary/90 text-white font-medium rounded-md flex items-center justify-center transition-colors disabled:opacity-70"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </>
            )}
          </button>

          <p className="text-gray-400 text-xs">* Required fields</p>
        </form>
      )}
    </div>
  );
};

export default ContactForm;