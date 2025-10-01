import { createStackNavigator } from '@react-navigation/stack';
import { PatientsScreen } from '../features/patients/screens/PatientsScreen';
import { PatientDetailsScreen } from '../features/patients/screens/PatientDetailsScreen';
import { AddPatientScreen } from '../features/patients/screens/AddPatientScreen';
import { EditPatientAllergiesScreen } from '../features/patients/screens/EditPatientAllergiesScreen';
import { EditPatientMedicalHistoryScreen } from '../features/patients/screens/EditPatientMedicalHistoryScreen';

export type PatientsStackParamList = {
  PatientsList: undefined;
  PatientDetails: { patientId: string };
  AddPatient: undefined;
  EditPatientAllergies: { patientId: string };
  EditPatientMedicalHistory: { patientId: string };
};

const PatientsStack = createStackNavigator<PatientsStackParamList>();

export const PatientsNavigator: React.FC = () => {
  return (
    <PatientsStack.Navigator screenOptions={{ headerShown: false }}>
      <PatientsStack.Screen name="PatientsList" component={PatientsScreen} />
      <PatientsStack.Screen
        name="PatientDetails"
        component={PatientDetailsScreen}
      />
      <PatientsStack.Screen name="AddPatient" component={AddPatientScreen} />
      <PatientsStack.Screen
        name="EditPatientAllergies"
        component={EditPatientAllergiesScreen}
      />
      <PatientsStack.Screen
        name="EditPatientMedicalHistory"
        component={EditPatientMedicalHistoryScreen}
      />
    </PatientsStack.Navigator>
  );
};
