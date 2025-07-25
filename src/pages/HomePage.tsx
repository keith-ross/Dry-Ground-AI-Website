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

function HomePage() {
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    // Get session ID for ElevenLabs agent
    const currentSessionId = getSessionId();
    setSessionId(currentSessionId);
    console.log('HomePage session ID:', currentSessionId);
  }, []);

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
      <elevenlabs-convai 
        agent-id="agent_9401k0w8h4k1f65snq8hzfr1satz"
        dynamic-variables={JSON.stringify({ website_session_id: sessionId })}
      ></elevenlabs-convai>
    </div>
  );
}

export default HomePage;