import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL, LOCAL_API_URL } from "../../constants/Environments";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: LOCAL_API_URL || API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { email, password },
      }),
    }),
    signup: builder.mutation({
      query: ({ email, password }) => ({
        url: "/auth/signup",
        method: "POST",
        body: { email, password },
      }),
    }),
    forgotPassword: builder.mutation({
      query: ({ email }) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: `/auth/reset-password/${token}`,
        method: "POST",
        body: { password },
      }),
    }),
    changePassword: builder.mutation({
      query: ({ password }) => ({
        url: "/auth/change-password",
        method: "POST",
        body: { password },
      }),
    }),
    deleteAllUsers: builder.mutation({
      query: () => ({
        url: "/auth/delete-all",
        method: "DELETE",
      }),
    }),
    createEvent: builder.mutation({
      query: (eventData) => ({
        url: "/events",
        method: "POST",
        body: eventData,
      }),
    }),
    getAllEvents: builder.query({
      query: ({ page, limit }) => ({
        url: `/events?page=${page}&limit=${limit}`,
        method: "GET",
        params: { page, limit },
      }),
    }),
    updateEvent: builder.mutation({
      query: ({ eventId, eventData }) => ({
        url: `/events/${eventId}`,
        method: "PUT",
        body: eventData,
      }),
    }),
    getEventById: builder.query({
      query: (eventId) => `/events/${eventId}`,
    }),
    getEventsByUserId: builder.query({
      query: () => "/events/users",
    }),
    getEventsNearMe: builder.query({
      query: ({ lon, lat, distanceInKm }) => ({
        url: `/events/nearby?lon=${lon}&lat=${lat}&distanceInKm=${distanceInKm}`,
        params: { lon, lat, distanceInKm },
      }),
    }),
    searchEvents: builder.query({
      query: ({ searchKey, searchValue }) => ({
        url: `/events/search?${searchKey}=${searchValue}`,
        params: { [searchKey]: searchValue },
      }),
    }),
    searchByCategory: builder.query({
      query: (category) => ({
        url:`/events/search/category?category=${category}`,
        params: { category },
      }),
    }),
    searchByTitle: builder.query({
      query: (title) => ({
        url: `/events/search/title?title=${title}`,
        params: { title },
      }),
    }),
    searchByDate: builder.query({
      query: (date) => ({
        url: `/events/search/date?date=${date}`,
        params: { date },
      }),
    }),
    createBooking: builder.mutation({
      query: ({ eventId, numTickets }) => ({
        url: "/bookings",
        method: "POST",
        body: { eventId, numTickets },
      }),
    }),
    getBookingById: builder.query({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "GET",
      }),
    }),
    deleteBookingById: builder.mutation({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "DELETE",
      }),
    }),
    cancelBooking: builder.mutation({
      query: (id) => ({
        url: `/bookings/${id}/cancel`,
        method: "PUT",
      }),
    }),
    getAllBookings: builder.query({
      query: ({ page, limit }) => ({
        url: "/bookings",
        method: "GET",
        params: { page, limit },
      }),
    }),
    getAllUsers: builder.query({
      query: ({ page, limit }) => ({
        url: "/users",
        method: "GET",
        params: { page, limit },
      }),
    }),
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, userData }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: userData,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
    }),
    createTicket: builder.mutation({
      query: (ticketData) => ({
        url: "/tickets",
        method: "POST",
        body: ticketData,
      }),
    }),
    getTicketById: builder.query({
      query: (id) => ({
        url: `/tickets/${id}`,
        method: "GET",
      }),
    }),
    deleteTicketById: builder.mutation({
      query: (id) => ({
        url: `/tickets/${id}`,
        method: "DELETE",
      }),
    }),
    checkTicketValidity: builder.mutation({
      query: (id) => ({
        url: `/tickets/check-validity/${id}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useDeleteAllUsersMutation,
  useCreateEventMutation,
  useGetAllEventsQuery,
  useUpdateEventMutation,
  useGetEventByIdQuery,
  useGetEventsByUserIdQuery,
  useGetEventsNearMeQuery,
  useSearchEventsQuery,
  useSearchByCategoryQuery,
  useSearchByTitleQuery,
  useSearchByDateQuery,
  useCreateBookingMutation,
  useGetBookingByIdQuery,
  useDeleteBookingByIdMutation,
  useCancelBookingMutation,
  useGetAllBookingsQuery,
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useCreateTicketMutation,
  useGetTicketByIdQuery,
  useDeleteTicketByIdMutation,
  useCheckTicketValidityMutation,
} = apiSlice;
