import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigatorScreenParams } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootState } from '../app/store';

import {
  DashboardNavigator,
  DashboardStackParamList,
} from './DashboardNavigator';
import {
  AppointmentsNavigator,
  AppointmentsStackParamList,
} from './AppointmentsNavigator';
import { PatientsNavigator, PatientsStackParamList } from './PatientsNavigator';
import { DoctorsNavigator, DoctorsStackParamList } from './DoctorsNavigator';
import {
  MedicalNotesNavigator,
  MedicalNotesStackParamList,
} from './MedicalNotesNavigator';
import { ProfileNavigator, ProfileStackParamList } from './ProfileNavigator';
import { SearchScreen } from '../screens/SearchScreen';
import { ActivityScreen } from '../screens/ActivityScreen';
import { DrawerContent } from '../components/DrawerContent';

// Define the ParamList for the Tab Navigator
export type MainTabParamList = {
  Dashboard: NavigatorScreenParams<DashboardStackParamList>;
  Appointments: NavigatorScreenParams<AppointmentsStackParamList>;
  Patients: NavigatorScreenParams<PatientsStackParamList>;
  Doctors: NavigatorScreenParams<DoctorsStackParamList>;
  MedicalNotes: NavigatorScreenParams<MedicalNotesStackParamList>;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
  Search: undefined;
};

// Define the ParamList for the Drawer Navigator
export type MainDrawerParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  Activity: undefined;
};

// Define the RootStackParamList to include all navigators
export type RootStackParamList = {
  Auth: undefined;
  Main: NavigatorScreenParams<MainDrawerParamList>;
};

const Tab = createBottomTabNavigator<MainTabParamList>();
const Drawer = createDrawerNavigator<MainDrawerParamList>();

// Bottom Tab Navigator for main sections
const TabNavigator: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const getTabsForRole = (): Array<{
    name: keyof MainTabParamList;
    component: React.ComponentType<any>;
    icon: string;
    label: string;
  }> => {
    const commonTabs: Array<{
      name: keyof MainTabParamList;
      component: React.ComponentType<any>;
      icon: string;
      label: string;
    }> = [
      {
        name: 'Dashboard',
        component: DashboardNavigator,
        icon: 'view-dashboard',
        label: 'Dashboard',
      },
      {
        name: 'Search',
        component: SearchScreen,
        icon: 'magnify',
        label: 'Search',
      },
      {
        name: 'Profile',
        component: ProfileNavigator,
        icon: 'account',
        label: 'Profile',
      },
    ];

    switch (user?.role) {
      case 'doctor':
        return [
          ...commonTabs,
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
        ];

      case 'patient':
        return [
          ...commonTabs,
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
            name: 'MedicalNotes',
            component: MedicalNotesNavigator,
            icon: 'file-document',
            label: 'Records',
          },
        ];

      case 'admin':
        return [
          ...commonTabs,
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
        ];

      default:
        return commonTabs;
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
      <Drawer.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          drawerLabel: 'Activity',
          drawerIcon: ({ color, size }) => (
            <Icon name="history" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
