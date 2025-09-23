import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import EncryptedStorage from 'react-native-encrypted-storage';

import { RootState } from '../app/store';
import { setLoading } from '../features/auth/slices/authSlice';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';
import { LoadingScreen } from '../components/LoadingScreen';

const Stack = createStackNavigator();

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
          // Validate token and get user info
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

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={MainNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
