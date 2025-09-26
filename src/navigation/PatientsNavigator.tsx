import { createStackNavigator } from '@react-navigation/stack';
import { PatientsScreen, PatientDetailsScreen } from '../features/patients';
import { CreatePatientScreen } from '../screens/CreatePatientScreen';
import { EditPatientScreen } from '../screens/EditPatientScreen';
import { EditPatientAllergiesScreen } from '../screens/EditPatientAllergiesScreen';
import { EditPatientMedicalHistoryScreen } from '../screens/EditPatientMedicalHistoryScreen';

const PatientsStack = createStackNavigator();

export const PatientsNavigator: React.FC = () => {
  return (
    <PatientsStack.Navigator screenOptions={{ headerShown: false }}>
      <PatientsStack.Screen name="PatientsList" component={PatientsScreen} />
      <PatientsStack.Screen
        name="PatientDetails"
        component={PatientDetailsScreen}
      />
      <PatientsStack.Screen
        name="CreatePatient"
        component={CreatePatientScreen}
      />
      <PatientsStack.Screen name="EditPatient" component={EditPatientScreen} />
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
