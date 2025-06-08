
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AIVelocityPage = () => {
  return (
    <div className="min-h-screen bg-brand-darker">
      <Navbar />
      
      {/* Hero Section - Slide 1 */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-brand-darker via-brand-dark to-brand-darker relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 opacity-50"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-primary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-brand-accent/10 rounded-full filter blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                AI Velocity
              </h1>
              <p className="text-lg text-gray-300 mb-12">
                Helping you become Full-Stack AI to dominate your industry
              </p>
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Dominate Your Industry
                </h2>
              </div>
              <p className="text-sm text-gray-400">
                © 2025 Dry Ground AI. All rights reserved.
              </p>
            </div>
            <div className="hidden lg:block">
              {/* Placeholder for futuristic city illustration */}
              <div className="h-96 bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 rounded-lg border border-brand-primary/30 flex items-center justify-center">
                <span className="text-6xl text-brand-primary opacity-50">AI</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The AI Imperative - Slide 2 */}
      <section className="py-20 bg-brand-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="hidden lg:block">
              {/* Placeholder for boardroom illustration */}
              <div className="h-96 bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 rounded-lg border border-brand-primary/30 flex items-center justify-center">
                <span className="text-4xl text-brand-primary opacity-50">AI TRANSFORMATION ROADMAP</span>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white mb-12">The AI Imperative</h2>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-brand-primary rounded-lg">
                    <div className="w-6 h-6 bg-white rounded"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Next Industrial Revolution</h3>
                    <p className="text-gray-300">Businesses that fail to adopt will be left behind</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-brand-primary rounded-lg">
                    <div className="w-6 h-6 bg-white rounded"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Full-Stack AI is the future</h3>
                    <p className="text-gray-300">Integration across all operations creates market leaders</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-brand-primary rounded-lg">
                    <div className="w-6 h-6 bg-white rounded"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Your AI Launchpad</h3>
                    <p className="text-gray-300">We're AI-native, AI-first, dedicated to your success</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-400 mt-12">
                © 2025 Dry Ground AI. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What is Full-Stack AI - Slide 3 */}
      <section className="py-20 bg-brand-darker relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl font-bold text-white mb-16">What is Full-Stack AI?</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="hidden lg:block">
              {/* Triangle/Pyramid visualization */}
              <div className="relative">
                <div className="space-y-0">
                  {/* Leadership - Top */}
                  <div className="bg-brand-primary/80 p-6 text-center rounded-t-lg border border-brand-primary">
                    <div className="text-white text-lg font-medium mb-2">👑</div>
                  </div>
                  
                  {/* Analytics */}
                  <div className="bg-brand-primary/60 p-6 text-center border-l border-r border-brand-primary">
                    <div className="text-white text-lg font-medium mb-2">📊</div>
                  </div>
                  
                  {/* Customer Service */}
                  <div className="bg-brand-primary/40 p-6 text-center border-l border-r border-brand-primary">
                    <div className="text-white text-lg font-medium mb-2">💬</div>
                  </div>
                  
                  {/* Operations - Bottom */}
                  <div className="bg-brand-primary/20 p-6 text-center rounded-b-lg border border-brand-primary">
                    <div className="text-white text-lg font-medium mb-2">⚙️</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="text-4xl">👑</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Leadership</h3>
                  <p className="text-gray-300">AI-assisted decision-making</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="text-4xl">📊</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Analytics</h3>
                  <p className="text-gray-300">Real-time insights and adaptive learning</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="text-4xl">💬</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Customer Service</h3>
                  <p className="text-gray-300">Intelligent agents and personalization</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="text-4xl">⚙️</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Operations</h3>
                  <p className="text-gray-300">Smart automation for workflows</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-400 mt-16">
            © 2025 Dry Ground AI. All rights reserved.
          </p>
        </div>
      </section>

      {/* Time is of the Essence - Slide 4 */}
      <section className="py-20 bg-brand-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-12">Time is of the Essence</h2>

              <div className="space-y-6">
                <div className="bg-brand-primary/20 p-6 rounded-lg border border-brand-primary/30">
                  <h3 className="text-xl font-bold text-white mb-2">Automate Faster</h3>
                  <p className="text-gray-300">Streamline operations before competitors</p>
                </div>

                <div className="bg-brand-primary/20 p-6 rounded-lg border border-brand-primary/30">
                  <h3 className="text-xl font-bold text-white mb-2">Operate Leaner</h3>
                  <p className="text-gray-300">Reduce costs while improving quality</p>
                </div>

                <div className="bg-brand-primary/20 p-6 rounded-lg border border-brand-primary/30">
                  <h3 className="text-xl font-bold text-white mb-2">Better Customer Outcomes</h3>
                  <p className="text-gray-300">Personalized, responsive experiences</p>
                </div>

                <div className="bg-brand-primary/20 p-6 rounded-lg border border-brand-primary/30">
                  <h3 className="text-xl font-bold text-white mb-2">Outpace Competition</h3>
                  <p className="text-gray-300">Position for market acquisition</p>
                </div>
              </div>

              <p className="text-sm text-gray-400 mt-12">
                © 2025 Dry Ground AI. All rights reserved.
              </p>
            </div>

            <div className="hidden lg:block">
              {/* Placeholder for running businesspeople illustration */}
              <div className="h-96 bg-gradient-to-br from-brand-primary/20 to-purple-500/20 rounded-lg border border-brand-primary/30 flex items-center justify-center">
                <span className="text-6xl">🏃‍♂️💼</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Dry Ground AI - Slide 5 */}
      <section className="py-20 bg-brand-darker relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="hidden lg:block">
              {/* Placeholder for team collaboration illustration */}
              <div className="h-96 bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 rounded-lg border border-brand-primary/30 flex items-center justify-center">
                <span className="text-4xl text-brand-primary opacity-50">👥💻🧠</span>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-white mb-12">Why Dry Ground AI?</h2>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-brand-primary rounded-lg">
                    <div className="w-6 h-6 bg-white rounded"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">AI-native, AI-first</h3>
                    <p className="text-gray-300">Not a side project - our core business</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-brand-primary rounded-lg">
                    <div className="w-6 h-6 bg-white rounded"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">End-to-End Solutions</h3>
                    <p className="text-gray-300">From LLM integration to infrastructure</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-brand-primary rounded-lg">
                    <div className="w-6 h-6 bg-white rounded"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Lean Six Sigma Engineered</h3>
                    <p className="text-gray-300">Operational excellence meets cutting-edge tech</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-brand-primary rounded-lg">
                    <div className="w-6 h-6 bg-white rounded"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">R&D-driven Innovation</h3>
                    <p className="text-gray-300">Constant testing and proprietary development</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-400 mt-12">
                © 2025 Dry Ground AI. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bolt-On Velocity Partnership - Slide 6 */}
      <section className="py-20 bg-brand-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl font-bold text-white mb-16">Bolt-On Velocity Partnership</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-bold text-white mb-8">You Bring</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-brand-primary mr-4 text-xl">•</span>
                  <span className="text-gray-300 text-lg">Domain expertise</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-primary mr-4 text-xl">•</span>
                  <span className="text-gray-300 text-lg">Market knowledge</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-primary mr-4 text-xl">•</span>
                  <span className="text-gray-300 text-lg">Customer insights</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-primary mr-4 text-xl">•</span>
                  <span className="text-gray-300 text-lg">Operational understanding</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-8">We Bring</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-brand-primary mr-4 text-xl">•</span>
                  <span className="text-gray-300 text-lg">AI Velocity</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-primary mr-4 text-xl">•</span>
                  <span className="text-gray-300 text-lg">Day one acceleration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-primary mr-4 text-xl">•</span>
                  <span className="text-gray-300 text-lg">Specialized AI engineers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-primary mr-4 text-xl">•</span>
                  <span className="text-gray-300 text-lg">R&D ecosystem advantage</span>
                </li>
              </ul>
            </div>
          </div>

          <p className="text-sm text-gray-400 mt-16">
            © 2025 Dry Ground AI. All rights reserved.
          </p>
        </div>
      </section>

      {/* AI Organization Chart - Slide 7 */}
      <section className="py-20 bg-brand-darker relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="hidden lg:block">
              {/* Organizational chart visualization */}
              <div className="space-y-8">
                <div className="text-center">
                  <div className="text-sm text-brand-primary font-medium mb-4">EXECUTIVE DIGITAL TWINS</div>
                  <div className="flex justify-center space-x-4 mb-8">
                    <div className="w-16 h-16 bg-brand-primary/20 rounded border border-brand-primary flex items-center justify-center">
                      <span className="text-brand-primary">👤</span>
                    </div>
                    <div className="w-16 h-16 bg-brand-primary/20 rounded border border-brand-primary flex items-center justify-center">
                      <span className="text-brand-primary">👤</span>
                    </div>
                    <div className="w-16 h-16 bg-brand-primary/20 rounded border border-brand-primary flex items-center justify-center">
                      <span className="text-brand-primary">👤</span>
                    </div>
                  </div>
                  
                  <div className="w-24 h-24 bg-brand-primary/30 rounded-full mx-auto mb-8 flex items-center justify-center">
                    <span className="text-2xl">🧠</span>
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-brand-primary/20 rounded border border-brand-primary flex items-center justify-center mb-2">
                        <span className="text-brand-primary">👤</span>
                      </div>
                      <div className="text-xs text-brand-primary">DEPARTMENT A</div>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-brand-primary/20 rounded border border-brand-primary flex items-center justify-center mb-2">
                        <span className="text-brand-primary">👤</span>
                      </div>
                      <div className="text-xs text-brand-primary">DEPARTMENT B</div>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-brand-primary/20 rounded border border-brand-primary flex items-center justify-center mb-2">
                        <span className="text-brand-primary">👤</span>
                      </div>
                      <div className="text-xs text-brand-primary">DEPARTMENT C</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-white mb-4">
                AI Organization Chart: The Future of Work
              </h2>
              <p className="text-lg text-gray-300 mb-12">
                Your competitive edge begins with strategic AI deployment throughout your organization.
              </p>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-brand-primary rounded-lg">
                    <div className="w-6 h-6 bg-white rounded"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Company Brain</h3>
                    <p className="text-gray-300">Central LLM intelligence connecting all data, decisions, and institutional knowledge.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-brand-primary rounded-lg">
                    <div className="w-6 h-6 bg-white rounded"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Executive Digital Twins</h3>
                    <p className="text-gray-300">AI simulations of leadership for scenario planning and strategy development.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-brand-primary rounded-lg">
                    <div className="w-6 h-6 bg-white rounded"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Department AI Agents</h3>
                    <p className="text-gray-300">Specialized AI workers with human oversight for maximum efficiency.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-brand-primary rounded-lg">
                    <div className="w-6 h-6 bg-white rounded"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Human-AI Collaboration</h3>
                    <p className="text-gray-300">Humans focus on creativity and judgment while AI handles scale.</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-400 mt-12">
                © 2025 Dry Ground AI. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Velocity Plan Tiers - Slide 8 */}
      <section className="py-20 bg-brand-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl font-bold text-white mb-16">AI Velocity Plan Tiers</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pulse Plan */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Pulse Plan</h3>
              <p className="text-gray-300 mb-8">Start your AI journey with targeted solutions.</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-brand-primary mr-3 text-lg">•</span>
                  <span className="text-gray-300">Core AI capabilities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-primary mr-3 text-lg">•</span>
                  <span className="text-gray-300">Modular plug-in solutions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-primary mr-3 text-lg">•</span>
                  <span className="text-gray-300">Ideal for pilot programs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-primary mr-3 text-lg">•</span>
                  <span className="text-gray-300">Process automation focus</span>
                </li>
              </ul>
            </div>

            {/* Flow Plan */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Flow Plan</h3>
              <p className="text-gray-300 mb-8">Scale successful AI implementations across your business.</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-brand-primary mr-3 text-lg">•</span>
                  <span className="text-gray-300">Dedicated project management</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-primary mr-3 text-lg">•</span>
                  <span className="text-gray-300">Specialized AI engineers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-primary mr-3 text-lg">•</span>
                  <span className="text-gray-300">Cross-platform automations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-primary mr-3 text-lg">•</span>
                  <span className="text-gray-300">Custom AI agent development</span>
                </li>
              </ul>
            </div>

            {/* Surge Plan */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Surge Plan</h3>
              <p className="text-gray-300 mb-8">Achieve full-stack AI transformation and market leadership.</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-brand-primary mr-3 text-lg">•</span>
                  <span className="text-gray-300">Cross-disciplinary AI team</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-primary mr-3 text-lg">•</span>
                  <span className="text-gray-300">Digital twin implementation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-primary mr-3 text-lg">•</span>
                  <span className="text-gray-300">Organization-wide AI mapping</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-primary mr-3 text-lg">•</span>
                  <span className="text-gray-300">Continuous deployment systems</span>
                </li>
              </ul>
            </div>
          </div>

          <p className="text-sm text-gray-400 mt-16">
            © 2025 Dry Ground AI. All rights reserved.
          </p>
        </div>
      </section>

      {/* Let's Build Market Leaders Together - Slide 9 */}
      <section className="py-20 bg-brand-darker relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          

          {/* Hero image placeholder */}
          <div className="h-64 bg-gradient-to-r from-brand-primary/20 to-purple-500/20 rounded-lg border border-brand-primary/30 mb-16 flex items-center justify-center">
            <span className="text-4xl">👥🎉📈</span>
          </div>

          <h2 className="text-4xl font-bold text-white mb-16 text-center">
            Let's Build Market Leaders Together
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-2 bg-brand-primary rounded-full mb-6 max-w-xs mx-auto"></div>
              <h3 className="text-xl font-bold text-white mb-4">Discovery Call</h3>
              <p className="text-gray-300">Identify transformation opportunities</p>
            </div>

            <div className="text-center">
              <div className="h-2 bg-brand-primary rounded-full mb-6 max-w-sm mx-auto"></div>
              <h3 className="text-xl font-bold text-white mb-4">Custom Roadmap</h3>
              <p className="text-gray-300">Clear milestones with defined ROI</p>
            </div>

            <div className="text-center">
              <div className="h-2 bg-brand-primary rounded-full mb-6 max-w-lg mx-auto"></div>
              <h3 className="text-xl font-bold text-white mb-4">Strategic Implementation</h3>
              <p className="text-gray-300">Move fast before competitors do</p>
            </div>
          </div>

          <div className="text-center mt-16">
            <a
              href="/#contact"
              className="inline-flex items-center px-8 py-4 bg-brand-primary text-white font-medium rounded-md hover:bg-brand-secondary transition-colors duration-300 mr-4"
            >
              Get Started Today
            </a>
            <a
              href="https://strategy.dryground.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 border border-brand-primary text-brand-primary font-medium rounded-md hover:bg-brand-primary hover:text-white transition-colors duration-300"
            >
              Try Our AI Strategizer
            </a>
          </div>

          <p className="text-sm text-gray-400 mt-16 text-center">
            © 2025 Dry Ground AI. All rights reserved.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIVelocityPage;
