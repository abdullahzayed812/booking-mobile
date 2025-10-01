import { createStackNavigator } from '@react-navigation/stack';
import { DoctorsScreen } from '../features/doctors/screens/DoctorsScreen';
import { DoctorDetailsScreen } from '../features/doctors/screens/DoctorDetailsScreen';
import { DoctorAvailabilityScreen } from '../features/doctors/screens/DoctorAvailabilityScreen';
import { DoctorScheduleScreen } from '../features/doctors/screens/DoctorScheduleScreen';
import { CreateDoctorScreen } from '../features/doctors/screens/CreateDoctorScreen';
import { EditDoctorScreen } from '../features/doctors/screens/EditDoctorScreen';

export type DoctorsStackParamList = {
  DoctorsList: undefined;
  DoctorDetails: { doctorId: string };
  DoctorAvailability: { doctorId: string };
  DoctorSchedule: { doctorId: string };
  CreateDoctor: undefined;
  EditDoctor: { doctorId: string };
};

const DoctorsStack = createStackNavigator<DoctorsStackParamList>();

export const DoctorsNavigator: React.FC = () => {
  return (
    <DoctorsStack.Navigator screenOptions={{ headerShown: false }}>
      <DoctorsStack.Screen name="DoctorsList" component={DoctorsScreen} />
      <DoctorsStack.Screen
        name="DoctorDetails"
        component={DoctorDetailsScreen}
      />
      <DoctorsStack.Screen
        name="DoctorAvailability"
        component={DoctorAvailabilityScreen}
      />
      <DoctorsStack.Screen
        name="DoctorSchedule"
        component={DoctorScheduleScreen}
      />
      <DoctorsStack.Screen name="CreateDoctor" component={CreateDoctorScreen} />
      <DoctorsStack.Screen name="EditDoctor" component={EditDoctorScreen} />
    </DoctorsStack.Navigator>
  );
};
