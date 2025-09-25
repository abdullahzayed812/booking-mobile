import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../styles/appointmentStyles';

interface Props {
  appointment: any;
}

export const AppointmentInfo: React.FC<Props> = ({ appointment }) => {
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

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      time: date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  };

  const dateTime = formatDateTime(appointment.scheduledAt);

  return (
    <View style={styles.appointmentInfoCard}>
      {/* Status Badge */}
      <View style={styles.appointmentInfoHeader}>
        <View
          style={[
            styles.statusBadgeLarge,
            { backgroundColor: getStatusColor(appointment.status) },
          ]}
        >
          <Text style={styles.statusBadgeText}>
            {appointment.status.replace('_', ' ').toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Appointment Details */}
      <View style={styles.appointmentDetails}>
        <View style={styles.detailRow}>
          <Icon name="calendar" size={20} color="#6b7280" />
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Date & Time</Text>
            <Text style={styles.detailValue}>{dateTime.date}</Text>
            <Text style={styles.detailSubValue}>{dateTime.time}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Icon name="clock-outline" size={20} color="#6b7280" />
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Duration</Text>
            <Text style={styles.detailValue}>
              {appointment.duration} minutes
            </Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Icon name="clipboard-text" size={20} color="#6b7280" />
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Reason for Visit</Text>
            <Text style={styles.detailValue}>{appointment.reason}</Text>
          </View>
        </View>

        {appointment.notes && (
          <View style={styles.detailRow}>
            <Icon name="note-text" size={20} color="#6b7280" />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Additional Notes</Text>
              <Text style={styles.detailValue}>{appointment.notes}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
