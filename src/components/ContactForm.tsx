import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Send, X } from 'lucide-react';

interface ContactFormProps {
  className?: string;
}

export default function ContactForm({ className = '' }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    smsConsent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // Added state for submission status
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    smsConsent: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setErrors(prev => ({...prev, [name]: ''})); //clear error on change
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
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
    let formErrors = {name: '', email: '', phone: '', message: '', smsConsent: ''};

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
    if (!formData.smsConsent) {
      formErrors.smsConsent = 'You must consent to receive communications via SMS, email, and phone';
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
        setIsSubmitted(true); // Set submitted to true
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
    <>
      {!isSubmitted && ( // Conditionally render the form
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
          <div className="space-y-3">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="communicationConsent"
                name="smsConsent"
                checked={formData.smsConsent}
                onChange={handleChange}
                required
                className="mt-1 h-4 w-4 text-brand-primary bg-gray-800 border-gray-700 rounded focus:ring-brand-primary focus:ring-2"
              />
              <div className="ml-3 text-sm">
                <label htmlFor="communicationConsent" className="text-gray-300">
                  <span className="font-medium">I consent to receive communications via SMS, email, and phone calls.</span>
                  <button
                    type="button"
                    onClick={() => setShowConsentModal(true)}
                    className="ml-2 text-brand-primary hover:text-brand-accent underline"
                  >
                    View full consent details
                  </button>
                </label>
              </div>
            </div>
            {errors.smsConsent && <p className="text-sm text-red-500">{errors.smsConsent}</p>}
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
      )}
      {isSubmitted && ( // Conditionally render success message
        <div className="bg-brand-dark p-6 rounded-xl border border-gray-700 text-center">
          <h3 className="text-xl font-semibold text-gray-100 mb-4">Thank you for reaching out!</h3>
          <p className="text-gray-300">We have received your message and will be in touch soon.</p>
        </div>
      )}

      {/* Consent Modal */}
      {showConsentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-gray-100">Communication Consent Details</h3>
              <button
                onClick={() => setShowConsentModal(false)}
                className="text-gray-400 hover:text-gray-200 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h4 className="font-semibold text-gray-200 mb-2">SMS Text Messages</h4>
                <p className="text-gray-300 text-sm">
                  By providing your phone number and checking the consent box, you agree to receive SMS text messages from Dry Ground AI. 
                  Message and data rates may apply. Message frequency varies based on your interaction with our services. 
                  You can opt out at any time by replying <strong>STOP</strong> to any text message. 
                  For help, reply <strong>HELP</strong>.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-200 mb-2">Email Communications</h4>
                <p className="text-gray-300 text-sm">
                  By providing your email address and checking the consent box, you agree to receive email communications from Dry Ground AI 
                  including but not limited to service updates, newsletters, promotional offers, and responses to your inquiries. 
                  You can unsubscribe from email communications at any time by clicking the unsubscribe link in any email 
                  or by contacting us directly.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-200 mb-2">Phone Calls</h4>
                <p className="text-gray-300 text-sm">
                  By providing your phone number and checking the consent box, you agree to receive phone calls from Dry Ground AI 
                  for purposes including but not limited to customer service, appointment scheduling, follow-up communications, 
                  and service-related discussions. You can request to be removed from our calling list at any time by 
                  informing us during a call or contacting us directly.
                </p>
              </div>
              
              <div className="border-t border-gray-700 pt-4">
                <h4 className="font-semibold text-gray-200 mb-2">Your Rights</h4>
                <p className="text-gray-300 text-sm">
                  You have the right to withdraw your consent at any time. Withdrawing consent will not affect the lawfulness 
                  of processing based on consent before its withdrawal. Communication frequency varies by method and your 
                  engagement with our services.
                </p>
              </div>
              
              <div className="border-t border-gray-700 pt-4">
                <p className="text-gray-300 text-sm">
                  For more information about how we handle your personal data, please review our{' '}
                  <a href="/privacy-policy" className="text-brand-primary hover:text-brand-accent underline">
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a href="/terms-of-service" className="text-brand-primary hover:text-brand-accent underline">
                    Terms of Service
                  </a>.
                </p>
              </div>
            </div>
            <div className="flex justify-end p-4 border-t border-gray-700">
              <button
                onClick={() => setShowConsentModal(false)}
                className="px-4 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-secondary transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}