import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../styles/patientStyles';

interface Props {
  appointments: any[];
  onAppointmentPress: (appointment: any) => void;
  onBookAppointment: () => void;
}

export const PatientAppointments: React.FC<Props> = ({
  appointments,
  onAppointmentPress,
  onBookAppointment,
}) => {
  const getStatusColor = (status: string) => {
    const colors = {
      scheduled: '#f59e0b',
      confirmed: '#10b981',
      in_progress: '#3b82f6',
      completed: '#6b7280',
      cancelled: '#ef4444',
      no_show: '#f87171',
    };
    return colors[status as keyof typeof colors] || '#6b7280';
  };

  const renderAppointmentItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.appointmentItem}
      onPress={() => onAppointmentPress(item)}
    >
      <View style={styles.appointmentItemHeader}>
        <Text style={styles.appointmentItemDate}>
          {new Date(item.scheduledAt).toLocaleDateString()}
        </Text>
        <View
          style={[
            styles.appointmentItemStatus,
            { backgroundColor: getStatusColor(item.status) },
          ]}
        >
          <Text style={styles.appointmentItemStatusText}>
            {item.status.toUpperCase()}
          </Text>
        </View>
      </View>

      <Text style={styles.appointmentItemDoctor}>
        Dr. {item.doctor?.firstName} {item.doctor?.lastName}
      </Text>

      <Text style={styles.appointmentItemReason}>{item.reason}</Text>

      <View style={styles.appointmentItemFooter}>
        <Text style={styles.appointmentItemTime}>
          {new Date(item.scheduledAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
        <Text style={styles.appointmentItemDuration}>{item.duration} min</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.appointmentsTab}>
      <View style={styles.appointmentsHeader}>
        <Text style={styles.appointmentsTitle}>Recent Appointments</Text>
        <TouchableOpacity
          style={styles.bookAppointmentButton}
          onPress={onBookAppointment}
        >
          <Icon name="calendar-plus" size={16} color="white" />
          <Text style={styles.bookAppointmentButtonText}>Book New</Text>
        </TouchableOpacity>
      </View>

      {appointments.length === 0 ? (
        <View style={styles.noAppointments}>
          <Icon name="calendar-blank" size={48} color="#d1d5db" />
          <Text style={styles.noAppointmentsTitle}>No Appointments Yet</Text>
          <Text style={styles.noAppointmentsText}>
            Book your first appointment to get started
          </Text>
          <TouchableOpacity
            style={styles.firstAppointmentButton}
            onPress={onBookAppointment}
          >
            <Text style={styles.firstAppointmentButtonText}>
              Book Appointment
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={appointments}
          renderItem={renderAppointmentItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.appointmentsList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};
