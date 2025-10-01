import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export const EditMedicalNoteScreen = () => {
  return (
    <View>
      <Text>Edit Medical Note</Text>
      <TextInput placeholder="Patient Name" />
      <TextInput placeholder="Diagnosis" />
      <TextInput placeholder="Notes" multiline />
      <Button title="Save" onPress={() => {}} />
    </View>
  );
};
