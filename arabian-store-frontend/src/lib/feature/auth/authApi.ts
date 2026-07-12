import { baseApi } from '@/lib/api/baseApi';

export const authApi = baseApi.injectEndpoints({

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    getProfile: builder.query({
      query: () => '/auth/profile',
      providesTags: ['Profile'],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: '/auth/profile',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),
    
    updatePassword: builder.mutation({
      query: (data) => ({
        url: '/auth/password',
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
} = authApi;
