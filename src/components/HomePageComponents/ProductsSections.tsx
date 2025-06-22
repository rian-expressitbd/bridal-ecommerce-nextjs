"use client";

import { useGetProductsQuery } from "@/lib/api/publicApi";
import CommonLayout from "@/app/layouts/CommonLayout";
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import Banner from "./Banner";

export default function ProductsSection() {
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const limit = 10;
  const [hasMore, setHasMore] = useState(true);

  const {
    data: products,
    error,
    isLoading,
    isFetching,
  } = useGetProductsQuery({
    page,
    limit,
  });

  useEffect(() => {
    if (products && products.length > 0) {
      setAllProducts((prev) => {
        const newProducts = products.filter(
          (p: Product) => !prev.some((existing) => existing._id === p._id)
        );
        return [...prev, ...newProducts];
      });
      if (products.length < limit) {
        setHasMore(false);
      }
    } else if (products && products.length === 0) {
      setHasMore(false);
    }
  }, [products, limit]);

  // Dynamically detect all unique conditions from the products
  const allConditions = useMemo(() => {
    const conditions = new Set<string>();

    allProducts.forEach((product) => {
      product.variantsId.forEach((variant) => {
        if (variant.condition) {
          conditions.add(variant.condition.toLowerCase());
        }
      });
    });

    // Convert to array and add "all" as the first option
    return ["all", ...Array.from(conditions)];
  }, [allProducts]);

  // Group products by condition dynamically
  const productsByCondition = useMemo(() => {
    const grouped: Record<string, Product[]> = { all: allProducts };

    allConditions.forEach((condition) => {
      if (condition !== "all") {
        grouped[condition] = allProducts.filter((product) =>
          product.variantsId.some(
            (variant) => variant.condition?.toLowerCase() === condition
          )
        );
      }
    });

    return grouped;
  }, [allProducts, allConditions]);

  // Format condition names for display (capitalize, etc.)
  const formatConditionName = (condition: string) => {
    if (condition === "all") return "All Products";
    return condition
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleLoadMore = () => {
    if (!isFetching && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  if (isLoading && page === 1) {
    return (
      <div className='p-4'>
        <CommonLayout>
          <div className='flex justify-center items-center h-64'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#7E22CE]'></div>
          </div>
        </CommonLayout>
      </div>
    );
  }

  if (error || (!products && !isLoading)) {
    return (
      <div className='p-4'>
        <CommonLayout>
          <div className='text-red-500 text-center'>
            Failed to load products:{" "}
            {error ? JSON.stringify(error) : "No products available"}
          </div>
        </CommonLayout>
      </div>
    );
  }

  return (
    <div className=''>
      {/* Render sections for each condition */}
      {allConditions.map(
        (condition, index) =>
          productsByCondition[condition]?.length > 0 && (
            <div key={condition} className='mb-12'>
              <CommonLayout>
                <h2 className='text-xl font-bold mb-6 pb-2 border-b'>
                  {formatConditionName(condition)}
                </h2>
                <div className='grid grid-cols-2 mdl:grid-cols-3 lgx:grid-cols-4 gap-2'>
                  {productsByCondition[condition].map((product: Product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </CommonLayout>

              {/* Only show banner if it's not the last section */}
              {index < allConditions.length - 1 && (
                <div className='mt-5 mb-5'>
                  <Banner />
                </div>
              )}
            </div>
          )
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className='mt-8 flex justify-center'>
          <button
            onClick={handleLoadMore}
            disabled={isFetching}
            className={`px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 ${
              isFetching ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isFetching ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      {/* Empty State */}
      {allProducts.length === 0 && !isLoading && (
        <div className='mt-8 text-center text-gray-600'>
          No products available.
        </div>
      )}
    </div>
  );
}

// Product Card Component remains the same
function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product._id}`}
      className='group block border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300'
    >
      <div className='relative w-full h-[320px] bg-gray-100'>
        <Image
          src={
            product.images?.[0]?.image.secure_url ||
            "https://via.placeholder.com/300"
          }
          alt={product.name}
          fill
          className='object-cover h-[348px]'
          priority
          sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'
        />
      </div>
      <div className='p-4'>
        <h2 className='text-lg font-semibold text-gray-800 group-hover:text-blue-600 truncate'>
          {product.name}
        </h2>
        <div
          className='prose w-full text-gray-600 text-sm flex truncate gap-1'
          dangerouslySetInnerHTML={{
            __html: product.short_description,
          }}
        />
        <p className='text-base font-bold text-blue-600'>
          BDT {Number(product.variantsId?.[0]?.selling_price || 0).toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
