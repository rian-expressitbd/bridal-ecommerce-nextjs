'use client'
// SocialMediaButtons.jsx
import { useState, useEffect } from "react";

const SocialMedia = (platform) => {
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
        <div className="fixed z-40 top-1/2 right-0 transform -translate-y-1/2 flex flex-col px-2 text-sm md:text-base">
          <a
            href="https://www.facebook.com/attireidyllbd/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="w-full pl-3 py-1 bg-blue-600 text-white hover:bg-blue-700 transition-colors hover:scale-105 duration-300 ease-in-out">
              <i className="fab fa-facebook-f mr-3"></i> {/* Facebook Icon */}
            </button>
          </a>
          <a
            href="https://www.instagram.com/attire_idyll/channel/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="w-full pl-2 py-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:scale-105 transition-transform duration-300 ease-in-out">
              <i className="fab fa-instagram mr-2"></i> {/* Instagram Icon */}
            </button>
          </a>

          {platform !== "Twitter" && (
            <a
              href="https://wa.me/8801632460342"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="w-full pl-2 py-1 bg-green-600 text-white hover:bg-green-700 transition-colors hover:scale-105 duration-300 ease-in-out">
                <i className="fab fa-whatsapp mr-2"></i> {/* WhatsApp Icon */}
              </button>
            </a>
          )}
        </div>
      )}
    </>
  );
};

export default SocialMedia;
