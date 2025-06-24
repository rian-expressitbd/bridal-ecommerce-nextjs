"use client";
// SocialMediaButtons.jsx
import { useState, useEffect } from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const SocialMedia = () => {
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 2000); // Show buttons after 2 seconds

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  return (
    <>
      {showButtons && (
        <div className='fixed z-40 top-1/2 right-0 transform -translate-y-1/2 flex flex-col px-2 text-sm md:text-base'>
          <a
            href='https://www.facebook.com/attireidyllbd/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <button className='w-full p-3 py-6 bg-blue-600 text-white hover:bg-blue-700 transition-colors hover:scale-105 duration-300 ease-in-out'>
              <FaFacebook className='flex justify-center mx-auto' />
            </button>
          </a>
          <a
            href='https://www.instagram.com/attire_idyll/channel/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <button className='w-full p-3 py-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:scale-105 transition-transform duration-300 ease-in-out'>
              <FaInstagram />
            </button>
          </a>

  
            <a
              href='https://wa.me/8801632460342'
              target='_blank'
              rel='noopener noreferrer'
            >
              <button className='w-full p-3 py-6 bg-green-600 text-white hover:bg-green-700 transition-colors hover:scale-105 duration-300 ease-in-out'>
                <FaTwitter />
              </button>
            </a>
        
        </div>
      )}
    </>
  );
};

export default SocialMedia;
