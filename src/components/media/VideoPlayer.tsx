import { useEffect, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { FiMaximize, FiMinimize, FiPause, FiPlay, FiVolume2, FiVolumeX } from "react-icons/fi";

interface VideoPlayerProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  showControls?: boolean;
  thumbnail?: string;
  onClick?: () => void;
}

export const VideoPlayer = ({
  src,
  className = "",
  autoPlay = false,
  loop = false,
  muted = false,
  showControls = true,
  thumbnail,
  onClick,
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [bufferProgress, setBufferProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showControlsOverlay, setShowControlsOverlay] = useState(showControls);
  const [wasPlayingBeforeSeek, setWasPlayingBeforeSeek] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Handle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // Handle mute/unmute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  // Handle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Handle time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && videoRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * duration;
    }
  };

  // Handle seeking
  const handleSeekStart = () => {
    if (videoRef.current) {
      setWasPlayingBeforeSeek(!videoRef.current.paused);
      videoRef.current.pause();
    }
  };

  const handleSeekEnd = () => {
    if (videoRef.current && wasPlayingBeforeSeek) {
      videoRef.current.play();
    }
  };

  // Format time (seconds to MM:SS)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Handle video loading states
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleWaiting = () => setIsLoading(true);
    const handlePlaying = () => setIsLoading(false);
    const handleLoadedData = () => {
      setDuration(video.duration);
      setIsLoading(false);
    };
    const handleProgress = () => {
      if (video.buffered.length > 0) {
        setBufferProgress((video.buffered.end(0) / video.duration) * 100);
      }
    };

    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("progress", handleProgress);
    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("progress", handleProgress);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Handle mouse movement for controls visibility
  useEffect(() => {
    if (!showControls) return;

    let timeout: NodeJS.Timeout;
    const handleMouseMove = () => {
      setShowControlsOverlay(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowControlsOverlay(false), 3000);
    };

    const container = containerRef.current;
    container?.addEventListener("mousemove", handleMouseMove);

    return () => {
      container?.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, [showControls]);
  return (
    <div
      ref={containerRef}
      className={`relative aspect-video bg-black rounded-md overflow-hidden group ${className}`}
      onMouseEnter={() => {
        setIsHovering(true);
        setShowControlsOverlay(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        setShowControlsOverlay(false);
      }}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        src={src}
        className='w-full h-full object-contain'
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        onClick={onClick || togglePlay}
        poster={thumbnail}
      />

      {/* Loading spinner */}
      {isLoading && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <FaSpinner className='w-6 h-6 text-white animate-spin' />
        </div>
      )}

      {/* Bottom controls bar - always visible when hovering */}
      {showControls && (showControlsOverlay || isHovering) && (
        <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 transition-opacity duration-300'>
          {/* Progress bar */}
          <div
            className='relative w-full h-1.5 mb-2 cursor-pointer group/progress'
            onClick={handleProgressClick}
            onMouseDown={handleSeekStart}
            onMouseUp={handleSeekEnd}
            ref={progressRef}
          >
            <div className='absolute top-0 left-0 w-full h-full bg-gray-600 rounded-full'>
              <div
                className='absolute top-0 left-0 h-full bg-gray-400 rounded-full'
                style={{ width: `${bufferProgress}%` }}
              />
              <div
                className='absolute top-0 left-0 h-full bg-red-500 rounded-full'
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <div
              className='absolute top-1/2 h-3 -mt-1.5 bg-red-500 rounded-full w-1.5 opacity-0 group-hover/progress:opacity-100 transition-opacity'
              style={{ left: `${(currentTime / duration) * 100}%` }}
            />
          </div>

          {/* Controls */}
          <div className='flex items-center justify-between w-full'>
            {/* Left controls */}
            <div className='flex items-center space-x-3'>
              <button
                onClick={togglePlay}
                className='text-white hover:text-gray-300 transition-colors'
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <FiPause className='w-4 h-4' /> : <FiPlay className='w-4 h-4' />}
              </button>

              <button
                onClick={toggleMute}
                className='text-white hover:text-gray-300 transition-colors'
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <FiVolumeX className='w-4 h-4' /> : <FiVolume2 className='w-4 h-4' />}
              </button>

              <div className='text-white text-xs'>
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            {/* Right controls */}
            <div className='flex items-center space-x-3'>
              <button
                onClick={toggleFullscreen}
                className='text-white hover:text-gray-300 transition-colors'
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? <FiMinimize className='w-4 h-4' /> : <FiMaximize className='w-4 h-4' />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Play button overlay when paused */}
      {!isPlaying && showControls && (
        <button
          onClick={onClick || togglePlay}
          className='absolute inset-0 flex items-center justify-center w-full h-full bg-black/20 group-hover:bg-black/30 transition-colors'
          aria-label='Play'
        >
          <FiPlay className='w-10 h-10 text-white/80 group-hover:text-white/90 transition-colors' />
        </button>
      )}
    </div>
  );
};
