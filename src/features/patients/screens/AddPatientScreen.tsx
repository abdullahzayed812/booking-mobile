
import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export const AddPatientScreen = () => {
  return (
    <View>
      <Text>Add Patient</Text>
      <TextInput placeholder="Full Name" />
      <TextInput placeholder="Email" />
      <TextInput placeholder="Phone Number" />
      <Button title="Save" onPress={() => {}} />
    </View>
  );
};

export default AddPatientScreen;
