
import React from 'react';

const VideoDemo = () => {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="video-container aspect-video relative z-10 shadow-xl">
        <div className="flex items-center justify-center h-full bg-black/90">
          <span className="text-white/80 text-sm font-medium">Demo Video Placeholder</span>
        </div>
      </div>
      <div className="video-glow bg-aiPrimary/10 animate-pulse-glow"></div>
    </div>
  );
};

export default VideoDemo;
