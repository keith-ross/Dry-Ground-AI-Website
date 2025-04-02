import React from 'react';
import { ArrowRight, Cpu, Network, Zap, BrainCircuit } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-darker via-brand-secondary/20 to-brand-darker opacity-70"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-primary/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-brand-accent/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-extrabold tracking-tight text-white text-4xl sm:text-5xl md:text-6xl max-w-3xl leading-tight">
              <span className="block">AI Solutions for </span>
              <span className="block text-brand-primary">Business</span>
            </h1>
            <p className="mt-6 text-base text-gray-300 sm:text-lg md:text-xl max-w-2xl">
              We help new SMB owners with chaotic and inefficient operations get more sleep by leveraging AI 
              to fast track stability and clarity. Our solutions turn complexity into strategic advantage.
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mt-8 max-w-2xl leading-tight">
              What's your AI strategy?
            </h2>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://strategy.dryground.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-primary hover:bg-brand-secondary transition-colors duration-300"
              >
                Try Our AI Strategizer
              </a>
              <a
                href="#services"
                className="px-6 py-3 border border-gray-700 text-base font-medium rounded-md text-gray-200 hover:bg-brand-dark transition-colors duration-300 flex items-center"
              >
                Explore Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
            <p className="mt-4 text-xl text-gray-300 max-w-3xl">
              Not sure where to start? Our AI Strategizer helps you identify the right AI solutions for your business needs.
            </p>
          </div>
          <div className="hidden md:flex justify-center">
            <div className="relative w-80 h-80">
              {/* Main circular elements */}
              <div className="absolute inset-0 border-4 border-brand-primary/30 rounded-full animate-spin" style={{ animationDuration: '15s' }}></div>
              <div className="absolute inset-4 border-4 border-brand-secondary/20 rounded-full animate-spin" style={{ animationDuration: '10s', animationDirection: 'reverse' }}></div>
              <div className="absolute inset-8 border-4 border-brand-accent/10 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>

              {/* Center element */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex items-center justify-center w-32 h-32 bg-brand-dark rounded-2xl overflow-hidden border border-brand-primary/30 shadow-lg shadow-brand-primary/20">
                  <Zap className="h-16 w-16 text-brand-primary absolute" />
                </div>
              </div>

              {/* Orbital icons */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-brand-dark p-3 rounded-full shadow-lg border border-brand-primary/20">
                <Cpu className="w-6 h-6 text-brand-primary" />
              </div>

              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-brand-dark p-3 rounded-full shadow-lg border border-brand-primary/20">
                <Network className="w-6 h-6 text-brand-accent" />
              </div>

              <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-brand-dark p-3 rounded-full shadow-lg border border-brand-primary/20">
                <BrainCircuit className="w-6 h-6 text-brand-primary" />
              </div>

              <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-brand-dark p-3 rounded-full shadow-lg border border-brand-primary/20">
                <svg className="w-6 h-6 text-brand-accent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Subtle glow effects */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-40 h-40 bg-brand-primary/10 rounded-full filter blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;