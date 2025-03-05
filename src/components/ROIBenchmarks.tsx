import React from 'react';
import { TrendingUp, Users, DollarSign } from 'lucide-react';

const metrics = [
  {
    icon: <TrendingUp className="h-10 w-10 text-brand-primary" />,
    title: "20-50%",
    description: "Efficiency Increase",
    details: "Streamline operations and reduce manual tasks through intelligent automation and process optimization."
  },
  {
    icon: <Users className="h-10 w-10 text-brand-accent" />,
    title: "10-35%",
    description: "Customer Satisfaction Improvement",
    details: "Enhance customer experiences with personalized interactions and faster response times."
  },
  {
    icon: <DollarSign className="h-10 w-10 text-brand-primary" />,
    title: "10-20%",
    description: "Revenue Growth",
    details: "Unlock new opportunities and optimize existing channels to drive sustainable business growth."
  }
];

const ROIBenchmarks = () => {
  return (
    <section id="roi-benchmarks" className="py-16 bg-brand-dark relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 opacity-30"></div>
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-primary/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-accent/10 rounded-full filter blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-base font-semibold text-brand-primary tracking-wide uppercase">ROI Projections</h2>
          <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            Benchmarks
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto">
            Our AI solutions consistently deliver measurable business outcomes aligned with industry benchmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <div 
              key={index}
              className="relative bg-brand-darker rounded-xl p-8 border border-gray-800 shadow-xl overflow-hidden group hover:border-brand-primary/30 transition-all duration-300"
            >
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative flex flex-col items-center text-center">
                <div className="p-4 bg-brand-dark rounded-full mb-6 group-hover:bg-brand-dark/70 transition-colors duration-300">
                  {metric.icon}
                </div>
                <h3 className="text-4xl font-bold text-white mb-2">{metric.title}</h3>
                <p className="text-lg font-medium text-brand-primary mb-4">{metric.description}</p>
                <p className="text-gray-300">{metric.details}</p>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-300 max-w-3xl mx-auto">
            These benchmarks are based on industry averages and actual client results. Your specific outcomes may vary based on implementation scope, industry, and organizational readiness.
          </p>
          <a
            href="#services"
            className="mt-8 inline-flex items-center px-6 py-3 border border-gray-700 text-base font-medium rounded-md text-gray-200 hover:bg-brand-dark transition-colors duration-300"
          >
            Explore Our Services
          </a>
        </div>
      </div>
    </section>
  );
};

export default ROIBenchmarks;