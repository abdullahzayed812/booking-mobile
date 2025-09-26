import { createStackNavigator } from '@react-navigation/stack';
import { DoctorsScreen } from '../screens/DoctorsScreen';
import { DoctorDetailsScreen } from '../screens/DoctorDetailsScreen';
import { DoctorAvailabilityScreen } from '../screens/DoctorAvailabilityScreen';
import { DoctorScheduleScreen } from '../screens/DoctorScheduleScreen';
import { CreateDoctorScreen } from '../screens/CreateDoctorScreen';
import { EditDoctorScreen } from '../screens/EditDoctorScreen';

const DoctorsStack = createStackNavigator();

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
