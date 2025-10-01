import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export const CreateMedicalNoteScreen = () => {
  return (
    <View>
      <Text>Create Medical Note</Text>
      <TextInput placeholder="Patient Name" />
      <TextInput placeholder="Diagnosis" />
      <TextInput placeholder="Notes" multiline />
      <Button title="Save" onPress={() => {}} />
    </View>
  );
};
