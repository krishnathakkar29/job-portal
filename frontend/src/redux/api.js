import { server } from "@/lib/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/` }),
  tagTypes: ["Job"],
  endpoints: (builder) => ({
    fetchAllJobs: builder.query({
      query: () => ({
        url: "job/get",
        credentials: "include",
      }),
      providesTags: ["Job"],
    }),

    fetchSingleJobs: builder.query({
      query: (id) => ({
        url: `job/get/${id}`,
        credentials: "include",
      }),
      //  keepUnusedDataFor: 0
      providesTags: ["Job"],
    }),

    applyJob: builder.mutation({
      query: (id) => ({
        url: `application/apply/${id}`,
        credentials: "include",
        method: "POST",
      }),
      invalidatesTags: ["Job"],
    }),
  }),
});

export default api;

export const {
  useFetchAllJobsQuery,
  useFetchSingleJobsQuery,
  useApplyJobMutation,
} = api;
