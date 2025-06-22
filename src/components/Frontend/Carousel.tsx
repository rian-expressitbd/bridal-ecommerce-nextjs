import { useState, useEffect } from 'react';

const Carousel = () => {
  const images = [
    '/component/m-white-polka-dot-ruffle-fit-and-flare-short-dress-siya-fab-original-imagggffzssm5rkf.webp',
    '/component/istockphoto-1200863054-612x612.jpg',
    '/component/il_300x300.4895720793_5qly.webp',
    '/component/Soft-Amber-Chiffon-Dress-3.png',
    '/component/dress1.jpg',
    '/component/Zanah-Chiffon-Embroidered-Dress-3.png',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 >= images.length ? 0 : prevIndex + 3
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(images.length - 3, 0) : prevIndex - 3
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto slide every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="default-carousel" className="relative w-[98%]" data-carousel="slide">
      {/* Carousel wrapper */}
      <div className="flex gap-2 h-56 md:h-96 overflow-hidden ">
        {images.slice(currentIndex, currentIndex + 3).map((image, index) => (
          <div
            key={index}
            className="w-1/3 transition-opacity duration-700 ease-in-out"
            data-carousel-item={true}
          >
            <img
              src={image}
              className="block w-full h-full object-cover"
              alt={`Slide ${currentIndex + index + 1}`}
            />
          </div>
        ))}
      </div>

      {/* Slider indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {Array.from({ length: Math.ceil(images.length / 3) }).map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              currentIndex / 3 === index ? 'bg-gray-800' : 'bg-gray-400'
            }`}
            aria-current={currentIndex / 3 === index}
            aria-label={`Slide ${index + 1}`}
            onClick={() => goToSlide(index * 3)}
          ></button>
        ))}
      </div>

      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={goToPrev}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1L1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>

      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={goToNext}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 9l4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default Carousel;
