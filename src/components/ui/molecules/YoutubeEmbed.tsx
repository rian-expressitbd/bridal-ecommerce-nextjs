import React from "react";

interface YouTubeEmbedProps {
  src: string;
  title: string;
  width?: string | number;
  height?: string | number;
  className?: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ src, title, width = "1236", height = "695", className }) => {
  // Extract video ID from URL if full URL is provided
  const videoId = src.includes("youtube.com") ? new URL(src).searchParams.get("v") || src.split("/").pop() : src;

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className={`rounded-lg overflow-hidden shadow-lg ${className}`}>
      <iframe
        width={width}
        height={height}
        src={embedUrl}
        title={title}
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        referrerPolicy='strict-origin-when-cross-origin'
        allowFullScreen
        className='w-full aspect-video' // Tailwind aspect ratio 16:9
      />
      <p className='mt-2 text-sm text-gray-600 dark:text-gray-300 px-2'>{title}</p>
    </div>
  );
};

export default YouTubeEmbed;
