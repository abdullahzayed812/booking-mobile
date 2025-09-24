import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../../services/baseQuery';
import { ENDPOINTS } from '../../../config/api';
import {
  Patient,
  CreatePatientProfileRequest,
  UpdatePatientProfileRequest,
  PatientStats,
  PatientListQuery,
} from '../../../types/patients';

export const patientApi = createApi({
  reducerPath: 'patientApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Patient', 'PatientStats'],
  endpoints: builder => ({
    listPatients: builder.query<
      { patients: Patient[]; total: number; page: number; limit: number },
      PatientListQuery
    >({
      query: (params = {}) => ({
        url: ENDPOINTS.PATIENTS,
        params,
      }),
      providesTags: ['Patient'],
    }),

    createProfile: builder.mutation<Patient, CreatePatientProfileRequest>({
      query: body => ({
        url: `${ENDPOINTS.PATIENTS}/profile`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Patient', 'PatientStats'],
    }),

    getProfile: builder.query<Patient, string>({
      query: id => `${ENDPOINTS.PATIENTS}/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Patient', id }],
    }),

    updateProfile: builder.mutation<
      Patient,
      { id: string; data: UpdatePatientProfileRequest }
    >({
      query: ({ id, data }) => ({
        url: `${ENDPOINTS.PATIENTS}/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Patient', id }],
    }),

    updateEmergencyContact: builder.mutation<
      Patient,
      {
        id: string;
        emergencyContact: { name: string; phone: string; relationship: string };
      }
    >({
      query: ({ id, emergencyContact }) => ({
        url: `${ENDPOINTS.PATIENTS}/${id}/emergency-contact`,
        method: 'PUT',
        body: emergencyContact,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Patient', id }],
    }),

    updateAllergies: builder.mutation<
      Patient,
      { id: string; allergies: string[] }
    >({
      query: ({ id, allergies }) => ({
        url: `${ENDPOINTS.PATIENTS}/${id}/allergies`,
        method: 'PUT',
        body: { allergies },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Patient', id }],
    }),

    updateMedicalHistory: builder.mutation<
      Patient,
      { id: string; medicalHistory: string[] }
    >({
      query: ({ id, medicalHistory }) => ({
        url: `${ENDPOINTS.PATIENTS}/${id}/medical-history`,
        method: 'PUT',
        body: { medicalHistory },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Patient', id }],
    }),

    searchPatients: builder.query<Patient[], { q: string; limit?: number }>({
      query: ({ q, limit = 10 }) => ({
        url: `${ENDPOINTS.PATIENTS}/search`,
        params: { q, limit },
      }),
    }),

    getByMRN: builder.query<Patient, string>({
      query: medicalRecordNumber =>
        `${ENDPOINTS.PATIENTS}/by-mrn/${medicalRecordNumber}`,
      providesTags: (_result, _error, mrn) => [{ type: 'Patient', id: mrn }],
    }),

    patientStats: builder.query<PatientStats, void>({
      query: () => `${ENDPOINTS.PATIENTS}/stats`,
      providesTags: ['PatientStats'],
    }),

    healthCheck: builder.query<{ status: string }, void>({
      query: () => `${ENDPOINTS.PATIENTS}/health`,
    }),
  }),
});

export const {
  useListPatientsQuery,
  useCreateProfileMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdateEmergencyContactMutation,
  useUpdateAllergiesMutation,
  useUpdateMedicalHistoryMutation,
  useSearchPatientsQuery,
  useGetByMRNQuery,
  usePatientStatsQuery,
  useHealthCheckQuery: usePatientHealthCheckQuery,
} = patientApi;
