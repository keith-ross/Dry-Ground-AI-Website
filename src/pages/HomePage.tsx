import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ROIBenchmarks from '../components/ROIBenchmarks';
import Services from '../components/Services';
import CaseStudies from '../components/CaseStudies';
import Testimonials from '../components/Testimonials';
import AIStrategy from '../components/AIStrategy';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import { getSessionId } from '../lib/sessionManager';
import { useAgentCommands } from '../hooks/useAgentCommands';

function HomePage() {
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    const currentSessionId = getSessionId();
    setSessionId(currentSessionId);
    console.log('HomePage session ID:', currentSessionId);
  }, []);

  // Initialize WebSocket connection for agent commands
  const { isConnected } = useAgentCommands(sessionId);

  return (
    <div className="min-h-screen bg-brand-darker text-gray-100">
      <Navbar />
      {/* Hero Section */}
      <section id="hero">
        <Hero />
      </section>
      <ROIBenchmarks />
      {/* AI Strategy Section */}
      <section id="strategy">
        <AIStrategy />
      </section>
      {/* Services Section */}
      <section id="services">
        <Services />
      </section>
      <CaseStudies />
      {/* Testimonials Section */}
      <section id="testimonials">
        <Testimonials />
      </section>
      {/* CTA Section */}
      <section id="contact">
        <CallToAction />
      </section>
      <Footer />
      <elevenlabs-convai 
        agent-id="agent_9401k0w8h4k1f65snq8hzfr1satz"
        dynamic-variables={JSON.stringify({ website_session_id: sessionId })}
      ></elevenlabs-convai>
    </div>
  );
}

export default HomePage;