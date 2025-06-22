// app/(public)/products/[id]/layout.tsx
import "@/app/globals.css";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Product Details - YourStore",
  description: "View detailed product information",
  openGraph: {
    title: "Product Details - YourStore",
    description: "View detailed product information",
    type: "website",
    images: [{ url: "/fallback-image.jpg" }],
  },
};

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className=''>
      <div className='max-w-6xl mx-auto'>{children}</div>
    </section>
  );
}
