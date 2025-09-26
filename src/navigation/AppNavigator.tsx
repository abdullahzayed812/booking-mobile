import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import EncryptedStorage from 'react-native-encrypted-storage';
import { StatusBar } from 'react-native';

import { RootState } from '../app/store';
import { setLoading } from '../features/auth/slices/authSlice';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';
import { AuthLoadingScreen } from '../features/auth/components/AuthLoadingScreen';
import { RealTimeProvider } from '../components/realtime/RealTimeProvider';
import { notificationService } from '../services/notificationService';

const RootStack = createStackNavigator();

export const AppNavigator: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        dispatch(setLoading(true));

        const accessToken = await EncryptedStorage.getItem('access_token');
        const refreshToken = await EncryptedStorage.getItem('refresh_token');

        if (accessToken && refreshToken) {
          // TODO: Validate token and get user info
          // You might want to call the /auth/me endpoint here
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    initializeAuth();
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      // Initialize notifications when user is authenticated
      notificationService.initialize();
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return <AuthLoadingScreen />;
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#2563eb" />
      <RealTimeProvider>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          {isAuthenticated ? (
            <RootStack.Screen name="Main" component={MainNavigator} />
          ) : (
            <RootStack.Screen name="Auth" component={AuthNavigator} />
          )}
        </RootStack.Navigator>
      </RealTimeProvider>
    </NavigationContainer>
  );
};
