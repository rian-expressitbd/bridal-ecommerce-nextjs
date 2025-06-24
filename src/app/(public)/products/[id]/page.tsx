"use client";

import { useParams } from "next/navigation";
import { useGetProductQuery } from "@/lib/api/publicApi";
import ProductDetails from "./product-details";
import Link from "next/link";
import { useEffect, useState } from "react";
import striptags from "striptags";

interface Image {
  _id: string;
  image: {
    public_id: string;
    secure_url: string;
    optimizeUrl: string;
  };
}

interface Variant {
  _id: string;
  productId: string;
  name: string;
  image: Image;
  barcode: string;
  sku: string;
  selling_price: string;
  condition: string;
  discount_type: string;
  discount_percent: string;
  discount_amount: string;
  discount_start_date: string;
  discount_end_date: string;
  offer_price: string;
  variants_stock: number;
  variants_values: string[];
  total_sold: number;
  isPublish: boolean;
  isPreOrder: boolean;
}

interface SubCategory {
  _id: string;
  name: string;
}

interface Video {
  // Define proper video type structure here
  url: string;
  type: string;
}

interface Brand {
  // Define proper brand type structure here
  _id: string;
  name: string;
}

interface ProductData {
  _id: string;
  name: string;
  short_description: string;
  long_description?: string;
  tags: string[];
  images: Image[];
  video: Video[];
  brand: Brand | null;
  sizeGuard: {
    _id: string;
    name: string;
  };
  sub_category: SubCategory[];
  total_stock: number;
  total_sold: number;
  hasVariants: boolean;
  variantsId: Variant[];
  currency: string;
  isPublish: boolean;
}

interface Product {
  _id: string;
  name: string;
  images: { image: { secure_url: string } }[];
  offer_price: string;
  selling_price: string;
  short_desc: string;
  long_desc?: string;
  category_id: string;
  pre_order: boolean;
  total_stock?: number;
  variants?: {
    _id: string;
    name: string;
    selling_price: string;
    offer_price: string;
    variants_stock: number;
  }[];
}

interface ApiError {
  data?: {
    message?: string;
  };
  status?: number;
}

export default function ProductPage() {
  const [singleProduct, setSingleProduct] = useState<Product | null>(null);
  const params = useParams();
  const product_info = params?.id as string;
  const lastIndex = product_info?.lastIndexOf("-");
  const product_id = product_info?.substring(lastIndex + 1);

  const {
    data: productData,
    isLoading,
    error,
  } = useGetProductQuery(product_id);

  useEffect(() => {
    if (Array.isArray(productData) && productData.length > 0) {
      const productDataItem = productData[0] as ProductData;
      const defaultVariant = productDataItem.variantsId?.[0] || {};

      const formattedProduct: Product = {
        _id: productDataItem._id,
        name: productDataItem.name || "Unnamed Product",
        images: productDataItem.images?.map((img) => ({
          image: { secure_url: img.image.secure_url },
        })) || [{ image: { secure_url: "/assets/images/placeholder.png" } }],
        offer_price: defaultVariant.offer_price || "0",
        selling_price: defaultVariant.selling_price || "0",
        short_desc: striptags(productDataItem.short_description || ""),
        long_desc: striptags(productDataItem.long_description || ""),
        category_id: productDataItem.sub_category?.[0]?._id || "",
        pre_order:
          productDataItem.variantsId?.some((v: Variant) => v.isPreOrder) ||
          false,
        total_stock: productDataItem.total_stock,
        variants: productDataItem.variantsId?.map((variant: Variant) => ({
          _id: variant._id,
          name: variant.name,
          selling_price: variant.selling_price,
          offer_price: variant.offer_price,
          variants_stock: variant.variants_stock,
        })),
      };

      setSingleProduct(formattedProduct);
    }
  }, [productData]);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-500'></div>
      </div>
    );
  }

  if (error) {
    const apiError = error as ApiError;
    console.error("API Error:", error);
    return (
      <div className='text-center p-4 text-red-500'>
        <p>
          {apiError?.data?.message ||
            "Failed to load product due to an API error. Please try again later."}
        </p>
        <Link
          href='/'
          className='mt-4 inline-block text-teal-500 hover:underline'
        >
          Return to Home
        </Link>
      </div>
    );
  }

  if (!Array.isArray(productData) || productData.length === 0) {
    return (
      <div className='text-center p-4 text-red-500'>
        <p>Product not found or invalid data received.</p>
        <Link
          href='/'
          className='mt-4 inline-block text-teal-500 hover:underline'
        >
          Return to Home
        </Link>
      </div>
    );
  }

  if (!singleProduct) {
    return (
      <div className='text-center p-4 text-red-500'>
        <p>Product data is not available.</p>
        <Link
          href='/'
          className='mt-4 inline-block text-teal-500 hover:underline'
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className='max-w-6xl mx-auto'>
      <ProductDetails />
    </div>
  );
}
