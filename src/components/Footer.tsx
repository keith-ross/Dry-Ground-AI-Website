import React from 'react';
import { Mail } from 'lucide-react';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const Footer = () => {
  React.useEffect(() => {
    try {
      // Cleanup function
      const cleanup = () => {
        document.querySelectorAll('elevenlabs-convai').forEach(el => el.remove());
        document.querySelectorAll('script[src*="elevenlabs"]').forEach(el => el.remove());
        document.querySelectorAll('style[data-elevenlabs]').forEach(el => el.remove());
        const existingContainer = document.getElementById('elevenlabs-widget');
        if (existingContainer) existingContainer.remove();
      };

      cleanup();

      // Add styles to head with more specific selectors
      const style = document.createElement('style');
      style.setAttribute('data-elevenlabs', 'true');
      style.textContent = `
        elevenlabs-convai,
        elevenlabs-convai * {
          --watermark-display: none !important;
        }
        
        elevenlabs-convai [class*="watermark"],
        elevenlabs-convai [class*="powered"],
        elevenlabs-convai [class*="footer"],
        elevenlabs-convai [class*="branding"],
        elevenlabs-convai div[class*="powered-by"],
        elevenlabs-convai div[class*="watermark"],
        elevenlabs-convai div[class*="footer"],
        elevenlabs-convai div[class*="branding"],
        elevenlabs-convai span[class*="powered"],
        elevenlabs-convai a[href*="elevenlabs.io"],
        elevenlabs-convai::part(powered-by),
        elevenlabs-convai::part(watermark),
        elevenlabs-convai::part(footer),
        elevenlabs-convai::part(branding) {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          clip-path: inset(100%) !important;
          clip: rect(0 0 0 0) !important;
          height: 0 !important;
          width: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
          position: absolute !important;
          pointer-events: none !important;
          overflow: hidden !important;
        }
      `;
      document.head.appendChild(style);

      // Create container
      const container = document.createElement('div');
      container.id = 'elevenlabs-widget';
      container.style.position = 'fixed';
      container.style.bottom = '20px';
      container.style.right = '20px';
      container.style.zIndex = '9999';
      document.body.appendChild(container);

      // Add agent
      const agent = document.createElement('elevenlabs-convai');
      agent.setAttribute('agent-id', 'Zf5qHjvSmfkmqR4p4001');
      agent.style.display = 'block';
      container.appendChild(agent);

      // Load script with error handling
      const script = document.createElement('script');
      script.src = 'https://elevenlabs.io/convai-widget/index.js';
      script.async = true;
      script.type = 'text/javascript';
      script.onerror = (error) => {
        console.error('Failed to load ElevenLabs widget script:', error);
      };
      
      // Only append if not already present
      if (!document.querySelector('script[src*="elevenlabs"]')) {
        document.body.appendChild(script);
      }

      return () => {
        cleanup();
      };
    } catch (error) {
      console.error("Error loading ElevenLabs widget:", error);
    }
  }, []);

  return (
    <footer className="bg-brand-darker border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="col-span-1">
            <Logo />
            <p className="mt-4 text-gray-300 max-w-md">
              AI Solutions for Small Businesses
            </p>
            <div className="mt-6">
              <a href="mailto:info@dryground.ai" className="text-gray-400 hover:text-brand-primary transition-colors flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                info@dryground.ai
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Dry Ground AI. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/privacy-policy" className="text-gray-400 hover:text-brand-primary text-sm transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-gray-400 hover:text-brand-primary text-sm transition-colors">Terms of Service</Link>
            <Link to="/cookie-policy" className="text-gray-400 hover:text-brand-primary text-sm transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;