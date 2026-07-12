import { baseApi } from '@/lib/api/baseApi';

export const shippingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getShipping: builder.query({
      query: () => '/shipping',
      providesTags: ['Shipping'],
    }),
    updateShipping: builder.mutation({
      query: (data) => ({
        url: '/shipping',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Shipping'],
    }),
  }),
});

export const { useGetShippingQuery, useUpdateShippingMutation } = shippingApi;
