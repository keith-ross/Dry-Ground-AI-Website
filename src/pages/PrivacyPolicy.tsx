import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-brand-darker text-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-extrabold text-white mb-8">Privacy Policy</h1>
        
        <div className="space-y-8">
          <p className="text-lg text-gray-300">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">1. Introduction</h2>
            <p className="text-lg text-gray-300">
              Dry Ground AI ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
              or use our services.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">2. Information We Collect</h2>
            <p className="text-lg text-gray-300">We may collect several types of information from and about users of our website, including:</p>
            <ul className="list-disc pl-6 text-lg text-gray-300 space-y-2">
              <li>Personal identifiers such as name, email address, phone number, and company name</li>
              <li>Information provided when filling out forms on our website</li>
              <li>Records of correspondence if you contact us</li>
              <li>Details of your visits to our website including traffic data, location data, and other communication data</li>
            </ul>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">3. How We Use Your Information</h2>
            <p className="text-lg text-gray-300">We may use the information we collect about you for various purposes, including:</p>
            <ul className="list-disc pl-6 text-lg text-gray-300 space-y-2">
              <li>Providing, maintaining, and improving our website and services</li>
              <li>Responding to your requests, questions, and comments</li>
              <li>Sending you technical notices, updates, and administrative messages</li>
              <li>Providing you with information about our services that may interest you</li>
              <li>Monitoring and analyzing trends, usage, and activities in connection with our website</li>
            </ul>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">4. Disclosure of Your Information</h2>
            <p className="text-lg text-gray-300">We may disclose personal information that we collect or you provide:</p>
            <ul className="list-disc pl-6 text-lg text-gray-300 space-y-2">
              <li>To our subsidiaries and affiliates</li>
              <li>To contractors, service providers, and other third parties we use to support our business</li>
              <li>To comply with any court order, law, or legal process</li>
              <li>To protect the rights, property, or safety of our company, our users, or others</li>
            </ul>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">5. Data Security</h2>
            <p className="text-lg text-gray-300">
              We have implemented measures designed to secure your personal information from accidental loss and from 
              unauthorized access, use, alteration, and disclosure. However, the transmission of information via the 
              internet is not completely secure, and we cannot guarantee the security of your personal information.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">6. Your Rights</h2>
            <p className="text-lg text-gray-300">
              Depending on your location, you may have certain rights regarding your personal information, such as the 
              right to access, correct, or delete your personal information, or to object to or restrict certain processing 
              of your personal information.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">7. Changes to Our Privacy Policy</h2>
            <p className="text-lg text-gray-300">
              We may update our Privacy Policy from time to time. If we make material changes, we will notify you by email 
              or by posting a notice on our website prior to the change becoming effective.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">8. Contact Information</h2>
            <p className="text-lg text-gray-300">
              If you have any questions or concerns about this Privacy Policy, please contact us at:
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

export default PrivacyPolicy;