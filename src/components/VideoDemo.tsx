import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Mail,
  ArrowRight,
} from "lucide-react";

/* ------------------------------------------------------------
   Vendor / iOS-specific typings
------------------------------------------------------------ */
declare global {
  interface Document {
    webkitFullscreenElement: Element | null;
    mozFullScreenElement: Element | null;
    msFullscreenElement: Element | null;
    webkitExitFullscreen?: () => Promise<void>;
    mozCancelFullScreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
  }

  interface HTMLVideoElement {
    webkitRequestFullscreen?: () => Promise<void>;
    mozRequestFullScreen?: () => Promise<void>;
    msRequestFullscreen?: () => Promise<void>;
    /** iPhone-only: native video player */
    webkitEnterFullscreen?: () => void;
  }
}

const VideoDemo = () => {
  /* --------------------------------------------------------
     State & refs
  -------------------------------------------------------- */
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFS] = useState(false);
  const [currentTime, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [email, setEmail] = useState("");
  const [hasAccess, setHasAccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  /* --------------------------------------------------------
     One-time setup
  -------------------------------------------------------- */
  useEffect(() => {
    // Check if user already has access
    const savedAccess = localStorage.getItem("sonar_video_access");
    if (savedAccess === "true") {
      setHasAccess(true);
    }

    const video = videoRef.current;
    if (video) {
      video.volume = 0.3;
      video.muted = false;

      /* iOS native fullscreen events */
      const handleWebkitBegin = () => setIsFS(true);
      const handleWebkitEnd = () => setIsFS(false);

      video.addEventListener("webkitbeginfullscreen", handleWebkitBegin);
      video.addEventListener("webkitendfullscreen", handleWebkitEnd);

      /* Standard Fullscreen API */
      const handleFSChange = () => {
        const fsEl =
          document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement;
        setIsFS(Boolean(fsEl));
      };
      document.addEventListener("fullscreenchange", handleFSChange);

      return () => {
        video.removeEventListener("webkitbeginfullscreen", handleWebkitBegin);
        video.removeEventListener("webkitendfullscreen", handleWebkitEnd);
        document.removeEventListener("fullscreenchange", handleFSChange);
      };
    }
  }, []);

  /* --------------------------------------------------------
     Email submission
  -------------------------------------------------------- */
  const submitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Starting email submission...");

    if (!email.trim()) {
      console.log("Email is empty, stopping.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    console.log("Attempting to submit email:", email.trim());

    try {
      // Airtable configuration
      const AIRTABLE_BASE_ID = "appWF6OTeb27mmnCB";
      const AIRTABLE_TABLE_NAME = "Emails";
      const AIRTABLE_TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN;

      if (!AIRTABLE_TOKEN) {
        throw new Error(
          "Airtable token not found. Please check your .env.local file."
        );
      }

      const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

      const payload = {
        records: [
          {
            fields: {
              Email: email.trim(),
              Timestamp: new Date().toISOString(),
            },
          },
        ],
      };

      console.log("Sending request to Airtable:", url);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AIRTABLE_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("Got response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Airtable error:", errorData);
        throw new Error(
          `Airtable API error: ${errorData.error?.message || "Unknown error"}`
        );
      }

      const result = await response.json();
      console.log("Airtable response:", result);

      // Grant access
      setHasAccess(true);
      localStorage.setItem("sonar_video_access", "true");
      console.log("Access granted, submission complete");

      // Clear the email field
      setEmail("");
    } catch (error) {
      console.error("Error submitting email:", error);
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
      });
      setSubmitError(error.message || "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
      console.log("Submission process finished");
    }
  };

  /* --------------------------------------------------------
     Control handlers
  -------------------------------------------------------- */
  const handlePlay = () =>
    videoRef.current?.play().then(() => setIsPlaying(true));
  const handlePause = () => {
    videoRef.current?.pause();
    setIsPlaying(false);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = async () => {
    const video = videoRef.current;
    if (!video) return;

    /* Already fullscreen → try to exit with whichever API is available */
    const fsEl =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement;

    if (fsEl) {
      if (document.exitFullscreen) await document.exitFullscreen();
      else if (document.webkitExitFullscreen)
        await document.webkitExitFullscreen();
      else if (document.mozCancelFullScreen)
        await document.mozCancelFullScreen();
      else if (document.msExitFullscreen) await document.msExitFullscreen();
      return;
    }

    /* iOS native player first */
    if (video.webkitEnterFullscreen) {
      video.webkitEnterFullscreen();
      return;
    }

    /* Standard / desktop APIs */
    if (video.requestFullscreen) await video.requestFullscreen();
    else if (video.webkitRequestFullscreen)
      await video.webkitRequestFullscreen();
    else if (video.mozRequestFullScreen) await video.mozRequestFullScreen();
    else if (video.msRequestFullscreen) await video.msRequestFullscreen();
  };

  const handleTimeUpdate = () => setCurrent(videoRef.current?.currentTime ?? 0);
  const handleLoadedMetadata = () => {
    const d = videoRef.current?.duration ?? 0;
    setDuration(d);
    setIsLoaded(true);
  };
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = parseFloat(e.target.value);
    if (videoRef.current) videoRef.current.currentTime = t;
    setCurrent(t);
  };

  /* --------------------------------------------------------
     Render
  -------------------------------------------------------- */
  return (
    <div className="relative w-full mx-auto px-4 sm:px-6 lg:px-8 mb-8 overflow-visible">
      <div className="video-container aspect-video relative z-10 shadow-2xl rounded-xl overflow-hidden transition-all duration-500 border border-white/20 hover:shadow-blue-200/30 md:hover:scale-[1.01] max-w-[100vw]">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/media/demo.mp4"
          onLoadedData={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          playsInline
          webkit-playsinline="true"
        />

        {/* EMAIL GATE - Show if user doesn't have access */}
        {!hasAccess && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 sm:p-8 mx-4 max-w-md w-full shadow-2xl">
              <div className="text-center mb-6">
                <div className="bg-aiPrimary/10 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Mail className="h-8 w-8 text-aiPrimary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  See Sonar in Action
                </h3>
                <p className="text-gray-600 text-sm">
                  Enter your email to watch our product demo
                </p>
              </div>

              <form onSubmit={submitEmail} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-aiPrimary focus:border-transparent outline-none transition-all"
                    disabled={isSubmitting}
                  />
                </div>

                {submitError && (
                  <p className="text-red-600 text-sm">{submitError}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || !email.trim()}
                  className="w-full bg-aiPrimary text-white py-3 px-6 rounded-lg font-semibold hover:bg-aiPrimary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Watch Demo
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              <p className="text-xs text-gray-500 mt-4 text-center">
                We respect your privacy and won't spam you.
              </p>
            </div>
          </div>
        )}

        {/* CONTROLS - Only show if user has access */}
        {hasAccess && isPlaying && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 sm:p-4 touch-none">
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

        {/* PLAY CTA - Only show if user has access and not playing */}
        {hasAccess && !isPlaying && (
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

      {/* Glow */}
      <div className="video-glow absolute -inset-4 bg-aiPrimary/10 rounded-3xl blur-xl -z-10 animate-pulse-glow" />
    </div>
  );
};

export default VideoDemo;
