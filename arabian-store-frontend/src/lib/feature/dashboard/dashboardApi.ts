import { baseApi } from '@/lib/api/baseApi';

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOverview: builder.query({
      query: () => '/dashboard/overview',
      providesTags: ['Dashboard'],
    }),
  }),
});

export const { useGetOverviewQuery } = dashboardApi;
