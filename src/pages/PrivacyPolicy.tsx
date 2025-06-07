
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
              <li>Records and copies of your correspondence with us</li>
              <li>Details of transactions you carry out through our website</li>
              <li>Your search queries on the website</li>
              <li>Usage details, IP addresses, browser type, and other technical information</li>
            </ul>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">3. How We Collect Your Information</h2>
            <p className="text-lg text-gray-300">We collect information in the following ways:</p>
            <ul className="list-disc pl-6 text-lg text-gray-300 space-y-2">
              <li>Directly from you when you provide it to us</li>
              <li>Automatically as you navigate through the site (using cookies and other tracking technologies)</li>
              <li>From third parties, for example, our business partners</li>
            </ul>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">4. Use of Cookies and Tracking Technologies</h2>
            <p className="text-lg text-gray-300">
              We use cookies and similar tracking technologies to track the activity on our website and store certain information. 
              Cookies are files with a small amount of data which may include an anonymous unique identifier. 
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. 
              However, if you do not accept cookies, you may not be able to use some portions of our website.
            </p>
            <p className="text-lg text-gray-300">
              For more information about the cookies we use, please see our <a href="/cookie-policy" className="text-brand-primary hover:text-brand-accent">Cookie Policy</a>.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">5. How We Use Your Information</h2>
            <p className="text-lg text-gray-300">We use information that we collect about you or that you provide to us, including any personal information:</p>
            <ul className="list-disc pl-6 text-lg text-gray-300 space-y-2">
              <li>To present our website and its contents to you</li>
              <li>To provide you with information, products, or services that you request from us</li>
              <li>To fulfill any other purpose for which you provide it</li>
              <li>To provide you with notices about your account</li>
              <li>To carry out our obligations and enforce our rights</li>
              <li>To notify you about changes to our website or products/services</li>
              <li>To improve our website, products/services, marketing, and customer relationships</li>
              <li>In any other way we may describe when you provide the information</li>
              <li>For any other purpose with your consent</li>
            </ul>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">6. Legal Basis for Processing Personal Data</h2>
            <p className="text-lg text-gray-300">
              We will only process your personal data when we have a legal basis to do so. The legal basis will depend on the purposes for which we have collected and use your personal data. In most cases, the legal basis will be one of the following:
            </p>
            <ul className="list-disc pl-6 text-lg text-gray-300 space-y-2">
              <li>To perform a contract with you</li>
              <li>To comply with a legal obligation</li>
              <li>For our legitimate interests (or those of a third party)</li>
              <li>With your consent</li>
            </ul>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">7. SMS Terms and Conditions</h2>
            <p className="text-lg text-gray-300">
              By providing your mobile phone number, you consent to receive SMS messages from Dry Ground AI related to service updates, appointment reminders, follow-up communications, and responses to your inquiries.
            </p>
            <ul className="list-disc pl-6 text-lg text-gray-300 space-y-2">
              <li><span className="font-semibold">Message Frequency:</span> Message frequency may vary.</li>
              <li><span className="font-semibold">Message and Data Rates:</span> Standard message and data rates may apply depending on your carrier.</li>
              <li><span className="font-semibold">Opting Out:</span> You may opt out of receiving SMS messages at any time by replying with "STOP" to any SMS message you receive from us. After opting out, you will receive a confirmation message, and we will cease sending SMS messages to your number.</li>
              <li><span className="font-semibold">Help and Support:</span> If you need assistance or have questions about our SMS service, reply with "HELP" to any SMS message you receive, or contact our customer support team at <a href="mailto:info@dryground.ai" className="text-brand-primary hover:text-brand-accent">info@dryground.ai</a>.</li>
            </ul>
            <p className="text-lg text-gray-300">
              <span className="font-semibold">SMS Privacy Policy:</span> Your phone number will be handled in accordance with this Privacy Policy. No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All the stated categories in this privacy policy exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">8. Disclosure of Your Information</h2>
            <p className="text-lg text-gray-300">
              We may disclose personal information that we collect or you provide as described in this privacy policy:
            </p>
            <ul className="list-disc pl-6 text-lg text-gray-300 space-y-2">
              <li>To our subsidiaries and affiliates</li>
              <li>To contractors, service providers, and other third parties we use to support our business</li>
              <li>To a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of our assets</li>
              <li>To fulfill the purpose for which you provide it</li>
              <li>For any other purpose disclosed by us when you provide the information</li>
              <li>With your consent</li>
              <li>To comply with any court order, law, or legal process</li>
              <li>To enforce or apply our terms of use and other agreements</li>
              <li>If we believe disclosure is necessary to protect the rights, property, or safety of our company, our customers, or others</li>
            </ul>
            <p className="text-lg text-gray-300 font-semibold">
              Important: No mobile opt-in information will be shared with third parties for marketing purposes.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">9. Data Retention</h2>
            <p className="text-lg text-gray-300">
              We will only retain your personal data for as long as necessary to fulfill the purposes for which we collected it, including for the purposes of satisfying any legal, accounting, or reporting requirements.
            </p>
            <p className="text-lg text-gray-300">
              To determine the appropriate retention period for personal data, we consider the amount, nature, and sensitivity of the personal data, the potential risk of harm from unauthorized use or disclosure of your personal data, the purposes for which we process your personal data and whether we can achieve those purposes through other means, and the applicable legal requirements.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">10. Data Security</h2>
            <p className="text-lg text-gray-300">
              We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. All information you provide to us is stored on secure servers behind firewalls.
            </p>
            <p className="text-lg text-gray-300">
              Unfortunately, the transmission of information via the internet is not completely secure. Although we do our best to protect your personal information, we cannot guarantee the security of your personal information transmitted to our website. Any transmission of personal information is at your own risk.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">11. Your Data Protection Rights</h2>
            <p className="text-lg text-gray-300">
              Depending on your location, you may have the following rights with respect to your personal data:
            </p>
            <ul className="list-disc pl-6 text-lg text-gray-300 space-y-2">
              <li><span className="font-semibold">Right to access:</span> You have the right to request copies of your personal data.</li>
              <li><span className="font-semibold">Right to rectification:</span> You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
              <li><span className="font-semibold">Right to erasure:</span> You have the right to request that we erase your personal data, under certain conditions.</li>
              <li><span className="font-semibold">Right to restrict processing:</span> You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
              <li><span className="font-semibold">Right to object to processing:</span> You have the right to object to our processing of your personal data, under certain conditions.</li>
              <li><span className="font-semibold">Right to data portability:</span> You have the right to request that we transfer the data we have collected to another organization, or directly to you, under certain conditions.</li>
            </ul>
            <p className="text-lg text-gray-300">
              If you would like to exercise any of these rights, please contact us.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">12. Children's Privacy</h2>
            <p className="text-lg text-gray-300">
              Our website is not intended for children under 16 years of age. No one under age 16 may provide any personal information to or on the website. We do not knowingly collect personal information from children under 16. If you are under 16, do not use or provide any information on this website. If we learn we have collected or received personal information from a child under 16 without verification of parental consent, we will delete that information.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">13. International Data Transfers</h2>
            <p className="text-lg text-gray-300">
              We may transfer your personal data to countries outside of your home country. We ensure your personal data is protected by requiring all our group companies to follow the same rules when processing your personal data. These rules are called "binding corporate rules".
            </p>
            <p className="text-lg text-gray-300">
              We also employ appropriate safeguards, such as standard contractual clauses approved by the European Commission, when transferring personal data outside of the European Economic Area.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">14. Changes to Our Privacy Policy</h2>
            <p className="text-lg text-gray-300">
              We may update our Privacy Policy from time to time. If we make material changes, we will notify you by email 
              or by posting a notice on our website prior to the change becoming effective.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">15. Contact Information</h2>
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
