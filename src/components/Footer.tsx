import React from 'react';
import { Mail } from 'lucide-react';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const Footer = () => {
  React.useEffect(() => {
    // Initialize the chatbot script
    window.VG_CONFIG = {
      ID: "2uuwikul2u04ke1f", // YOUR AGENT ID
      region: 'na', // YOUR ACCOUNT REGION 
      render: 'bottom-right', // can be 'full-width' or 'bottom-left' or 'bottom-right'
      stylesheets: [
        // Base TIXAE Agents CSS
        "https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css",
      ],
    };
    
    const VG_SCRIPT = document.createElement("script");
    VG_SCRIPT.src = "https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js";
    VG_SCRIPT.defer = true;
    document.body.appendChild(VG_SCRIPT);
    
    // Cleanup function to remove the script when component unmounts
    return () => {
      if (document.body.contains(VG_SCRIPT)) {
        document.body.removeChild(VG_SCRIPT);
      }
    };
  }, []);

  return (
    <footer className="bg-brand-darker border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="col-span-1">
            <Logo />
            <p className="mt-4 text-gray-300 max-w-md">
              We help new SMB owners with chaotic and inefficient operations get more sleep by leveraging AI to fast track stability and clarity.
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
      
      <div style={{ width: 0, height: 0 }} id="VG_OVERLAY_CONTAINER">
        {/* Here is where TIXAE Agents renders the widget. */}
        {/* Set render to 'full-width' then adjust the width and height to 500px (for example) to render the chatbot itself without the popup. */}
      </div>
    </footer>
  );
};

export default Footer;