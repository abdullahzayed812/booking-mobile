import { createStackNavigator } from '@react-navigation/stack';
import { MedicalNotesScreen } from '../screens/MedicalNotesScreen';
import { MedicalNoteDetailsScreen } from '../screens/MedicalNoteDetailsScreen';
import { CreateMedicalNoteScreen } from '../screens/CreateMedicalNoteScreen';
import { EditMedicalNoteScreen } from '../screens/EditMedicalNoteScreen';
import { MedicalRecordsScreen } from '../screens/MedicalRecordsScreen';

const MedicalNotesStack = createStackNavigator();

export const MedicalNotesNavigator: React.FC = () => {
  return (
    <MedicalNotesStack.Navigator screenOptions={{ headerShown: false }}>
      <MedicalNotesStack.Screen
        name="MedicalNotesList"
        component={MedicalNotesScreen}
      />
      <MedicalNotesStack.Screen
        name="MedicalNoteDetails"
        component={MedicalNoteDetailsScreen}
      />
      <MedicalNotesStack.Screen
        name="CreateMedicalNote"
        component={CreateMedicalNoteScreen}
      />
      <MedicalNotesStack.Screen
        name="EditMedicalNote"
        component={EditMedicalNoteScreen}
      />
      <MedicalNotesStack.Screen
        name="MedicalRecords"
        component={MedicalRecordsScreen}
      />
    </MedicalNotesStack.Navigator>
  );
};
