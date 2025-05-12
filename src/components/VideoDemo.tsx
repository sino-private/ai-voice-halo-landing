
import React from 'react';
import { Play } from 'lucide-react';

const VideoDemo = () => {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="video-container aspect-video relative z-10 shadow-xl rounded-xl overflow-hidden">
        <div className="flex items-center justify-center h-full bg-gradient-to-br from-black/95 to-black/90">
          <div className="flex flex-col items-center gap-3">
            <div className="bg-aiPrimary/20 rounded-full p-3">
              <Play className="text-white h-8 w-8" />
            </div>
            <span className="text-white/80 text-sm font-medium">Watch how it works</span>
          </div>
        </div>
      </div>
      <div className="video-glow absolute -inset-3 bg-aiPrimary/10 rounded-3xl blur-xl -z-10 animate-pulse-glow"></div>
    </div>
  );
};

export default VideoDemo;
