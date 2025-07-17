import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AIVelocityPage from './pages/AIVelocityPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import CookieConsent from './components/CookieConsent';
import CookieConsentProvider from './context/CookieConsentContext';
import PropertyManagementDemo from './pages/PropertyManagementDemo';
import HealthcareDemo from './pages/HealthcareDemo';
import DemosPage from './pages/DemosPage';

function App() {
  return (
    <CookieConsentProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ai-velocity" element={<AIVelocityPage />} />
          <Route path="/demos" element={<DemosPage />} />
          <Route path="/property-management-demo" element={<PropertyManagementDemo />} />
          <Route path="/healthcare-demo" element={<HealthcareDemo />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
        </Routes>
        <CookieConsent />
      </Router>
    </CookieConsentProvider>
  );
}

export default App;