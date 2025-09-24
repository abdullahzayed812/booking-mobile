import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../../services/baseQuery';
import { ENDPOINTS } from '../../../config/api';
import {
  User,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  Session,
} from '../../../types/auth';
import { ApiResponse } from '../../../types/api';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Session'],
  endpoints: builder => ({
    register: builder.mutation<ApiResponse<AuthResponse>, RegisterRequest>({
      query: credentials => ({
        url: `${ENDPOINTS.AUTH}/register`,
        method: 'POST',
        body: credentials,
      }),
    }),

    login: builder.mutation<ApiResponse<AuthResponse>, LoginRequest>({
      query: credentials => ({
        url: `${ENDPOINTS.AUTH}/login`,
        method: 'POST',
        body: credentials,
      }),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: `${ENDPOINTS.AUTH}/logout`,
        method: 'POST',
      }),
      invalidatesTags: ['User', 'Session'],
    }),

    refreshToken: builder.mutation<
      ApiResponse<{ tokens: { access: string; refresh: string } }>,
      { refreshToken: string }
    >({
      query: ({ refreshToken }) => ({
        url: `${ENDPOINTS.AUTH}/refresh`,
        method: 'POST',
        body: { refreshToken },
      }),
    }),

    me: builder.query<ApiResponse<User>, void>({
      query: () => `${ENDPOINTS.AUTH}/me`,
      providesTags: ['User'],
    }),

    changePassword: builder.mutation<
      void,
      { currentPassword: string; newPassword: string }
    >({
      query: body => ({
        url: `${ENDPOINTS.AUTH}/change-password`,
        method: 'PUT',
        body,
      }),
    }),

    getSessions: builder.query<ApiResponse<Session[]>, void>({
      query: () => `${ENDPOINTS.AUTH}/sessions`,
      providesTags: ['Session'],
    }),

    revokeSession: builder.mutation<void, string>({
      query: sessionId => ({
        url: `${ENDPOINTS.AUTH}/sessions/${sessionId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Session'],
    }),

    validateToken: builder.query<ApiResponse<{ valid: boolean }>, void>({
      query: () => `${ENDPOINTS.AUTH}/validate`,
    }),

    healthCheck: builder.query<ApiResponse<{ status: string }>, void>({
      query: () => `${ENDPOINTS.AUTH}/health`,
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useMeQuery,
  useChangePasswordMutation,
  useGetSessionsQuery,
  useRevokeSessionMutation,
  useValidateTokenQuery,
  useHealthCheckQuery,
} = authApi;
