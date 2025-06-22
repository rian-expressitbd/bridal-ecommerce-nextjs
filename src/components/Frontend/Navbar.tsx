'use client';

import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';
import { BiCart } from 'react-icons/bi';

interface NavbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Navbar = ({ onToggleSidebar, isSidebarOpen }: NavbarProps) => {
  return (
    <nav className="sticky top-0 left-0 right-0 bg-white shadow-md z-60">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Hamburger Menu */}
        <button
          onClick={onToggleSidebar}
          className="text-gray-800 hover:text-teal-500 focus:outline-none"
          aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
        >
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Logo */}
        <Link href="/">
          <img
            src="/assets/Images/Frame.png"
            alt="Logo"
            className="max-w-[160px] md:max-w-[200px] lg:max-w-[240px] h-auto object-contain"
          />
        </Link>

        {/* Cart Icon */}
        <div className="flex items-center space-x-4">
          <button
            aria-label="View Cart"
            className="text-black hover:text-gray-500 focus:outline-none relative"
          >
            <BiCart className="text-xl md:text-2xl" />
            <span className="absolute -top-2 -right-2 flex items-center justify-center rounded-full bg-red-500 text-white text-xs w-5 h-5">
              0
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;