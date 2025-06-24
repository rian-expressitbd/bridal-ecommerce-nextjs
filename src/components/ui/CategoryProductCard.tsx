import Image from "next/image";
import React from "react";
import { Product } from "@/types/cart";
interface CardProps {
  product: Product;
}

export default function CategoryProductCard({ product }: CardProps) {
  return (
    <div>
      <div className='group rounded-[10px] h-full flex flex-col relative overflow-hidden transition-all duration-300 dark:bg-white dark:text-black'>
        {/* Optional: Category (if needed) */}
        <div className='flex justify-between z-10 bg-white'></div>

        <div className='flex flex-col flex-grow transition-transform duration-300 '>
          {/* Product image */}
          {product.images[0]?.image?.optimizeUrl && (
            <Image
              src={product.images[0].image?.optimizeUrl}
              className='mx-auto w-full h-[368px] object-cover my-auto'
              alt={product.name}
              width={300}
              height={300}
            />
          )}

          {/* Product title and price */}
          <h3 className='text-sm font-bold mt-3'>{product.name}</h3>
          <h1 className='text-lg mt-3'>
            BDT {product.variantsId?.[0]?.selling_price ?? "N/A"}
          </h1>
        </div>
      </div>
    </div>
  );
}
