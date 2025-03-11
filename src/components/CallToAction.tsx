import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import ContactForm from './ContactForm';

const CallToAction = () => {
  return (
    <section id="contact" className="py-20 bg-brand-dark relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/20 to-brand-primary/10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-brand-darker rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-12 sm:px-12 lg:px-16 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">Ready to implement AI to solve</span>
                  <span className="block text-brand-primary">your company's biggest challenges?</span>
                </h2>
                <p className="mt-4 text-lg text-gray-300 max-w-3xl">
                  Schedule a consultation with our AI experts to discuss your business challenges and discover how our solutions can drive growth and efficiency.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://drygroundpartners.com/standard-30"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-primary hover:bg-brand-secondary transition-colors duration-300"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Schedule a Call
                  </a>
                  <a
                    href="mailto:info@dryground.ai"
                    className="inline-flex items-center justify-center px-6 py-3 border border-gray-700 text-base font-medium rounded-md text-gray-200 hover:bg-brand-dark transition-colors duration-300"
                  >
                    Email Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="relative">
                <ContactForm className="bg-brand-dark p-6 rounded-xl border border-gray-700" />

                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-brand-primary/30 rounded-full blur-xl"></div>
                <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-brand-accent/30 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;