
import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { DoctorsStackParamList } from '../../../src/navigation/DoctorsNavigator';

interface Props extends StackScreenProps<DoctorsStackParamList, 'EditDoctor'> {}

export const EditDoctorScreen: React.FC<Props> = ({ navigation, route }) => {
  return (
    <View>
      <Text>Edit Doctor</Text>
      <TextInput placeholder="Full Name" />
      <TextInput placeholder="Specialization" />
      <TextInput placeholder="Email" />
      <Button title="Save" onPress={() => {}} />
    </View>
  );
};
