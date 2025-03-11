
import React, { createContext, useState, useEffect, useContext } from 'react';

interface CookieConsentContextType {
  consentGiven: boolean | null;
  acceptCookies: () => void;
  declineCookies: () => void;
  resetConsent: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType>({
  consentGiven: null,
  acceptCookies: () => {},
  declineCookies: () => {},
  resetConsent: () => {},
});

export const useCookieConsent = () => useContext(CookieConsentContext);

export const CookieConsentProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null);
  
  // Initialize from localStorage on mount
  useEffect(() => {
    const storedConsent = localStorage.getItem('cookieConsent');
    if (storedConsent === 'accepted') {
      setConsentGiven(true);
    } else if (storedConsent === 'declined') {
      setConsentGiven(false);
      // Disable tracking when consent is declined
      disableTracking();
    }
  }, []);
  
  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setConsentGiven(true);
    enableTracking();
  };
  
  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setConsentGiven(false);
    disableTracking();
  };
  
  const resetConsent = () => {
    localStorage.removeItem('cookieConsent');
    setConsentGiven(null);
  };
  
  // Enable REB2B tracking
  const enableTracking = () => {
    // REB2B is already loaded in index.html, nothing to do here
  };
  
  // Disable REB2B tracking
  const disableTracking = () => {
    // Set a flag that can be checked by components before tracking
    window.trackingDisabled = true;
    
    // If REB2B is already loaded, try to prevent it from collecting data
    if (window.reb2b) {
      // This is a simple approach - depending on the tracking service, 
      // you might need a more specific implementation
      window.reb2b.disabled = true;
    }
  };
  
  return (
    <CookieConsentContext.Provider value={{ consentGiven, acceptCookies, declineCookies, resetConsent }}>
      {children}
    </CookieConsentContext.Provider>
  );
};

export default CookieConsentProvider;
