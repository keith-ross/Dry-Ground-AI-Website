
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AIVelocityPage = () => {
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
              AI Velocity Plan
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Helping you become Full-Stack AI to dominate your industry
            </p>
            <div className="flex justify-center">
              <img src="/logo.svg" alt="Dry Ground AI" className="h-16 w-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* The AI Imperative */}
      <section className="py-20 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold text-brand-primary tracking-wide uppercase">The AI Imperative</h2>
            <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              Next Industrial Revolution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-brand-darker p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Next Industrial Revolution</h3>
              <p className="text-gray-300">Businesses that fail to adopt will be left behind</p>
            </div>
            <div className="bg-brand-darker p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Full-Stack AI is the future</h3>
              <p className="text-gray-300">Integration across all operations creates market leaders</p>
            </div>
            <div className="bg-brand-darker p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Your AI Launchpad</h3>
              <p className="text-gray-300">We're AI-native, AI-first, dedicated to your success</p>
            </div>
          </div>
        </div>
      </section>

      {/* What is Full-Stack AI */}
      <section className="py-20 bg-brand-darker relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-8">
              What is Full-Stack AI?
            </h2>
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-2 bg-brand-primary/20 rounded-full">
                <div className="w-6 h-6 bg-brand-primary rounded-full"></div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">Leadership</h3>
                <p className="mt-1 text-gray-300">AI-assisted decision-making</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-2 bg-brand-primary/20 rounded-full">
                <div className="w-6 h-6 bg-brand-primary rounded-full"></div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">Analytics</h3>
                <p className="mt-1 text-gray-300">Real-time insights and adaptive learning</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-2 bg-brand-primary/20 rounded-full">
                <div className="w-6 h-6 bg-brand-primary rounded-full"></div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">Customer Service</h3>
                <p className="mt-1 text-gray-300">Intelligent agents and personalization</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-2 bg-brand-primary/20 rounded-full">
                <div className="w-6 h-6 bg-brand-primary rounded-full"></div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">Operations</h3>
                <p className="mt-1 text-gray-300">Smart automation for workflows</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Time is of the Essence */}
      <section className="py-20 bg-brand-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-8">
              Time is of the Essence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-brand-primary/10 p-6 rounded-xl border border-brand-primary/30">
              <h3 className="text-lg font-medium text-white mb-2">Automate Faster</h3>
              <p className="text-gray-300">Streamline operations before competitors</p>
            </div>
            <div className="bg-brand-primary/10 p-6 rounded-xl border border-brand-primary/30">
              <h3 className="text-lg font-medium text-white mb-2">Operate Leaner</h3>
              <p className="text-gray-300">Reduce costs while improving quality</p>
            </div>
            <div className="bg-brand-primary/10 p-6 rounded-xl border border-brand-primary/30">
              <h3 className="text-lg font-medium text-white mb-2">Better Customer Outcomes</h3>
              <p className="text-gray-300">Personalized, responsive experiences</p>
            </div>
            <div className="bg-brand-primary/10 p-6 rounded-xl border border-brand-primary/30">
              <h3 className="text-lg font-medium text-white mb-2">Outpace Competition</h3>
              <p className="text-gray-300">Position for market acquisition</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Dry Ground AI */}
      <section className="py-20 bg-brand-darker relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-8">
              Why Dry Ground AI?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-2 bg-brand-primary/20 rounded-full">
                <div className="w-6 h-6 bg-brand-primary rounded-full"></div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">AI-native, AI-first</h3>
                <p className="mt-1 text-gray-300">Not a side project - our core business</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-2 bg-brand-primary/20 rounded-full">
                <div className="w-6 h-6 bg-brand-primary rounded-full"></div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">End-to-End Solutions</h3>
                <p className="mt-1 text-gray-300">From LLM integration to infrastructure</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-2 bg-brand-primary/20 rounded-full">
                <div className="w-6 h-6 bg-brand-primary rounded-full"></div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">Lean Six Sigma Engineered</h3>
                <p className="mt-1 text-gray-300">Operational excellence meets cutting-edge tech</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-2 bg-brand-primary/20 rounded-full">
                <div className="w-6 h-6 bg-brand-primary rounded-full"></div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">R&D-driven Innovation</h3>
                <p className="mt-1 text-gray-300">Constant testing and proprietary development</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bolt-On Velocity Partnership */}
      <section className="py-20 bg-brand-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-8">
              Bolt-On Velocity Partnership
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-white mb-6">You Bring</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-brand-primary mr-3">•</span>
                  <span className="text-gray-300">Domain expertise</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-primary mr-3">•</span>
                  <span className="text-gray-300">Market knowledge</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-primary mr-3">•</span>
                  <span className="text-gray-300">Customer insights</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-primary mr-3">•</span>
                  <span className="text-gray-300">Operational understanding</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-6">We Bring</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-brand-primary mr-3">•</span>
                  <span className="text-gray-300">AI Velocity</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-primary mr-3">•</span>
                  <span className="text-gray-300">Day one acceleration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-primary mr-3">•</span>
                  <span className="text-gray-300">Specialized AI engineers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-primary mr-3">•</span>
                  <span className="text-gray-300">R&D ecosystem advantage</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* AI Velocity Plan Tiers */}
      <section className="py-20 bg-brand-darker relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-8">
              AI Velocity Plan Tiers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pulse Plan */}
            <div className="bg-brand-dark p-8 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Pulse Plan</h3>
              <p className="text-gray-300 mb-6">Start your AI journey with targeted solutions.</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-brand-primary mr-3">•</span>
                  <span className="text-gray-300">Core AI capabilities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-primary mr-3">•</span>
                  <span className="text-gray-300">Modular plug-in solutions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-primary mr-3">•</span>
                  <span className="text-gray-300">Ideal for pilot programs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-primary mr-3">•</span>
                  <span className="text-gray-300">Process automation focus</span>
                </li>
              </ul>
            </div>

            {/* Flow Plan */}
            <div className="bg-brand-dark p-8 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Flow Plan</h3>
              <p className="text-gray-300 mb-6">Scale successful AI implementations across your business.</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-brand-primary mr-3">•</span>
                  <span className="text-gray-300">Dedicated project management</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-primary mr-3">•</span>
                  <span className="text-gray-300">Specialized AI engineers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-primary mr-3">•</span>
                  <span className="text-gray-300">Cross-platform automations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-primary mr-3">•</span>
                  <span className="text-gray-300">Custom AI agent development</span>
                </li>
              </ul>
            </div>

            {/* Surge Plan */}
            <div className="bg-brand-dark p-8 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Surge Plan</h3>
              <p className="text-gray-300 mb-6">Achieve full-stack AI transformation and market leadership.</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-brand-primary mr-3">•</span>
                  <span className="text-gray-300">Cross-disciplinary AI team</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-primary mr-3">•</span>
                  <span className="text-gray-300">Digital twin implementation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-primary mr-3">•</span>
                  <span className="text-gray-300">Organization-wide AI mapping</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-primary mr-3">•</span>
                  <span className="text-gray-300">Continuous deployment systems</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* AI Organization Chart */}
      <section className="py-20 bg-brand-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-4">
              AI Organization Chart: The Future of Work
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your competitive edge begins with strategic AI deployment throughout your organization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-2 bg-brand-primary/20 rounded-full">
                <div className="w-6 h-6 bg-brand-primary rounded-full"></div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">Company Brain</h3>
                <p className="mt-1 text-gray-300">Central LLM intelligence connecting all data, decisions, and institutional knowledge.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-2 bg-brand-primary/20 rounded-full">
                <div className="w-6 h-6 bg-brand-primary rounded-full"></div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">Executive Digital Twins</h3>
                <p className="mt-1 text-gray-300">AI simulations of leadership for scenario planning and strategy development.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-2 bg-brand-primary/20 rounded-full">
                <div className="w-6 h-6 bg-brand-primary rounded-full"></div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">Department AI Agents</h3>
                <p className="mt-1 text-gray-300">Specialized AI workers with human oversight for maximum efficiency.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-2 bg-brand-primary/20 rounded-full">
                <div className="w-6 h-6 bg-brand-primary rounded-full"></div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">Human-AI Collaboration</h3>
                <p className="mt-1 text-gray-300">Humans focus on creativity and judgment while AI handles scale.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-primary relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-4">
            Ready to Accelerate Your AI Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Let's discuss which AI Velocity Plan is right for your organization and start building your competitive advantage today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              className="px-8 py-4 bg-white text-brand-primary font-medium rounded-md hover:bg-gray-100 transition-colors duration-300"
            >
              Get Started Today
            </a>
            <a
              href="https://strategy.dryground.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-white text-white font-medium rounded-md hover:bg-white hover:text-brand-primary transition-colors duration-300"
            >
              Try Our AI Strategizer
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIVelocityPage;
