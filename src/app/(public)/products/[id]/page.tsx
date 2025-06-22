// "use server";
// // app/products/[id]/page.tsx (Server Component)
// import { publicApi } from "@/lib/api/publicApi";
// import { makeStore } from "@/lib/store";
// import { stripHtml } from "@/utils/stripHTML";
// import { Metadata } from "next";
// import { notFound } from "next/navigation";
// import ProductDetail from "./product-details";

// const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

// export const dynamic = "force-dynamic";

// async function getProductById(id: string) {
//   const store = makeStore();
//   const res = await store.dispatch(publicApi.endpoints.getProducts.initiate({ _id: id }));
//   return res.data?.[0];
// }

// export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
//   const product = await getProductById(params.id);
//   if (!product) {
//     return { title: "Product Not Found", description: "No product found" };
//   }
//   const title = product.name;
//   const desc = stripHtml(product.short_description || "");
//   const image = product.images[0]?.image.secure_url || "/fallback-image.jpg";
//   const url = `${SITE_URL}/products/${product._id}`;

//   return {
//     title: `${title} | Our Store`,
//     description: desc,
//     openGraph: {
//       title,
//       description: desc,
//       url,
//       images: [{ url: image, alt: title }],
//       type: "website",
//     },
//     twitter: {
//       card: "summary_large_image",
//       site: SITE_URL?.replace(/^https?:\/\//, "") || "",
//       title,
//       description: desc,
//       images: [image],
//     },
//   };
// }

// export default async function ProductPage({ params }: { params: { id: string } }) {
//   const product = await getProductById(params.id);
//   if (!product) return notFound();

//   return (
//     <div className='max-w-6xl mx-auto p-4'>
//       <ProductDetail product={product} />
//     </div>
//   );
// }

// app/products/[id]/page.tsx
import { publicApi } from "@/lib/api/publicApi";
import { makeStore } from "@/lib/store";
import { stripHtml } from "@/utils/stripHTML";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "./product-details";

export const dynamic = "force-dynamic";

async function getProductById(id: string) {
  const store = makeStore();
  const res = await store.dispatch(publicApi.endpoints.getProducts.initiate({ _id: id }));
  return res.data?.[0];
}

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const params = await props.params;
  const product = await getProductById(params.id);
  if (!product) {
    return { title: "Product Not Found", description: "No product found." };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const url = `${baseUrl}/products/${product._id}`;
  const title = product.name;
  const rawDescription = product.short_description || "Explore product details";
  const cleanedDescription = stripHtml(rawDescription);
  const image = product.images?.[0]?.image.secure_url || "/fallback-image.jpg";
  // const updatedTimeUnix = product.updatedAt ? Math.floor(new Date(product.updatedAt).getTime() / 1000) : undefined;

  return {
    title: `${title} | Our Store`, 
    description: cleanedDescription,
    openGraph: {
      title,
      description: cleanedDescription,
      images: [
        {
          url: image,
          alt: title,
        },
      ],
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: baseUrl?.replace(/^https?:\/\//, "") as string,
      title,
      description: cleanedDescription,
      images: [image],
    },
    // other: {
    //   ...(updatedTimeUnix && { "og:updated_time": updatedTimeUnix.toString() }),
    // },
  };
}

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const product = await getProductById(params.id);
  if (!product) return notFound();

  // const image = product.images?.[0]?.image.secure_url || "/fallback-image.jpg";
  // const price = product.variantsId?.[0]?.selling_price;
  // const inStock = product.total_stock > 0;

  return (
    <div className='max-w-6xl mx-auto '>
      <ProductDetail  />
    </div>
    // <article className='grid grid-cols-1 md:grid-cols-2 gap-8 p-4 max-w-6xl mx-auto'>
    //   <div className='relative aspect-square bg-gray-100 rounded-lg overflow-hidden'>
    //     <Image
    //       src={image}
    //       alt={product.name}
    //       className='object-cover'
    //       fill
    //       priority
    //       sizes='(min-width: 640px) 16rem, 100vw'
    //     />
    //   </div>

    //   <div className='space-y-6'>
    //     <h1 className='text-3xl font-bold'>{product.name}</h1>
    //     <div className='flex items-center gap-2'>
    //       <span className='text-2xl font-semibold text-primary'>${Number(price || 0).toFixed(2)}</span>
    //       <span
    //         className={`text-sm px-2 py-1 rounded ${
    //           inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
    //         }`}
    //       >
    //         {inStock ? "In Stock" : "Out of Stock"}
    //       </span>
    //     </div>

    //     {product.short_description && (
    //       <div
    //         className='prose max-w-none text-gray-600'
    //         dangerouslySetInnerHTML={{ __html: product.short_description }}
    //       />
    //     )}

    //     <AddToCartBtn item={product} />

    //     {product.long_description && (
    //       <section className='pt-4 border-t'>
    //         <h2 className='text-xl font-semibold mb-3'>Product Details</h2>
    //         <div
    //           className='prose max-w-none text-gray-600'
    //           dangerouslySetInnerHTML={{ __html: product.long_description }}
    //         />
    //       </section>
    //     )}
    //   </div>
    // </article>
  );
}
