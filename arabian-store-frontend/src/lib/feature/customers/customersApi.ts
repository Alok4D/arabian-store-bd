import { baseApi } from '@/lib/api/baseApi';

export const customersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: () => '/customers',
      providesTags: ['Customers'],
    }),
    deleteCustomer: builder.mutation({
      query: (phone) => ({
        url: `/customers/${phone}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Customers'],
    }),
  }),
});

export const { useGetCustomersQuery, useDeleteCustomerMutation } = customersApi;
