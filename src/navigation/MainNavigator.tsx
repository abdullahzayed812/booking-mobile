import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootState } from '../app/store';

import { DashboardNavigator } from './DashboardNavigator';
import { AppointmentsNavigator } from './AppointmentsNavigator';
import { PatientsNavigator } from './PatientsNavigator';
import { DoctorsNavigator } from './DoctorsNavigator';
import { MedicalNotesNavigator } from './MedicalNotesNavigator';
import { ProfileNavigator } from './ProfileNavigator';
import { DrawerContent } from '../components/DrawerContent';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
// const Stack = createStackNavigator();

// Bottom Tab Navigator for main sections
const TabNavigator: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const getTabsForRole = () => {
    switch (user?.role) {
      case 'doctor':
        return [
          {
            name: 'Dashboard',
            component: DashboardNavigator,
            icon: 'view-dashboard',
            label: 'Dashboard',
          },
          {
            name: 'Appointments',
            component: AppointmentsNavigator,
            icon: 'calendar',
            label: 'Appointments',
          },
          {
            name: 'Patients',
            component: PatientsNavigator,
            icon: 'account-group',
            label: 'Patients',
          },
          {
            name: 'MedicalNotes',
            component: MedicalNotesNavigator,
            icon: 'note-text',
            label: 'Notes',
          },
          {
            name: 'Profile',
            component: ProfileNavigator,
            icon: 'account',
            label: 'Profile',
          },
        ];

      case 'patient':
        return [
          {
            name: 'Dashboard',
            component: DashboardNavigator,
            icon: 'view-dashboard',
            label: 'Dashboard',
          },
          {
            name: 'Appointments',
            component: AppointmentsNavigator,
            icon: 'calendar',
            label: 'Appointments',
          },
          {
            name: 'Doctors',
            component: DoctorsNavigator,
            icon: 'doctor',
            label: 'Doctors',
          },
          {
            name: 'MedicalRecords',
            component: MedicalNotesNavigator,
            icon: 'file-document',
            label: 'Records',
          },
          {
            name: 'Profile',
            component: ProfileNavigator,
            icon: 'account',
            label: 'Profile',
          },
        ];

      case 'admin':
        return [
          {
            name: 'Dashboard',
            component: DashboardNavigator,
            icon: 'view-dashboard',
            label: 'Dashboard',
          },
          {
            name: 'Appointments',
            component: AppointmentsNavigator,
            icon: 'calendar',
            label: 'Appointments',
          },
          {
            name: 'Patients',
            component: PatientsNavigator,
            icon: 'account-group',
            label: 'Patients',
          },
          {
            name: 'Doctors',
            component: DoctorsNavigator,
            icon: 'doctor',
            label: 'Doctors',
          },
          {
            name: 'Profile',
            component: ProfileNavigator,
            icon: 'account',
            label: 'Profile',
          },
        ];

      default:
        return [
          {
            name: 'Dashboard',
            component: DashboardNavigator,
            icon: 'view-dashboard',
            label: 'Dashboard',
          },
          {
            name: 'Profile',
            component: ProfileNavigator,
            icon: 'account',
            label: 'Profile',
          },
        ];
    }
  };

  const tabs = getTabsForRole();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, react/no-unstable-nested-components
        tabBarIcon: ({ focused, color, size }) => {
          const tab = tabs.find(t => t.name === route.name);
          return (
            <Icon name={tab?.icon || 'circle'} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      })}
    >
      {tabs.map(tab => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{ tabBarLabel: tab.label }}
        />
      ))}
    </Tab.Navigator>
  );
};

// Main Navigator with Drawer
export const MainNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: 'white',
          width: 280,
        },
        drawerActiveTintColor: '#2563eb',
        drawerInactiveTintColor: '#6b7280',
      }}
    >
      <Drawer.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
