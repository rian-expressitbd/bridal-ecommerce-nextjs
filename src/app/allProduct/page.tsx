"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useGetProductsByCategoriesQuery } from "@/lib/api/productsApi";
import ScrollToTopButton from "@/components/Frontend/ScrollToTopButton";
import Navbar from "@/components/Frontend/Navbar";
import Footer from "@/components/Frontend/Footer";

// Define Product type based on API response
interface Variant {
  offer_price?: string | number;
  selling_price?: string | number;
  name?: string;
  [key: string]: any; // Allow additional fields
}

interface Product {
  _id: string;
  name: string;
  images: { image: { secure_url: string } }[];
  sizeGuard?: { _id: string; name: string };
  sub_category?: { _id: string; name: string }[];
  currency?: string;
  variantsId?: Variant[];
  [key: string]: any; // Allow additional fields
}

const AllProducts = () => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState(1); // Start with 1 to show the single product
  const batchSize = 6;

  const {
    data: productsData,
    isLoading,
    error,
  } = useGetProductsByCategoriesQuery(categoryId || ""); // Default to empty string if null

  useEffect(() => {
    console.log("Category ID:", categoryId);
    console.log("Full Products Response:", productsData);
    console.log("Error:", error);
    if (productsData?.data) {
      setProducts(productsData.data);
      console.log("Updated Products:", productsData.data);
    }
  }, [productsData, error, categoryId]);

  const handleViewMore = () => {
    setVisibleCount((prev) => Math.min(prev + batchSize, products.length));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-500"></div>
      </div>
    );
  }

  if (error) {
    console.error("API Error Details:", error);
    return (
      <div className="text-center p-4 text-red-500">
        Failed to load products. Please try again later. <br />
        Error: {error.message || "Unknown error"}
      </div>
    );
  }

  return (
    <div>
      <Navbar onToggleSidebar={() => {}} isSidebarOpen={false} />
      <ScrollToTopButton />
      <div className="container mx-auto pt-16 md:pt-20">
        <div className="w-[90%] mx-auto">
          <h1 className="text-2xl md:text-3xl font-semibold mb-6">
            {categoryId
              ? `Products in Category: ${
                  products[0]?.sub_category?.[0]?.name ||
                  products[0]?.sizeGuard?.name ||
                  "Unknown"
                }`
              : "All Products"}
          </h1>
          {products.length === 0 ? (
            <div className="text-center p-4">
              No products available for category ID: {categoryId || "None"}. <br />
              Please check if the category exists or contains products.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center p-3 md:p-0">
                {products.slice(0, visibleCount).map((product) => {
                  const variant = product.variantsId?.[0] || {};
                  return (
                    <div key={product._id} className="mb-4 px-5 md:p-0">
                      <Link href={`/products/${product.name}-${product._id}`}>
                        <Image
                          src={
                            product.images[0]?.image.secure_url ||
                            "/assets/Images/placeholder.png"
                          }
                          alt={product.name || "Product"}
                          width={400}
                          height={500}
                          className="w-[400px] h-[300px] object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                        />
                        <h3 className="text-lg font-medium mt-2 break-all w-[200px]">
                          {product.name} 
                        </h3>
                        <p className="text-md font-semibold">
                          {product.currency || variant.currency || "BDT"}{" "}
                          {variant.offer_price || "Price not available"}
                          {variant.offer_price &&
                            variant.selling_price &&
                            variant.offer_price !== variant.selling_price && (
                              <span className="text-gray-500 line-through ml-2">
                                {product.currency || variant.currency || "BDT"}{" "}
                                {variant.selling_price}
                              </span>
                            )}
                        </p>
                      </Link>
                    </div>
                  );
                })}
              </div>
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
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllProducts;