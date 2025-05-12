
import React from 'react';
import { Play } from 'lucide-react';

const VideoDemo = () => {
  return (
    <div className="relative w-full mx-auto">
      <div className="video-container aspect-video relative z-10 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
        <div className="flex items-center justify-center h-full bg-gradient-to-br from-black/95 to-black/90">
          <div className="flex flex-col items-center gap-3 cursor-pointer group">
            <div className="bg-aiPrimary/20 rounded-full p-3 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-aiPrimary/40">
              <Play className="text-white h-8 w-8" />
            </div>
            <span className="text-white/80 text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity duration-300">Watch how it works</span>
          </div>
        </div>
      </div>
      <div className="video-glow absolute -inset-3 bg-aiPrimary/10 rounded-3xl blur-xl -z-10 animate-pulse-glow"></div>
    </div>
  );
};

export default VideoDemo;
