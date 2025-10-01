import { createStackNavigator } from '@react-navigation/stack';
import { AppointmentsScreen } from '../features/appointments/screens/AppointmentsScreen';
import { AppointmentDetailsScreen } from '../features/appointments/screens/AppointmentDetailsScreen';
import { BookAppointmentScreen } from '../features/appointments/screens/BookAppointmentScreen';
import { RescheduleAppointmentScreen } from '../features/appointments/screens/RescheduleAppointmentScreen';

export type AppointmentsStackParamList = {
  AppointmentsList: undefined;
  AppointmentDetails: { appointmentId: string; doctorId?: string };
  BookAppointment: { doctorId?: string; patientId?: string };
  RescheduleAppointment: { appointmentId: string };
};

const AppointmentsStack = createStackNavigator<AppointmentsStackParamList>();

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
        name="RescheduleAppointment"
        component={RescheduleAppointmentScreen}
      />
    </AppointmentsStack.Navigator>
  );
};
