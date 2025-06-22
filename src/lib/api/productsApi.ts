// src/features/api/productsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () =>
        "/public/6829ddabc20c6404b3e2a66b/6829ded2c20c6404b3e2a680/products",
    }),
    getProductsByCategories: builder.query({
      query: (categoryId: string) =>
        `/public/6829ddabc20c6404b3e2a66b/6829ded2c20c6404b3e2a680/products?category_group=${categoryId}`,
    }),
    getProductById: builder.query({
      query: (productId: string) =>
        `/public/6829ddabc20c6404b3e2a66b/6829ded2c20c6404b3e2a680/products?_id=${productId}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsByCategoriesQuery,
  useGetProductByIdQuery,
} = productsApi;
