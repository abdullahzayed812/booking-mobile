import { StackScreenProps } from '@react-navigation/stack';
import { AppointmentsStackParamList } from '../../../navigation/AppointmentsNavigator';
import { CreateAppointmentForm } from '../../../components/forms/CreateAppointmentForm';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-vector-icons/Icon';
import { styles } from '../styles/appointmentStyles';

interface Props
  extends StackScreenProps<AppointmentsStackParamList, 'BookAppointment'> {}

export const BookAppointmentScreen: React.FC<Props> = ({
  navigation,
  route,
}) => {
  const { doctorId, patientId } = route.params || {};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Appointment</Text>
      </View>

      <CreateAppointmentForm
        doctorId={doctorId}
        patientId={patientId}
        onSuccess={() => {
          Alert.alert('Success', 'Appointment booked successfully!', [
            { text: 'OK', onPress: () => navigation.goBack() },
          ]);
        }}
        onCancel={() => navigation.goBack()}
      />
    </View>
  );
};
