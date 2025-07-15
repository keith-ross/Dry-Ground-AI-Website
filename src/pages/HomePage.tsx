import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ROIBenchmarks from '../components/ROIBenchmarks';
import Services from '../components/Services';
import CaseStudies from '../components/CaseStudies';
import Testimonials from '../components/Testimonials';
import AIStrategy from '../components/AIStrategy';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

function HomePage() {
  return (
    <div className="min-h-screen bg-brand-darker text-gray-100">
      <Navbar />
      <Hero />
      <ROIBenchmarks />
      <AIStrategy />
      <Services />
      <CaseStudies />
      <Testimonials />
      <CallToAction />
      <Footer />
      <elevenlabs-convai agent-id="agent_01jzx9g2b2esarv0c05qr08w7c"></elevenlabs-convai>
    </div>
  );
}

export default HomePage;