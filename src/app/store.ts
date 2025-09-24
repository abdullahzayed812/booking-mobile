import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '../features/auth/slices/authSlice';
import { authApi } from '../features/auth/api/authApi';
import { appointmentApi } from '../features/appointments/api/appointmentApi';
import { patientApi } from '../features/patients/api/patientApi';
import { doctorApi } from '../features/doctors/api/doctorApi';
import { medicalNoteApi } from '../features/medical-notes/api/medicalNoteApi';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'], // Only persist auth state
};

const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [appointmentApi.reducerPath]: appointmentApi.reducer,
  [patientApi.reducerPath]: patientApi.reducer,
  [doctorApi.reducerPath]: doctorApi.reducer,
  [medicalNoteApi.reducerPath]: medicalNoteApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(
      authApi.middleware,
      appointmentApi.middleware,
      patientApi.middleware,
      doctorApi.middleware,
      medicalNoteApi.middleware,
    ),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
