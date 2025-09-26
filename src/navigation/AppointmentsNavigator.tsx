import { createStackNavigator } from '@react-navigation/stack';
import {
  AppointmentsScreen,
  AppointmentDetailsScreen,
} from '../features/appointments';
import { BookAppointmentScreen } from '../screens/BookAppointmentScreen';
import { CreateAppointmentScreen } from '../screens/CreateAppointmentScreen';
import { RescheduleAppointmentScreen } from '../screens/RescheduleAppointmentScreen';

const AppointmentsStack = createStackNavigator();

export const AppointmentsNavigator: React.FC = () => {
  return (
    <AppointmentsStack.Navigator screenOptions={{ headerShown: false }}>
      <AppointmentsStack.Screen
        name="AppointmentsList"
        component={AppointmentsScreen}
      />
      <AppointmentsStack.Screen
        name="AppointmentDetails"
        component={AppointmentDetailsScreen}
      />
      <AppointmentsStack.Screen
        name="BookAppointment"
        component={BookAppointmentScreen}
      />
      <AppointmentsStack.Screen
        name="CreateAppointment"
        component={CreateAppointmentScreen}
      />
      <AppointmentsStack.Screen
        name="RescheduleAppointment"
        component={RescheduleAppointmentScreen}
      />
    </AppointmentsStack.Navigator>
  );
};
