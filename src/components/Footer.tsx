import React from 'react';
import { Mail } from 'lucide-react';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const Footer = () => {
  React.useEffect(() => {
    // Remove any existing elements
    const existingScript = document.querySelector('script[src="https://elevenlabs.io/convai-widget/index.js"]');
    const existingAgent = document.querySelector('elevenlabs-convai');
    if (existingScript) existingScript.remove();
    if (existingAgent) existingAgent.remove();

    // Add the agent element
    const agent = document.createElement('elevenlabs-convai');
    agent.setAttribute('agent-id', 'Zf5qHjvSmfkmqR4p4001');
    document.body.appendChild(agent);

    // Add the script
    const script = document.createElement('script');
    script.src = 'https://elevenlabs.io/convai-widget/index.js';
    script.async = true;
    script.type = 'text/javascript';
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
      if (document.body.contains(agent)) document.body.removeChild(agent);
    };
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