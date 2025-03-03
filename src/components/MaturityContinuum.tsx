import React from 'react';
import { Bot, Workflow, Code, Cpu, Brain } from 'lucide-react';

const maturityLevels = [
  {
    icon: <Bot className="h-10 w-10 text-brand-primary" />,
    title: "Bots & AI Agents",
    description: "Entry point for businesses beginning their AI journey. Implement pre-built AI agents to handle customer service, answer questions, and automate simple tasks.",
    features: ["24/7 customer support", "FAQ automation", "Simple task handling", "Low implementation barrier"],
    level: "Entry"
  },
  {
    icon: <Workflow className="h-10 w-10 text-brand-primary" />,
    title: "Process Automation w/AI",
    description: "Integrate AI into existing workflows to enhance efficiency and reduce manual intervention in business processes.",
    features: ["Document processing", "Workflow optimization", "Intelligent routing", "Data extraction"],
    level: "Intermediate"
  },
  {
    icon: <Code className="h-10 w-10 text-brand-primary" />,
    title: "Custom AI Applications",
    description: "Develop tailored AI applications that address specific business challenges and create competitive advantages.",
    features: ["Industry-specific solutions", "Proprietary algorithms", "Integrated systems", "Unique business logic"],
    level: "Advanced"
  },
  {
    icon: <Cpu className="h-10 w-10 text-brand-primary" />,
    title: "AI Model Fine-Tuning",
    description: "Adapt and refine existing AI models to better suit your specific business needs and data characteristics.",
    features: ["Domain adaptation", "Performance optimization", "Specialized capabilities", "Enhanced accuracy"],
    level: "Expert"
  },
  {
    icon: <Brain className="h-10 w-10 text-brand-primary" />,
    title: "Custom AI Models",
    description: "Develop proprietary AI models from the ground up, tailored precisely to your business requirements and data.",
    features: ["Competitive advantage", "Intellectual property", "Maximum customization", "Industry leadership"],
    level: "Pinnacle"
  }
];

const MaturityContinuum = () => {
  return (
    <section id="maturity-continuum" className="py-20 bg-brand-dark relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 opacity-50"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-primary/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-brand-accent/10 rounded-full filter blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-brand-primary tracking-wide uppercase">Growth Path</h2>
          <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            AI Maturity Continuum
          </p>
          <p className="mt-4 max-w-3xl text-xl text-gray-300 mx-auto">
            Navigate your organization's AI journey from initial adoption to industry leadership with our strategic roadmap.
          </p>
        </div>

        {/* Maturity path visualization */}
        <div className="relative mb-20">
          {/* Path line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary transform -translate-y-1/2 hidden md:block"></div>
          
          {/* Maturity levels */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {maturityLevels.map((level, index) => (
              <div key={index} className="relative flex flex-col items-center">
                {/* Level indicator */}
                <div className="relative z-10 flex items-center justify-center w-20 h-20 bg-brand-darker rounded-full border-4 border-brand-primary shadow-lg shadow-brand-primary/20 mb-4">
                  {level.icon}
                </div>
                
                {/* Level label */}
                <div className="absolute top-24 bg-brand-primary/20 text-brand-primary text-xs font-bold px-3 py-1 rounded-full">
                  {level.level}
                </div>
                
                {/* Content - appears below on mobile, alternates above/below on desktop */}
                <div className={`mt-10 bg-brand-darker p-6 rounded-xl border border-gray-700 shadow-xl w-full md:w-auto ${
                  index % 2 === 0 ? 'md:mt-32' : 'md:mb-32 md:-mt-52'
                }`}>
                  <h3 className="text-xl font-bold text-white mb-2">{level.title}</h3>
                  <p className="text-gray-300 mb-4">{level.description}</p>
                  <ul className="space-y-2">
                    {level.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start">
                        <span className="text-brand-primary mr-2">•</span>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-xl text-gray-300 mb-8">
            Wherever you are on your AI journey, Dry Ground AI can help you advance to the next level of maturity.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-primary hover:bg-brand-secondary transition-colors duration-300"
          >
            Assess Your AI Maturity
          </a>
        </div>
      </div>
    </section>
  );
};

export default MaturityContinuum;