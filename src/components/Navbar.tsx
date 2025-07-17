import React, { useState } from 'react';
import { Menu, X, Brain } from 'lucide-react';
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-brand-darker border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Logo />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="/" className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-brand-primary transition-colors">Home</a>
                <a 
                  href="https://strategy.dryground.ai/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-md text-sm font-medium text-brand-primary hover:text-brand-accent transition-colors"
                >
                  AI Strategizer
                </a>
                <a href="/demos" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-brand-primary transition-colors">Demos</a>
                <a href="#services" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-brand-primary transition-colors">Services</a>
                <a href="#case-studies" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-brand-primary transition-colors">Case Studies</a>
                <a href="#testimonials" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-brand-primary transition-colors">Testimonials</a>
                <a href="#contact" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-brand-primary transition-colors">Contact</a>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-brand-dark inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-brand-primary">Home</a>
            <a 
              href="https://strategy.dryground.ai/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block px-3 py-2 rounded-md text-base font-medium text-brand-primary hover:text-brand-accent"
            >
              AI Strategizer
            </a>
            <a href="/demos" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-brand-primary">Demos</a>
            <a href="#services" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-brand-primary">Services</a>
            <a href="#case-studies" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-brand-primary">Case Studies</a>
            <a href="#testimonials" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-brand-primary">Testimonials</a>
            <a href="#contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-brand-primary">Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;