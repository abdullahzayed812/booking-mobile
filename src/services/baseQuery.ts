import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import EncryptedStorage from 'react-native-encrypted-storage';
import { API_CONFIG } from '../config/api';
import { RootState } from '../app/store';

const baseQuery = fetchBaseQuery({
  baseUrl: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  prepareHeaders: async (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.accessToken;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    headers.set('content-type', 'application/json');
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Try to get a new token
    try {
      const refreshToken = await EncryptedStorage.getItem('refresh_token');

      if (refreshToken) {
        const refreshResult = await baseQuery(
          {
            url: '/auth/refresh',
            method: 'POST',
            body: { refreshToken },
          },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          const { tokens } = refreshResult.data as {
            tokens: { access: string; refresh: string };
          };

          // Store new tokens
          await EncryptedStorage.setItem('access_token', tokens.access);
          await EncryptedStorage.setItem('refresh_token', tokens.refresh);

          // Dispatch action to update tokens in state
          api.dispatch({ type: 'auth/setTokens', payload: tokens });

          // Retry the original query
          result = await baseQuery(args, api, extraOptions);
        } else {
          // Refresh failed, logout user
          await EncryptedStorage.removeItem('access_token');
          await EncryptedStorage.removeItem('refresh_token');
          api.dispatch({ type: 'auth/logout' });
        }
      } else {
        // No refresh token, logout user
        api.dispatch({ type: 'auth/logout' });
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      api.dispatch({ type: 'auth/logout' });
    }
  }

  return result;
};
