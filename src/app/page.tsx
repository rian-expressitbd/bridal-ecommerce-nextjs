"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useGetProductsQuery, useGetCategoriesQuery } from "@/lib/api/publicApi";
import { useBusiness } from "@/hooks/useBusiness";
import SocialMedia from "@/components/Frontend/SocialMedia";
import Navbar from "@/components/Frontend/Navbar";
import Footer from "@/components/Frontend/Footer";
import ImageCarousel from "@/components/Frontend/Home/ImageCarousel";
import ScrollToTopButton from "@/components/Frontend/ScrollToTopButton";
import Image from "next/image";
import { Product } from "@/types/product";
import { Category } from "@/types/business";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiMenu } from "react-icons/fi";

interface AdaptedProduct {
  id: string;
  name: string;
  image: string;
}

interface AdaptedCategory {
  id: string;
  name: string;
}

const Sidebar = ({ isOpen, onClose, categories }: { isOpen: boolean; onClose: () => void; categories: AdaptedCategory[] }) => {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-30 w-4/5 max-w-xs bg-white shadow-lg overflow-y-auto"
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Menu</h2>
                  <button
                    onClick={onClose}
                    className="text-gray-600 hover:text-gray-800"
                    aria-label="Close sidebar"
                  >
                    <FiX size={24} />
                  </button>
                </div>
                <nav className="space-y-4">
                  <Link
                    href="/"
                    className="block text-lg font-medium text-gray-800 hover:text-teal-500"
                    onClick={onClose}
                  >
                    Home
                  </Link>
                  <Link
                    href="/products"
                    className="block text-lg font-medium text-gray-800 hover:text-teal-500"
                    onClick={onClose}
                  >
                    All Products
                  </Link>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Categories</h3>
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={{
                          pathname: "/allProduct",
                          query: { category: category.id },
                        }}
                        className="block text-md text-gray-600 hover:text-teal-500 py-1"
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
              className="fixed inset-0 bg-black z-20"
              onClick={onClose}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const Home = () => {
  const { businessData } = useBusiness();
  const [products, setProducts] = useState<AdaptedProduct[]>([]);
  const [categories, setCategories] = useState<AdaptedCategory[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const batchSize = 3;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetCategoriesQuery();

  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useGetProductsQuery({});

  useEffect(() => {
    if (categoriesData) {
      const adaptedCategories: AdaptedCategory[] = categoriesData.map((category: Category) => ({
        id: category._id,
        name: category.name,
      }));
      setCategories(adaptedCategories);
    }
  }, [categoriesData]);

  useEffect(() => {
    if (productsData) {
      const adaptedProducts: AdaptedProduct[] = productsData.map((product: Product) => ({
        id: product._id,
        name: product.name,
        image: product.images?.[0]?.image.secure_url || "/assets/Images/placeholder.png",
      }));
      setProducts(adaptedProducts);
    }
  }, [productsData]);

  const handleViewMore = () => {
    setVisibleCount((prev) => Math.min(prev + batchSize, products.length));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  if (categoriesLoading || productsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="">
      <Navbar onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        categories={categories}
      />
      <ScrollToTopButton />
      <div className="container mx-auto pt-16 md:pt-20">
        <div className="w-full md:w-[90%] mx-auto overflow-hidden relative">
          <SocialMedia />
          <ImageCarousel />

          {/* Buttons Section */}
          <div className="mt-8">
            <div className="w-full md:w-[45%] px-4 mx-auto mt-4 flex flex-col md:flex-row justify-center gap-5 text-sm ">
              {categories.slice(0, 3).map((category) => (
                <Link
                  href={{
                    pathname: "/allProduct",
                    query: { category: category.id },
                  }}
                  key={category.id}
                  className="w-full md:flex-1 px-4 md:px-0 py-1 border border-gray-800 font-medium hover:bg-gradient-to-b from-teal-500 to-teal-700 hover:text-white hover:border-teal-400 rounded text-center transition"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <div className="w-full md:w-[60%] px-4 md:px-0 mx-auto mt-4 flex justify-center text-sm ">
              {categories[3] && (
                <Link
                  href={{
                    pathname: "/allProduct",
                    query: { category: categories[3].id },
                  }}
                  key={categories[3]?.id}
                  className="w-full px-4 py-1 border border-gray-800 font-medium hover:bg-gradient-to-b from-teal-500 to-teal-700 hover:text-white hover:border-teal-400 rounded text-center transition"
                >
                  {categories[3]?.name}
                </Link>
              )}
            </div>
          </div>

          {/* Brand Section */}
          <div className="mt-7 px-3 md:px-0">
            <div className="flex items-center">
              <Image
                src="/assets/star.png"
                alt="Brand Logo"
                width={32}
                height={32}
                className="mr-2 w-6 md:w-8 h-auto"
              />
              <h5 className="mb-0 text-lg md:text-xl font-semibold">THE BRAND</h5>
            </div>
            <p className="mt-2 text-justify text-sm leading-relaxed">
              The vision of our clothing brand is to inspire confidence, authenticity, and individuality in every person who wears our garments. We aim to create a diverse range of fashion pieces that empower individuals to express their unique personalities and embrace their personal style. Our vision is grounded in the belief that fashion should be inclusive, sustainable, and ethically produced. We strive to cultivate a community where creativity thrives, and where every customer feels seen, heard, and celebrated.
            </p>
          </div>

          {/* Video Section */}
          <div className="flex justify-center mt-6">
            <div className="w-full">
              <div className="relative overflow-hidden">
                <video
                  controls
                  autoPlay
                  muted
                  loop
                  className="w-full h-auto mx-auto lg:w-4/5"
                >
                  <source src="/assets/Videos/Bridal_video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>

          {/* Client Gallery Section */}
          <div className="flex justify-center items-center mt-5">
            <Image
              src="/assets/star.png"
              alt="Brand Logo"
              width={32}
              height={32}
              className="mr-2 w-6 md:w-8 h-auto"
            />
            <h5 className="text-lg md:text-xl font-semibold">CLIENT GALLERY</h5>
            <Image
              src="/assets/star.png"
              alt="Brand Logo"
              width={32}
              height={32}
              className="ml-2 w-8 h-auto"
            />
          </div>
          <div>
            <p className="text-sm text-center leading-relaxed mt-3 px-2 md:px-0">
              The vision of our clothing brand is to inspire confidence, authenticity,
              <br />
              and individuality in every person who wears our garments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 justify-items-center">
            {products.slice(0, visibleCount).map((product) => (
              <div className="mb-2" key={product.id}>
                <Link href={`/products/${product.id}`}>
                  <Image
                    src={product.image}
                    className="transition-transform duration-300 ease-in-out hover:scale-105 w-full md:w-[400px] h-[300px]"
                    alt={product.name || "Product"}
                    width={400}
                    height={500}
                  />
                </Link>
              </div>
            ))}
          </div>

          {/* View More Button */}
          {visibleCount < products.length && (
            <div className="text-center my-5">
              <button
                onClick={handleViewMore}
                className="px-7 py-1 font-medium text-sm border hover:bg-gradient-to-b from-teal-500 to-teal-700 hover:text-white hover:border-teal-400 border-gray-800 rounded"
              >
                View More
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;