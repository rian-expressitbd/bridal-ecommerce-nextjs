import Image from "next/image";
import React from "react";
import Button from "./Button";
import { Product } from "@/types/cart";

interface CardProps {
  product: Product;
}

export default function Card({ product }: CardProps) {
  return (
    <div className="h-full">
      <div className='group rounded-[10px] h-full flex flex-col relative overflow-hidden transition-all duration-300 dark:bg-white dark:text-black'>
        {/* Optional: Category (if needed) */}
        <div className='flex justify-between z-10 bg-white'>
         
        </div>

        <div className='flex flex-col flex-grow transition-transform duration-300 '>
          {/* Product image */}
          {product.images[0]?.image?.optimizeUrl && (
            <Image
              src={product.images[0].image?.optimizeUrl}
              className='mx-auto w-[283px] h-[368px] object-cover my-auto'
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

        <Button className='absolute mx-auto flex w-[283px] justify-center bottom-0 left-0 right-0 bg-white text-black font-semibold py-3 
                  opacity-0 translate-y-full transition-all duration-500
                  group-hover:opacity-100 group-hover:-translate-y-6
                  hover:bg-white text-sm cursor-pointer'>
          <p>Quick Add</p>
        </Button>
      </div>
    </div>
  );
}
