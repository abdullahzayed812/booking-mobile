import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../../services/baseQuery';
import { ENDPOINTS } from '../../../config/api';
import {
  Appointment,
  CreateAppointmentRequest,
  UpdateAppointmentRequest,
  AppointmentStats,
  AvailableSlot,
  AppointmentListQuery,
} from '../../../types/appointments';

export const appointmentApi = createApi({
  reducerPath: 'appointmentApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Appointment', 'AppointmentStats', 'AvailableSlots'],
  endpoints: builder => ({
    listAppointments: builder.query<
      {
        appointments: Appointment[];
        total: number;
        page: number;
        limit: number;
      },
      AppointmentListQuery
    >({
      query: (params = {}) => ({
        url: ENDPOINTS.APPOINTMENTS,
        params,
      }),
      providesTags: ['Appointment'],
    }),

    createAppointment: builder.mutation<Appointment, CreateAppointmentRequest>({
      query: body => ({
        url: ENDPOINTS.APPOINTMENTS,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Appointment', 'AppointmentStats', 'AvailableSlots'],
    }),

    getAppointment: builder.query<Appointment, string>({
      query: id => `${ENDPOINTS.APPOINTMENTS}/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Appointment', id }],
    }),

    updateAppointment: builder.mutation<
      Appointment,
      { id: string; data: UpdateAppointmentRequest }
    >({
      query: ({ id, data }) => ({
        url: `${ENDPOINTS.APPOINTMENTS}/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Appointment', id },
        'AppointmentStats',
        'AvailableSlots',
      ],
    }),

    cancelAppointment: builder.mutation<Appointment, string>({
      query: id => ({
        url: `${ENDPOINTS.APPOINTMENTS}/${id}/cancel`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Appointment', id },
        'AppointmentStats',
        'AvailableSlots',
      ],
    }),

    confirmAppointment: builder.mutation<Appointment, string>({
      query: id => ({
        url: `${ENDPOINTS.APPOINTMENTS}/${id}/confirm`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Appointment', id },
        'AppointmentStats',
      ],
    }),

    startAppointment: builder.mutation<Appointment, string>({
      query: id => ({
        url: `${ENDPOINTS.APPOINTMENTS}/${id}/start`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Appointment', id },
        'AppointmentStats',
      ],
    }),

    completeAppointment: builder.mutation<Appointment, string>({
      query: id => ({
        url: `${ENDPOINTS.APPOINTMENTS}/${id}/complete`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Appointment', id },
        'AppointmentStats',
      ],
    }),

    markNoShow: builder.mutation<Appointment, string>({
      query: id => ({
        url: `${ENDPOINTS.APPOINTMENTS}/${id}/no-show`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Appointment', id },
        'AppointmentStats',
      ],
    }),

    upcomingAppointments: builder.query<Appointment[], { limit?: number }>({
      query: (params = {}) => ({
        url: `${ENDPOINTS.APPOINTMENTS}/upcoming`,
        params,
      }),
      providesTags: ['Appointment'],
    }),

    appointmentStats: builder.query<AppointmentStats, void>({
      query: () => `${ENDPOINTS.APPOINTMENTS}/stats`,
      providesTags: ['AppointmentStats'],
    }),

    getAvailableSlots: builder.query<
      AvailableSlot[],
      { doctorId: string; date: string; duration?: number }
    >({
      query: ({ doctorId, date, duration }) => ({
        url: `${ENDPOINTS.APPOINTMENTS}/doctors/${doctorId}/available-slots`,
        params: { date, duration },
      }),
      providesTags: ['AvailableSlots'],
    }),

    getNextAvailableSlot: builder.query<
      AvailableSlot | null,
      { doctorId: string; duration?: number }
    >({
      query: ({ doctorId, duration }) => ({
        url: `${ENDPOINTS.APPOINTMENTS}/doctors/${doctorId}/next-available`,
        params: { duration },
      }),
      providesTags: ['AvailableSlots'],
    }),

    healthCheck: builder.query<{ status: string }, void>({
      query: () => `${ENDPOINTS.APPOINTMENTS}/health`,
    }),
  }),
});

export const {
  useListAppointmentsQuery,
  useCreateAppointmentMutation,
  useGetAppointmentQuery,
  useUpdateAppointmentMutation,
  useCancelAppointmentMutation,
  useConfirmAppointmentMutation,
  useStartAppointmentMutation,
  useCompleteAppointmentMutation,
  useMarkNoShowMutation,
  useUpcomingAppointmentsQuery,
  useAppointmentStatsQuery,
  useGetAvailableSlotsQuery,
  useGetNextAvailableSlotQuery,
  useHealthCheckQuery,
} = appointmentApi;
