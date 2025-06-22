// src/features/api/productsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const businessesApi = createApi({
  reducerPath: "buisinessesApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_APP_URL}` }),
  endpoints: (builder) => ({
    getBusinesses: builder.query({
      query: () => "/",
    }),
  }),
});

export const { useGetBusinessesQuery } = businessesApi;
