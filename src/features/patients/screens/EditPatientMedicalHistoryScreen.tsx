
import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export const EditPatientMedicalHistoryScreen = () => {
  return (
    <View>
      <Text>Edit Patient Medical History</Text>
      <TextInput placeholder="Condition" />
      <Button title="Save" onPress={() => {}} />
    </View>
  );
};
