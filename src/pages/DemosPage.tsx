
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MessageSquare, Phone, Calendar, Shield, Clock, MapPin, Users, Wrench, Stethoscope, Home } from 'lucide-react';

const DemosPage = () => {
  return (
    <div className="min-h-screen bg-brand-darker">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-brand-darker via-brand-dark to-brand-darker relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 opacity-50"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-primary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-brand-accent/10 rounded-full filter blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              Try Our AI Assistants
              <span className="text-brand-primary"> in Action</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              At Dry Ground AI, we understand the power of AI to transform your business. Our AI assistants are designed to help you streamline operations, enhance customer service, and automate routine tasks across a variety of industries.
            </p>
            <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
              Below, you can experience firsthand how AI can work for your business—whether you're in property management, healthcare, or home services. Simply chat with, call, or speak to one of our AI assistants and see how it can improve your business operations.
            </p>
          </div>
        </div>
      </section>

      {/* Property Management Demo */}
      <section id="property-management" className="py-20 bg-brand-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <Home className="w-8 h-8 text-brand-primary mr-3" />
                  <h2 className="text-4xl font-bold text-white">Property Management</h2>
                </div>
                <p className="text-xl text-gray-300 mb-6">
                  AI Solutions Tailored for Apartment Complex Reception, Leasing, and Maintenance tasks
                </p>
                <p className="text-gray-300 mb-6">
                  Our AI virtual assistants are designed to function as an efficient, 24/7 apartment complex receptionist, expertly handling leasing calls, answering property questions, and managing maintenance requests. By integrating our AI into your leasing office, you can provide immediate support to current and prospective residents while freeing up your team to focus on higher-level property management tasks.
                </p>
                <a 
                  href="/property-management-demo" 
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-primary hover:bg-brand-secondary transition-colors duration-300"
                >
                  Try Property Management Demo
                  <MessageSquare className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div className="bg-brand-primary/10 p-8 rounded-lg border border-brand-primary/30">
              <h3 className="text-2xl font-bold text-white mb-6">How Our AI Assistant Works as Your Apartment Complex Receptionist:</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-brand-primary mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Leasing Calls</h4>
                    <p className="text-gray-300">Answer leasing inquiries, provide information on available units, schedule tours, explain leasing terms, and guide prospects through the application process.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MessageSquare className="w-6 h-6 text-brand-primary mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Property Questions</h4>
                    <p className="text-gray-300">Provide detailed and accurate responses to questions about amenities, pet policies, move-in specials, and more.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Wrench className="w-6 h-6 text-brand-primary mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Maintenance Requests</h4>
                    <p className="text-gray-300">The AI assistant manages maintenance requests, prioritizes emergency repairs, and provides updates on service status.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Healthcare Demo */}
      <section id="healthcare" className="py-20 bg-brand-darker relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-brand-primary/10 p-8 rounded-lg border border-brand-primary/30">
              <h3 className="text-2xl font-bold text-white mb-6">How Our AI Assistants Support Your Practice:</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-brand-primary mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">24/7 Availability</h4>
                    <p className="text-gray-300">The AI assistant is always available to manage bookings, answer questions about services, and provide information on insurance coverage and billing.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MessageSquare className="w-6 h-6 text-brand-primary mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Practice Information and FAQ Management</h4>
                    <p className="text-gray-300">Patients can get answers to frequently asked questions about office hours, services offered, and preparation for appointments.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar className="w-6 h-6 text-brand-primary mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Appointment Scheduling and Management</h4>
                    <p className="text-gray-300">The AI assistant seamlessly manages appointment bookings, rescheduling, and cancellations, keeping your schedule organized.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <Stethoscope className="w-8 h-8 text-brand-primary mr-3" />
                  <h2 className="text-4xl font-bold text-white">Healthcare</h2>
                </div>
                <p className="text-xl text-gray-300 mb-6">
                  AI Assistants for Healthcare Providers (Dentists, Chiropractors, Physicians)
                </p>
                <p className="text-gray-300 mb-6">
                  Our AI solutions for healthcare providers help clinics manage patient appointments, answer questions about the practice, and handle insurance and billing inquiries—ensuring that no potential customer is missed. Whether you're a dentist, chiropractor, or smaller physician practice, our AI assistants offer patients 24/7 service.
                </p>
                <a 
                  href="/healthcare-demo" 
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-primary hover:bg-brand-secondary transition-colors duration-300"
                >
                  Try Healthcare Demo
                  <Stethoscope className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Home Services Demo */}
      <section id="home-services" className="py-20 bg-brand-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <Wrench className="w-8 h-8 text-brand-primary mr-3" />
                  <h2 className="text-4xl font-bold text-white">Home Services</h2>
                </div>
                <p className="text-xl text-gray-300 mb-6">
                  AI Solutions for Home Service Providers
                </p>
                <p className="text-gray-300 mb-6">
                  Our AI assistants are designed to support home service businesses like plumbing, electrical, and HVAC companies by handling appointment scheduling, providing service estimates, and efficiently managing customer communications. With our AI assistants, your business can offer 24/7 support.
                </p>
                <a 
                  href="/home-services-demo" 
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-primary hover:bg-brand-secondary transition-colors duration-300"
                >
                  Try Home Services Demo
                  <Wrench className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div className="bg-brand-primary/10 p-8 rounded-lg border border-brand-primary/30">
              <h3 className="text-2xl font-bold text-white mb-6">Additional AI Use Cases for Home Services:</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-brand-primary mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Answering Customer Questions 24/7</h4>
                    <p className="text-gray-300">The AI assistant provides instant responses to frequently asked questions about services, pricing, and availability.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar className="w-6 h-6 text-brand-primary mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Scheduling Service Calls</h4>
                    <p className="text-gray-300">The AI assistant handles all appointment scheduling, rescheduling, and cancellations with real-time availability.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Users className="w-6 h-6 text-brand-primary mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Customer Feedback & Reviews</h4>
                    <p className="text-gray-300">After service completion, the AI assistant collects feedback and encourages satisfied customers to leave reviews.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-brand-dark relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/20 to-brand-primary/10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Experience how our AI assistants can revolutionize your customer service and streamline your operations. Choose a demo that fits your industry or schedule a consultation to discuss your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://drygroundpartners.com/consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-primary hover:bg-brand-secondary transition-colors duration-300"
            >
              Schedule Consultation
              <Calendar className="ml-2 h-5 w-5" />
            </a>
            <a
              href="#demos"
              className="inline-flex items-center px-8 py-3 border border-gray-700 text-base font-medium rounded-md text-gray-200 hover:bg-brand-dark transition-colors duration-300"
            >
              Explore All Demos
              <MessageSquare className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DemosPage;
