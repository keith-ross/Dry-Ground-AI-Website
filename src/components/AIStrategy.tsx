import React from 'react';
import { BrainCircuit, ArrowRight, Lightbulb, Target, BarChart4 } from 'lucide-react';

const AIStrategy = () => {
  return (
    <section className="py-20 bg-brand-darker relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 opacity-50"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-primary/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-brand-accent/10 rounded-full filter blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-base font-semibold text-brand-primary tracking-wide uppercase">AI Strategy</h2>
            <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl text-wrap max-w-2xl leading-tight">
              Discover Your Optimal AI Path
            </p>
            <p className="mt-4 text-xl text-gray-300">
              Not sure where to start with AI? Our AI Strategizer helps you identify the right solutions for your specific business challenges.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-2 bg-brand-primary/20 rounded-full">
                  <Lightbulb className="h-6 w-6 text-brand-primary" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">Identify Opportunities</h3>
                  <p className="mt-1 text-gray-300">Discover where AI can create the most value for your business</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 p-2 bg-brand-primary/20 rounded-full">
                  <Target className="h-6 w-6 text-brand-primary" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">Prioritize Initiatives</h3>
                  <p className="mt-1 text-gray-300">Get a customized roadmap based on impact and implementation complexity</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 p-2 bg-brand-primary/20 rounded-full">
                  <BarChart4 className="h-6 w-6 text-brand-primary" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">Measure ROI</h3>
                  <p className="mt-1 text-gray-300">Understand the potential return on investment for each AI initiative</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <a
                href="https://strategy.dryground.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-primary hover:bg-brand-secondary transition-colors duration-300"
              >
                Try Our AI Strategizer
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="bg-brand-dark p-8 rounded-xl border border-gray-700 shadow-xl">
              <div className="flex items-center mb-6">
                <BrainCircuit className="h-8 w-8 text-brand-primary mr-3" />
                <h3 className="text-2xl font-bold text-white">AI Strategizer</h3>
              </div>

              <div className="space-y-6">
                <div className="bg-brand-darker p-4 rounded-lg border border-gray-700">
                  <h4 className="text-lg font-medium text-white mb-2">Step 1: Business Assessment</h4>
                  <p className="text-gray-300 text-sm">Answer questions about your business goals, challenges, and current technology landscape.</p>
                </div>

                <div className="bg-brand-darker p-4 rounded-lg border border-gray-700">
                  <h4 className="text-lg font-medium text-white mb-2">Step 2: AI Opportunity Analysis</h4>
                  <p className="text-gray-300 text-sm">Our system analyzes your responses to identify high-impact AI opportunities specific to your business.</p>
                </div>

                <div className="bg-brand-darker p-4 rounded-lg border border-gray-700">
                  <h4 className="text-lg font-medium text-white mb-2">Step 3: Strategic Recommendations</h4>
                  <p className="text-gray-300 text-sm">Receive a customized AI strategy with prioritized initiatives and implementation guidance.</p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-brand-primary/10 rounded-lg border border-brand-primary/30">
                <p className="text-sm text-gray-300">
                  <span className="text-brand-primary font-medium">Free Assessment:</span> Get started with our AI Strategizer today and receive a personalized report within minutes.
                </p>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-brand-primary/30 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-brand-accent/30 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIStrategy;