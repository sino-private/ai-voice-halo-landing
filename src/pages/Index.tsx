
import React from 'react';
import VideoDemo from '../components/VideoDemo';
import CtaButton from '../components/CtaButton';
import { MessageCircle, Zap, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#EDF1F7] to-[#F5F7FA] px-4 py-10 overflow-hidden animate-gradient-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-60 -right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-6xl w-full mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Side - Content */}
          <div className="lg:col-span-5 flex flex-col items-start text-left space-y-6">
            {/* Headline with badge */}
            <div className="space-y-4">
              <HoverCard>
                <HoverCardTrigger>
                  <Badge className="bg-aiPrimary/10 hover:bg-aiPrimary/20 text-aiPrimary px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-default">
                    <MessageCircle className="h-4 w-4 mr-2 animate-pulse" />
                    Category-defining AI Agent
                  </Badge>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <p className="text-sm">Sonar redefines business communication with AI that truly understands context and intent.</p>
                </HoverCardContent>
              </HoverCard>
              
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-aiText leading-tight">
                <span className="text-aiPrimary">Sonar</span> doubles your sales team's capacity
              </h1>
              
              <p className="text-lg text-gray-600">
                Answer leads in 3 seconds, close deals while you sleep.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3 w-full">
              <Card className="border-0 shadow-sm bg-white/80 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="bg-aiPrimary/10 p-2 rounded-full">
                    <Zap className="h-4 w-4 text-aiPrimary" />
                  </div>
                  <span className="text-sm font-medium">Speaks like your top rep</span>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm bg-white/80 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="bg-aiPrimary/10 p-2 rounded-full">
                    <Target className="h-4 w-4 text-aiPrimary" />
                  </div>
                  <span className="text-sm font-medium">Never misses a qualified lead</span>
                </CardContent>
              </Card>
            </div>
            
            {/* CTA Button */}
            <div className="pt-4">
              <CtaButton 
                text="Book a 15-min Strategy Call" 
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
