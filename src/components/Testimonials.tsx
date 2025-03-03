import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Their track record of making the impossible possible is a testament to their exceptional capabilities.",
    author: "Travis R.",
    title: "CTO of Technology Company"
  },
  {
    quote: "You have exponentially helped my life.",
    author: "Mark B.",
    title: "Owner of Glass SMB"
  },
  {
    quote: "The voice AI agent handles all of our calls, allowing me to focus on the important parts of my business. It has been transformative for us.",
    author: "Megan R.",
    title: "VP Operations of Property Management Company"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-brand-darker relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-brand-accent/5 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h2 className="text-base font-semibold text-brand-primary tracking-wide uppercase">Testimonials</h2>
          <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            What Our Clients Say
          </p>
        </div>

        <div className="mt-16 relative">
          <div className="relative bg-brand-dark rounded-2xl p-8 md:p-12 shadow-xl overflow-hidden">
            {/* Decorative quote icon */}
            <div className="absolute top-6 right-6 text-gray-700">
              <Quote className="h-24 w-24 opacity-20" />
            </div>
            
            <div className="relative">
              <blockquote className="text-xl md:text-2xl font-medium text-gray-100 mb-8">
                "{testimonials[currentIndex].quote}"
              </blockquote>
              
              <div className="flex items-center">
                <div>
                  <div className="font-medium text-white">{testimonials[currentIndex].author}</div>
                  <div className="text-brand-primary">{testimonials[currentIndex].title}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <button 
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-brand-dark text-gray-400 hover:text-white hover:bg-brand-secondary focus:outline-none transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="flex space-x-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full ${
                    index === currentIndex ? 'bg-brand-primary' : 'bg-gray-600'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-brand-dark text-gray-400 hover:text-white hover:bg-brand-secondary focus:outline-none transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;