"use client";

import { v4 as uuidv4 } from "uuid";
import CommonLayout from "@/app/layouts/CommonLayout";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { Toaster } from "react-hot-toast";

import { Product, Variant } from "@/types/product"; // Use Product and Variant from @/types/product
import Breadcrumb from "@/components/ui/Breadcrumb";
import { VideoPlayer } from "@/components/media/VideoPlayer";
import Title from "@/components/ui/Title";
import { useGetProductByIdQuery } from "@/lib/api/productsApi";
import { useGetProductsByCategoriesQuery } from "@/lib/api/publicApi";
import AddToCartBtn from "@/components/ui/molecules/addToCartBtn";

interface MediaItem {
  type: "image" | "video";
  url: string;
}

export default function ProductPage() {
  const [selectedMedia, setSelectedMedia] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [offerPrice, setOfferPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const { id } = useParams();
  const productId = Array.isArray(id) ? id[0] : id || "";

  const {
    data: rtkProduct,
    isLoading,
    isError,
    error,
  } = useGetProductByIdQuery(productId);

  const product = rtkProduct?.data[0]; // Changed from rtkProduct.data[0]
  const hasVariants = product?.hasVariants || false;
  const variants: Variant[] = product?.variantsId || [];

  useEffect(() => {
    console.log(product);

    if (product?.variantsId?.length) {
      const prices = product.variantsId.map((v: Variant) => v.selling_price);
      setMinPrice(Math.min(...prices));
      setMaxPrice(Math.max(...prices));

      if (!hasVariants && variants.length === 1) {
        setSelectedVariant(variants[0]);
        setSellingPrice(variants[0].selling_price);
        setOfferPrice(variants[0].offer_price);
      }
    }
  }, [product, hasVariants, variants]);

  const { data: relatedProducts } = useGetProductsByCategoriesQuery(
    { categoryId: product?.sub_category?.[0]?._id || "", page: 1, limit: 10 }, // Added pagination params
    { skip: !product?.sub_category?.[0]?._id }
  );

  const handleSelectVariant = (variantId: string) => {
    const variant = variants.find((v: Variant) => v._id === variantId);
    if (variant) {
      setSelectedVariant(variant);
      setSellingPrice(variant.selling_price);
      setOfferPrice(variant.offer_price);
    }
  };

  const mediaItems: MediaItem[] = [
    ...(product?.images?.map((img: { image: { secure_url: string } }) => ({
      type: "image" as const,
      url: img?.image?.secure_url || "",
    })) || []),
    ...(product?.video?.secure_url
      ? [{ type: "video" as const, url: product.video.secure_url }]
      : []),
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mediaItems[selectedMedia]?.type !== "image") {
      setZoomStyle({});
      return;
    }

    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      backgroundPosition: `${x}% ${y}%`,
      backgroundImage: `url(${mediaItems[selectedMedia]?.url})`,
    });
  };

  if (isLoading) {
    return (
      <CommonLayout>
        <div className='flex justify-center items-center h-screen'>
          <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary'></div>
        </div>
      </CommonLayout>
    );
  }

  if (isError || !product) {
    return (
      <CommonLayout>
        <div className='text-center text-red-500'>
          {isError
            ? `Failed to load product data: ${JSON.stringify(error)}`
            : "Product not found."}
        </div>
      </CommonLayout>
    );
  }

  const stock = selectedVariant?.variants_stock ?? product.total_stock ?? 0;
  const requiresVariantSelection =
    (hasVariants || variants.length > 1) && !selectedVariant;

  return (
    <div className='overflow-x-hidden'>
      <Toaster position='top-center' />
      <div className='mt-8 mb-8'>
        <Breadcrumb />
      </div>

      <div className='flex flex-col lg:flex-row gap-12 items-start mt-5 mb-5 w-full'>
        {/* Product media section */}
        <div className='lg:col-span-1 space-y-6 w-full'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='bg-white dark:bg-gray-800 rounded'
          >
            <div
              className='flex flex-col gap-3'
              style={{ position: "sticky", top: "204px" }}
            >
              <div
                className='w-full h-full flex items-center justify-center'
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setZoomStyle({})}
              >
                {mediaItems[selectedMedia]?.type === "video" ? (
                  <VideoPlayer
                    src={mediaItems[selectedMedia].url}
                    className='rounded w-full h-full object-cover'
                    autoPlay
                    loop
                    muted
                    showControls
                  />
                ) : (
                  <div className='relative w-[357px] md:w-[450px] h-[475px] p-2 md:p-0'>
                    <img
                      src={mediaItems[selectedMedia]?.url || "/placeholder.png"}
                      alt={product.name}
                      className='w-[370px] md:w-full h-full object-cover transition-transform duration-300 hover:scale-105 h-full'
                    />
                    <div
                      className='absolute inset-0 bg-cover bg-no-repeat scale-150 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                      style={zoomStyle}
                    />
                  </div>
                )}
              </div>

              <div className='flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800'>
                {mediaItems.map((item, index) => (
                  <button
                    key={`media-${uuidv4()}`}
                    onClick={() => setSelectedMedia(index)}
                    className={`relative aspect-square w-20 flex-shrink-0 rounded overflow-hidden border-2 transition-transform duration-200 ${
                      selectedMedia === index
                        ? "border-orange-400 dark:border-primary scale-105"
                        : "border-gray-200 dark:border-gray-700 hover:scale-95"
                    }`}
                  >
                    {item.type === "video" ? (
                      <div className='relative w-full h-full flex items-center justify-center bg-black'>
                        <span className='text-white opacity-80 text-xl'>
                          ▶
                        </span>
                      </div>
                    ) : (
                      <img
                        src={item.url || "/placeholder.png"}
                        alt={`Thumbnail ${index + 1}`}
                        className='w-full h-full object-cover'
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        {/* Product details section */}
        <div className='w-full'>
          <div className='flex flex-col'>
            <h3 className='text-2xl font-semibold max-w-[500px] break-words'>
              {product.name}
            </h3>
            <div
              className='max-w-[500px] break-words'
              dangerouslySetInnerHTML={{ __html: product.short_description }}
            ></div>

            <div className='flex items-center gap-4 mt-4'>
              {hasVariants || variants.length > 1 ? (
                <>
                  {selectedVariant ? (
                    <>
                      <span className='text-2xl font-semibold text-primary'>
                        BDT {offerPrice.toLocaleString()}
                      </span>
                      {sellingPrice > offerPrice && (
                        <span className='line-through text-xl text-red-600'>
                          BDT {sellingPrice.toLocaleString()}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className='text-2xl font-semibold'>
                      BDT {minPrice.toLocaleString()} - BDT{" "}
                      {maxPrice.toLocaleString()}
                    </span>
                  )}
                </>
              ) : (
                <>
                  <span className='text-2xl font-semibold text-primary'>
                    BDT {variants[0]?.offer_price?.toLocaleString() || "0"}
                  </span>
                  {variants[0]?.selling_price > variants[0]?.offer_price && (
                    <span className='line-through text-xl text-red-600'>
                      BDT {variants[0]?.selling_price?.toLocaleString()}
                    </span>
                  )}
                </>
              )}

              <span
                className={`px-2 py-1 rounded text-sm ${
                  stock > 0
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <div className=' items-center justify-center gap-3  p-3 mt-5 mb-5 w-24'>
              <div className='flex space-x-2 md:space-x-3 mt-2 md:mt-4  items-center  '>
                <p className=' font-semibold md:text-lg '>Quantity:</p>
                <div className='flex items-center '>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className='size-6 md:size-8 text-sm md:text-lg font-semibold bg-teal-700 text-white hover:bg-teal-800'
                  >
                    -
                  </button>
                  <span className='text-sm  md:pt-1 text-center border border-teal-700 size-6 md:size-8  font-medium'>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= stock}
                    className='size-6 md:size-8 text-sm md:text-lg font-semibold bg-teal-700 text-white hover:bg-teal-800'
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {(hasVariants || variants.length > 1) && (
              <div className='flex flex-col mt-4 h-[300px] overflow-y-scroll overflow-x-hidden w-full'>
                <h4 className='text-md font-semibold'>Select Variant:</h4>
                <div className='grid grid-cols-3 lg:grid-cols-4 gap-4 mt-2'>
                  {variants.map((variant: Variant) => {
                    const variantValue = variant.variants_values.join("-");
                    const isSelected = selectedVariant?._id === variant._id;
                    return (
                      <div key={`var-${uuidv4()}`}>
                        <div
                          className={`p-2 border-[0.5px] rounded cursor-pointer flex items-center ${
                            isSelected
                              ? "border-primary bg-primary/10"
                              : "border-gray-400"
                          }`}
                          onClick={() => handleSelectVariant(variant._id)}
                        >
                          <h3 className="truncate">{variantValue}</h3>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {requiresVariantSelection && (
              <div className='text-red-500 mt-4'>
                Please select a variant before adding to cart
              </div>
            )}

            <div className='mt-5'>
              <AddToCartBtn
                item={product}
                variant={selectedVariant || undefined}
                quantity={quantity}
                disabled={!selectedVariant}
                className={
                  !selectedVariant
                    ? "disabled"
                    : "inline-flex justify-center items-center text-sm md:text-base text-nowrap px-8 py-2 bg-gradient-to-r from-teal-500 to-teal-700 border border-teal-200 text-white font-semibold rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl w-full"
                }
              />
            </div>

            {product.tags?.length > 0 && (
              <div className='flex flex-col mt-5'>
                <h4 className='text-md mt-4 font-semibold'>Tags:</h4>
                <div className='grid grid-cols-3 lg:grid-cols-4 gap-4 mt-2'>
                  {product.tags.map((tag: string) => (
                    <div
                      key={`tag-${uuidv4()}`}
                      className='p-2 border-[0.5px] border-gray-400 rounded'
                    >
                      <h3 className='text-xs text-center truncate'>{tag}</h3>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.long_description && (
              <section className='pt-6 mt-6 border-t'>
                <h2 className='text-xl font-semibold mb-2'>Product Details</h2>
                <div
                  ref={descriptionRef}
                  className={`prose max-w-none text-gray-600 transition-all duration-300 ${
                    !showFullDescription ? "line-clamp-3" : ""
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: product.long_description,
                  }}
                />
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className='text-primary hover:text-primary-dark mt-2 text-sm font-medium flex items-center gap-1'
                >
                  {showFullDescription ? (
                    <>
                      <span>See Less</span>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-4 w-4'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M5 15l7-7 7 7'
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      <span>See More</span>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-4 w-4'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M19 9l-7 7-7-7'
                        />
                      </svg>
                    </>
                  )}
                </button>
              </section>
            )}
          </div>
        </div>
      </div>

      {relatedProducts && relatedProducts?.length > 0 && (
        <div className='mt-12'>
          <Title title='Related Products' />
          <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5'>
            {relatedProducts?.map((relatedProduct: Product) => (
              <div
                key={`related-product-${uuidv4()}`}
                className='border rounded-lg overflow-hidden hover:shadow-lg transition-shadow'
              >
                <div className='relative aspect-square'>
                  <Image
                    src={
                      relatedProduct.images[0]?.image?.secure_url ||
                      "/placeholder.png"
                    }
                    alt={relatedProduct.name}
                    className='w-full h-full object-cover'
                    width={300}
                    height={300}
                  />
                </div>
                <div className='p-4'>
                  <h3 className='font-medium text-lg line-clamp-1 truncate'>
                    {relatedProduct.name}
                  </h3>
                  <div className='flex items-center gap-2 mt-2'>
                    <span className='text-primary font-semibold'>
                      BDT{" "}
                      {relatedProduct.variantsId?.[0]?.offer_price?.toLocaleString() ||
                        "0"}
                    </span>
                    {relatedProduct.variantsId?.[0]?.selling_price >
                      relatedProduct.variantsId?.[0]?.offer_price && (
                      <span className='text-sm text-gray-500 line-through'>
                        BDT{" "}
                        {relatedProduct.variantsId?.[0]?.selling_price?.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
