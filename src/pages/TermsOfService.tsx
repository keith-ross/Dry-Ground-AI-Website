import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-brand-darker text-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-extrabold text-white mb-8">Terms of Service</h1>
        
        <div className="space-y-8">
          <p className="text-lg text-gray-300">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">1. Agreement to Terms</h2>
            <p className="text-lg text-gray-300">
              By accessing or using Dry Ground AI's website and services, you agree to be bound by these Terms of Service. 
              If you do not agree to these Terms, you should not access or use our services.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">2. Description of Services</h2>
            <p className="text-lg text-gray-300">
              Dry Ground AI provides artificial intelligence solutions and consulting services as described on our website. 
              We reserve the right to modify, suspend, or discontinue any part of our services at any time without notice.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">3. User Accounts and Responsibilities</h2>
            <p className="text-lg text-gray-300">
              Some of our services may require you to create an account. You are responsible for maintaining the 
              confidentiality of your account information and for all activities that occur under your account. 
              You agree to provide accurate and complete information when creating an account and to update your 
              information to keep it accurate and complete.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">4. Intellectual Property Rights</h2>
            <p className="text-lg text-gray-300">
              All content, features, and functionality of our website, including but not limited to text, graphics, 
              logos, icons, images, audio clips, digital downloads, data compilations, and software, are the exclusive 
              property of Dry Ground AI or our licensors and are protected by copyright, trademark, and other intellectual 
              property laws.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">5. User Content</h2>
            <p className="text-lg text-gray-300">
              You retain ownership of any content you submit to our website or services. However, by submitting content, 
              you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, 
              translate, and distribute your content in any existing or future media.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">6. Prohibited Uses</h2>
            <p className="text-lg text-gray-300">You agree not to use our website or services:</p>
            <ul className="list-disc pl-6 text-lg text-gray-300 space-y-2">
              <li>In any way that violates any applicable law or regulation</li>
              <li>To transmit any material that is defamatory, offensive, or otherwise objectionable</li>
              <li>To attempt to interfere with the proper working of our website or services</li>
              <li>To attempt to gain unauthorized access to our systems or user accounts</li>
            </ul>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">7. Limitation of Liability</h2>
            <p className="text-lg text-gray-300">
              To the fullest extent permitted by law, Dry Ground AI shall not be liable for any indirect, incidental, 
              special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, 
              arising out of or in connection with your use of our website or services.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">8. Indemnification</h2>
            <p className="text-lg text-gray-300">
              You agree to indemnify and hold harmless Dry Ground AI and its officers, directors, employees, and agents 
              from any claims, liabilities, damages, losses, and expenses arising out of or in any way connected with 
              your use of our website or services.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">9. Governing Law</h2>
            <p className="text-lg text-gray-300">
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which 
              Dry Ground AI is established, without regard to its conflict of law provisions.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">10. Changes to Terms</h2>
            <p className="text-lg text-gray-300">
              We reserve the right to modify these Terms at any time. If we make material changes, we will notify you 
              by email or by posting a notice on our website prior to the change becoming effective.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">11. Contact Information</h2>
            <p className="text-lg text-gray-300">
              If you have any questions about these Terms, please contact us at:
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

export default TermsOfService;