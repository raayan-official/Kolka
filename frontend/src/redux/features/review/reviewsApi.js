import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseURL } from '../../../utils/baseURL';

const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/reviews`,
    credentials: "include", // Include credentials (cookies) if needed
  }),
  tagTypes: ['Reviews'],
  endpoints: (builder) => ({
    // Mutation to post a new review
    postReview: builder.mutation({
      query: (reviewData) => ({
        url: '/post-review',
        method: 'POST',
        body: reviewData,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: 'Reviews', id: productId },
      ],
    }),

    // Query to get reviews by userId
    getReviewsByUserId: builder.query({
      query: (userId) => ({
        url: `/${userId}`, // Fetch reviews by userId
      }),
      providesTags: (result) =>
        result && result.length > 0
          ? [{ type: 'Reviews', id: `user-${result[0].userId}` }]
          : [], // Use userId as the tag
    }),

    // Query to fetch the total number of reviews
    getReviewsCount: builder.query({
      query: () => ({
        url: '/total-reviews',
      }),
      providesTags: ['Reviews'], // Ensures the cache is updated when reviews are posted
    }),
  }),
});

export const { usePostReviewMutation, useGetReviewsByUserIdQuery, useGetReviewsCountQuery } = reviewApi;

export default reviewApi;
