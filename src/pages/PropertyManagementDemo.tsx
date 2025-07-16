
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Phone, MessageSquare, Calendar, Shield, Clock, MapPin } from 'lucide-react';

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

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-brand-darker via-brand-dark to-brand-darker relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 opacity-50"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-primary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-brand-accent/10 rounded-full filter blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                Demo: Property Management
                <span className="text-brand-primary"> AI Assistant</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Experience our AI virtual assistant designed to function as a 24/7 apartment complex receptionist, handling leasing calls, answering property questions, and managing maintenance requests.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://i0.wp.com/drygroundpartners.com/wp-content/uploads/2024/09/AI-Receptionist.jpeg?resize=1024%2C683&ssl=1" 
                alt="AI Assistant" 
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
          <h2 className="text-4xl font-bold text-white mb-12 text-center">How Our AI Assistant Works as Your Apartment Complex Receptionist</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-brand-primary/20 p-8 rounded-lg border border-brand-primary/30">
              <Phone className="w-12 h-12 text-brand-primary mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Leasing Calls</h3>
              <p className="text-gray-300">
                Answer leasing inquiries, provide information on available units, schedule tours, explain leasing terms, and guide prospects through the application process.
              </p>
            </div>

            <div className="bg-brand-primary/20 p-8 rounded-lg border border-brand-primary/30">
              <MessageSquare className="w-12 h-12 text-brand-primary mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Property Questions</h3>
              <p className="text-gray-300">
                Provide detailed and accurate responses to questions about amenities, pet policies, move-in specials, and more.
              </p>
            </div>

            <div className="bg-brand-primary/20 p-8 rounded-lg border border-brand-primary/30">
              <Shield className="w-12 h-12 text-brand-primary mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Maintenance Requests</h3>
              <p className="text-gray-300">
                Manage and prioritize maintenance requests and provide service updates to residents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 bg-brand-darker relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">Experience Our AI Assistant in Action</h2>
            <p className="text-xl text-gray-300 mb-8">
              Chat with our AI assistant below or try it through voice interaction
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Chat Widget Section */}
            <div className="bg-brand-dark p-8 rounded-lg border border-brand-primary/30">
              <div className="text-center mb-6">
                <MessageSquare className="w-12 h-12 text-brand-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Live Chat Demo</h3>
                <p className="text-gray-300">
                  Try our AI assistant right now! Ask about UrbanNest Apartments, pricing, amenities, or schedule a tour.
                </p>
              </div>
              
              {/* Widget will appear as floating chat */}
              <div className="bg-brand-darker p-6 rounded-lg border border-brand-primary/20 min-h-[400px] flex items-center justify-center">
                <div className="text-center text-gray-300">
                  <MessageSquare className="w-16 h-16 text-brand-primary mx-auto mb-4" />
                  <p className="text-lg">The chat widget will appear as a floating chat button in the bottom-right corner of your screen.</p>
                  <p className="text-sm mt-2">Look for the chat icon to start a conversation!</p>
                </div>
              </div>
              
              {/* Hidden widget that will float */}
              <elevenlabs-convai agent-id="agent_01k09qpb9yejf9pe3wmv594xvv"></elevenlabs-convai>
            </div>

            {/* Additional Options */}
            <div className="space-y-6">
              <div className="bg-brand-dark p-6 rounded-lg border border-brand-primary/30">
                <Phone className="w-10 h-10 text-brand-primary mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Voice Interaction</h3>
                <p className="text-gray-300 mb-4">
                  Experience natural voice conversations with our AI assistant. Click the microphone icon in the chat widget to start speaking.
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Voice-enabled in chat widget</span>
                </div>
              </div>

              <div className="bg-brand-dark p-6 rounded-lg border border-brand-primary/30">
                <Calendar className="w-10 h-10 text-brand-primary mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Schedule Tours</h3>
                <p className="text-gray-300 mb-4">
                  Ask the AI assistant to schedule apartment tours, check availability, or get information about move-in specials.
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Available 24/7</span>
                </div>
              </div>

              <div className="bg-brand-dark p-6 rounded-lg border border-brand-primary/30">
                <Shield className="w-10 h-10 text-brand-primary mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Maintenance Support</h3>
                <p className="text-gray-300 mb-4">
                  The AI can help with maintenance requests, provide status updates, and handle emergency situations.
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Emergency priority handling</span>
                </div>
              </div>

              <div className="bg-brand-primary/10 p-6 rounded-lg border border-brand-primary/30">
                <h4 className="text-lg font-bold text-white mb-3">Try asking about:</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• "What apartments are available?"</li>
                  <li>• "Can I schedule a tour?"</li>
                  <li>• "What are your pet policies?"</li>
                  <li>• "How much is rent for a 2-bedroom?"</li>
                  <li>• "What amenities do you have?"</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Information */}
      <section className="py-20 bg-brand-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Property Knowledge Base Information</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-brand-primary/10 p-6 rounded-lg border border-brand-primary/30">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <MapPin className="w-6 h-6 text-brand-primary mr-2" />
                  UrbanNest Apartments
                </h3>
                <p className="text-gray-300 mb-2">123 Elm Street, Dallas, TX 75201</p>
                <p className="text-gray-300">Phone: (214) 555-0123</p>
                <p className="text-gray-300 mt-4">
                  Modern, pet-friendly living in Dallas and Waco with one to three-bedroom units and luxury amenities.
                </p>
              </div>

              <div className="bg-brand-primary/10 p-6 rounded-lg border border-brand-primary/30">
                <h3 className="text-xl font-bold text-white mb-4">Services Offered</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Leasing and tenant management</li>
                  <li>• 24/7 maintenance and emergency repair services</li>
                  <li>• Online rent payment and resident portal access</li>
                  <li>• On-site property management and security services</li>
                  <li>• Resident events and community engagement</li>
                </ul>
              </div>

              <div className="bg-brand-primary/10 p-6 rounded-lg border border-brand-primary/30">
                <h3 className="text-xl font-bold text-white mb-4">Amenities</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Resort-style swimming pool and fitness center</li>
                  <li>• On-site laundry facilities</li>
                  <li>• Business center and coworking spaces</li>
                  <li>• Package lockers and secure mailroom</li>
                  <li>• Pet-friendly with designated pet relief areas</li>
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-brand-primary/10 p-6 rounded-lg border border-brand-primary/30">
                <h3 className="text-xl font-bold text-white mb-4">Pricing</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between">
                    <span>One-Bedroom Apartments:</span>
                    <span className="text-brand-primary font-semibold">Starting at $1,200/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Two-Bedroom Apartments:</span>
                    <span className="text-brand-primary font-semibold">Starting at $1,500/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Three-Bedroom Apartments:</span>
                    <span className="text-brand-primary font-semibold">Starting at $1,800/month</span>
                  </div>
                  <hr className="border-brand-primary/30 my-4" />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Security Deposit:</span>
                      <span>$500 (refundable)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Application Fee:</span>
                      <span>$50 per applicant</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pet Fee:</span>
                      <span>$300 + $25/month per pet</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-brand-primary/10 p-6 rounded-lg border border-brand-primary/30">
                <h3 className="text-xl font-bold text-white mb-4">Additional Information</h3>
                <div className="space-y-3 text-gray-300">
                  <div>
                    <span className="font-semibold">Office Hours:</span>
                    <p>Mon–Fri 9 AM–6 PM; Sat 10 AM–4 PM</p>
                  </div>
                  <div>
                    <span className="font-semibold">Lease Terms:</span>
                    <p>6 to 18 months</p>
                  </div>
                  <div>
                    <span className="font-semibold">Parking:</span>
                    <p>Reserved covered parking at $50/month</p>
                  </div>
                </div>
              </div>

              <div className="bg-brand-primary/10 p-6 rounded-lg border border-brand-primary/30">
                <h3 className="text-xl font-bold text-white mb-4">Resident Services</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Online rent payment and maintenance requests</li>
                  <li>• Community events and resident nights</li>
                  <li>• Package acceptance and secure lockers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-brand-darker relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-brand-dark p-6 rounded-lg border border-brand-primary/30">
              <h3 className="text-lg font-bold text-white mb-3">How do I apply for an apartment?</h3>
              <p className="text-gray-300">Apply online or visit the leasing office. Provide income proof, ID, and application fee.</p>
            </div>

            <div className="bg-brand-dark p-6 rounded-lg border border-brand-primary/30">
              <h3 className="text-lg font-bold text-white mb-3">What is included in the rent?</h3>
              <p className="text-gray-300">Water, trash, maintenance, and amenities. Electricity and internet are billed separately.</p>
            </div>

            <div className="bg-brand-dark p-6 rounded-lg border border-brand-primary/30">
              <h3 className="text-lg font-bold text-white mb-3">Do you have any move-in specials?</h3>
              <p className="text-gray-300">Check with the leasing office for current promotions.</p>
            </div>

            <div className="bg-brand-dark p-6 rounded-lg border border-brand-primary/30">
              <h3 className="text-lg font-bold text-white mb-3">How does maintenance work?</h3>
              <p className="text-gray-300">Submit requests via the portal or call the hotline. Emergency issues get priority.</p>
            </div>

            <div className="bg-brand-dark p-6 rounded-lg border border-brand-primary/30">
              <h3 className="text-lg font-bold text-white mb-3">What is your pet policy?</h3>
              <p className="text-gray-300">Pets allowed with $300 fee and $25/month per pet. Restrictions and 2-pet limit apply.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PropertyManagementDemo;
