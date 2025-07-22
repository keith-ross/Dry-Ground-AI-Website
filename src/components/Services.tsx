import React from 'react';
import { Brain, LineChart, Database, Code, Users, Shield, Bot, Workflow, Cpu, MessageSquare, Phone, Send, Calendar } from 'lucide-react';

const services = [
  {
    icon: <Bot className="h-8 w-8 text-brand-primary" />,
    title: 'AI Agents & Chatbots',
    description: 'AI Agents integrated into all of your channels, not just chat: Voice, SMS, Social Media. Provide 24/7 support across every customer touchpoint.',
    maturityLevel: 'Entry Level',
    features: ["Voice-enabled AI assistants", "Multi-channel integration (SMS, Social)", "24/7 customer support", "Seamless handoff to human agents"]
  },
  {
    icon: <Workflow className="h-8 w-8 text-brand-accent" />,
    title: 'Process Automation',
    description: 'Integrate AI into existing workflows to enhance efficiency and reduce manual intervention in business processes.',
    maturityLevel: 'Intermediate',
    features: ["Document processing", "Workflow optimization", "Intelligent routing"]
  },
  {
    icon: <Code className="h-8 w-8 text-brand-primary" />,
    title: 'Custom AI Applications',
    description: 'Develop tailored AI applications that address specific business challenges and create competitive advantages.',
    maturityLevel: 'Advanced',
    features: ["Industry-specific solutions", "Proprietary algorithms", "Integrated systems"]
  },
  {
    icon: <Cpu className="h-8 w-8 text-brand-accent" />,
    title: 'AI Model Fine-Tuning',
    description: 'Adapt and refine existing AI models to better suit your specific business needs and data characteristics.',
    maturityLevel: 'Expert',
    features: ["Domain adaptation", "Performance optimization", "Enhanced accuracy"]
  },
  {
    icon: <Brain className="h-8 w-8 text-brand-primary" />,
    title: 'Custom AI Models',
    description: 'Develop proprietary AI models from the ground up, tailored precisely to your business requirements and data.',
    maturityLevel: 'Pinnacle',
    features: ["Competitive advantage", "Intellectual property", "Maximum customization"]
  },
  {
    icon: <Users className="h-8 w-8 text-brand-accent" />,
    title: 'AI Strategy Consulting',
    description: 'Expert guidance on implementing AI to achieve your business objectives and stay ahead of competitors.',
    maturityLevel: 'All Levels',
    features: ["AI roadmap development", "Technology assessment", "Implementation planning"]
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-brand-darker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-brand-primary tracking-wide uppercase">Services</h2>
          <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            AI Solutions Across the Maturity Continuum
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto">
            Our services are designed to meet you wherever you are on your AI journey, from initial adoption to industry leadership.
          </p>
          <div className="mt-8">
            <a
              href="/consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-primary hover:bg-brand-secondary transition-colors duration-300"
            >
              Schedule a Consultation
              <Calendar className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Maturity path visualization - simplified version */}
        <div className="relative mt-16 mb-12 hidden md:block">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary transform -translate-y-1/2"></div>
          <div className="flex justify-between">
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 bg-brand-primary rounded-full mb-2"></div>
              <span className="text-xs text-brand-primary">Entry</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 bg-brand-primary rounded-full mb-2"></div>
              <span className="text-xs text-brand-primary">Intermediate</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 bg-brand-primary rounded-full mb-2"></div>
              <span className="text-xs text-brand-primary">Advanced</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 bg-brand-primary rounded-full mb-2"></div>
              <span className="text-xs text-brand-primary">Expert</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 bg-brand-primary rounded-full mb-2"></div>
              <span className="text-xs text-brand-primary">Pinnacle</span>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="relative group bg-brand-dark p-6 rounded-lg overflow-hidden transition-all duration-300 hover:bg-gray-750 hover:shadow-xl hover:shadow-brand-primary/10"
            >
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 inline-flex items-center justify-center rounded-md bg-brand-darker group-hover:bg-brand-darker/70 transition-colors duration-300">
                    {service.icon}
                  </div>
                  <span className="text-xs font-medium px-2 py-1 bg-brand-primary/20 text-brand-primary rounded-full">
                    {service.maturityLevel}
                  </span>
                </div>
                <h3 className="text-xl font-medium text-white group-hover:text-brand-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="mt-2 text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                  {service.description}
                </p>
                <ul className="mt-4 space-y-1">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start text-sm">
                      <span className="text-brand-primary mr-2">•</span>
                      <span className="text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Channel icons for AI Agents & Chatbots */}
                {index === 0 && (
                  <div className="mt-6 flex space-x-3">
                    <div className="p-2 bg-brand-darker rounded-full" title="Voice">
                      <Phone className="h-4 w-4 text-brand-primary" />
                    </div>
                    <div className="p-2 bg-brand-darker rounded-full" title="Chat">
                      <MessageSquare className="h-4 w-4 text-brand-accent" />
                    </div>
                    <div className="p-2 bg-brand-darker rounded-full" title="SMS">
                      <Send className="h-4 w-4 text-brand-primary" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;