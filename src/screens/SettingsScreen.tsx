
import React from 'react';
import { View, Text } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { ProfileStackParamList } from '../navigation/ProfileNavigator';

interface Props extends StackScreenProps<ProfileStackParamList, 'Settings'> {}

export const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View>
      <Text>Settings</Text>
      {/* Add your settings UI here */}
    </View>
  );
};

export default SettingsScreen;
