
import React from 'react';
import { Play } from 'lucide-react';

const VideoDemo = () => {
  return (
    <div className="relative w-full mx-auto">
      <div className="video-container aspect-video relative z-10 shadow-2xl rounded-xl overflow-hidden transition-all duration-500 border border-white/20 hover:shadow-blue-200/30 transform hover:scale-[1.01]">
        <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-900/95 to-gray-800/95">
          <div className="flex flex-col items-center gap-4 cursor-pointer group">
            <div className="bg-aiPrimary/30 rounded-full p-4 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-aiPrimary/60">
              <Play className="text-white h-10 w-10" />
            </div>
            <span className="text-white/90 text-base font-medium opacity-90 group-hover:opacity-100 transition-opacity duration-300">See Sonar in action</span>
          </div>
        </div>
      </div>
      <div className="video-glow absolute -inset-4 bg-aiPrimary/10 rounded-3xl blur-xl -z-10 animate-pulse-glow"></div>
    </div>
  );
};

export default VideoDemo;
