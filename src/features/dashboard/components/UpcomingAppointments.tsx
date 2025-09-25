import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../styles/dashboardStyles';

interface Appointment {
  id: string;
  scheduledAt: string;
  duration: number;
  reason: string;
  status: string;
  patient?: {
    firstName: string;
    lastName: string;
  };
  doctor?: {
    firstName: string;
    lastName: string;
    specialization: string;
  };
}

interface Props {
  appointments: Appointment[];
  userRole?: string;
  onViewAll: () => void;
  onAppointmentPress: (appointment: Appointment) => void;
}

export const UpcomingAppointments: React.FC<Props> = ({
  appointments,
  userRole,
  onViewAll,
  onAppointmentPress,
}) => {
  const getStatusColor = (status: string) => {
    const colors = {
      scheduled: '#f59e0b',
      confirmed: '#10b981',
      in_progress: '#3b82f6',
      completed: '#6b7280',
      cancelled: '#ef4444',
    };
    return colors[status as keyof typeof colors] || '#6b7280';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
    };
  };

  return (
    <View style={styles.upcomingSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      {appointments.length === 0 ? (
        <View style={styles.emptyCard}>
          <Icon name="calendar-blank" size={48} color="#d1d5db" />
          <Text style={styles.emptyTitle}>No upcoming appointments</Text>
          <Text style={styles.emptySubtitle}>
            Your next appointments will appear here
          </Text>
        </View>
      ) : (
        <View style={styles.appointmentsList}>
          {appointments.slice(0, 3).map(appointment => {
            const dateInfo = formatDate(appointment.scheduledAt);
            const personInfo =
              userRole === 'doctor' ? appointment.patient : appointment.doctor;

            return (
              <TouchableOpacity
                key={appointment.id}
                style={styles.appointmentCard}
                onPress={() => onAppointmentPress(appointment)}
              >
                <View style={styles.appointmentDate}>
                  <Text style={styles.appointmentDay}>{dateInfo.day}</Text>
                  <Text style={styles.appointmentWeekday}>
                    {dateInfo.weekday}
                  </Text>
                </View>

                <View style={styles.appointmentInfo}>
                  <Text style={styles.appointmentTime}>{dateInfo.time}</Text>
                  <Text style={styles.appointmentPerson}>
                    {userRole === 'doctor' && personInfo
                      ? `${personInfo.firstName} ${personInfo.lastName}`
                      : userRole === 'patient' && personInfo
                      ? `Dr. ${personInfo.firstName} ${personInfo.lastName}`
                      : 'Appointment'}
                  </Text>
                  <Text style={styles.appointmentReason} numberOfLines={1}>
                    {appointment.reason}
                  </Text>
                  <Text style={styles.appointmentDuration}>
                    {appointment.duration} minutes
                  </Text>
                </View>

                <View style={styles.appointmentActions}>
                  <View
                    style={[
                      styles.appointmentStatus,
                      { backgroundColor: getStatusColor(appointment.status) },
                    ]}
                  >
                    <Text style={styles.appointmentStatusText}>
                      {appointment.status.toUpperCase()}
                    </Text>
                  </View>
                  <Icon name="chevron-right" size={20} color="#6b7280" />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};
