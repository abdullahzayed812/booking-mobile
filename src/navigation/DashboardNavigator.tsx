import { DashboardScreen } from '../features/dashboard';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { ActivityScreen } from '../screens/ActivityScreen';
import { createStackNavigator } from '@react-navigation/stack';

const DashboardStack = createStackNavigator();

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
