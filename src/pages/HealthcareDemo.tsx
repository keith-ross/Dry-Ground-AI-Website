
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Phone, MessageSquare, Calendar, Shield, Clock, MapPin, Stethoscope, Users, Heart } from 'lucide-react';

const HealthcareDemo = () => {
  useEffect(() => {
    // Load ElevenLabs script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-brand-darker">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-brand-darker via-brand-dark to-brand-darker relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 opacity-50"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-primary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-brand-accent/10 rounded-full filter blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                Healthcare
                <span className="text-brand-primary"> AI Assistant</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Our AI solutions for healthcare providers help clinics manage patient appointments, answer questions about the practice, and handle insurance and billing inquiries—ensuring that no potential patient is missed.
              </p>
              <div className="bg-brand-primary/20 p-4 rounded-lg border border-brand-primary/30">
                <p className="text-white font-medium flex items-center">
                  <MessageSquare className="w-8 h-8 text-brand-primary mr-3" />
                  Test our agent with the chat widget via text or voice.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://i0.wp.com/drygroundpartners.com/wp-content/uploads/2024/09/AI-Nurse.jpeg?resize=1024%2C574&ssl=1" 
                alt="AI Nurse" 
                className="w-full h-96 object-cover rounded-lg border border-brand-primary/30 shadow-xl"
                style={{aspectRatio: '16/9'}}
              />
            </div>
          </div>
        </div>
      </section>

      {/* How Our AI Assistant Works */}
      <section className="py-20 bg-brand-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">How Our AI Assistants Support Your Practice</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-brand-primary/20 p-8 rounded-lg border border-brand-primary/30">
              <Clock className="w-12 h-12 text-brand-primary mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">24/7 Availability</h3>
              <p className="text-gray-300">
                The AI assistant is always available to manage bookings, answer questions about services, and provide information on insurance coverage and billing.
              </p>
            </div>

            <div className="bg-brand-primary/20 p-8 rounded-lg border border-brand-primary/30">
              <MessageSquare className="w-12 h-12 text-brand-primary mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Practice Information and FAQ Management</h3>
              <p className="text-gray-300">
                Patients can get answers to frequently asked questions about office hours, services offered, and preparation for appointments.
              </p>
            </div>

            <div className="bg-brand-primary/20 p-8 rounded-lg border border-brand-primary/30">
              <Calendar className="w-12 h-12 text-brand-primary mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Appointment Scheduling and Management</h3>
              <p className="text-gray-300">
                The AI assistant seamlessly manages appointment bookings, rescheduling, and cancellations, keeping your schedule organized.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Knowledge Base Information */}
      <section className="py-20 bg-brand-darker relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Practice Knowledge Base Information</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-brand-primary/10 p-6 rounded-lg border border-brand-primary/30">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <MapPin className="w-6 h-6 text-brand-primary mr-2" />
                  Cedar Health and Wellness
                </h3>
                <p className="text-gray-300 mb-2">456 Oak Avenue, Waco, TX 76701</p>
                <p className="text-gray-300">Phone: (254) 555-6789</p>
                <p className="text-gray-300 mt-4">
                  Comprehensive healthcare services including dentistry, chiropractic care, and wellness programs in Waco, TX.
                </p>
              </div>

              <div className="bg-brand-primary/10 p-6 rounded-lg border border-brand-primary/30">
                <h3 className="text-xl font-bold text-white mb-4">Services Offered</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• <strong>General Dentistry:</strong> Cleanings, fillings, crowns, and bridges</li>
                  <li>• <strong>Orthodontics:</strong> Braces, aligners, and whitening</li>
                  <li>• <strong>Chiropractic Services:</strong> Adjustments, decompression, and sports injury treatment</li>
                  <li>• <strong>Physical Therapy:</strong> Rehab, prevention, and mobility enhancement</li>
                  <li>• <strong>Nutritional Counseling:</strong> Diet plans, weight management, and wellness programs</li>
                </ul>
              </div>

              <div className="bg-brand-primary/10 p-6 rounded-lg border border-brand-primary/30">
                <h3 className="text-xl font-bold text-white mb-4">Additional Information</h3>
                <div className="space-y-3 text-gray-300">
                  <div>
                    <span className="font-semibold">Office Hours:</span>
                    <p>Mon–Thu 8 AM–6 PM, Fri 8 AM–2 PM</p>
                  </div>
                  <div>
                    <span className="font-semibold">Emergency Care:</span>
                    <p>Available during business hours for patients</p>
                  </div>
                  <div>
                    <span className="font-semibold">Parking:</span>
                    <p>Free, with handicap spaces</p>
                  </div>
                  <div>
                    <span className="font-semibold">Telehealth:</span>
                    <p>Available for nutrition and follow-ups</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-brand-primary/10 p-6 rounded-lg border border-brand-primary/30">
                <h3 className="text-xl font-bold text-white mb-4">Pricing</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between">
                    <span>Dental Cleaning:</span>
                    <span className="text-brand-primary font-semibold">$95</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fillings:</span>
                    <span className="text-brand-primary font-semibold">From $150</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Chiropractic Adjustment:</span>
                    <span className="text-brand-primary font-semibold">$65</span>
                  </div>
                  <div className="flex justify-between">
                    <span>New Patient Exam:</span>
                    <span className="text-brand-primary font-semibold">$50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Orthodontics Consultation:</span>
                    <span className="text-brand-primary font-semibold">Free</span>
                  </div>
                </div>
              </div>

              <div className="bg-brand-primary/10 p-6 rounded-lg border border-brand-primary/30">
                <h3 className="text-xl font-bold text-white mb-4">Insurance & Payment</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Most major insurance plans accepted</li>
                  <li>• Cash, cards, and CareCredit accepted</li>
                  <li>• Payment plans available</li>
                  <li>• AI assistant can verify coverage</li>
                </ul>
              </div>

              <div className="bg-brand-primary/10 p-6 rounded-lg border border-brand-primary/30">
                <h3 className="text-xl font-bold text-white mb-4">Appointment Information</h3>
                <div className="space-y-3 text-gray-300">
                  <div>
                    <span className="font-semibold">Appointment Durations:</span>
                    <p>Dental: 30–45 min, Chiropractic: 30 min, PT: 45–60 min</p>
                  </div>
                  <div>
                    <span className="font-semibold">Scheduling:</span>
                    <p>Available 24/7 via website or phone with AI assistant</p>
                  </div>
                  <div>
                    <span className="font-semibold">Rescheduling:</span>
                    <p>Preferably 24 hours in advance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-brand-dark relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-brand-darker p-6 rounded-lg border border-brand-primary/30">
              <h3 className="text-lg font-bold text-white mb-3">Do you accept insurance?</h3>
              <p className="text-gray-300">Yes, most major plans accepted. AI assistant can verify coverage.</p>
            </div>

            <div className="bg-brand-darker p-6 rounded-lg border border-brand-primary/30">
              <h3 className="text-lg font-bold text-white mb-3">How do I schedule?</h3>
              <p className="text-gray-300">Use the website or phone, 24/7 via AI assistant.</p>
            </div>

            <div className="bg-brand-darker p-6 rounded-lg border border-brand-primary/30">
              <h3 className="text-lg font-bold text-white mb-3">What payment methods do you accept?</h3>
              <p className="text-gray-300">Cash, cards, CareCredit, and payment plans.</p>
            </div>

            <div className="bg-brand-darker p-6 rounded-lg border border-brand-primary/30">
              <h3 className="text-lg font-bold text-white mb-3">What should I expect on my first visit?</h3>
              <p className="text-gray-300">Varies by service. AI assistant provides instructions.</p>
            </div>

            <div className="bg-brand-darker p-6 rounded-lg border border-brand-primary/30">
              <h3 className="text-lg font-bold text-white mb-3">Can I reschedule appointments?</h3>
              <p className="text-gray-300">Yes, via web or phone. Preferably 24 hours in advance.</p>
            </div>

            <div className="bg-brand-darker p-6 rounded-lg border border-brand-primary/30">
              <h3 className="text-lg font-bold text-white mb-3">Do you provide emergency dental care?</h3>
              <p className="text-gray-300">Call the office. AI can prioritize your care.</p>
            </div>

            <div className="bg-brand-darker p-6 rounded-lg border border-brand-primary/30">
              <h3 className="text-lg font-bold text-white mb-3">Do you offer teeth whitening?</h3>
              <p className="text-gray-300">In-office and take-home options available.</p>
            </div>

            <div className="bg-brand-darker p-6 rounded-lg border border-brand-primary/30">
              <h3 className="text-lg font-bold text-white mb-3">What should I bring to my appointment?</h3>
              <p className="text-gray-300">ID, insurance card, and records. AI can send checklist.</p>
            </div>

            <div className="bg-brand-darker p-6 rounded-lg border border-brand-primary/30">
              <h3 className="text-lg font-bold text-white mb-3">Do you provide pediatric services?</h3>
              <p className="text-gray-300">Yes. Friendly care for children including evaluations.</p>
            </div>

            <div className="bg-brand-darker p-6 rounded-lg border border-brand-primary/30">
              <h3 className="text-lg font-bold text-white mb-3">Do you offer wellness programs?</h3>
              <p className="text-gray-300">Includes diet, fitness, and stress management support.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* ElevenLabs Chat Widget */}
      <elevenlabs-convai agent-id="agent_01k0cch03pe04s8k0dr6770e8m"></elevenlabs-convai>
    </div>
  );
};

export default HealthcareDemo;
