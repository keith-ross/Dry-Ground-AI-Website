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
  ArrowRight,
  Zap,
  Users,
  Star,
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

      {/* Enhanced Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-brand-darker via-brand-dark to-brand-darker relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-darker via-brand-secondary/20 to-brand-darker opacity-70"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-primary/10 rounded-full filter blur-3xl animate-pulse"></div>
          <div
            className="absolute top-3/4 right-1/4 w-96 h-96 bg-brand-accent/10 rounded-full filter blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 w-32 h-32 bg-brand-primary/5 rounded-full filter blur-2xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                <span className="block">Home Services</span>
                <span className="block text-brand-primary">AI Assistant</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                Our AI assistants are designed to support home service
                businesses like plumbing, electrical, and HVAC companies by
                handling appointment scheduling, providing service estimates,
                and efficiently managing customer communications.
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
                  src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Home Services"
                  className="w-full h-96 object-cover rounded-xl border border-brand-primary/30 shadow-xl shadow-brand-primary/20"
                  style={{ aspectRatio: "16/9" }}
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
            <h2 className="text-base font-semibold text-brand-primary tracking-wide uppercase">
              AI Capabilities
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              How Our AI Assistant Works for Home Services
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto">
              Advanced AI technology designed specifically for home service
              businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative bg-brand-darker p-8 rounded-xl overflow-hidden transition-all duration-300 hover:bg-gray-750 hover:shadow-xl hover:shadow-brand-primary/10 hover:transform hover:scale-105">
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 inline-flex items-center justify-center rounded-xl bg-brand-dark group-hover:bg-brand-dark/70 transition-colors duration-300">
                    <Calendar className="w-8 h-8 text-brand-primary" />
                  </div>
                  <span className="text-xs font-medium px-3 py-1 bg-brand-primary/20 text-brand-primary rounded-full">
                    Core Feature
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-brand-primary transition-colors duration-300 mb-4">
                  24/7 Scheduling & Availability
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 mb-4">
                  Handle appointment bookings, reschedules, and cancellations
                  with real-time availability. Answer customer questions about
                  services and pricing around the clock.
                </p>
                <div className="flex items-center text-sm text-brand-accent">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>Real-time integration</span>
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
                  Service Estimates & Guidance
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 mb-4">
                  Provide preliminary estimates based on customer descriptions
                  and guide them through diagnostic questions to determine the
                  right services needed.
                </p>
                <div className="flex items-center text-sm text-brand-primary">
                  <Star className="w-4 h-4 mr-2" />
                  <span>Smart diagnostics</span>
                </div>
              </div>
            </div>

            <div className="group relative bg-brand-darker p-8 rounded-xl overflow-hidden transition-all duration-300 hover:bg-gray-750 hover:shadow-xl hover:shadow-brand-primary/10 hover:transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 inline-flex items-center justify-center rounded-xl bg-brand-dark group-hover:bg-brand-dark/70 transition-colors duration-300">
                    <Users className="w-8 h-8 text-brand-primary" />
                  </div>
                  <span className="text-xs font-medium px-3 py-1 bg-brand-primary/20 text-brand-primary rounded-full">
                    Premium
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-brand-primary transition-colors duration-300 mb-4">
                  Customer Follow-up & Reviews
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 mb-4">
                  Collect feedback post-service, encourage satisfied customers
                  to leave online reviews, and handle emergency dispatch
                  coordination.
                </p>
                <div className="flex items-center text-sm text-brand-accent">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>Automated follow-up</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Company Knowledge Base Information */}
      <section className="py-20 bg-brand-darker relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/10 to-brand-primary/5"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold text-brand-primary tracking-wide uppercase">
              Demo Company
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              Company Knowledge Base Information
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto">
              See how our AI assistant handles real company information and
              customer inquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 p-8 rounded-xl border border-brand-primary/30 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="p-2 bg-brand-primary/20 rounded-lg mr-4">
                    <MapPin className="w-6 h-6 text-brand-primary" />
                  </div>
                  ProFix Home Services
                </h3>
                <div className="space-y-3 text-gray-300">
                  <p className="flex items-center">
                    <span className="w-2 h-2 bg-brand-primary rounded-full mr-3"></span>
                    789 Maple Lane, Dallas, TX 75202
                  </p>
                  <p className="flex items-center">
                    <Phone className="w-4 h-4 text-brand-accent mr-3" />
                    (972) 555-3456
                  </p>
                  <p className="mt-4 text-gray-300 leading-relaxed">
                    Professional home service solutions for plumbing,
                    electrical, and HVAC needs in Dallas, TX and surrounding
                    areas.
                  </p>
                </div>
              </div>

              <div className="bg-brand-primary/10 p-6 rounded-xl border border-brand-primary/30">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Wrench className="w-5 h-5 text-brand-primary mr-3" />
                  Services Offered
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-brand-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>Plumbing repairs and installations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-brand-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>Electrical services and panel upgrades</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-brand-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>HVAC installation, maintenance, and repair</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-brand-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>Home inspections and energy audits</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-brand-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>Emergency 24/7 service calls</span>
                  </li>
                </ul>
              </div>

              <div className="bg-brand-primary/10 p-6 rounded-xl border border-brand-primary/30">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Clock className="w-5 h-5 text-brand-accent mr-3" />
                  Additional Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300">
                  <div>
                    <span className="font-semibold text-white">
                      Service Areas:
                    </span>
                    <p className="text-sm">Dallas, TX and Surrounding Areas</p>
                  </div>
                  <div>
                    <span className="font-semibold text-white">
                      Emergency Service:
                    </span>
                    <p className="text-sm">
                      Available 24/7 with $50 after-hours fee
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold text-white">Licensing:</span>
                    <p className="text-sm">
                      Fully licensed, bonded, and insured
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold text-white">Guarantee:</span>
                    <p className="text-sm">
                      100% satisfaction or follow-up visit at no cost
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-br from-brand-accent/10 to-brand-primary/10 p-8 rounded-xl border border-brand-accent/30">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <DollarSign className="w-6 h-6 text-brand-accent mr-3" />
                  Pricing Structure
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-brand-dark/50 rounded-lg">
                    <span className="text-gray-300">Service Call Fee:</span>
                    <span className="text-brand-primary font-semibold">
                      $75 (waived if repair completed)
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-brand-dark/50 rounded-lg">
                    <span className="text-gray-300">Hourly Rate:</span>
                    <span className="text-brand-primary font-semibold">
                      $95/hour
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-brand-dark/50 rounded-lg">
                    <span className="text-gray-300">
                      HVAC Maintenance Plan:
                    </span>
                    <span className="text-brand-primary font-semibold">
                      $150/year per unit
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-brand-dark/50 rounded-lg">
                    <span className="text-gray-300">
                      Emergency Service Fee:
                    </span>
                    <span className="text-brand-primary font-semibold">
                      $50 additional for after-hours
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-brand-primary/30">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-white">
                        Free Estimates:
                      </span>
                      <p className="text-gray-300">Yes for larger jobs</p>
                    </div>
                    <div>
                      <span className="font-semibold text-white">
                        Payment Methods:
                      </span>
                      <p className="text-gray-300">
                        Credit, check, cash, financing
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-brand-primary/10 p-6 rounded-xl border border-brand-primary/30">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Star className="w-5 h-5 text-brand-accent mr-3" />
                  Maintenance Plans
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-brand-dark/30 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-white">HVAC Plan</span>
                      <span className="text-brand-primary text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                    <p className="text-sm text-gray-300">
                      Two seasonal check-ups, priority scheduling, 10% discount
                    </p>
                  </div>
                  <div className="p-3 bg-brand-dark/30 rounded-lg">
                    <span className="font-medium text-white">
                      Plumbing Plan
                    </span>
                    <p className="text-sm text-gray-300">
                      Annual inspections and discounts
                    </p>
                  </div>
                  <div className="p-3 bg-brand-dark/30 rounded-lg">
                    <span className="font-medium text-white">
                      Electrical Plan
                    </span>
                    <p className="text-sm text-gray-300">
                      Safety inspections and maintenance
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-brand-primary/10 p-6 rounded-xl border border-brand-primary/30">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Calendar className="w-5 h-5 text-brand-primary mr-3" />
                  Service Information
                </h3>
                <div className="space-y-3 text-gray-300">
                  <div>
                    <span className="font-semibold text-white">
                      Typical Service Duration:
                    </span>
                    <p className="text-sm">Most jobs take 1–2 hours</p>
                  </div>
                  <div>
                    <span className="font-semibold text-white">
                      Same-Day Service:
                    </span>
                    <p className="text-sm">
                      Available subject to technician availability
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold text-white">Booking:</span>
                    <p className="text-sm">
                      Available 24/7 via website or AI assistant
                    </p>
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
            <h2 className="text-base font-semibold text-brand-primary tracking-wide uppercase">
              Support
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              Frequently Asked Questions
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto">
              See how our AI assistant handles common customer inquiries.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "What is included in the HVAC Maintenance Plan?",
                answer:
                  "Two seasonal check-ups, priority scheduling, and 10% discount on repairs.",
                popular: true,
              },
              {
                question: "Do you offer same-day service?",
                answer:
                  "Yes, subject to technician availability. Contact us early for best availability.",
              },
              {
                question: "Are your technicians licensed and insured?",
                answer:
                  "Yes, all technicians are fully licensed, bonded, and insured for your protection.",
              },
              {
                question: "Do you provide free estimates?",
                answer:
                  "Yes for larger jobs. A diagnostic fee may apply for smaller repairs, which is waived if you proceed with the work.",
              },
              {
                question: "Can I book a service call online?",
                answer:
                  "Yes, you can book anytime via our website or AI assistant, available 24/7.",
              },
              {
                question: "What should I do in case of an emergency?",
                answer:
                  "Contact our AI assistant immediately for fast technician dispatch. Emergency service available 24/7.",
              },
              {
                question: "How do I know what services I need?",
                answer:
                  "Our AI assistant will guide you through diagnostic questions to determine the right services.",
              },
              {
                question: "What is your satisfaction guarantee?",
                answer:
                  "We guarantee 100% satisfaction or provide a follow-up visit at no additional cost.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="group bg-brand-darker p-6 rounded-xl border border-brand-primary/30 hover:border-brand-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-brand-primary/10"
              >
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
      <elevenlabs-convai agent-id="agent_01k0ce10p4fwqbxtpzs2tsges5"></elevenlabs-convai>
    </div>
  );
};

export default HomeServicesDemo;
