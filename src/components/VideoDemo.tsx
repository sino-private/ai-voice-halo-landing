import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

const VideoDemo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Set initial volume to 30%
      videoRef.current.volume = 0.3;
      videoRef.current.muted = false;
    }
  }, []);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsLoaded(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const time = parseFloat(e.target.value);
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <div className="relative w-full mx-auto">
      <div className="video-container aspect-video relative z-10 shadow-2xl rounded-xl overflow-hidden transition-all duration-500 border border-white/20 hover:shadow-blue-200/30 transform hover:scale-[1.01]">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/media/demo.mp4"
          onLoadedData={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          playsInline
        />

        {/* Video Controls - Only show when playing */}
        {isPlaying && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            {/* Progress Bar */}
            <div className="flex items-center gap-2 mb-2">
              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-aiPrimary"
              />
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handlePause}
                className="text-white hover:text-aiPrimary transition-colors"
              >
                <Pause className="h-6 w-6" />
              </button>

              <button
                onClick={toggleMute}
                className="text-white hover:text-aiPrimary transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="h-6 w-6" />
                ) : (
                  <Volume2 className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        )}

        {/* Initial CTA Play Button - Only show when not playing */}
        {!isPlaying && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer transition-opacity duration-300 hover:bg-black/50"
            onClick={handlePlay}
          >
            <div className="flex flex-col items-center gap-4 group">
              <div className="bg-aiPrimary/30 rounded-full p-4 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-aiPrimary/60">
                <Play className="text-white h-10 w-10" />
              </div>
              <span className="text-white/90 text-base font-medium opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                View Sonar in action
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="video-glow absolute -inset-4 bg-aiPrimary/10 rounded-3xl blur-xl -z-10 animate-pulse-glow"></div>
    </div>
  );
};

export default VideoDemo;
