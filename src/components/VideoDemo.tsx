import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
} from "lucide-react";

// Add vendor-specific fullscreen type declarations
declare global {
  interface Document {
    webkitFullscreenElement: Element | null;
    mozFullScreenElement: Element | null;
    msFullscreenElement: Element | null;
    webkitExitFullscreen: () => Promise<void>;
    mozCancelFullScreen: () => Promise<void>;
    msExitFullscreen: () => Promise<void>;
  }

  interface HTMLVideoElement {
    webkitRequestFullscreen: () => Promise<void>;
    mozRequestFullScreen: () => Promise<void>;
    msRequestFullscreen: () => Promise<void>;
  }
}

const VideoDemo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Set initial volume to 30%
      videoRef.current.volume = 0.3;
      videoRef.current.muted = false;
    }

    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
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

  const toggleFullscreen = async () => {
    if (!videoRef.current) return;

    try {
      if (
        !document.fullscreenElement &&
        !document.webkitFullscreenElement &&
        !document.mozFullScreenElement &&
        !document.msFullscreenElement
      ) {
        // Try different vendor-specific fullscreen methods
        if (videoRef.current.requestFullscreen) {
          await videoRef.current.requestFullscreen();
        } else if (videoRef.current.webkitRequestFullscreen) {
          await videoRef.current.webkitRequestFullscreen();
        } else if (videoRef.current.mozRequestFullScreen) {
          await videoRef.current.mozRequestFullScreen();
        } else if (videoRef.current.msRequestFullscreen) {
          await videoRef.current.msRequestFullscreen();
        }
      } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          await document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          await document.msExitFullscreen();
        }
      }
    } catch (error) {
      console.error("Error toggling fullscreen:", error);
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
    <div className="relative w-full mx-auto px-4 sm:px-6 lg:px-8 mb-8 overflow-visible">
      <div className="video-container aspect-video relative z-10 shadow-2xl rounded-xl overflow-hidden transition-all duration-500 border border-white/20 hover:shadow-blue-200/30 transform hover:scale-[1.01] max-w-[100vw]">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/media/demo.mp4"
          onLoadedData={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          playsInline
          webkit-playsinline="true"
        />

        {/* Video Controls - Only show when playing */}
        {isPlaying && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 sm:p-4 touch-none">
            {/* Progress Bar */}
            <div className="flex items-center gap-2 mb-2">
              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 sm:h-2.5 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-aiPrimary touch-manipulation"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  onClick={handlePause}
                  className="text-white hover:text-aiPrimary transition-colors p-2 sm:p-2.5 touch-manipulation"
                >
                  <Pause className="h-6 w-6 sm:h-7 sm:w-7" />
                </button>

                <button
                  onClick={toggleMute}
                  className="text-white hover:text-aiPrimary transition-colors p-2 sm:p-2.5 touch-manipulation"
                >
                  {isMuted ? (
                    <VolumeX className="h-6 w-6 sm:h-7 sm:w-7" />
                  ) : (
                    <Volume2 className="h-6 w-6 sm:h-7 sm:w-7" />
                  )}
                </button>
              </div>

              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-aiPrimary transition-colors p-2 sm:p-2.5 touch-manipulation"
              >
                {isFullscreen ? (
                  <Minimize2 className="h-6 w-6 sm:h-7 sm:w-7" />
                ) : (
                  <Maximize2 className="h-6 w-6 sm:h-7 sm:w-7" />
                )}
              </button>
            </div>
          </div>
        )}

        {/* Initial CTA Play Button - Only show when not playing */}
        {!isPlaying && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer transition-opacity duration-300 hover:bg-black/50 touch-manipulation"
            onClick={handlePlay}
          >
            <div className="flex flex-col items-center gap-3 sm:gap-4 group">
              <div className="bg-aiPrimary/30 rounded-full p-4 sm:p-5 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-aiPrimary/60">
                <Play className="text-white h-10 w-10 sm:h-12 sm:w-12" />
              </div>
              <span className="text-white/90 text-base sm:text-lg font-medium opacity-90 group-hover:opacity-100 transition-opacity duration-300">
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
