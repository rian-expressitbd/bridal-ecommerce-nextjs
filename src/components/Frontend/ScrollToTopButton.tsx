import { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / documentHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Circle properties
  const circleRadius = 18; // Smaller radius of the circle
  const circumference = 2 * Math.PI * circleRadius; // Total circumference

  return (
    scrollProgress > 0 && (
      <div
        className="fixed bottom-14 right-8 w-12 h-12 flex items-center group justify-center z-40 cursor-pointer transition-opacity duration-300"
        onClick={scrollToTop}
      >
        <svg width="48" height="48" className="absolute fill-transparent group-hover:fill-teal-600">
          {/* Gray background circle */}
          <circle
            cx="24"
            cy="24"
            r={circleRadius}
            stroke="#d3d3d3" // Light gray color
            strokeWidth="2"
          />
          {/* Black progress circle */}
          <circle
            cx="24"
            cy="24"
            r={circleRadius}
            stroke="teal"
            strokeWidth="2"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (scrollProgress / 100) * circumference}
            style={{
              transition: 'stroke-dashoffset 0.3s ease',
              transform: 'rotate(-90deg)',
              transformOrigin: 'center',
            }}
          />
        </svg>
        {/* Arrow Up Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5 text-teal-700 group-hover:text-white relative z-10"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7 7 7M12 21V3" />
        </svg>
      </div>
    )
  );
};

export default ScrollToTopButton;
