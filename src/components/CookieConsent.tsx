
import React, { useState, useEffect } from 'react';
import { useCookieConsent } from '../context/CookieConsentContext';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const { consentGiven, acceptCookies, declineCookies } = useCookieConsent();

  useEffect(() => {
    // Show banner if consent status is not determined yet
    if (consentGiven === null) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [consentGiven]);

  const handleAccept = () => {
    acceptCookies();
    setVisible(false);
  };

  const handleDecline = () => {
    declineCookies();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 shadow-lg border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0 md:mr-4">
            <p className="text-sm md:text-base">
              We use cookies to enhance your experience on our website. By continuing to use our site, you consent to our use of cookies.
              Please read our <a href="/cookie-policy" className="text-brand-primary underline">Cookie Policy</a> and <a href="/privacy-policy" className="text-brand-primary underline">Privacy Policy</a> for more information.
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 rounded-md transition"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 text-sm font-medium text-white bg-brand-primary hover:bg-brand-accent rounded-md transition"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
