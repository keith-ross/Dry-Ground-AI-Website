
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-brand-darker text-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-extrabold text-white mb-8">Cookie Policy</h1>
        
        <div className="space-y-8">
          <p className="text-lg text-gray-300">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">1. What Are Cookies</h2>
            <p className="text-lg text-gray-300">
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
              They are widely used to make websites work more efficiently and provide information to the owners of the site.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">2. How We Use Cookies</h2>
            <p className="text-lg text-gray-300">We use cookies for several purposes, including:</p>
            <ul className="list-disc pl-6 text-lg text-gray-300 space-y-2">
              <li><span className="font-semibold">Essential cookies:</span> These cookies are necessary for the website to function properly and cannot be switched off in our systems.</li>
              <li><span className="font-semibold">Performance cookies:</span> These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.</li>
              <li><span className="font-semibold">Functionality cookies:</span> These cookies enable the website to provide enhanced functionality and personalization.</li>
              <li><span className="font-semibold">Targeting cookies:</span> These cookies may be set through our site by our advertising partners to build a profile of your interests.</li>
            </ul>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">3. Types of Cookies We Use</h2>
            <p className="text-lg text-gray-300">The types of cookies we use on our website include:</p>
            <ul className="list-disc pl-6 text-lg text-gray-300 space-y-2">
              <li><span className="font-semibold">Session cookies:</span> These are temporary cookies that expire when you close your browser.</li>
              <li><span className="font-semibold">Persistent cookies:</span> These remain on your device until they expire or you delete them.</li>
              <li><span className="font-semibold">First-party cookies:</span> These are cookies set by our website.</li>
              <li><span className="font-semibold">Third-party cookies:</span> These are cookies set by domains other than our website, such as analytics services.</li>
            </ul>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">4. Specific Cookies We Use</h2>
            <p className="text-lg text-gray-300">Here is a list of the main cookies we use:</p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Cookie Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Purpose</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Duration</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">cookieConsent</td>
                    <td className="px-4 py-3 text-sm text-gray-300">Stores your cookie consent preferences</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">1 year</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">Essential</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">_ga</td>
                    <td className="px-4 py-3 text-sm text-gray-300">Used by Google Analytics to distinguish users</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">2 years</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">Performance</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">_gid</td>
                    <td className="px-4 py-3 text-sm text-gray-300">Used by Google Analytics to distinguish users</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">24 hours</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">Performance</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">_gat</td>
                    <td className="px-4 py-3 text-sm text-gray-300">Used by Google Analytics to throttle request rate</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">1 minute</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">Performance</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">5. Managing Cookies</h2>
            <p className="text-lg text-gray-300">
              Most web browsers allow you to control cookies through their settings. You can usually find these settings in the "Options" or "Preferences" menu of your browser. 
              You can also use the "Help" option in your browser for more details.
            </p>
            <p className="text-lg text-gray-300">
              Below are links to instructions on how to manage cookies in common browsers:
            </p>
            <ul className="list-disc pl-6 text-lg text-gray-300 space-y-2">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:text-brand-accent">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:text-brand-accent">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:text-brand-accent">Safari</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:text-brand-accent">Microsoft Edge</a></li>
            </ul>
            <p className="text-lg text-gray-300">
              Please note that if you choose to block or delete cookies, you may not be able to access certain areas or features of our website, 
              and some services may not function properly.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">6. Third-Party Cookies</h2>
            <p className="text-lg text-gray-300">
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics, deliver advertisements, and so on. These cookies may track your browsing habits across different websites and online services.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">7. Changes to Our Cookie Policy</h2>
            <p className="text-lg text-gray-300">
              We may update our Cookie Policy from time to time. If we make material changes, we will notify you by posting a notice on our website 
              prior to the change becoming effective.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">8. Contact Information</h2>
            <p className="text-lg text-gray-300">
              If you have any questions about our Cookie Policy, please contact us at:
              <br />
              <a href="mailto:info@dryground.ai" className="text-brand-primary hover:text-brand-accent transition-colors">info@dryground.ai</a>
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
