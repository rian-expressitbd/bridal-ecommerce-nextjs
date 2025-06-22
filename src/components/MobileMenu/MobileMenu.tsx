"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  // Close menu on `ESC` key press
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          className='fixed top-0 left-0 w-full md:w-[300px] h-screen bg-white dark:bg-gray-800 shadow-lg z-[1000] p-5 flex flex-col gap-4'
        >
          <div className='flex justify-between items-center'>
            <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>
              Menu
            </h2>
            <button onClick={onClose}>
              <FiX size={24} />
            </button>
          </div>
          <nav className='flex flex-col gap-3 mt-5'>
            <Link onClick={onClose} className='text-sm font-semibold' href='/'>
              Home
            </Link>
            <Link onClick={onClose} className='text-sm font-semibold' href='#'>
              Eid Collection 25{" "}
            </Link>
            <Link onClick={onClose} className='text-sm font-semibold' href='#'>
              Restocks
            </Link>
            <Link onClick={onClose} className='text-sm font-semibold' href='#'>
              Best Sellers
            </Link>
            <Link onClick={onClose} className='text-sm font-semibold' href='#'>
              Winter Collection 24
            </Link>
            <Link onClick={onClose} className='text-sm font-semibold' href='#'>
              Festive Wear{" "}
            </Link>
            <Link onClick={onClose} className='text-sm font-semibold' href='#'>
              Saree
            </Link>
            <Link onClick={onClose} className='text-sm font-semibold' href='#'>
              Lawn
            </Link>
            <Link onClick={onClose} className='text-sm font-semibold' href='#'>
              Velvet
            </Link>
            <Link onClick={onClose} className='text-sm font-semibold' href='#'>
              Accessories
            </Link>
          </nav>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
