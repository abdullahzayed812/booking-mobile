import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../styles/appointmentStyles';

interface Props {
  appointment: any;
  userRole?: string;
  onContactPress: (type: string, info: string) => void;
}

export const AppointmentParticipants: React.FC<Props> = ({
  appointment,
  onContactPress,
}) => {
  return (
    <View style={styles.participantsSection}>
      <Text style={styles.sectionTitle}>Participants</Text>

      {/* Patient Info */}
      {appointment.patient && (
        <View style={styles.participantCard}>
          <View style={styles.participantHeader}>
            <View style={styles.participantAvatar}>
              <Text style={styles.participantAvatarText}>
                {appointment.patient.firstName[0]}
                {appointment.patient.lastName[0]}
              </Text>
            </View>
            <View style={styles.participantInfo}>
              <Text style={styles.participantName}>
                {appointment.patient.firstName} {appointment.patient.lastName}
              </Text>
              <Text style={styles.participantRole}>Patient</Text>
              <Text style={styles.participantEmail}>
                {appointment.patient.email}
              </Text>
              {appointment.patient.phone && (
                <Text style={styles.participantPhone}>
                  {appointment.patient.phone}
                </Text>
              )}
            </View>
            <View style={styles.participantActions}>
              {appointment.patient.phone && (
                <TouchableOpacity
                  style={styles.contactButton}
                  onPress={() =>
                    onContactPress('call', appointment.patient.phone)
                  }
                >
                  <Icon name="phone" size={20} color="#2563eb" />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.contactButton}
                onPress={() =>
                  onContactPress('message', appointment.patient.email)
                }
              >
                <Icon name="message-text" size={20} color="#2563eb" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Doctor Info */}
      {appointment.doctor && (
        <View style={styles.participantCard}>
          <View style={styles.participantHeader}>
            <View style={styles.participantAvatar}>
              <Text style={styles.participantAvatarText}>
                {appointment.doctor.firstName[0]}
                {appointment.doctor.lastName[0]}
              </Text>
            </View>
            <View style={styles.participantInfo}>
              <Text style={styles.participantName}>
                Dr. {appointment.doctor.firstName} {appointment.doctor.lastName}
              </Text>
              <Text style={styles.participantRole}>Doctor</Text>
              <Text style={styles.participantSpecialization}>
                {appointment.doctor.specialization}
              </Text>
            </View>
            <View style={styles.participantActions}>
              <TouchableOpacity
                style={styles.contactButton}
                onPress={() => onContactPress('message', 'doctor')}
              >
                <Icon name="message-text" size={20} color="#2563eb" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};
