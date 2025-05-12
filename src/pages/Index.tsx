
import React from 'react';
import VideoDemo from '../components/VideoDemo';
import CtaButton from '../components/CtaButton';
import { Sparkles, Shield, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#EDF1F7] to-[#F5F7FA] px-4 py-10">
      <div className="max-w-6xl w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Side - Content */}
          <div className="lg:col-span-5 flex flex-col items-start text-left space-y-6">
            {/* Headline with badge */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-aiPrimary/10 px-4 py-2 rounded-full text-aiPrimary text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                <span>AI-Powered Voice Intelligence</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-aiText leading-tight">
                <span className="text-aiPrimary">Sonar</span> understands business calls like a human
              </h1>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3 w-full">
              <Card className="border-0 shadow-sm bg-white/80">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="bg-aiPrimary/10 p-2 rounded-full">
                    <Zap className="h-4 w-4 text-aiPrimary" />
                  </div>
                  <span className="text-sm font-medium">Human-like reasoning</span>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm bg-white/80">
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
          <div className="lg:col-span-7">
            <VideoDemo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
