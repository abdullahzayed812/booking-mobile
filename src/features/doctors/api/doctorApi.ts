import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../../services/baseQuery';
import { ENDPOINTS } from '../../../config/api';
import {
  Doctor,
  WeeklySchedule,
  AvailabilityOverride,
  CreateDoctorProfileRequest,
  UpdateDoctorProfileRequest,
  DoctorStats,
  DoctorListQuery,
} from '../../../types/doctors';

export const doctorApi = createApi({
  reducerPath: 'doctorApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'Doctor',
    'DoctorStats',
    'Availability',
    'AvailabilityOverride',
    'Specialization',
  ],
  endpoints: builder => ({
    listDoctors: builder.query<
      { doctors: Doctor[]; total: number; page: number; limit: number },
      DoctorListQuery
    >({
      query: (params = {}) => ({
        url: ENDPOINTS.DOCTORS,
        params,
      }),
      providesTags: ['Doctor'],
    }),

    createDoctor: builder.mutation<Doctor, CreateDoctorProfileRequest>({
      query: body => ({
        url: `${ENDPOINTS.DOCTORS}/profile`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Doctor', 'DoctorStats', 'Specialization'],
    }),

    getDoctorProfile: builder.query<Doctor, string>({
      query: id => `${ENDPOINTS.DOCTORS}/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Doctor', id }],
    }),

    updateDoctorProfile: builder.mutation<
      Doctor,
      { id: string; data: UpdateDoctorProfileRequest }
    >({
      query: ({ id, data }) => ({
        url: `${ENDPOINTS.DOCTORS}/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Doctor', id }],
    }),

    toggleAcceptingAppointments: builder.mutation<Doctor, string>({
      query: id => ({
        url: `${ENDPOINTS.DOCTORS}/${id}/toggle-accepting`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Doctor', id },
        'Availability',
      ],
    }),

    getAvailability: builder.query<WeeklySchedule, string>({
      query: id => `${ENDPOINTS.DOCTORS}/${id}/availability`,
      providesTags: (_result, _error, id) => [{ type: 'Availability', id }],
    }),

    setWeeklySchedule: builder.mutation<
      WeeklySchedule,
      { id: string; schedule: WeeklySchedule }
    >({
      query: ({ id, schedule }) => ({
        url: `${ENDPOINTS.DOCTORS}/${id}/availability`,
        method: 'PUT',
        body: schedule,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Availability', id },
        'AvailableSlots',
      ],
    }),

    getAvailabilityOverrides: builder.query<
      AvailabilityOverride[],
      { id: string; startDate?: string; endDate?: string }
    >({
      query: ({ id, startDate, endDate }) => ({
        url: `${ENDPOINTS.DOCTORS}/${id}/availability/overrides`,
        params: { startDate, endDate },
      }),
      providesTags: (_result, _error, { id }) => [
        { type: 'AvailabilityOverride', id },
      ],
    }),

    createOverride: builder.mutation<
      AvailabilityOverride,
      {
        id: string;
        override: Omit<AvailabilityOverride, 'id' | 'doctorId' | 'createdAt'>;
      }
    >({
      query: ({ id, override }) => ({
        url: `${ENDPOINTS.DOCTORS}/${id}/availability/overrides`,
        method: 'POST',
        body: override,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'AvailabilityOverride', id },
        { type: 'Availability', id },
        'AvailableSlots',
      ],
    }),

    deleteOverride: builder.mutation<void, { id: string; overrideId: string }>({
      query: ({ id, overrideId }) => ({
        url: `${ENDPOINTS.DOCTORS}/${id}/availability/overrides/${overrideId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'AvailabilityOverride', id },
        { type: 'Availability', id },
        'AvailableSlots',
      ],
    }),

    getSpecializations: builder.query<string[], void>({
      query: () => `${ENDPOINTS.DOCTORS}/specializations`,
      providesTags: ['Specialization'],
    }),

    getBySpecialization: builder.query<Doctor[], string>({
      query: specialization =>
        `${ENDPOINTS.DOCTORS}/by-specialization/${specialization}`,
      providesTags: (_result, _error, specialization) => [
        { type: 'Doctor', id: specialization },
      ],
    }),

    doctorStats: builder.query<DoctorStats, void>({
      query: () => `${ENDPOINTS.DOCTORS}/stats`,
      providesTags: ['DoctorStats'],
    }),

    healthCheck: builder.query<{ status: string }, void>({
      query: () => `${ENDPOINTS.DOCTORS}/health`,
    }),
  }),
});

export const {
  useListDoctorsQuery,
  useCreateDoctorMutation,
  useGetDoctorProfileQuery,
  useUpdateDoctorProfileMutation,
  useToggleAcceptingAppointmentsMutation,
  useGetAvailabilityQuery,
  useSetWeeklyScheduleMutation,
  useGetAvailabilityOverridesQuery,
  useCreateOverrideMutation,
  useDeleteOverrideMutation,
  useGetSpecializationsQuery,
  useGetBySpecializationQuery,
  useDoctorStatsQuery,
  useHealthCheckQuery: useDoctorHealthCheckQuery,
} = doctorApi;
