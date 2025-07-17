
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Phone, MessageSquare, Calendar, Shield, Clock, MapPin, Stethoscope, Users, Heart, ArrowRight, Star, CheckCircle, Zap } from 'lucide-react';

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

      {/* Enhanced Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-brand-darker via-brand-dark to-brand-darker relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-darker via-brand-secondary/20 to-brand-darker opacity-70"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-primary/10 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-brand-accent/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-brand-primary/5 rounded-full filter blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                <span className="block">Healthcare</span>
                <span className="block text-brand-primary">AI Assistant</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                Our AI solutions for healthcare providers help clinics manage patient appointments, answer questions about the practice, and handle insurance and billing inquiries—ensuring that no potential patient is missed.
              </p>
              <div className="bg-gradient-to-r from-brand-primary/20 to-brand-accent/20 p-6 rounded-xl border border-brand-primary/30 backdrop-blur-sm">
                <p className="text-white font-medium flex items-center">
                  <MessageSquare className="w-8 h-8 text-brand-primary mr-3" />
                  Test our agent with the chat widget via text or voice.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://drygroundpartners.com/consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-gray-700 text-base font-medium rounded-md text-gray-200 hover:bg-brand-dark transition-all duration-300 flex items-center"
                >
                  Schedule Consultation
                  <Calendar className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="relative">
                <img 
                  src="https://i0.wp.com/drygroundpartners.com/wp-content/uploads/2024/09/AI-Nurse.jpeg?resize=1024%2C574&ssl=1" 
                  alt="AI Nurse" 
                  className="w-full h-96 object-cover rounded-xl border border-brand-primary/30 shadow-xl shadow-brand-primary/20"
                  style={{aspectRatio: '16/9'}}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-darker/60 to-transparent rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced How Our AI Assistant Works */}
      <section className="py-20 bg-brand-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold text-brand-primary tracking-wide uppercase">AI Capabilities</h2>
            <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              How Our AI Assistants Support Your Practice
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto">
              Advanced AI technology designed specifically for healthcare practices and patient management.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative bg-brand-darker p-8 rounded-xl overflow-hidden transition-all duration-300 hover:bg-gray-750 hover:shadow-xl hover:shadow-brand-primary/10 hover:transform hover:scale-105">
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 inline-flex items-center justify-center rounded-xl bg-brand-dark group-hover:bg-brand-dark/70 transition-colors duration-300">
                    <Clock className="w-8 h-8 text-brand-primary" />
                  </div>
                  <span className="text-xs font-medium px-3 py-1 bg-brand-primary/20 text-brand-primary rounded-full">
                    Core Feature
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-brand-primary transition-colors duration-300 mb-4">
                  24/7 Availability
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 mb-4">
                  The AI assistant is always available to manage bookings, answer questions about services, and provide information on insurance coverage and billing.
                </p>
                <div className="flex items-center text-sm text-brand-accent">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>Never miss a patient</span>
                </div>
              </div>
            </div>

            <div className="group relative bg-brand-darker p-8 rounded-xl overflow-hidden transition-all duration-300 hover:bg-gray-750 hover:shadow-xl hover:shadow-brand-accent/10 hover:transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 to-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 inline-flex items-center justify-center rounded-xl bg-brand-dark group-hover:bg-brand-dark/70 transition-colors duration-300">
                    <MessageSquare className="w-8 h-8 text-brand-accent" />
                  </div>
                  <span className="text-xs font-medium px-3 py-1 bg-brand-accent/20 text-brand-accent rounded-full">
                    Advanced
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-brand-accent transition-colors duration-300 mb-4">
                  Practice Information and FAQ Management
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 mb-4">
                  Patients can get answers to frequently asked questions about office hours, services offered, and preparation for appointments.
                </p>
                <div className="flex items-center text-sm text-brand-primary">
                  <Star className="w-4 h-4 mr-2" />
                  <span>Instant guidance</span>
                </div>
              </div>
            </div>

            <div className="group relative bg-brand-darker p-8 rounded-xl overflow-hidden transition-all duration-300 hover:bg-gray-750 hover:shadow-xl hover:shadow-brand-primary/10 hover:transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 inline-flex items-center justify-center rounded-xl bg-brand-dark group-hover:bg-brand-dark/70 transition-colors duration-300">
                    <Calendar className="w-8 h-8 text-brand-primary" />
                  </div>
                  <span className="text-xs font-medium px-3 py-1 bg-brand-primary/20 text-brand-primary rounded-full">
                    Premium
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-brand-primary transition-colors duration-300 mb-4">
                  Appointment Scheduling and Management
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 mb-4">
                  The AI assistant seamlessly manages appointment bookings, rescheduling, and cancellations, keeping your schedule organized.
                </p>
                <div className="flex items-center text-sm text-brand-accent">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>Optimized scheduling</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Practice Knowledge Base Information */}
      <section className="py-20 bg-brand-darker relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/10 to-brand-primary/5"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold text-brand-primary tracking-wide uppercase">Demo Practice</h2>
            <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              Practice Knowledge Base Information
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto">
              See how our AI assistant handles real practice information and patient inquiries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 p-8 rounded-xl border border-brand-primary/30 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="p-2 bg-brand-primary/20 rounded-lg mr-4">
                    <MapPin className="w-6 h-6 text-brand-primary" />
                  </div>
                  Cedar Health and Wellness
                </h3>
                <div className="space-y-3 text-gray-300">
                  <p className="flex items-center">
                    <span className="w-2 h-2 bg-brand-primary rounded-full mr-3"></span>
                    456 Oak Avenue, Waco, TX 76701
                  </p>
                  <p className="flex items-center">
                    <Phone className="w-4 h-4 text-brand-accent mr-3" />
                    (254) 555-6789
                  </p>
                  <p className="mt-4 text-gray-300 leading-relaxed">
                    Comprehensive healthcare services including dentistry, chiropractic care, and wellness programs in Waco, TX.
                  </p>
                </div>
              </div>

              <div className="bg-brand-primary/10 p-6 rounded-xl border border-brand-primary/30">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Stethoscope className="w-5 h-5 text-brand-primary mr-3" />
                  Services Offered
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-brand-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong>General Dentistry:</strong> Cleanings, fillings, crowns, and bridges</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-brand-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong>Orthodontics:</strong> Braces, aligners, and whitening</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-brand-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong>Chiropractic Services:</strong> Adjustments, decompression, and sports injury treatment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-brand-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong>Physical Therapy:</strong> Rehab, prevention, and mobility enhancement</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-brand-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong>Nutritional Counseling:</strong> Diet plans, weight management, and wellness programs</span>
                  </li>
                </ul>
              </div>

              <div className="bg-brand-primary/10 p-6 rounded-xl border border-brand-primary/30">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Clock className="w-5 h-5 text-brand-accent mr-3" />
                  Additional Information
                </h3>
                <div className="space-y-4 text-gray-300">
                  <div className="p-3 bg-brand-dark/30 rounded-lg">
                    <span className="font-semibold text-white">Office Hours:</span>
                    <p className="text-sm mt-1">Mon–Thu 8 AM–6 PM, Fri 8 AM–2 PM</p>
                  </div>
                  <div className="p-3 bg-brand-dark/30 rounded-lg">
                    <span className="font-semibold text-white">Emergency Care:</span>
                    <p className="text-sm mt-1">Available during business hours for patients</p>
                  </div>
                  <div className="p-3 bg-brand-dark/30 rounded-lg">
                    <span className="font-semibold text-white">Parking:</span>
                    <p className="text-sm mt-1">Free, with handicap spaces</p>
                  </div>
                  <div className="p-3 bg-brand-dark/30 rounded-lg">
                    <span className="font-semibold text-white">Telehealth:</span>
                    <p className="text-sm mt-1">Available for nutrition and follow-ups</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-br from-brand-accent/10 to-brand-primary/10 p-8 rounded-xl border border-brand-accent/30">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Heart className="w-6 h-6 text-brand-accent mr-3" />
                  Pricing Structure
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-brand-dark/50 rounded-lg">
                    <span className="text-gray-300">Dental Cleaning:</span>
                    <span className="text-brand-primary font-semibold">$95</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-brand-dark/50 rounded-lg">
                    <span className="text-gray-300">Fillings:</span>
                    <span className="text-brand-primary font-semibold">From $150</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-brand-dark/50 rounded-lg">
                    <span className="text-gray-300">Chiropractic Adjustment:</span>
                    <span className="text-brand-primary font-semibold">$65</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-brand-dark/50 rounded-lg">
                    <span className="text-gray-300">New Patient Exam:</span>
                    <span className="text-brand-primary font-semibold">$50</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-brand-dark/50 rounded-lg">
                    <span className="text-gray-300">Orthodontics Consultation:</span>
                    <span className="text-brand-primary font-semibold">Free</span>
                  </div>
                </div>
              </div>

              <div className="bg-brand-primary/10 p-6 rounded-xl border border-brand-primary/30">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Shield className="w-5 h-5 text-brand-primary mr-3" />
                  Insurance & Payment
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-brand-dark/30 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-white">Insurance Plans</span>
                      <span className="text-brand-primary text-sm font-medium">Most Accepted</span>
                    </div>
                    <p className="text-sm text-gray-300">Most major insurance plans accepted</p>
                  </div>
                  <div className="p-3 bg-brand-dark/30 rounded-lg">
                    <span className="font-medium text-white">Payment Methods</span>
                    <p className="text-sm text-gray-300">Cash, cards, and CareCredit accepted</p>
                  </div>
                  <div className="p-3 bg-brand-dark/30 rounded-lg">
                    <span className="font-medium text-white">Payment Plans</span>
                    <p className="text-sm text-gray-300">Available for larger treatments</p>
                  </div>
                  <div className="p-3 bg-brand-dark/30 rounded-lg">
                    <span className="font-medium text-white">AI Verification</span>
                    <p className="text-sm text-gray-300">AI assistant can verify coverage</p>
                  </div>
                </div>
              </div>

              <div className="bg-brand-primary/10 p-6 rounded-xl border border-brand-primary/30">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Calendar className="w-5 h-5 text-brand-accent mr-3" />
                  Appointment Information
                </h3>
                <div className="space-y-3 text-gray-300">
                  <div>
                    <span className="font-semibold text-white">Appointment Durations:</span>
                    <p className="text-sm mt-1">Dental: 30–45 min, Chiropractic: 30 min, PT: 45–60 min</p>
                  </div>
                  <div>
                    <span className="font-semibold text-white">Scheduling:</span>
                    <p className="text-sm mt-1">Available 24/7 via website or phone with AI assistant</p>
                  </div>
                  <div>
                    <span className="font-semibold text-white">Rescheduling:</span>
                    <p className="text-sm mt-1">Preferably 24 hours in advance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="py-20 bg-brand-dark relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold text-brand-primary tracking-wide uppercase">Support</h2>
            <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              Frequently Asked Questions
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto">
              See how our AI assistant handles common patient inquiries and support requests.
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: "Do you accept insurance?",
                answer: "Yes, most major plans accepted. AI assistant can verify coverage.",
                popular: true
              },
              {
                question: "How do I schedule?",
                answer: "Use the website or phone, 24/7 via AI assistant."
              },
              {
                question: "What payment methods do you accept?",
                answer: "Cash, cards, CareCredit, and payment plans."
              },
              {
                question: "What should I expect on my first visit?",
                answer: "Varies by service. AI assistant provides instructions."
              },
              {
                question: "Can I reschedule appointments?",
                answer: "Yes, via web or phone. Preferably 24 hours in advance."
              },
              {
                question: "Do you provide emergency dental care?",
                answer: "Call the office. AI can prioritize your care."
              },
              {
                question: "Do you offer teeth whitening?",
                answer: "In-office and take-home options available."
              },
              {
                question: "What should I bring to my appointment?",
                answer: "ID, insurance card, and records. AI can send checklist."
              },
              {
                question: "Do you provide pediatric services?",
                answer: "Yes. Friendly care for children including evaluations."
              },
              {
                question: "Do you offer wellness programs?",
                answer: "Includes diet, fitness, and stress management support."
              }
            ].map((faq, index) => (
              <div key={index} className="group bg-brand-darker p-6 rounded-xl border border-brand-primary/30 hover:border-brand-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-brand-primary/10">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-primary transition-colors duration-300 flex-1">
                    {faq.question}
                  </h3>
                </div>
                <p className="mt-3 text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                  {faq.answer}
                </p>
              </div>
            ))}
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
