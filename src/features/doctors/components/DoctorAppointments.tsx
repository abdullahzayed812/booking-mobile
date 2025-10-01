
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../styles/doctorStyles';

interface Props {
  appointments: any[];
  doctorId: string;
  onAppointmentPress: (appointment: any) => void;
}

export const DoctorAppointments: React.FC<Props> = ({
  appointments,
  doctorId,
  onAppointmentPress,
}) => {
  const renderAppointmentItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.appointmentCard} onPress={() => onAppointmentPress(item)}>
      <View style={styles.appointmentCardLeft}>
        <Text style={styles.appointmentCardTime}>{new Date(item.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        <Text style={styles.appointmentCardDate}>{new Date(item.scheduledAt).toLocaleDateString()}</Text>
      </View>
      <View style={styles.appointmentCardRight}>
        <Text style={styles.appointmentCardTitle}>{item.reason}</Text>
        <Text style={styles.appointmentCardSubtitle}>with {item.patientName}</Text>
        <View style={styles.appointmentCardStatus}>
          <Icon name="circle" size={10} color={item.status === 'confirmed' ? '#10b981' : '#f59e0b'} />
          <Text style={styles.appointmentCardStatusText}>{item.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.appointmentsContainer}>
      <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
      {appointments.length === 0 ? (
        <View style={styles.emptyState}>
          <Icon name="calendar-remove" size={48} color="#d1d5db" />
          <Text style={styles.emptyStateTitle}>No Upcoming Appointments</Text>
          <Text style={styles.emptyStateSubtitle}>You have no appointments scheduled yet.</Text>
        </View>
      ) : (
        <FlatList
          data={appointments}
          renderItem={renderAppointmentItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};
