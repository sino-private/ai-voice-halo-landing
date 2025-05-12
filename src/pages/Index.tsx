
import React from 'react';
import VideoDemo from '../components/VideoDemo';
import CtaButton from '../components/CtaButton';

const Index = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-aiBackground px-4 py-10">
      <div className="max-w-4xl w-full mx-auto text-center">
        {/* Headline */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-aiText mb-8 leading-tight">
          AI voice assistant that understands business context like a human
        </h1>
        
        {/* Video Demo with Glowing Effect */}
        <div className="mb-10 mt-12">
          <VideoDemo />
        </div>
        
        {/* CTA Button */}
        <div className="mt-12">
          <CtaButton 
            text="Talk to the Founder" 
            link="https://calendly.com/echomind-ai/demo"
          />
          
          {/* Moat Line */}
          <p className="mt-6 text-gray-600 max-w-lg mx-auto text-sm md:text-base">
            Unlike bots, we reason like humans. Built for teams who can't afford to miss a call.
          </p>
        </div>
        
        {/* Optional Small Logo/Badge */}
        <div className="absolute bottom-6 left-0 right-0 text-center">
          <span className="text-xs text-gray-400 tracking-wide">ECHOMIND AI</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
