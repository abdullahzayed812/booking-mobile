
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ChangePasswordScreen } from '../screens/ChangePasswordScreen';
import { SessionManagementScreen } from '../screens/SessionManagementScreen';
import { HelpSupportScreen } from '../screens/HelpSupportScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

export type ProfileStackParamList = {
  ProfileMain: undefined;
  ChangePassword: undefined;
  SessionManagement: undefined;
  HelpSupport: undefined;
  About: undefined;
  Settings: undefined;
};

const ProfileStack = createStackNavigator<ProfileStackParamList>();

export const ProfileNavigator: React.FC = () => {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
      <ProfileStack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
      />
      <ProfileStack.Screen
        name="SessionManagement"
        component={SessionManagementScreen}
      />
      <ProfileStack.Screen name="HelpSupport" component={HelpSupportScreen} />
      <ProfileStack.Screen name="About" component={AboutScreen} />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} />
    </ProfileStack.Navigator>
  );
};
