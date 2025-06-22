"use client";

import { useParams } from "next/navigation";
import { useGetProductQuery } from "@/lib/api/publicApi";
import ProductDetails from "./product-details";


interface Product {
  _id: string;
  name: string;
  images: { image: { secure_url: string } }[];
  price: string;
  short_desc: string;
  category_id: string;
  pre_order: number;
  total_stock?: number;
}

export default function ProductPage() {
  const params = useParams();
  const product_info = params?.id as string;
  const lastIndex = product_info?.lastIndexOf("-");
  const product_id = product_info?.substring(lastIndex + 1);

  const { data: productData, isLoading, error } = useGetProductQuery(product_id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-500"></div>
      </div>
    );
  }

  if (error || !productData) {
    return (
      <div className="text-center p-4 text-red-500">
        <p>
          {(error as any)?.data?.message || "Failed to load product. Please try again later."}
        </p>
        <a href="/" className="mt-4 inline-block text-teal-500 hover:underline">
          Return to Home
        </a>
      </div>
    );
  }

  const product: Product = {
    _id: productData._id,
    name: productData.name || "Unnamed Product",
    images: productData.images || [{ image: { secure_url: "/assets/images/placeholder.png" } }],
    price: productData.price || "0",
    short_desc: productData.short_desc || "",
    category_id: productData.category_id || "",
    pre_order: productData.pre_order || 0,
    total_stock: productData.total_stock,
  };

  return (
    <div className="max-w-6xl mx-auto">
      <ProductDetails product={product} />
    </div>
  );
}