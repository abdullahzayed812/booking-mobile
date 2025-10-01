
import React from 'react';
import { View, Text } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { DoctorsStackParamList } from '../../../src/navigation/DoctorsNavigator';

interface Props extends StackScreenProps<DoctorsStackParamList, 'DoctorSchedule'> {}

export const DoctorScheduleScreen: React.FC<Props> = ({ navigation, route }) => {
  return (
    <View>
      <Text>Doctor Schedule</Text>
      {/* Add your doctor schedule UI here */}
    </View>
  );
};
