
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MessageSquare, Phone, Calendar, Shield, Clock, MapPin, Users, Wrench, Stethoscope, Home, ArrowRight, Zap } from 'lucide-react';

const DemosPage = () => {
  return (
    <div className="min-h-screen bg-brand-darker">
      <Navbar />

      {/* Enhanced Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-br from-brand-darker via-brand-dark to-brand-darker relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-darker via-brand-secondary/20 to-brand-darker opacity-70"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-primary/10 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-brand-accent/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-brand-primary/5 rounded-full filter blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-brand-primary/20 text-brand-primary border border-brand-primary/30">
                <Zap className="w-4 h-4 mr-2" />
                Interactive AI Demonstrations
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Try Our AI Assistants
              <span className="block text-brand-primary">in Action</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              At Dry Ground AI, we understand the power of AI to transform your business. Our AI assistants are designed to help you streamline operations, enhance customer service, and automate routine tasks across a variety of industries.
            </p>
            <div className="bg-gradient-to-r from-brand-primary/20 to-brand-accent/20 p-6 rounded-xl border border-brand-primary/30 backdrop-blur-sm max-w-4xl mx-auto">
              <p className="text-lg text-white font-medium">
                Experience firsthand how AI can work for your business—whether you're in property management, healthcare, or home services. Simply chat with, call, or speak to one of our AI assistants and see how it can improve your business operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Property Management Demo */}
      <section id="property-management" className="py-20 bg-brand-dark relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-brand-primary/5 rounded-full filter blur-2xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="mb-8">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-brand-primary/20 rounded-xl border border-brand-primary/30 mr-4">
                    <Home className="w-8 h-8 text-brand-primary" />
                  </div>
                                     <div>
                     <h2 className="text-4xl md:text-5xl font-extrabold text-white">Property Management</h2>
                   </div>
                </div>
                <p className="text-xl text-brand-primary mb-6 font-semibold">
                  AI Solutions Tailored for Apartment Complex Reception, Leasing, and Maintenance tasks
                </p>
                <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                  Our AI virtual assistants are designed to function as an efficient, 24/7 apartment complex receptionist, expertly handling leasing calls, answering property questions, and managing maintenance requests. By integrating our AI into your leasing office, you can provide immediate support to current and prospective residents while freeing up your team to focus on higher-level property management tasks.
                </p>
                <a 
                  href="/property-management-demo" 
                  className="group inline-flex items-center px-6 py-3 border-2 border-brand-primary text-lg font-medium rounded-lg text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300"
                >
                  Try Property Management Demo
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
            
            <div className="group bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 p-8 rounded-2xl border border-brand-primary/30 hover:border-brand-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-primary/20">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">How Our AI Assistant Works as Your Apartment Complex Receptionist:</h3>
              
              <div className="space-y-8">
                <div className="flex items-start group/item hover:bg-brand-dark/50 p-4 rounded-xl transition-all duration-300">
                  <div className="p-3 bg-brand-primary/20 rounded-xl border border-brand-primary/30 mr-4 group-hover/item:scale-110 transition-transform duration-300">
                    <Phone className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 group-hover/item:text-brand-primary transition-colors duration-300">Leasing Calls</h4>
                    <p className="text-gray-300 leading-relaxed">Answer leasing inquiries, provide information on available units, schedule tours, explain leasing terms, and guide prospects through the application process.</p>
                  </div>
                </div>
                
                <div className="flex items-start group/item hover:bg-brand-dark/50 p-4 rounded-xl transition-all duration-300">
                  <div className="p-3 bg-brand-primary/20 rounded-xl border border-brand-primary/30 mr-4 group-hover/item:scale-110 transition-transform duration-300">
                    <MessageSquare className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 group-hover/item:text-brand-primary transition-colors duration-300">Property Questions</h4>
                    <p className="text-gray-300 leading-relaxed">Provide detailed and accurate responses to questions about amenities, pet policies, move-in specials, and more.</p>
                  </div>
                </div>
                
                <div className="flex items-start group/item hover:bg-brand-dark/50 p-4 rounded-xl transition-all duration-300">
                  <div className="p-3 bg-brand-primary/20 rounded-xl border border-brand-primary/30 mr-4 group-hover/item:scale-110 transition-transform duration-300">
                    <Wrench className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 group-hover/item:text-brand-primary transition-colors duration-300">Maintenance Requests</h4>
                    <p className="text-gray-300 leading-relaxed">The AI assistant manages maintenance requests, prioritizes emergency repairs, and provides updates on service status.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Healthcare Demo */}
      <section id="healthcare" className="py-20 bg-brand-darker relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-brand-accent/5 rounded-full filter blur-2xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="group bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 p-8 rounded-2xl border border-brand-primary/30 hover:border-brand-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-primary/20">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">How Our AI Assistants Support Your Practice:</h3>
              
              <div className="space-y-8">
                <div className="flex items-start group/item hover:bg-brand-dark/50 p-4 rounded-xl transition-all duration-300">
                  <div className="p-3 bg-brand-primary/20 rounded-xl border border-brand-primary/30 mr-4 group-hover/item:scale-110 transition-transform duration-300">
                    <Clock className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 group-hover/item:text-brand-primary transition-colors duration-300">24/7 Availability</h4>
                    <p className="text-gray-300 leading-relaxed">The AI assistant is always available to manage bookings, answer questions about services, and provide information on insurance coverage and billing.</p>
                  </div>
                </div>
                
                <div className="flex items-start group/item hover:bg-brand-dark/50 p-4 rounded-xl transition-all duration-300">
                  <div className="p-3 bg-brand-primary/20 rounded-xl border border-brand-primary/30 mr-4 group-hover/item:scale-110 transition-transform duration-300">
                    <MessageSquare className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 group-hover/item:text-brand-primary transition-colors duration-300">Practice Information and FAQ Management</h4>
                    <p className="text-gray-300 leading-relaxed">Patients can get answers to frequently asked questions about office hours, services offered, and preparation for appointments.</p>
                  </div>
                </div>
                
                <div className="flex items-start group/item hover:bg-brand-dark/50 p-4 rounded-xl transition-all duration-300">
                  <div className="p-3 bg-brand-primary/20 rounded-xl border border-brand-primary/30 mr-4 group-hover/item:scale-110 transition-transform duration-300">
                    <Calendar className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 group-hover/item:text-brand-primary transition-colors duration-300">Appointment Scheduling and Management</h4>
                    <p className="text-gray-300 leading-relaxed">The AI assistant seamlessly manages appointment bookings, rescheduling, and cancellations, keeping your schedule organized.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-8">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-brand-primary/20 rounded-xl border border-brand-primary/30 mr-4">
                    <Stethoscope className="w-8 h-8 text-brand-primary" />
                  </div>
                                     <div>
                     <h2 className="text-4xl md:text-5xl font-extrabold text-white">Healthcare</h2>
                   </div>
                </div>
                <p className="text-xl text-brand-primary mb-6 font-semibold">
                  AI Assistants for Healthcare Providers (Dentists, Chiropractors, Physicians)
                </p>
                <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                  Our AI solutions for healthcare providers help clinics manage patient appointments, answer questions about the practice, and handle insurance and billing inquiries—ensuring that no potential customer is missed. Whether you're a dentist, chiropractor, or smaller physician practice, our AI assistants offer patients 24/7 service.
                </p>
                <a 
                  href="/healthcare-demo" 
                  className="group inline-flex items-center px-6 py-3 border-2 border-brand-primary text-lg font-medium rounded-lg text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300"
                >
                  Try Healthcare Demo
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Home Services Demo */}
      <section id="home-services" className="py-20 bg-brand-dark relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-brand-primary/5 rounded-full filter blur-2xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="mb-8">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-brand-primary/20 rounded-xl border border-brand-primary/30 mr-4">
                    <Wrench className="w-8 h-8 text-brand-primary" />
                  </div>
                                     <div>
                     <h2 className="text-4xl md:text-5xl font-extrabold text-white">Home Services</h2>
                   </div>
                </div>
                <p className="text-xl text-brand-primary mb-6 font-semibold">
                  AI Solutions for Home Service Providers
                </p>
                <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                  Our AI assistants are designed to support home service businesses like plumbing, electrical, and HVAC companies by handling appointment scheduling, providing service estimates, and efficiently managing customer communications. With our AI assistants, your business can offer 24/7 support.
                </p>
                <a 
                  href="/home-services-demo" 
                  className="group inline-flex items-center px-6 py-3 border-2 border-brand-primary text-lg font-medium rounded-lg text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300"
                >
                  Try Home Services Demo
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
            
            <div className="group bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 p-8 rounded-2xl border border-brand-primary/30 hover:border-brand-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-primary/20">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Additional AI Use Cases for Home Services:</h3>
              
              <div className="space-y-8">
                <div className="flex items-start group/item hover:bg-brand-dark/50 p-4 rounded-xl transition-all duration-300">
                  <div className="p-3 bg-brand-primary/20 rounded-xl border border-brand-primary/30 mr-4 group-hover/item:scale-110 transition-transform duration-300">
                    <Clock className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 group-hover/item:text-brand-primary transition-colors duration-300">Answering Customer Questions 24/7</h4>
                    <p className="text-gray-300 leading-relaxed">The AI assistant provides instant responses to frequently asked questions about services, pricing, and availability.</p>
                  </div>
                </div>
                
                <div className="flex items-start group/item hover:bg-brand-dark/50 p-4 rounded-xl transition-all duration-300">
                  <div className="p-3 bg-brand-primary/20 rounded-xl border border-brand-primary/30 mr-4 group-hover/item:scale-110 transition-transform duration-300">
                    <Calendar className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 group-hover/item:text-brand-primary transition-colors duration-300">Scheduling Service Calls</h4>
                    <p className="text-gray-300 leading-relaxed">The AI assistant handles all appointment scheduling, rescheduling, and cancellations with real-time availability.</p>
                  </div>
                </div>
                
                <div className="flex items-start group/item hover:bg-brand-dark/50 p-4 rounded-xl transition-all duration-300">
                  <div className="p-3 bg-brand-primary/20 rounded-xl border border-brand-primary/30 mr-4 group-hover/item:scale-110 transition-transform duration-300">
                    <Users className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 group-hover/item:text-brand-primary transition-colors duration-300">Customer Feedback & Reviews</h4>
                    <p className="text-gray-300 leading-relaxed">After service completion, the AI assistant collects feedback and encourages satisfied customers to leave reviews.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DemosPage;
