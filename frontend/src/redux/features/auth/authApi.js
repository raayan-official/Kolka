import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseURL } from '../../../utils/baseURL';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/auth`, // baseUrl without trailing slash
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: 'register', // relative URL without leading slash
        method: 'POST',
        body: newUser,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: 'login', // relative URL without leading slash
        method: 'POST',
        body: credentials,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: 'logout', // relative URL without leading slash
        method: 'POST'
      }),
    }),
    getUser: builder.mutation({
      query: () => ({
        url: 'users', // relative URL without leading slash
        method: 'GET'
      }),
      refetchOnMount: true,
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `users/${userId}`, // relative URL without leading slash
        method: 'DELETE'
      }),
      invalidatesTags: ["User"],
    }),
    updateUserRole: builder.mutation({
      query: ({userId, role}) => ({
        url: `users/${userId}`, // relative URL without leading slash
        method: 'PUT',
        body: { role },
      }),
      refetchOnMount: true,
      invalidatesTags: ["User"],
    }),
    editProfile: builder.mutation({
      query: ({ userId, profileData }) => ({
        url: `edit-profile/${userId}`, // userId as part of the URL
        method: 'PATCH',
        body: profileData, // Send profile data in the body
      }),
    }),
  }),
});

export const { 
  useRegisterUserMutation, 
  useLoginUserMutation, 
  useLogoutUserMutation, 
  useGetUserMutation, 
  useDeleteUserMutation, 
  useUpdateUserRoleMutation, 
  useEditProfileMutation 
} = authApi;

export default authApi;
