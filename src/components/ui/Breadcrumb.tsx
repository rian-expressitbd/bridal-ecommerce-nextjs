"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useGetProductsQuery } from "@/lib/api/publicApi";

export default function Breadcrumb() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);
  const { data: products } = useGetProductsQuery({});

  const [productName, setProductName] = useState<string | null>(null);

  useEffect(() => {
    // Check if last segment looks like a product ID (you can make this smarter)
    const lastSegment = paths[paths.length - 1];
    console.log("lastsegment", lastSegment);

    if (pathname.includes("/products/") && lastSegment.length === 24) {
      // Fetch the product name by ID
      const singleProduct = products?.find(
        (product) => product._id == lastSegment
      );
      setProductName(singleProduct?.name ?? null);
      console.log("product Name", singleProduct); //outputs undefined
    }
  }, [pathname, paths, products]);

  return (
    <nav className='flex items-center text-sm text-gray-600 mb-4'>
      <Link href='/' className='hover:text-primary'>
        Home
      </Link>
      {paths.map((segment, index) => {
        const href = `/${paths.slice(0, index + 1).join("/")}`;
        const isLast = index === paths.length - 1;

        const displayName =
          isLast && productName
            ? productName
            : segment.replace(/-/g, " ").toLowerCase();

        return (
          <span key={segment} className='flex items-center'>
            <span className='mx-2'>/</span>
            {isLast ? (
              <span className='text-primary font-medium capitalize'>
                {displayName}
              </span>
            ) : (
              <Link href={href} className='hover:text-primary capitalize'>
                {displayName}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
