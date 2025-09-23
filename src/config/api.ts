export const API_CONFIG = {
  BASE_URL: __DEV__
    ? 'http://localhost:3000/api'
    : 'https://your-production-api.com/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};

export const ENDPOINTS = {
  AUTH: '/auth',
  APPOINTMENTS: '/appointments',
  PATIENTS: '/patients',
  DOCTORS: '/doctors',
  MEDICAL_NOTES: '/medical-notes',
} as const;
