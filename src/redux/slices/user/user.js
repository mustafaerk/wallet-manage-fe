import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "utils/axiosBaseQuery";

// Define a service using a base URL and expected endpoints


export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ['transaction', 'category'],
  endpoints: (builder) => ({
    createTransaction: builder.mutation({
      query: ({ data }) => ({
        data,
        method: "POST",
        path: "createNewTransaction",
      }),
      invalidatesTags: ['transaction'],
    }),
    updateTransaction: builder.mutation({
      query: ({ data }) => ({
        data,
        method: "POST",
        path: "updateTransaction",
      }),
      invalidatesTags: ['transaction'],
    }),
    deleteTransaction: builder.mutation({
      query: ({ data }) => ({
        data,
        method: "DELETE",
        path: "deleteTransaction",
      }),
      invalidatesTags: ['transaction'],
    }),
    getAllTransaction: builder.query({
      query: () => ({
        method: "GET",
        path: "getAllTransaction",
      }),
      providesTags: ['transaction'],
    }),
    getAllIncomes: builder.query({
      query: () => ({
        method: "GET",
        path: "getAllIncomes",
      }),
      providesTags: ['transaction'],
    }),
    getAllOutgoing: builder.query({
      query: () => ({
        method: "GET",
        path: "getAllOutgoing",
      }),
      providesTags: ['transaction'],
    }),
    createCategory: builder.mutation({
      query: ({ data }) => ({
        data,
        method: "POST",
        path: "createCategory",
      }),
      invalidatesTags: ['category'],
    }),
    updateCategory: builder.mutation({
      query: ({ data }) => ({
        data,
        method: "POST",
        path: "updateCategory",
      }),
      invalidatesTags: ['category'],
    }),
    deleteCategory: builder.mutation({
      query: ({ data }) => ({
        data,
        method: "DELETE",
        path: "deleteCategory",
      }),
      invalidatesTags: ['category'],
    }),
    getAllCategories: builder.query({
      query: () => ({
        method: "GET",
        path: "getCategories",
      }),
      providesTags: ['category'],
    }),
  }),
});


// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const userApiReducerName = userApi.reducerPath;
export const userApiReducer = userApi.reducer;
export const userApiMiddleware = userApi.middleware;

export const {
  useCreateCategoryMutation,
  useCreateTransactionMutation,
  useGetAllIncomesQuery,
  useGetAllOutgoingQuery,
  useGetAllCategoriesQuery,
  useDeleteTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useGetAllTransactionQuery
} = userApi;
