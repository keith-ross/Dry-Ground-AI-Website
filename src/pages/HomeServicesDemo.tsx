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
              <p className="text-lg text-gray-300 mb-8">
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

      {/* AI Use Cases Section */}
      <section className="py-20 bg-brand-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Additional AI Use Cases for Home Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-brand-darker p-6 rounded-lg border border-brand-primary/30">
              <Clock className="w-8 h-8 text-brand-primary mb-4" />
              <h3 className="text-lg font-bold text-white mb-3">
                Answering Customer Questions 24/7
              </h3>
              <p className="text-gray-300">
                Instant responses to FAQs about services, pricing, and
                availability.
              </p>
            </div>

            <div className="bg-brand-darker p-6 rounded-lg border border-brand-primary/30">
              <Calendar className="w-8 h-8 text-brand-primary mb-4" />
              <h3 className="text-lg font-bold text-white mb-3">
                Scheduling Service Calls
              </h3>
              <p className="text-gray-300">
                Handles appointments, reschedules, and cancellations with
                real-time availability.
              </p>
            </div>

            <div className="bg-brand-darker p-6 rounded-lg border border-brand-primary/30">
              <MessageSquare className="w-8 h-8 text-brand-primary mb-4" />
              <h3 className="text-lg font-bold text-white mb-3">
                Collecting Customer Feedback
              </h3>
              <p className="text-gray-300">
                Gathers feedback post-service to assess quality and improvement
                areas.
              </p>
            </div>

            <div className="bg-brand-darker p-6 rounded-lg border border-brand-primary/30">
              <CheckCircle className="w-8 h-8 text-brand-primary mb-4" />
              <h3 className="text-lg font-bold text-white mb-3">
                Encouraging Online Reviews
              </h3>
              <p className="text-gray-300">
                Prompts happy customers to leave reviews on Google or Yelp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Information Section */}
      <section className="py-16 bg-brand-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">
                Example/Demo Company Information
              </h2>

              <div className="bg-brand-dark p-8 rounded-lg border border-brand-primary/30">
                <h3 className="text-2xl font-bold text-white mb-6">
                  ProFix Home Services
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-brand-primary mr-3" />
                    <div>
                      <p className="text-white font-semibold">Address:</p>
                      <p className="text-gray-300">
                        789 Maple Lane, Dallas, TX 75202
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-brand-primary mr-3" />
                    <div>
                      <p className="text-white font-semibold">Phone:</p>
                      <p className="text-gray-300">(972) 555-3456</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-brand-primary mr-3" />
                    <div>
                      <p className="text-white font-semibold">Service Areas:</p>
                      <p className="text-gray-300">
                        Dallas, TX and Surrounding Areas
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white mb-8">
                Services Offered
              </h2>

              <div className="space-y-4">
                <div className="bg-brand-dark p-6 rounded-lg border border-brand-primary/30">
                  <h4 className="text-lg font-bold text-white mb-2">
                    Plumbing Repairs and Installations
                  </h4>
                  <p className="text-gray-300">
                    Leak fixes, water heater replacement, sewer repairs, fixture
                    installs.
                  </p>
                </div>

                <div className="bg-brand-dark p-6 rounded-lg border border-brand-primary/30">
                  <h4 className="text-lg font-bold text-white mb-2">
                    Electrical Services
                  </h4>
                  <p className="text-gray-300">
                    Rewiring, panel upgrades, lighting, safety inspections.
                  </p>
                </div>

                <div className="bg-brand-dark p-6 rounded-lg border border-brand-primary/30">
                  <h4 className="text-lg font-bold text-white mb-2">
                    HVAC Installation, Maintenance, and Repair
                  </h4>
                  <p className="text-gray-300">
                    Installations, bi-annual service, emergency repairs.
                  </p>
                </div>

                <div className="bg-brand-dark p-6 rounded-lg border border-brand-primary/30">
                  <h4 className="text-lg font-bold text-white mb-2">
                    Home Inspections and Energy Audits
                  </h4>
                  <p className="text-gray-300">
                    Safety and efficiency checks with improvement
                    recommendations.
                  </p>
                </div>

                <div className="bg-brand-dark p-6 rounded-lg border border-brand-primary/30">
                  <h4 className="text-lg font-bold text-white mb-2">
                    Emergency 24/7 Service Calls
                  </h4>
                  <p className="text-gray-300">
                    Immediate help for urgent plumbing, electrical, or HVAC
                    issues.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Pricing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-brand-darker p-6 rounded-lg border border-brand-primary/30 text-center">
              <DollarSign className="w-8 h-8 text-brand-primary mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-3">
                Service Call Fee
              </h3>
              <p className="text-gray-300">
                $75 (waived if repair is completed)
              </p>
            </div>

            <div className="bg-brand-darker p-6 rounded-lg border border-brand-primary/30 text-center">
              <Clock className="w-8 h-8 text-brand-primary mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-3">Hourly Rate</h3>
              <p className="text-gray-300">
                $95/hour for plumbing and electrical
              </p>
            </div>

            <div className="bg-brand-darker p-6 rounded-lg border border-brand-primary/30 text-center">
              <CheckCircle className="w-8 h-8 text-brand-primary mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-3">
                HVAC Maintenance Plan
              </h3>
              <p className="text-gray-300">$150/year per unit</p>
            </div>

            <div className="bg-brand-darker p-6 rounded-lg border border-brand-primary/30 text-center">
              <Phone className="w-8 h-8 text-brand-primary mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-3">
                Emergency Service Fee
              </h3>
              <p className="text-gray-300">$50 additional for after-hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-brand-darker p-6 rounded-lg border border-brand-primary/30">
              <h3 className="text-lg font-bold text-white mb-3">
                What is included in the HVAC Maintenance Plan?
              </h3>
              <p className="text-gray-300">
                Two seasonal check-ups, priority scheduling, 10% discount.
              </p>
            </div>

            <div className="bg-brand-darker p-6 rounded-lg border border-brand-primary/30">
              <h3 className="text-lg font-bold text-white mb-3">
                Do you offer same-day service?
              </h3>
              <p className="text-gray-300">
                Yes, subject to technician availability.
              </p>
            </div>

            <div className="bg-brand-darker p-6 rounded-lg border border-brand-primary/30">
              <h3 className="text-lg font-bold text-white mb-3">
                Are your technicians licensed and insured?
              </h3>
              <p className="text-gray-300">
                Yes, fully licensed, bonded, and insured.
              </p>
            </div>

            <div className="bg-brand-darker p-6 rounded-lg border border-brand-primary/30">
              <h3 className="text-lg font-bold text-white mb-3">
                Do you provide free estimates?
              </h3>
              <p className="text-gray-300">
                Yes for larger jobs; diagnostic fee may apply for small ones.
              </p>
            </div>

            <div className="bg-brand-darker p-6 rounded-lg border border-brand-primary/30">
              <h3 className="text-lg font-bold text-white mb-3">
                Can I book a service call online?
              </h3>
              <p className="text-gray-300">
                Yes, anytime via website or AI assistant.
              </p>
            </div>

            <div className="bg-brand-darker p-6 rounded-lg border border-brand-primary/30">
              <h3 className="text-lg font-bold text-white mb-3">
                What should I do in case of an emergency?
              </h3>
              <p className="text-gray-300">
                Contact the AI assistant for fast technician dispatch.
              </p>
            </div>

            <div className="bg-brand-darker p-6 rounded-lg border border-brand-primary/30">
              <h3 className="text-lg font-bold text-white mb-3">
                How do I know what services I need?
              </h3>
              <p className="text-gray-300">
                The AI assistant guides you with diagnostic questions.
              </p>
            </div>

            <div className="bg-brand-darker p-6 rounded-lg border border-brand-primary/30">
              <h3 className="text-lg font-bold text-white mb-3">
                How long does a typical service call take?
              </h3>
              <p className="text-gray-300">
                Most take 1–2 hours; AI provides time estimates.
              </p>
            </div>

            <div className="bg-brand-darker p-6 rounded-lg border border-brand-primary/30">
              <h3 className="text-lg font-bold text-white mb-3">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-300">
                Credit, check, cash; financing available.
              </p>
            </div>

            <div className="bg-brand-darker p-6 rounded-lg border border-brand-primary/30">
              <h3 className="text-lg font-bold text-white mb-3">
                What should I do before the technician arrives?
              </h3>
              <p className="text-gray-300">
                Clear the area, secure pets, follow checklist.
              </p>
            </div>

            <div className="bg-brand-darker p-6 rounded-lg border border-brand-primary/30">
              <h3 className="text-lg font-bold text-white mb-3">
                Do you offer maintenance plans for plumbing and electrical?
              </h3>
              <p className="text-gray-300">
                Yes, with regular inspections and discounts.
              </p>
            </div>

            <div className="bg-brand-darker p-6 rounded-lg border border-brand-primary/30">
              <h3 className="text-lg font-bold text-white mb-3">
                What is your satisfaction guarantee?
              </h3>
              <p className="text-gray-300">
                100% satisfaction or a follow-up visit at no cost.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* ElevenLabs Chat Widget */}
      <elevenlabs-convai agent-id="agent_01k0cch03pe04s8k0dr6770e8m"></elevenlabs-convai>
      <script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        async
        type="text/javascript"
      ></script>
    </div>
  );
};

export default HomeServicesDemo;
