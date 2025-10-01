import { createStackNavigator } from '@react-navigation/stack';
import { DashboardScreen } from '../features/dashboard/screens/DashboardScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { ActivityScreen } from '../screens/ActivityScreen';

export type DashboardStackParamList = {
  DashboardMain: undefined;
  Notifications: undefined;
  Activity: undefined;
};

const DashboardStack = createStackNavigator<DashboardStackParamList>();

export const DashboardNavigator: React.FC = () => {
  return (
    <DashboardStack.Navigator screenOptions={{ headerShown: false }}>
      <DashboardStack.Screen name="DashboardMain" component={DashboardScreen} />
      <DashboardStack.Screen
        name="Notifications"
        component={NotificationsScreen}
      />
      <DashboardStack.Screen name="Activity" component={ActivityScreen} />
    </DashboardStack.Navigator>
  );
};
