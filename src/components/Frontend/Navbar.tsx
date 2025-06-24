"use client";

import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { BiCart } from "react-icons/bi";
import { useBusiness } from "@/hooks/useBusiness";
import { useCart } from "@/hooks/useCart";
import { CartSheet } from "../ui/organisms/cart-sheet";

interface NavbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Navbar = ({ onToggleSidebar, isSidebarOpen }: NavbarProps) => {
  const { businessData } = useBusiness();
  const { itemCount, toggleCart } = useCart(); // Get toggleCart from useCart hook

  if (!businessData) return null;

  const logoUrl = businessData.logo.optimizeUrl || businessData.logo.secure_url;
  const displayItemCount = isNaN(itemCount) ? 0 : itemCount;

  return (
    <nav className='sticky top-0 left-0 right-0 bg-white shadow-md z-60'>
      <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
        <button
          onClick={onToggleSidebar}
          className='text-gray-800 hover:text-teal-500 focus:outline-none'
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        >
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <Link href='/'>
          <img
            src={logoUrl}
            alt='Logo'
            className='h-[50px] w-[50px] object-contain'
          />
        </Link>

        <div className='flex items-center space-x-4'>
          <CartSheet />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
