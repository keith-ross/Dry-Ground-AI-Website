
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

interface SubmitStatus {
  success: boolean | null;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    success: null,
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors for this field as user types
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus({ success: null, message: '' });
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    console.log('Submitting form: ', formData);
    
    try {
      // Use a fixed API URL
      const API_URL = '/api/contact';
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });
      
      console.log('Form submission response status:', response.status);
      
      let responseData;
      let responseText = '';
      
      try {
        // First try to get the response text
        responseText = await response.text();
        console.log('Raw response:', responseText);
        
        // Only attempt to parse if there's actual content
        if (responseText && responseText.trim()) {
          responseData = JSON.parse(responseText);
        } else {
          throw new Error('Empty response from server');
        }
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        throw new Error(`Server returned status ${response.status} with invalid JSON response: ${responseText || 'Empty response'}`);
      }
      
      if (response.ok) {
        // Success - status 2xx
        setSubmitStatus({
          success: true,
          message: responseData?.message || 'Your message has been sent successfully!'
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          message: ''
        });
      } else {
        // Error - status not 2xx
        throw new Error(responseData?.message || `Server error (${response.status})`);
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        success: false,
        message: error.message || 'Something went wrong. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h2 
          className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white"
          variants={itemVariants}
        >
          Get In Touch
        </motion.h2>
        
        {submitStatus.success === true && (
          <motion.div 
            className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p>{submitStatus.message}</p>
          </motion.div>
        )}
        
        {submitStatus.success === false && (
          <motion.div 
            className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p>{submitStatus.message}</p>
            <p className="mt-2 text-sm">Please try again or contact us directly at hello@anchoredup.org</p>
          </motion.div>
        )}
        
        <form onSubmit={handleSubmit}>
          <motion.div className="mb-4" variants={itemVariants}>
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="name">
              Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            />
            {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
          </motion.div>
          
          <motion.div className="mb-4" variants={itemVariants}>
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            />
            {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
          </motion.div>
          
          <motion.div className="mb-4" variants={itemVariants}>
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="company">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              disabled={isSubmitting}
            />
          </motion.div>
          
          <motion.div className="mb-6" variants={itemVariants}>
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="message">
              Message<span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            ></textarea>
            {errors.message && <p className="mt-1 text-red-500 text-sm">{errors.message}</p>}
          </motion.div>
          
          <motion.div className="flex justify-end" variants={itemVariants}>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
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
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactForm;
