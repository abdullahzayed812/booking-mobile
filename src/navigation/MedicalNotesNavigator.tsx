import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MedicalNotesScreen } from '../features/medical-notes/screens/MedicalNotesScreen';
import { CreateMedicalNoteScreen } from '../features/medical-notes/screens/CreateMedicalNoteScreen';
import { MedicalNoteDetailsScreen } from '../features/medical-notes/screens/MedicalNoteDetailsScreen';
import { EditMedicalNoteScreen } from '../features/medical-notes/screens/EditMedicalNoteScreen';

export type MedicalNotesStackParamList = {
  MedicalNotes: { noteId: string };
  MedicalNoteDetails: { id: string };
  CreateMedicalNote: { appointmentId: string; patientId: string | undefined };
  EditMedicalNote: { id: string };
};

const Stack = createStackNavigator<MedicalNotesStackParamList>();

export const MedicalNotesNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MedicalNotes" component={MedicalNotesScreen} />
      <Stack.Screen
        name="MedicalNoteDetails"
        component={MedicalNoteDetailsScreen}
      />
      <Stack.Screen
        name="CreateMedicalNote"
        component={CreateMedicalNoteScreen}
      />
      <Stack.Screen name="EditMedicalNote" component={EditMedicalNoteScreen} />
    </Stack.Navigator>
  );
};
