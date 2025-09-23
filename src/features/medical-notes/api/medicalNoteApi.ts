import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../../services/baseQuery';
import { ENDPOINTS } from '../../../config/api';
import {
  MedicalNote,
  CreateMedicalNoteRequest,
  UpdateMedicalNoteRequest,
  MedicalNoteStats,
  MedicalNoteListQuery,
} from '../../../types/medical-notes';

export const medicalNoteApi = createApi({
  reducerPath: 'medicalNoteApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['MedicalNote', 'MedicalNoteStats'],
  endpoints: builder => ({
    listMedicalNotes: builder.query<
      { notes: MedicalNote[]; total: number; page: number; limit: number },
      MedicalNoteListQuery
    >({
      query: (params = {}) => ({
        url: ENDPOINTS.MEDICAL_NOTES,
        params,
      }),
      providesTags: ['MedicalNote'],
    }),

    createMedicalNote: builder.mutation<MedicalNote, CreateMedicalNoteRequest>({
      query: body => ({
        url: ENDPOINTS.MEDICAL_NOTES,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['MedicalNote', 'MedicalNoteStats'],
    }),

    getMedicalNote: builder.query<MedicalNote, string>({
      query: id => `${ENDPOINTS.MEDICAL_NOTES}/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'MedicalNote', id }],
    }),

    updateMedicalNote: builder.mutation<
      MedicalNote,
      { id: string; data: UpdateMedicalNoteRequest }
    >({
      query: ({ id, data }) => ({
        url: `${ENDPOINTS.MEDICAL_NOTES}/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'MedicalNote', id },
      ],
    }),

    deleteMedicalNote: builder.mutation<void, string>({
      query: id => ({
        url: `${ENDPOINTS.MEDICAL_NOTES}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'MedicalNote', id },
        'MedicalNoteStats',
      ],
    }),

    getNoteByAppointment: builder.query<MedicalNote[], string>({
      query: appointmentId =>
        `${ENDPOINTS.MEDICAL_NOTES}/appointment/${appointmentId}`,
      providesTags: (_result, _error, appointmentId) => [
        { type: 'MedicalNote', id: `appointment-${appointmentId}` },
      ],
    }),

    searchNotes: builder.query<
      MedicalNote[],
      { q: string; patientId?: string; limit?: number }
    >({
      query: ({ q, patientId, limit = 20 }) => ({
        url: `${ENDPOINTS.MEDICAL_NOTES}/search`,
        params: { q, patientId, limit },
      }),
    }),

    medicalNoteStats: builder.query<MedicalNoteStats, void>({
      query: () => `${ENDPOINTS.MEDICAL_NOTES}/stats`,
      providesTags: ['MedicalNoteStats'],
    }),

    healthCheck: builder.query<{ status: string }, void>({
      query: () => `${ENDPOINTS.MEDICAL_NOTES}/health`,
    }),
  }),
});

export const {
  useListMedicalNotesQuery,
  useCreateMedicalNoteMutation,
  useGetMedicalNoteQuery,
  useUpdateMedicalNoteMutation,
  useDeleteMedicalNoteMutation,
  useGetNoteByAppointmentQuery,
  useSearchNotesQuery,
  useMedicalNoteStatsQuery,
  useHealthCheckQuery: useMedicalNoteHealthCheckQuery,
} = medicalNoteApi;
