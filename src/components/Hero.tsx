
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative bg-brand-darker overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark to-brand-darker"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-primary/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-brand-primary/5 rounded-full filter blur-3xl"></div>
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-white">
              <h1 className="font-extrabold tracking-tight text-4xl sm:text-5xl md:text-6xl text-balance mb-2">
                Helping New SMB Owners
              </h1>
              <h1 className="font-extrabold tracking-tight text-4xl sm:text-5xl md:text-6xl text-brand-primary text-balance">
                Achieve Stability
              </h1>
            </div>
            
            <p className="mt-6 text-base text-gray-300 sm:text-lg md:text-xl max-w-2xl">
              We help new SMB owners with chaotic and inefficient operations get more sleep by leveraging AI 
              to fast track stability and clarity. Our solutions turn complexity into strategic advantage.
            </p>
            
            <h2 className="text-4xl font-extrabold tracking-tight text-white mt-8 text-balance">
              What's your AI strategy?
            </h2>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-primary hover:bg-brand-secondary transition-colors duration-300"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-700 text-base font-medium rounded-md text-white hover:bg-gray-800 transition-colors duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
          
          <div className="relative">
            {/* Main illustration */}
            <div className="relative mx-auto w-full max-w-md">
              <div className="relative block w-full overflow-hidden rounded-2xl shadow-xl">
                <div className="w-full h-0 pb-[100%] bg-gradient-to-br from-brand-primary/20 to-brand-secondary/40 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-4">
                      <div className="relative w-full max-w-sm mx-auto">
                        <div className="absolute inset-0 bg-brand-darker/30 backdrop-blur-sm rounded-xl"></div>
                        <div className="relative p-4">
                          <div className="h-2 w-20 bg-brand-primary/40 rounded mb-3"></div>
                          <div className="h-2 w-full bg-gray-700/40 rounded mb-2"></div>
                          <div className="h-2 w-full bg-gray-700/40 rounded mb-2"></div>
                          <div className="h-2 w-2/3 bg-gray-700/40 rounded mb-4"></div>
                          
                          <div className="flex items-center space-x-2 mb-4">
                            <div className="w-6 h-6 rounded-full bg-brand-primary/40"></div>
                            <div className="h-2 w-20 bg-brand-primary/40 rounded"></div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <div className="h-24 bg-gray-700/30 rounded-lg flex items-center justify-center">
                              <div className="w-8 h-8 rounded-full bg-brand-primary/40"></div>
                            </div>
                            <div className="h-24 bg-gray-700/30 rounded-lg flex items-center justify-center">
                              <div className="w-8 h-8 rounded-full bg-brand-primary/40"></div>
                            </div>
                            <div className="h-24 bg-gray-700/30 rounded-lg flex items-center justify-center">
                              <div className="w-8 h-8 rounded-full bg-brand-primary/40"></div>
                            </div>
                            <div className="h-24 bg-gray-700/30 rounded-lg flex items-center justify-center">
                              <div className="w-8 h-8 rounded-full bg-brand-primary/40"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-primary/30 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-accent/30 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
