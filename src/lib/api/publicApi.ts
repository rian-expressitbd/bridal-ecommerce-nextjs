// src/store/api/publicApi.ts
import { ApiResponse } from "@/types/apiResponse";
import { Business, Category } from "@/types/business";
import { OnlineOrderPayload, OnlineOrderResponse } from "@/types/onlineOrder";
import type { Product } from "@/types/product";
import type { Action, PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

// Constants
const OWNER_ID = process.env.NEXT_PUBLIC_OWNER_ID;
const BUSINESS_ID = process.env.NEXT_PUBLIC_BUSINESS_ID;
const PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
console.log("OWNER_ID", OWNER_ID); // prints owner id
console.log("BUSINESS_ID", BUSINESS_ID); // prints business id

if (!OWNER_ID || !BUSINESS_ID || !PUBLIC_API_BASE_URL) {
  throw new Error("Missing ENV variables: Please check .env.local");
}

// Type Guard for HYDRATE
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isHydrateAction(action: Action): action is PayloadAction<any> {
  return action.type === HYDRATE;
}

// API Definition
export const publicApi = createApi({
  reducerPath: "publicApi",
  baseQuery: fetchBaseQuery({ baseUrl: `https://backend.calquick.app/v2/api` }),
  tagTypes: ["Product", "Products", "Category"],
  extractRehydrationInfo(action, { reducerPath }) {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getBusiness: builder.query<Business, void>({
      query: () => `/public/${OWNER_ID}/${BUSINESS_ID}`,
      transformResponse: (res: ApiResponse<Business[]>) => res.data[0],
    }),

    getProducts: builder.query<
      Product[],
      Partial<{
        search?: string;
        page?: number;
        limit?: number;
        _id?: string;
        sort?: string;
        fields?: string;
        hasVariants?: boolean;
        created_by?: string;
        category?: string;
        business?: string;
        variantsId?: string;
        brand?: string;
        total_sold?: number;
      }>
    >({
      query: (params = {}) => ({
        url: `/public/${OWNER_ID}/${BUSINESS_ID}/products`,
        params,
      }),
      transformResponse: (res: ApiResponse<Product[]>) => res.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Product" as const,
                id: _id,
              })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),

    getProduct: builder.query<Product, string>({
      query: (productId) =>
        `/public/${OWNER_ID}/${BUSINESS_ID}/products?_id=${productId}`,
      transformResponse: (res: ApiResponse<Product>) => res.data,
      providesTags: (result) =>
        result
          ? [{ type: "Product", id: result._id }]
          : [{ type: "Products", id: "LIST" }],
    }),

    createOnlineOrder: builder.mutation<
      OnlineOrderResponse,
      OnlineOrderPayload
    >({
      query: (orderData) => ({
        url: `/public/${OWNER_ID}/${BUSINESS_ID}/online-order`,
        method: "POST",
        body: orderData,
      }),
    }),

    getCategories: builder.query<Category[], void>({
      query: () => `/public/${OWNER_ID}/${BUSINESS_ID}`,
      transformResponse: (res: ApiResponse<Business[]>) =>
        res.data[0].categories,
      providesTags: (result) =>
        result
          ? result.map((category) => ({
              type: "Category" as const,
              id: category._id,
            }))
          : [],
    }),

    getProductsByCategories: builder.query<
      Product[],
      { categoryId: string; page?: number; limit?: number }
    >({
      query: (categoryId) => ({
        url: `/public/${OWNER_ID}/${BUSINESS_ID}/products?category_group=${categoryId}`,
      }),
      transformResponse: (res: ApiResponse<Product[]>) => res.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Product" as const,
                id: _id,
              })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
  }),
});

// Export hooks
export const {
  useGetBusinessQuery,
  useGetProductsQuery,
  useGetProductQuery,
  useCreateOnlineOrderMutation,
  useGetCategoriesQuery,
  useGetProductsByCategoriesQuery,
} = publicApi;
