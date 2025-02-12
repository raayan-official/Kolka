import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../../utils/baseURL";

const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/products`,
    credentials: "include",
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    fetchAllProducts: builder.query({
      query: ({
        category,
        color,
        minPrice,
        maxPrice,
        page = 1,
        limit = 10,
      } = {}) => {
        const queryParams = new URLSearchParams();
        if (category) queryParams.append("category", category);
        if (color) queryParams.append("color", color);
        if (minPrice !== undefined)
          queryParams.append("minPrice", minPrice.toString());
        if (maxPrice !== undefined)
          queryParams.append("maxPrice", maxPrice.toString());
        queryParams.append("page", page.toString());
        queryParams.append("limit", limit.toString());

        const queryParamsStr = queryParams.toString();
        return queryParamsStr ? `/?${queryParamsStr}` : "/";
      },
      providesTags: ["Products"],
    }),

    fetchProductById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) =>
        result ? [{ type: "Products", id }] : [],
    }),

    AddProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/create-product",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: (result, error, newProduct) =>
        result ? [{ type: "Products", id: result.id }] : ["Products"],
    }),

    fetchReletedProducts: builder.query({
      query: (id) => `/related/${id}`,
    }),

    updateProduct: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/update-product/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: (result, error, { id }) =>
        result ? [{ type: "Products", id }] : ["Products"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) =>
        result ? [{ type: "Products", id }] : ["Products"],
    }),


  }),
});

export const {useFetchAllProductsQuery, useFetchProductByIdQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation, useFetchReletedProductsQuery} = productsApi;


export default productsApi;
