"use client";

import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { useBusiness } from "@/hooks/useBusiness";
import { CartSheet } from "../ui/organisms/cart-sheet";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useGetCategoriesQuery } from "@/lib/api/publicApi";
import { Category } from "@/types/business";

interface AdaptedCategory {
  id: string;
  name: string;
}

const Sidebar = ({
  isOpen,
  onClose,
  categories,
}: {
  isOpen: boolean;
  onClose: () => void;
  categories: AdaptedCategory[];
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className='fixed inset-y-0 left-0 z-30 w-4/5 max-w-xs bg-white shadow-lg overflow-y-auto'
            style={{ minHeight: "100vh" }} // Ensure full height
          >
            <div className='p-4'>
              <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-bold'>Menu</h2>
                <button
                  onClick={onClose}
                  className='text-gray-600 hover:text-gray-800'
                  aria-label='Close sidebar'
                >
                  <FiX size={24} />
                </button>
              </div>
              <nav className='space-y-4'>
                <Link
                  href='/'
                  className='block text-lg font-medium text-gray-800 hover:text-teal-500'
                  onClick={onClose}
                >
                  Home
                </Link>
                <Link
                  href='/products'
                  className='block text-lg font-medium text-gray-800 hover:text-teal-500'
                  onClick={onClose}
                >
                  All Products
                </Link>
                <div>
                  <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                    Categories
                  </h3>
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={{
                        pathname: "/allProduct",
                        query: { category: category.id },
                      }}
                      className='block text-md text-gray-600 hover:text-teal-500 py-1'
                      onClick={onClose}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </nav>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='fixed inset-0 bg-black z-20'
            style={{ minHeight: "100vh" }} // Ensure full height
            onClick={onClose}
          />
        </>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [categories, setCategories] = useState<AdaptedCategory[]>([]);
  const { businessData } = useBusiness();
  const { data: categoriesData } = useGetCategoriesQuery();

  useEffect(() => {
    if (categoriesData) {
      const adaptedCategories: AdaptedCategory[] = categoriesData.map(
        (category: Category) => ({
          id: category._id,
          name: category.name,
        })
      );
      setCategories(adaptedCategories);
    }
  }, [categoriesData]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  if (!businessData) return null;

  const logoUrl =
    businessData.logo?.secure_url;
    console.log(businessData);
    

  return (
    <>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        categories={categories}
      />
      <nav className='sticky top-0 left-0 right-0 bg-white shadow-md z-60'>
        <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
          {/* Sidebar Toggle Button */}
          <button
            onClick={toggleSidebar}
            className='text-gray-800 hover:text-teal-500 focus:outline-none'
            aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
          >
            {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* Logo */}
          <Link href='/'>
            <img
              src={logoUrl}
              alt='Logo'
              className='h-[50px] w-[50px] object-contain'
            />
          </Link>

          {/* Cart Toggle Button */}
          <div className='flex items-center space-x-4'>
            {/* Cart Sheet Component */}
            <CartSheet />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
