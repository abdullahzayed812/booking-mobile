
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import EncryptedStorage from 'react-native-encrypted-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootState } from '../app/store';
import { useLogoutMutation, useMeQuery, useGetSessionsQuery } from '../features/auth/api/authApi';

import { StackScreenProps } from '@react-navigation/stack';
import { ProfileStackParamList } from '../navigation/ProfileNavigator';

interface Props extends StackScreenProps<ProfileStackParamList, 'ProfileMain'> {}

export const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const { data: userProfile, isLoading } = useMeQuery();
  const { data: sessions } = useGetSessionsQuery();
  const [logout, { isLoading: loggingOut }] = useLogoutMutation();

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout().unwrap();
              await EncryptedStorage.removeItem('access_token');
              await EncryptedStorage.removeItem('refresh_token');
              dispatch({ type: 'auth/logout' });
            } catch (error) {
              console.error('Logout failed:', error);
              dispatch({ type: 'auth/logout' });
            }
          },
        },
      ]
    );
  };

  const profileItems = [
    {
      icon: 'account-edit',
      title: 'Edit Profile',
      subtitle: 'Update your personal information',
      onPress: () => navigation.navigate('EditProfile'),
    },
    {
      icon: 'lock',
      title: 'Change Password',
      subtitle: 'Update your password',
      onPress: () => navigation.navigate('ChangePassword'),
    },
    {
      icon: 'devices',
      title: 'Active Sessions',
      subtitle: `${sessions?.length || 0} active sessions`,
      onPress: () => navigation.navigate('SessionManagement'),
    },
    {
      icon: 'cog',
      title: 'Settings',
      subtitle: 'App settings',
      onPress: () => navigation.navigate('Settings'),
    },
    {
      icon: 'help-circle',
      title: 'Help & Support',
      subtitle: 'Get help or contact support',
      onPress: () => navigation.navigate('HelpSupport'),
    },
    {
      icon: 'information',
      title: 'About',
      subtitle: 'About the app',
      onPress: () => navigation.navigate('About'),
    },
  ];

  return (
    <View>
      <Text>Profile</Text>
      <FlatList
        data={profileItems}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={item.onPress}>
            <View>
              <Icon name={item.icon} size={24} />
              <View>
                <Text>{item.title}</Text>
                <Text>{item.subtitle}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
