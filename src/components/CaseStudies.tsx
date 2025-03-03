import React from 'react';

const caseStudies = [
  {
    title: 'Voice AI Agents for Customer Service',
    description: 'Deployed Voice AI Agents to handle 90% of call volume allowing for self-service for scheduling appointments and diagnosis of maintenance issues.',
    image: 'https://images.unsplash.com/photo-1556745753-b2904692b3cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Voice AI', 'Self-Service', 'Customer Support']
  },
  {
    title: 'Process Mining & Optimization',
    description: 'Established automated process mining capabilities to track order-to-cash processes and bottlenecks in real-time with AI insights and self-healing improving lead times by 50%.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Process Mining', 'Real-time Analytics', 'Self-Healing']
  },
  {
    title: 'AI-Powered Inventory Management',
    description: 'Instituted global inventory system with AI forecasting and insights enabling 8-figure cost avoidance and reducing excess inventory on the balance sheet by 38% in 2 quarters.',
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['AI Forecasting', 'Inventory Optimization', 'Cost Reduction']
  },
  {
    title: 'ML-Driven Workforce Optimization',
    description: 'Decreased ticket lead times by 95%+ with a comprehensive machine learning-driven workforce optimization solution while improving Net Promoter Score® by 10 points.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Machine Learning', 'Workforce Optimization', 'Customer Satisfaction']
  }
];

const CaseStudies = () => {
  return (
    <section id="case-studies" className="py-20 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-brand-primary tracking-wide uppercase">Case Studies</h2>
          <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            Real Results for Real Businesses
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto">
            See how our AI solutions have transformed operations and driven growth for our clients.
          </p>
        </div>

        <div className="mt-16 space-y-12">
          {caseStudies.map((study, index) => (
            <div 
              key={index} 
              className={`flex flex-col lg:flex-row ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} gap-8 bg-brand-darker rounded-xl overflow-hidden`}
            >
              <div className="lg:w-1/2 h-64 lg:h-auto relative overflow-hidden">
                <img 
                  src={study.image} 
                  alt={study.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-darker to-transparent opacity-60"></div>
              </div>
              <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                <h3 className="mt-2 text-2xl font-bold text-white">{study.title}</h3>
                <p className="mt-4 text-gray-300">{study.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {study.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-3 py-1 text-xs font-medium bg-brand-dark text-brand-primary rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;