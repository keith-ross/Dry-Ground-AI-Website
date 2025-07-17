
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Phone, MessageSquare, Calendar, Shield, Clock, MapPin, ArrowRight, Home, Star, Users, CheckCircle, Zap } from 'lucide-react';

const PropertyManagementDemo = () => {
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
                <span className="block">Property Management</span>
                <span className="block text-brand-primary">AI Assistant</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                Experience our AI virtual assistant designed to function as a 24/7 apartment complex receptionist, handling leasing calls, answering property questions, and managing maintenance requests.
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
                  src="https://i0.wp.com/drygroundpartners.com/wp-content/uploads/2024/09/AI-Receptionist.jpeg?resize=1024%2C683&ssl=1" 
                  alt="AI Assistant" 
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
              How Our AI Assistant Works as Your Apartment Complex Receptionist
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto">
              Advanced AI technology designed specifically for property management operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative bg-brand-darker p-8 rounded-xl overflow-hidden transition-all duration-300 hover:bg-gray-750 hover:shadow-xl hover:shadow-brand-primary/10 hover:transform hover:scale-105">
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 inline-flex items-center justify-center rounded-xl bg-brand-dark group-hover:bg-brand-dark/70 transition-colors duration-300">
                    <Phone className="w-8 h-8 text-brand-primary" />
                  </div>
                  <span className="text-xs font-medium px-3 py-1 bg-brand-primary/20 text-brand-primary rounded-full">
                    Core Feature
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-brand-primary transition-colors duration-300 mb-4">
                  Leasing Calls
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 mb-4">
                  Answer leasing inquiries, provide information on available units, schedule tours, explain leasing terms, and guide prospects through the application process.
                </p>
                <div className="flex items-center text-sm text-brand-accent">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>Lead qualification</span>
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
                  Property Questions
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 mb-4">
                  Provide detailed and accurate responses to questions about amenities, pet policies, move-in specials, and more.
                </p>
                <div className="flex items-center text-sm text-brand-primary">
                  <Star className="w-4 h-4 mr-2" />
                  <span>Instant answers</span>
                </div>
              </div>
            </div>

            <div className="group relative bg-brand-darker p-8 rounded-xl overflow-hidden transition-all duration-300 hover:bg-gray-750 hover:shadow-xl hover:shadow-brand-primary/10 hover:transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 inline-flex items-center justify-center rounded-xl bg-brand-dark group-hover:bg-brand-dark/70 transition-colors duration-300">
                    <Shield className="w-8 h-8 text-brand-primary" />
                  </div>
                  <span className="text-xs font-medium px-3 py-1 bg-brand-primary/20 text-brand-primary rounded-full">
                    Premium
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-brand-primary transition-colors duration-300 mb-4">
                  Maintenance Requests
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 mb-4">
                  Manage and prioritize maintenance requests and provide service updates to residents.
                </p>
                <div className="flex items-center text-sm text-brand-accent">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>Priority routing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Property Knowledge Base Information */}
      <section className="py-20 bg-brand-darker relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/10 to-brand-primary/5"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold text-brand-primary tracking-wide uppercase">Demo Property</h2>
            <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              Property Knowledge Base Information
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto">
              See how our AI assistant handles real property information and resident inquiries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 p-8 rounded-xl border border-brand-primary/30 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="p-2 bg-brand-primary/20 rounded-lg mr-4">
                    <MapPin className="w-6 h-6 text-brand-primary" />
                  </div>
                  UrbanNest Apartments
                </h3>
                <div className="space-y-3 text-gray-300">
                  <p className="flex items-center">
                    <span className="w-2 h-2 bg-brand-primary rounded-full mr-3"></span>
                    123 Elm Street, Dallas, TX 75201
                  </p>
                  <p className="flex items-center">
                    <Phone className="w-4 h-4 text-brand-accent mr-3" />
                    (214) 555-0123
                  </p>
                  <p className="mt-4 text-gray-300 leading-relaxed">
                    Modern, pet-friendly living in Dallas and Waco with one to three-bedroom units and luxury amenities.
                  </p>
                </div>
              </div>

              <div className="bg-brand-primary/10 p-6 rounded-xl border border-brand-primary/30">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Users className="w-5 h-5 text-brand-primary mr-3" />
                  Services Offered
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-brand-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>Leasing and tenant management</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-brand-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>24/7 maintenance and emergency repair services</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-brand-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>Online rent payment and resident portal access</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-brand-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>On-site property management and security services</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-brand-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>Resident events and community engagement</span>
                  </li>
                </ul>
              </div>

              <div className="bg-brand-primary/10 p-6 rounded-xl border border-brand-primary/30">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Star className="w-5 h-5 text-brand-accent mr-3" />
                  Amenities
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-brand-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>Resort-style swimming pool and fitness center</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-brand-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>On-site laundry facilities</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-brand-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>Business center and coworking spaces</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-brand-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>Package lockers and secure mailroom</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-brand-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>Pet-friendly with designated pet relief areas</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-br from-brand-accent/10 to-brand-primary/10 p-8 rounded-xl border border-brand-accent/30">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Home className="w-6 h-6 text-brand-accent mr-3" />
                  Pricing Structure
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-brand-dark/50 rounded-lg">
                    <span className="text-gray-300">One-Bedroom Apartments:</span>
                    <span className="text-brand-primary font-semibold">Starting at $1,200/month</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-brand-dark/50 rounded-lg">
                    <span className="text-gray-300">Two-Bedroom Apartments:</span>
                    <span className="text-brand-primary font-semibold">Starting at $1,500/month</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-brand-dark/50 rounded-lg">
                    <span className="text-gray-300">Three-Bedroom Apartments:</span>
                    <span className="text-brand-primary font-semibold">Starting at $1,800/month</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-brand-primary/30">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Security Deposit:</span>
                      <span className="text-white">$500 (refundable)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Application Fee:</span>
                      <span className="text-white">$50 per applicant</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Pet Fee:</span>
                      <span className="text-white">$300 + $25/month per pet</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-brand-primary/10 p-6 rounded-xl border border-brand-primary/30">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Clock className="w-5 h-5 text-brand-primary mr-3" />
                  Additional Information
                </h3>
                <div className="space-y-4 text-gray-300">
                  <div className="p-3 bg-brand-dark/30 rounded-lg">
                    <span className="font-semibold text-white">Office Hours:</span>
                    <p className="text-sm mt-1">Mon–Fri 9 AM–6 PM; Sat 10 AM–4 PM</p>
                  </div>
                  <div className="p-3 bg-brand-dark/30 rounded-lg">
                    <span className="font-semibold text-white">Lease Terms:</span>
                    <p className="text-sm mt-1">6 to 18 months</p>
                  </div>
                  <div className="p-3 bg-brand-dark/30 rounded-lg">
                    <span className="font-semibold text-white">Parking:</span>
                    <p className="text-sm mt-1">Reserved covered parking at $50/month</p>
                  </div>
                </div>
              </div>

              <div className="bg-brand-primary/10 p-6 rounded-xl border border-brand-primary/30">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Users className="w-5 h-5 text-brand-accent mr-3" />
                  Resident Services
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-brand-dark/30 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-white">Online Portal</span>
                      <span className="text-brand-primary text-sm font-medium">Most Used</span>
                    </div>
                    <p className="text-sm text-gray-300">Rent payment and maintenance requests</p>
                  </div>
                  <div className="p-3 bg-brand-dark/30 rounded-lg">
                    <span className="font-medium text-white">Community Events</span>
                    <p className="text-sm text-gray-300">Resident nights and social gatherings</p>
                  </div>
                  <div className="p-3 bg-brand-dark/30 rounded-lg">
                    <span className="font-medium text-white">Package Service</span>
                    <p className="text-sm text-gray-300">Secure acceptance and lockers</p>
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
              See how our AI assistant handles common resident and prospect inquiries.
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: "How do I apply for an apartment?",
                answer: "Apply online or visit the leasing office. Provide income proof, ID, and application fee.",
                popular: true
              },
              {
                question: "What is included in the rent?",
                answer: "Water, trash, maintenance, and amenities. Electricity and internet are billed separately."
              },
              {
                question: "Do you have any move-in specials?",
                answer: "Check with the leasing office for current promotions."
              },
              {
                question: "How does maintenance work?",
                answer: "Submit requests via the portal or call the hotline. Emergency issues get priority."
              },
              {
                question: "What is your pet policy?",
                answer: "Pets allowed with $300 fee and $25/month per pet. Restrictions and 2-pet limit apply."
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
      <elevenlabs-convai agent-id="agent_01k09qpb9yejf9pe3wmv594xvv"></elevenlabs-convai>
    </div>
  );
};

export default PropertyManagementDemo;
