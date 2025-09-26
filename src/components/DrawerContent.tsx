import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EncryptedStorage from 'react-native-encrypted-storage';

import { RootState } from '../app/store';
import { useLogoutMutation } from '../features/auth/api/authApi';
import { logout } from '../features/auth/slices/authSlice';

export const DrawerContent: React.FC<DrawerContentComponentProps> = props => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [logoutMutation] = useLogoutMutation();

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          try {
            await logoutMutation().unwrap();
          } catch (error) {
            console.error('Logout failed:', error);
          } finally {
            await EncryptedStorage.removeItem('access_token');
            await EncryptedStorage.removeItem('refresh_token');
            dispatch(logout());
          }
        },
      },
    ]);
  };

  const drawerItems = [
    {
      label: 'Dashboard',
      icon: 'view-dashboard',
      onPress: () => props.navigation.navigate('Dashboard'),
    },
    {
      label: 'Appointments',
      icon: 'calendar',
      onPress: () => props.navigation.navigate('Appointments'),
    },
    ...(user?.role !== 'patient'
      ? [
          {
            label: 'Patients',
            icon: 'account-group',
            onPress: () => props.navigation.navigate('Patients'),
          },
        ]
      : []),
    ...(user?.role === 'patient'
      ? [
          {
            label: 'Doctors',
            icon: 'doctor',
            onPress: () => props.navigation.navigate('Doctors'),
          },
        ]
      : []),
    {
      label: user?.role === 'patient' ? 'Medical Records' : 'Medical Notes',
      icon: user?.role === 'patient' ? 'file-document' : 'note-text',
      onPress: () => props.navigation.navigate('MedicalNotes'),
    },
    { type: 'divider' },
    {
      label: 'Settings',
      icon: 'cog',
      onPress: () =>
        props.navigation.navigate('Profile', {
          screen: 'NotificationSettings',
        }),
    },
    {
      label: 'Help & Support',
      icon: 'help-circle',
      onPress: () =>
        props.navigation.navigate('Profile', { screen: 'HelpSupport' }),
    },
    {
      label: 'About',
      icon: 'information',
      onPress: () => props.navigation.navigate('Profile', { screen: 'About' }),
    },
  ];

  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.scrollContent}
      >
        {/* User Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileAvatarText}>
              {user?.firstName?.[0]}
              {user?.lastName?.[0]}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {user?.role === 'doctor' ? 'Dr. ' : ''}
              {user?.firstName} {user?.lastName}
            </Text>
            <Text style={styles.profileEmail}>{user?.email}</Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleBadgeText}>
                {user?.role?.charAt(0).toUpperCase()}
                {user?.role?.slice(1)}
              </Text>
            </View>
          </View>
        </View>

        {/* Navigation Items */}
        <View style={styles.navigationSection}>
          {drawerItems.map((item, index) => {
            if (item.type === 'divider') {
              return <View key={index} style={styles.divider} />;
            }

            return (
              <TouchableOpacity
                key={index}
                style={styles.drawerItem}
                onPress={item.onPress}
              >
                <Icon name={item.icon!} size={24} color="#6b7280" />
                <Text style={styles.drawerItemText}>{item.label}</Text>
                <Icon name="chevron-right" size={20} color="#9ca3af" />
              </TouchableOpacity>
            );
          })}
        </View>
      </DrawerContentScrollView>

      {/* Footer with Logout */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="logout" size={20} color="#ef4444" />
          <Text style={styles.logoutButtonText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>MedConnect v1.0.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    paddingTop: 0,
  },
  profileSection: {
    backgroundColor: '#2563eb',
    padding: 20,
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileAvatarText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  roleBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  roleBadgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
  },
  navigationSection: {
    flex: 1,
    paddingTop: 20,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  drawerItemText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 16,
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 20,
    marginVertical: 8,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    padding: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fef2f2',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fecaca',
    marginBottom: 16,
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#ef4444',
    fontWeight: '500',
    marginLeft: 8,
  },
  versionText: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
  },
});
