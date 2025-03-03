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
            <h2 className="text-2xl font-bold text-white">4. Managing Cookies</h2>
            <p className="text-lg text-gray-300">
              Most web browsers allow you to control cookies through their settings. You can usually find these settings in the "Options" or "Preferences" menu of your browser. 
              You can also use the "Help" option in your browser for more details.
            </p>
            <p className="text-lg text-gray-300">
              Please note that if you choose to block or delete cookies, you may not be able to access certain areas or features of our website, 
              and some services may not function properly.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">5. Changes to Our Cookie Policy</h2>
            <p className="text-lg text-gray-300">
              We may update our Cookie Policy from time to time. If we make material changes, we will notify you by posting a notice on our website 
              prior to the change becoming effective.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">6. Contact Information</h2>
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