import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Wrench,
  Clock,
  Calendar,
  Phone,
  MapPin,
  DollarSign,
  CheckCircle,
  MessageSquare,
} from "lucide-react";

const HomeServicesDemo = () => {
  useEffect(() => {
    // Load ElevenLabs script
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
    script.async = true;
    script.type = "text/javascript";
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
                Home Services
                <span className="text-brand-primary"> AI Assistant</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Our AI assistants are designed to support home service
                businesses like plumbing, electrical, and HVAC companies by
                handling appointment scheduling, providing service estimates,
                and efficiently managing customer communications.
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
                src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Home Services"
                className="w-full h-96 object-cover rounded-lg border border-brand-primary/30 shadow-xl"
                style={{ aspectRatio: "16/9" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* How Our AI Assistant Works */}
      <section className="py-20 bg-brand-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">How Our AI Assistant Works for Home Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-brand-primary/20 p-8 rounded-lg border border-brand-primary/30">
              <Calendar className="w-12 h-12 text-brand-primary mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">24/7 Scheduling & Availability</h3>
              <p className="text-gray-300">
                Handle appointment bookings, reschedules, and cancellations with real-time availability. Answer customer questions about services and pricing around the clock.
              </p>
            </div>

            <div className="bg-brand-primary/20 p-8 rounded-lg border border-brand-primary/30">
              <MessageSquare className="w-12 h-12 text-brand-primary mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Service Estimates & Guidance</h3>
              <p className="text-gray-300">
                Provide preliminary estimates based on customer descriptions and guide them through diagnostic questions to determine the right services needed.
              </p>
            </div>

            <div className="bg-brand-primary/20 p-8 rounded-lg border border-brand-primary/30">
              <CheckCircle className="w-12 h-12 text-brand-primary mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Customer Follow-up & Reviews</h3>
              <p className="text-gray-300">
                Collect feedback post-service, encourage satisfied customers to leave online reviews, and handle emergency dispatch coordination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Knowledge Base Information */}
      <section className="py-20 bg-brand-darker relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Company Knowledge Base Information</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-brand-primary/10 p-6 rounded-lg border border-brand-primary/30">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <MapPin className="w-6 h-6 text-brand-primary mr-2" />
                  ProFix Home Services
                </h3>
                <p className="text-gray-300 mb-2">789 Maple Lane, Dallas, TX 75202</p>
                <p className="text-gray-300">Phone: (972) 555-3456</p>
                <p className="text-gray-300 mt-4">
                  Professional home service solutions for plumbing, electrical, and HVAC needs in Dallas, TX and surrounding areas.
                </p>
              </div>

              <div className="bg-brand-primary/10 p-6 rounded-lg border border-brand-primary/30">
                <h3 className="text-xl font-bold text-white mb-4">Services Offered</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Plumbing repairs and installations</li>
                  <li>• Electrical services and panel upgrades</li>
                  <li>• HVAC installation, maintenance, and repair</li>
                  <li>• Home inspections and energy audits</li>
                  <li>• Emergency 24/7 service calls</li>
                </ul>
              </div>

              <div className="bg-brand-primary/10 p-6 rounded-lg border border-brand-primary/30">
                <h3 className="text-xl font-bold text-white mb-4">Additional Information</h3>
                <div className="space-y-3 text-gray-300">
                  <div>
                    <span className="font-semibold">Service Areas:</span>
                    <p>Dallas, TX and Surrounding Areas</p>
                  </div>
                  <div>
                    <span className="font-semibold">Emergency Service:</span>
                    <p>Available 24/7 with $50 after-hours fee</p>
                  </div>
                  <div>
                    <span className="font-semibold">Licensing:</span>
                    <p>Fully licensed, bonded, and insured</p>
                  </div>
                  <div>
                    <span className="font-semibold">Guarantee:</span>
                    <p>100% satisfaction or follow-up visit at no cost</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-brand-primary/10 p-6 rounded-lg border border-brand-primary/30">
                <h3 className="text-xl font-bold text-white mb-4">Pricing</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between">
                    <span>Service Call Fee:</span>
                    <span className="text-brand-primary font-semibold">$75 (waived if repair completed)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hourly Rate:</span>
                    <span className="text-brand-primary font-semibold">$95/hour</span>
                  </div>
                  <div className="flex justify-between">
                    <span>HVAC Maintenance Plan:</span>
                    <span className="text-brand-primary font-semibold">$150/year per unit</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Emergency Service Fee:</span>
                    <span className="text-brand-primary font-semibold">$50 additional for after-hours</span>
                  </div>
                  <hr className="border-brand-primary/30 my-4" />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Free Estimates:</span>
                      <span>Yes for larger jobs</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment Methods:</span>
                      <span>Credit, check, cash, financing</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-brand-primary/10 p-6 rounded-lg border border-brand-primary/30">
                <h3 className="text-xl font-bold text-white mb-4">Maintenance Plans</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• HVAC: Two seasonal check-ups, priority scheduling, and 10% discount on repairs.</li>
                  <li>• Plumbing: Annual inspections and discounts</li>
                  <li>• Electrical: Safety inspections and maintenance</li>
                  <li>• All plans include priority scheduling</li>
                </ul>
              </div>

              <div className="bg-brand-primary/10 p-6 rounded-lg border border-brand-primary/30">
                <h3 className="text-xl font-bold text-white mb-4">Service Information</h3>
                <div className="space-y-3 text-gray-300">
                  <div>
                    <span className="font-semibold">Typical Service Duration:</span>
                    <p>Most jobs take 1–2 hours</p>
                  </div>
                  <div>
                    <span className="font-semibold">Same-Day Service:</span>
                    <p>Available subject to technician availability</p>
                  </div>
                  <div>
                    <span className="font-semibold">Booking:</span>
                    <p>Available 24/7 via website or AI assistant</p>
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
              <h3 className="text-lg font-bold text-white mb-3">What is included in the HVAC Maintenance Plan?</h3>
              <p className="text-gray-300">Two seasonal check-ups, priority scheduling, and 10% discount on repairs.</p>
            </div>

            <div className="bg-brand-darker p-6 rounded-lg border border-brand-primary/30">
              <h3 className="text-lg font-bold text-white mb-3">Do you offer same-day service?</h3>
              <p className="text-gray-300">Yes, subject to technician availability. Contact us early for best availability.</p>
            </div>

            <div className="bg-brand-darker p-6 rounded-lg border border-brand-primary/30">
              <h3 className="text-lg font-bold text-white mb-3">Are your technicians licensed and insured?</h3>
              <p className="text-gray-300">Yes, all technicians are fully licensed, bonded, and insured for your protection.</p>
            </div>

            <div className="bg-brand-darker p-6 rounded-lg border border-brand-primary/30">
              <h3 className="text-lg font-bold text-white mb-3">Do you provide free estimates?</h3>
              <p className="text-gray-300">Yes for larger jobs. A diagnostic fee may apply for smaller repairs, which is waived if you proceed with the work.</p>
            </div>

            <div className="bg-brand-darker p-6 rounded-lg border border-brand-primary/30">
              <h3 className="text-lg font-bold text-white mb-3">Can I book a service call online?</h3>
              <p className="text-gray-300">Yes, you can book anytime via our website or AI assistant, available 24/7.</p>
            </div>

            <div className="bg-brand-darker p-6 rounded-lg border border-brand-primary/30">
              <h3 className="text-lg font-bold text-white mb-3">What should I do in case of an emergency?</h3>
              <p className="text-gray-300">Contact our AI assistant immediately for fast technician dispatch. Emergency service available 24/7.</p>
            </div>

            <div className="bg-brand-darker p-6 rounded-lg border border-brand-primary/30">
              <h3 className="text-lg font-bold text-white mb-3">How do I know what services I need?</h3>
              <p className="text-gray-300">Our AI assistant will guide you through diagnostic questions to determine the right services.</p>
            </div>

            <div className="bg-brand-darker p-6 rounded-lg border border-brand-primary/30">
              <h3 className="text-lg font-bold text-white mb-3">What is your satisfaction guarantee?</h3>
              <p className="text-gray-300">We guarantee 100% satisfaction or provide a follow-up visit at no additional cost.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* ElevenLabs Chat Widget */}
      <elevenlabs-convai agent-id="agent_01k0ce10p4fwqbxtpzs2tsges5"></elevenlabs-convai>
    </div>
  );
};

export default HomeServicesDemo;
