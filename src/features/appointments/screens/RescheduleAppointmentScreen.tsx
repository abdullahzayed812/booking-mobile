
import React from 'react';
import { View, Text, Button } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { AppointmentsStackParamList } from '../../../src/navigation/AppointmentsNavigator';

interface Props extends StackScreenProps<AppointmentsStackParamList, 'RescheduleAppointment'> {}

export const RescheduleAppointmentScreen: React.FC<Props> = ({ navigation, route }) => {
  return (
    <View>
      <Text>Reschedule Appointment</Text>
      {/* Add your rescheduling UI here */}
      <Button title="Confirm Reschedule" onPress={() => {}} />
    </View>
  );
};

export default RescheduleAppointmentScreen;
