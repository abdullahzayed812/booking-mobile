
import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export const EditPatientAllergiesScreen = () => {
  return (
    <View>
      <Text>Edit Patient Allergies</Text>
      <TextInput placeholder="Allergy Name" />
      <Button title="Save" onPress={() => {}} />
    </View>
  );
};
