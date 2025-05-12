
import React from 'react';
import VideoDemo from '../components/VideoDemo';
import CtaButton from '../components/CtaButton';
import { Sparkles, Shield, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-aiBackground to-white/95 px-4 py-10">
      <div className="max-w-6xl w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Content */}
          <div className="flex flex-col items-start text-left space-y-6">
            {/* Headline with badge */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-aiPrimary/10 px-4 py-2 rounded-full text-aiPrimary text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                <span>AI-Powered Voice Intelligence</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-aiText leading-tight">
                AI voice assistant that <span className="text-aiPrimary">understands</span> business context like a human
              </h1>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3 w-full">
              <Card className="border-0 shadow-sm bg-white/50">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="bg-aiPrimary/10 p-2 rounded-full">
                    <Zap className="h-4 w-4 text-aiPrimary" />
                  </div>
                  <span className="text-sm font-medium">Human-like reasoning</span>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm bg-white/50">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="bg-aiPrimary/10 p-2 rounded-full">
                    <Shield className="h-4 w-4 text-aiPrimary" />
                  </div>
                  <span className="text-sm font-medium">Enterprise ready</span>
                </CardContent>
              </Card>
            </div>
            
            {/* CTA Button */}
            <div className="pt-4">
              <CtaButton 
                text="Talk to the Founder" 
                link="https://calendly.com/echomind-ai/demo"
              />
              
              {/* Moat Line */}
              <p className="mt-5 text-gray-600 max-w-lg text-sm">
                Unlike bots, we reason like humans. Built for teams who can't afford to miss a call.
              </p>
            </div>
          </div>
          
          {/* Right Side - Video Demo */}
          <div className="lg:ml-auto">
            <VideoDemo />
          </div>
        </div>
        
        {/* Optional Badge */}
        <div className="absolute bottom-6 left-0 right-0 text-center">
          <div className="inline-flex items-center gap-2 text-xs text-gray-400 tracking-wide">
            <span>ECHOMIND AI</span>
            <span className="block h-1 w-1 rounded-full bg-gray-300"></span>
            <span>YC S'24</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
