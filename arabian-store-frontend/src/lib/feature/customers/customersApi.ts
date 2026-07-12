import { baseApi } from '@/lib/api/baseApi';

export const customersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: () => '/customers',
      providesTags: ['Customers'],
    }),
  }),
});

export const { useGetCustomersQuery } = customersApi;
