// "use client";

// import { useMemo, useState, useEffect, memo } from "react";
// import { useBusiness } from "@/hooks/useBusiness";
// import { Category } from "@/types/business";
// import { useGetProductsByCategoriesQuery } from "@/lib/api/publicApi";
// import CommonLayout from "@/app/layouts/CommonLayout";
// import Title from "../../ui/Title";
// import CategoryProductCard from "../../ui/CategoryProductCard";
// import Banner from "../Banner";
// import Link from "next/link";
// import { Product as ApiProduct } from "@/types/product";
// import { Product as CartProduct } from "@/types/cart";

// // Memoized CategorySection to prevent unnecessary re-renders
// const CategorySection = memo(
//   ({
//     categoryId,
//     categoryName,
//     category,
//   }: {
//     categoryId: string;
//     categoryName: string;
//     category: Category;
//   }) => {
//     const [page, setPage] = useState(1);
//     const [allProducts, setAllProducts] = useState<ApiProduct[]>([]);
//     const limit = 10;
//     const [hasMore, setHasMore] = useState(true);

//     // Log mount to track renders
//     useEffect(() => {
//       console.log(`CategorySection mounted for ${categoryName} (${categoryId})`);
//       return () => {
//         console.log(`CategorySection unmounted for ${categoryName} (${categoryId})`);
//       };
//     }, [categoryId, categoryName]);

//     const {
//       data: products,
//       isLoading,
//       error,
//       isFetching,
//     } = useGetProductsByCategoriesQuery(
//       { categoryId, page, limit },
//       { skip: !categoryId }
//     );

//     // Append new products
//     useEffect(() => {
//       if (products && products.length > 0) {
//         setAllProducts((prev) => {
//           const newProducts = products.filter(
//             (p: ApiProduct) => !prev.some((existing) => existing._id === p._id)
//           );
//           return [...prev, ...newProducts];
//         });
//         if (products.length < limit) {
//           setHasMore(false);
//         }
//       } else if (products && products.length === 0) {
//         setHasMore(false);
//       }
//       console.log(`Products for ${categoryName}:`, products, `Page: ${page}`);
//     }, [products, limit, categoryName, page]);

//     // Transform products
//     const transformedProducts: CartProduct[] = allProducts.map((product) => ({
//       ...product,
//       images: product.images.map((img) => ({
//         image: { optimizeUrl: img.image.secure_url },
//       })),
//     }));

//     const handleLoadMore = () => {
//       console.log("Load More clicked", { isFetching, hasMore, page, categoryId });
//       if (!isFetching && hasMore) {
//         setPage((prev) => prev + 1);
//       }
//     };

//     if (isLoading && page === 1) {
//       return (
//         <div className="p-4">
//           <CommonLayout>
//             <div className="flex justify-center items-center h-32">
//               <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-blue-600"></div>
//             </div>
//           </CommonLayout>
//         </div>
//       );
//     }

//     if (error || (!products && !isLoading)) {
//       console.log(`Error for ${categoryName}:`, error);
//       return null;
//     }

//     if (allProducts.length === 0 && !isLoading && !hasMore) {
//       return null;
//     }

//     return (
//       <div className="space-y-4">
//         <CommonLayout>
//           {category.name.length > 0 && <Title title={categoryName} />}
//           <div className="grid grid-cols-2 mdl:grid-cols-3 lgx:grid-cols-4 gap-2 justify-center p-2">
//             {transformedProducts.map((product) => (
//               <Link key={product._id} href={`/products/${product._id}`}>
//                 <CategoryProductCard product={product} />
//               </Link>
//             ))}
//           </div>
//           {hasMore && (
//             <div className="mt-8 flex justify-center">
//               <button
//                 onClick={handleLoadMore}
//                 disabled={isFetching}
//                 className={`px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 ${
//                   isFetching ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//               >
//                 {isFetching ? "Loading..." : "Load More"}
//               </button>
//             </div>
//           )}
//         </CommonLayout>
//         <Banner />
//       </div>
//     );
//   },
//   (prevProps, nextProps) =>
//     prevProps.categoryId === nextProps.categoryId &&
//     prevProps.categoryName === nextProps.categoryName &&
//     prevProps.category === nextProps.category
// );

// CategorySection.displayName = "CategorySection";

// export default function CategoryProducts() {
//   const { businessData, isLoading } = useBusiness();

//   // Flatten categories with duplicate prevention
//   const allCategories = useMemo(() => {
//     const flat: Category[] = [];
//     const seenIds = new Set<string>();
//     const flatten = (cats: Category[]) => {
//       cats.forEach((cat) => {
//         if (!seenIds.has(cat._id)) {
//           flat.push(cat);
//           seenIds.add(cat._id);
//           if (cat.children?.length) flatten(cat.children);
//         }
//       });
//     };
//     if (businessData?.categories?.length) {
//       flatten(businessData.categories);
//     }
//     console.log("All Categories:", flat);
//     return flat;
//   }, [businessData]);

//   if (isLoading) {
//     return (
//       <div className="p-4">
//         <CommonLayout>
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
//           </div>
//         </CommonLayout>
//       </div>
//     );
//   }

//   if (!allCategories.length) {
//     return (
//       <div className="p-4">
//         <CommonLayout>
//           <div className="text-gray-600 text-center">No categories found</div>
//         </CommonLayout>
//       </div>
//     );
//   }

//   return (
//     <div className="mt-8 space-y-4">
//       {allCategories.map((category) => (
//         <CategorySection
//           key={category._id}
//           categoryId={category._id}
//           categoryName={category.name}
//           category={category}
//         />
//       ))}
//     </div>
//   );
// }