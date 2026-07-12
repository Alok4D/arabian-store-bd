import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '@/lib/redux/store';
import Cookies from 'js-cookie';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    prepareHeaders: (headers, { getState }) => {
      // Use token from Redux state or fallback to cookie
      const state = getState() as RootState;
      const token = state.auth?.user?.token || Cookies.get('admin_token');
      
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Dashboard', 'Products', 'Orders', 'Customers', 'Shipping', 'Profile'],
  endpoints: () => ({}),
});
