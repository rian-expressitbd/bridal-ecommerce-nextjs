"use client";

import CommonLayout from "@/app/layouts/CommonLayout";
import { useBusiness } from "@/hooks/useBusiness";
import {
  useGetProductsQuery,
  useGetProductsByCategoriesQuery,
} from "@/lib/api/publicApi";
import { Category } from "@/types/business";
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect, useRef } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { FaFilter, FaTimes } from "react-icons/fa";
import { useDebounce } from "@/hooks/useDebounce";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductsPage() {
  const { businessData } = useBusiness();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPriceRange, setCurrentPriceRange] = useState<[number, number]>([
    0, 1000,
  ]);
  const [sortOption, setSortOption] = useState<string>("default");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const productsPerPage = 2;

  // Sort mapping
  const sortMap: { [key: string]: string } = {
    newest: "-createdAt",
    oldest: "createdAt",
    "name-asc": "name",
    "name-desc": "-name",
  };

  // Fetch products based on category selection (single query)
  const {
    data: categoryProducts,
    isLoading: categoryProductsLoading,
    error: categoryProductsError,
  } = useGetProductsByCategoriesQuery(
    { categoryId: selectedCategory! },
    { skip: !selectedCategory }
  );

  const {
    data: allProducts,
    isLoading: allProductsLoading,
    error: allProductsError,
  } = useGetProductsQuery(
    {
      sort: sortMap[sortOption] || undefined,
      search: debouncedSearchQuery,
    },
    { skip: !!selectedCategory }
  );

  // Determine products and loading/error states
  const products = selectedCategory ? categoryProducts : allProducts;
  const isLoading = selectedCategory
    ? categoryProductsLoading
    : allProductsLoading;
  const error = selectedCategory ? categoryProductsError : allProductsError;

  // Client-side pagination
  const totalProducts = products?.length || 0;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const paginatedProducts = useMemo(() => {
    if (!products) return [];
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    return products.slice(start, end);
  }, [products, currentPage, productsPerPage]);

  // Calculate min and max prices
  const { minPrice, maxPrice } = useMemo(() => {
    if (!products || products.length === 0) {
      return { minPrice: 0, maxPrice: 1000 };
    }

    const allPrices = products
      .flatMap(
        (product: Product) =>
          product.variantsId?.map((variant) => Number(variant.selling_price)) || []
      )
      .filter((price) => !isNaN(price));

    return {
      minPrice: allPrices.length ? Math.min(...allPrices) : 0,
      maxPrice: allPrices.length ? Math.max(...allPrices) : 1000,
    };
  }, [products]);

  // Initialize price range and handle no products case
  useEffect(() => {
    if (products && products.length > 0) {
      setCurrentPriceRange([minPrice, maxPrice]);
    } else {
      setCurrentPriceRange([0, 1000]);
    }
  }, [products, minPrice, maxPrice]);

  // Flatten categories
  const allCategories = useMemo(() => {
    const flat: Category[] = [];
    const seenIds = new Set<string>();
    const flatten = (cats: Category[] | undefined) => {
      if (!cats) return;
      cats.forEach((cat) => {
        if (!seenIds.has(cat._id)) {
          flat.push(cat);
          seenIds.add(cat._id);
          if (cat.children?.length) flatten(cat.children);
        }
      });
    };
    flatten(businessData?.categories);
    return flat;
  }, [businessData]);

  // Filter and sort products (client-side)
  const filteredProducts = useMemo(() => {
    if (!paginatedProducts || isLoading) return [];

    let filtered = paginatedProducts.filter((product: Product) => {
      const productPrice = Number(product.variantsId?.[0]?.selling_price || 0);
      return (
        productPrice >= currentPriceRange[0] &&
        productPrice <= currentPriceRange[1]
      );
    });

    if (sortOption === "price-low-high") {
      filtered = filtered.sort(
        (a, b) =>
          Number(a.variantsId?.[0]?.selling_price || 0) -
          Number(b.variantsId?.[0]?.selling_price || 0)
      );
    } else if (sortOption === "price-high-low") {
      filtered = filtered.sort(
        (a, b) =>
          Number(b.variantsId?.[0]?.selling_price || 0) -
          Number(a.variantsId?.[0]?.selling_price || 0)
      );
    }

    return filtered;
  }, [paginatedProducts, isLoading, currentPriceRange, sortOption]);

  // Handle price range change
  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isMin: boolean
  ) => {
    const newValue = Number(e.target.value);
    setCurrentPriceRange((prev) => {
      const [min, max] = prev;
      if (isMin) {
        return [Math.min(newValue, max), max];
      } else {
        return [min, Math.max(newValue, min)];
      }
    });
  };

  // Apply price filter and reset page
  const applyPriceFilter = () => {
    setCurrentPage(1);
    setIsSidebarOpen(false);
  };

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  // Handle category change
  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory(null);
    setCurrentPriceRange([minPrice, maxPrice]);
    setSortOption("default");
    setCurrentPage(1);
    setSearchQuery("");
    setIsSidebarOpen(false);
  };

  // Debug logs
  useEffect(() => {
    console.log("Categories:", allCategories);
    console.log("Products:", products);
    console.log("Paginated Products:", paginatedProducts);
    console.log("Filtered Products:", filteredProducts);
    console.log("Price Range:", minPrice, maxPrice, currentPriceRange);
    console.log("Sidebar Open:", isSidebarOpen);
  }, [
    allCategories,
    products,
    paginatedProducts,
    filteredProducts,
    minPrice,
    maxPrice,
    currentPriceRange,
    isSidebarOpen,
  ]);

  if (isLoading) {
    return (
      <CommonLayout>
        <div className="p-4 flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        </div>
      </CommonLayout>
    );
  }

  if (error || !products) {
    return (
      <CommonLayout>
        <div className="p-4 text-red-500">
          Failed to load products: {error ? JSON.stringify(error) : "No products available"}
        </div>
      </CommonLayout>
    );
  }

  return (
    <div className="p-4">
      <CommonLayout>
        <style jsx>{`
          .range-slider {
            position: relative;
            width: 100%;
            height: 16px;
            margin-bottom: 16px;
          }
          .range-track {
            position: absolute;
            width: 100%;
            height: 4px;
            background: #e5e7eb;
            top: 50%;
            transform: translateY(-50%);
            border-radius: 2px;
          }
          .range-filled {
            position: absolute;
            height: 4px;
            background: #2563eb;
            top: 50%;
            transform: translateY(-50%);
            border-radius: 2px;
          }
          .range-input {
            position: absolute;
            width: 100%;
            height: 16px;
            top: 0;
            background: transparent;
            pointer-events: none;
            -webkit-appearance: none;
            appearance: none;
          }
          .range-input::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 16px;
            height: 16px;
            background: #2563eb;
            border-radius: 50%;
            cursor: pointer;
            pointer-events: auto;
            box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
          }
          .range-input::-moz-range-thumb {
            width: 16px;
            height: 16px;
            background: #2563eb;
            border-radius: 50%;
            cursor: pointer;
            pointer-events: auto;
            box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
            border: none;
          }
          .range-input:focus {
            outline: none;
          }
          .pagination-button {
            padding: 8px 12px;
            border: 1px solid #e5e7eb;
            border-radius: 4px;
            background: #fff;
            color: #374151;
            cursor: pointer;
            transition: all 0.2s;
          }
          .pagination-button:hover:not(.disabled) {
            background: #f3f4f6;
          }
          .pagination-button.active {
            background: #2563eb;
            color: #fff;
            border-color: #2563eb;
          }
          .pagination-button.disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
          .disabled-slider .range-input {
            pointer-events: none;
            opacity: 0.5;
          }
          .disabled-slider .range-filled {
            background: #d1d5db;
          }
        `}</style>

        {/* Search Bar */}
        <div className="flex justify-center mx-auto px-3 mb-5 mt-10 relative max-w-2xl">
          <div className="relative w-full">
            <input
              ref={searchInputRef}
              className="w-full p-3 pl-4 pr-10 bg-transparent border-[2px] border-gray-400 rounded-3xl focus:outline-none focus:border-primary"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Products..."
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <FiX size={20} />
              </button>
            ) : (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FiSearch size={20} />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
          {/* Desktop Filters */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <h2 className="font-bold text-lg mb-4">Filter by Sub-Category</h2>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="form-checkbox text-primary rounded"
                    checked={!selectedCategory}
                    onChange={() => handleCategoryChange(null)}
                  />
                  <span>All Products</span>
                </label>
                {allCategories.map((category) => (
                  <label
                    key={category._id}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox text-primary rounded"
                      checked={selectedCategory === category._id}
                      onChange={() => handleCategoryChange(category._id)}
                    />
                    <span>{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="font-bold text-lg mb-4">Filter by Price</h2>
              {products.length > 0 ? (
                <>
                  <div className="flex justify-between mb-2">
                    <span>Min. ৳{currentPriceRange[0].toFixed(2)}</span>
                    <span>Max. ৳{currentPriceRange[1].toFixed(2)}</span>
                  </div>
                  <div className="range-slider">
                    <div className="range-track"></div>
                    <div
                      className="range-filled"
                      style={{
                        left:
                          maxPrice === minPrice
                            ? "0%"
                            : `${
                                ((currentPriceRange[0] - minPrice) /
                                  (maxPrice - minPrice)) *
                                100
                              }%`,
                        width:
                          maxPrice === minPrice
                            ? "100%"
                            : `${
                                ((currentPriceRange[1] - currentPriceRange[0]) /
                                  (maxPrice - minPrice)) *
                                100
                              }%`,
                      }}
                    ></div>
                    <input
                      type="range"
                      className="range-input"
                      min={minPrice}
                      max={maxPrice}
                      value={currentPriceRange[0]}
                      onChange={(e) => handlePriceChange(e, true)}
                    />
                    <input
                      type="range"
                      className="range-input"
                      min={minPrice}
                      max={maxPrice}
                      value={currentPriceRange[1]}
                      onChange={(e) => handlePriceChange(e, false)}
                    />
                  </div>
                  <button
                    onClick={applyPriceFilter}
                    className="justify-center text-nowrap items-center w-full  px-5 py-2 text-sm  text-white border border-teal-700 text-teal-700 rounded-lg font-semibold bg-teal-700 hover:text-white transition-colors duration-300 ease-in-out hover:scale-105 hover:shadow-2xl shadow"
                  >
                    Apply Price Filter
                  </button>
                </>
              ) : (
                <p className="text-gray-500 text-sm">
                  No products available to filter by price.
                </p>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="md:hidden flex justify-between items-center mb-4">
              <h1 className="text-xl font-bold">
                {selectedCategory
                  ? `${
                      allCategories.find((c) => c._id === selectedCategory)?.name ||
                      "Unknown"
                    } Products`
                  : "All Products"}
              </h1>
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
                aria-label="Open filters"
              >
                <FaFilter />
                <span>Filters</span>
              </button>
            </div>

            <div className="mb-4 flex justify-between items-center">
              <h1 className="text-sm md:text-2xl mr-2 font-bold hidden md:block">
                {selectedCategory
                  ? `${
                      allCategories.find((c) => c._id === selectedCategory)?.name ||
                      "Unknown"
                    } Products`
                  : "All Products"}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1 ? "product" : "products"} found
                </span>
                <select
                  value={sortOption}
                  onChange={handleSortChange}
                  className="border rounded px-3 py-1 text-sm"
                >
                  <option value="default">Default</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts?.map((product: Product) => (
                <Link
                  href={`/products/${product._id}`}
                  key={product._id}
                  className="group block border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative w-full aspect-square bg-gray-200">
                    <Image
                      src={
                        product.images?.[0]?.image.secure_url ||
                        "https://via.placeholder.com/300"
                      }
                      alt={product.name}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800 group-hover:text-primary truncate">
                      {product.name}
                    </h2>
                    <div
                      className="prose text-gray-600 text-sm line-clamp-2 mt-1"
                      dangerouslySetInnerHTML={{
                        __html: product.short_description,
                      }}
                    />
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-base font-bold text-primary">
                        BDT{" "}
                        {Number(product.variantsId?.[0]?.selling_price || 0).toFixed(2)}
                      </p>
                      {product.variantsId?.[0]?.offer_price && (
                        <p className="text-sm text-gray-500 line-through">
                          BDT{" "}
                          {Number(product.variantsId?.[0]?.offer_price).toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-8 space-x-2">
                <button
                  className={`pagination-button ${currentPage === 1 ? "disabled" : ""}`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  return (
                    <button
                      key={page}
                      className={`pagination-button ${currentPage === page ? "active" : ""}`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  className={`pagination-button ${currentPage === totalPages ? "disabled" : ""}`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-700">
                  No products found
                </h3>
                <p className="text-gray-500 mt-2">
                  {searchQuery
                    ? `No products found for "${searchQuery}"`
                    : selectedCategory
                    ? "No products in this category and price range. Try adjusting filters."
                    : "No products available in the selected price range."}
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 right-0 z-50 w-full bg-white shadow-lg md:hidden overflow-y-auto"
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="text-gray-600 hover:text-gray-800"
                    aria-label="Close filters"
                  >
                    <FaTimes size={24} />
                  </button>
                </div>

                <div className="bg-white p-4 rounded-lg shadow mb-6">
                  <h2 className="font-bold text-lg mb-4">Filter by Sub-Category</h2>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="form-checkbox text-primary rounded"
                        checked={!selectedCategory}
                        onChange={() => handleCategoryChange(null)}
                      />
                      <span>All Products</span>
                    </label>
                    {allCategories.map((category) => (
                      <label
                        key={category._id}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="form-checkbox text-primary rounded"
                          checked={selectedCategory === category._id}
                          onChange={() => handleCategoryChange(category._id)}
                        />
                        <span>{category.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow">
                  <h2 className="font-bold text-lg mb-4">Filter by Price</h2>
                  {products.length > 0 ? (
                    <>
                      <div className="flex justify-between mb-2">
                        <span>Min. ৳{currentPriceRange[0].toFixed(2)}</span>
                        <span>Max. ৳{currentPriceRange[1].toFixed(2)}</span>
                      </div>
                      <div className="range-slider">
                        <div className="range-track"></div>
                        <div
                          className="range-filled"
                          style={{
                            left:
                              maxPrice === minPrice
                                ? "0%"
                                : `${
                                    ((currentPriceRange[0] - minPrice) /
                                      (maxPrice - minPrice)) *
                                    100
                                  }%`,
                            width:
                              maxPrice === minPrice
                                ? "100%"
                                : `${
                                    ((currentPriceRange[1] - currentPriceRange[0]) /
                                      (maxPrice - minPrice)) *
                                    100
                                  }%`,
                          }}
                        ></div>
                        <input
                          type="range"
                          className="range-input"
                          min={minPrice}
                          max={maxPrice}
                          value={currentPriceRange[0]}
                          onChange={(e) => handlePriceChange(e, true)}
                        />
                        <input
                          type="range"
                          className="range-input"
                          min={minPrice}
                          max={maxPrice}
                          value={currentPriceRange[1]}
                          onChange={(e) => handlePriceChange(e, false)}
                        />
                      </div>
                      <button
                        onClick={applyPriceFilter}
                        className="w-full py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
                      >
                        Apply Filters
                      </button>
                    </>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No products available to filter by price.
                    </p>
                  )}
                </div>

                <button
                  onClick={resetFilters}
                  className="w-full mt-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                >
                  Reset Filters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}
      </CommonLayout>
    </div>
  );
}