import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../styles/appointmentStyles';

interface Props {
  appointment: any;
  userRole?: string;
  onPress: () => void;
}

export const AppointmentCard: React.FC<Props> = ({
  appointment,
  userRole,
  onPress,
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

  const getStatusIcon = (status: string) => {
    const icons = {
      scheduled: 'clock-outline',
      confirmed: 'check-circle',
      in_progress: 'play-circle',
      completed: 'check-circle-outline',
      cancelled: 'cancel',
      no_show: 'account-remove',
    };
    return icons[status as keyof typeof icons] || 'clock-outline';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year:
          date.getFullYear() !== new Date().getFullYear()
            ? 'numeric'
            : undefined,
      }),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
      isToday: date.toDateString() === new Date().toDateString(),
      isPast: date < new Date(),
    };
  };

  const dateInfo = formatDate(appointment.scheduledAt);
  const personInfo =
    userRole === 'doctor' ? appointment.patient : appointment.doctor;

  return (
    <TouchableOpacity style={styles.appointmentCard} onPress={onPress}>
      {/* Date Column */}
      <View style={styles.appointmentDate}>
        <Text
          style={[
            styles.appointmentDateText,
            dateInfo.isToday && styles.appointmentDateToday,
          ]}
        >
          {dateInfo.date}
        </Text>
        <Text
          style={[
            styles.appointmentWeekday,
            dateInfo.isToday && styles.appointmentWeekdayToday,
          ]}
        >
          {dateInfo.weekday}
        </Text>
      </View>

      {/* Main Content */}
      <View style={styles.appointmentContent}>
        <View style={styles.appointmentHeader}>
          <View style={styles.appointmentTimeContainer}>
            <Icon name="clock-outline" size={16} color="#6b7280" />
            <Text style={styles.appointmentTime}>{dateInfo.time}</Text>
            <Text style={styles.appointmentDuration}>
              ({appointment.duration}min)
            </Text>
          </View>

          <View
            style={[
              styles.appointmentStatusBadge,
              { backgroundColor: getStatusColor(appointment.status) },
            ]}
          >
            <Icon
              name={getStatusIcon(appointment.status)}
              size={12}
              color="white"
            />
            <Text style={styles.appointmentStatusText}>
              {appointment.status.replace('_', ' ').toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Person Info */}
        <View style={styles.appointmentPerson}>
          <View style={styles.personAvatar}>
            <Text style={styles.personAvatarText}>
              {personInfo?.firstName?.[0]}
              {personInfo?.lastName?.[0]}
            </Text>
          </View>
          <View style={styles.personInfo}>
            <Text style={styles.personName}>
              {userRole === 'doctor'
                ? `${personInfo?.firstName} ${personInfo?.lastName}`
                : `Dr. ${personInfo?.firstName} ${personInfo?.lastName}`}
            </Text>
            {userRole === 'patient' && (
              <Text style={styles.personSpecialization}>
                {personInfo?.specialization}
              </Text>
            )}
          </View>
        </View>

        {/* Reason */}
        <Text style={styles.appointmentReason} numberOfLines={2}>
          {appointment.reason}
        </Text>

        {/* Notes Preview */}
        {appointment.notes && (
          <Text style={styles.appointmentNotes} numberOfLines={1}>
            Note: {appointment.notes}
          </Text>
        )}
      </View>

      {/* Action Indicator */}
      <View style={styles.appointmentAction}>
        <Icon name="chevron-right" size={20} color="#6b7280" />
      </View>
    </TouchableOpacity>
  );
};
