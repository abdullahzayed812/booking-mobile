import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../styles/doctorStyles';

interface Props {
  doctor: any;
  onPress: () => void;
  onBookAppointment: () => void;
}

export const DoctorCard: React.FC<Props> = ({
  doctor,
  onPress,
  onBookAppointment,
}) => {
  return (
    <TouchableOpacity style={styles.doctorCard} onPress={onPress}>
      <View style={styles.doctorCardHeader}>
        <View style={styles.doctorCardAvatar}>
          <Text style={styles.doctorCardAvatarText}>
            {doctor.firstName[0]}
            {doctor.lastName[0]}
          </Text>
        </View>

        <View style={styles.doctorCardInfo}>
          <View style={styles.doctorCardTitleRow}>
            <Text style={styles.doctorCardName}>
              Dr. {doctor.firstName} {doctor.lastName}
            </Text>
            <View
              style={[
                styles.doctorCardStatus,
                {
                  backgroundColor: doctor.isAcceptingAppointments
                    ? '#10b981'
                    : '#ef4444',
                },
              ]}
            >
              <Text style={styles.doctorCardStatusText}>
                {doctor.isAcceptingAppointments ? 'Available' : 'Unavailable'}
              </Text>
            </View>
          </View>

          <Text style={styles.doctorCardSpecialization}>
            {doctor.specialization}
          </Text>

          <View style={styles.doctorCardMeta}>
            <View style={styles.doctorCardMetaItem}>
              <Icon name="briefcase" size={14} color="#6b7280" />
              <Text style={styles.doctorCardMetaText}>
                {doctor.experience} years experience
              </Text>
            </View>

            {doctor.languages && doctor.languages.length > 0 && (
              <View style={styles.doctorCardMetaItem}>
                <Icon name="translate" size={14} color="#6b7280" />
                <Text style={styles.doctorCardMetaText}>
                  {doctor.languages.slice(0, 2).join(', ')}
                  {doctor.languages.length > 2 &&
                    ` +${doctor.languages.length - 2}`}
                </Text>
              </View>
            )}
          </View>

          {doctor.bio && (
            <Text style={styles.doctorCardBio} numberOfLines={2}>
              {doctor.bio}
            </Text>
          )}
        </View>
      </View>

      {/* Footer */}
      <View style={styles.doctorCardFooter}>
        <View style={styles.doctorCardPricing}>
          {doctor.consultationFee && (
            <Text style={styles.consultationFee}>
              Consultation: ${doctor.consultationFee}
            </Text>
          )}
          <View style={styles.doctorCardLocation}>
            <Icon name="map-marker" size={14} color="#6b7280" />
            <Text style={styles.doctorCardLocationText}>
              {doctor.address?.city}, {doctor.address?.state}
            </Text>
          </View>
        </View>

        <View style={styles.doctorCardActions}>
          <TouchableOpacity style={styles.viewProfileButton} onPress={onPress}>
            <Icon name="account" size={16} color="#2563eb" />
            <Text style={styles.viewProfileButtonText}>Profile</Text>
          </TouchableOpacity>

          {doctor.isAcceptingAppointments && (
            <TouchableOpacity
              style={styles.bookAppointmentButton}
              onPress={onBookAppointment}
            >
              <Icon name="calendar-plus" size={16} color="white" />
              <Text style={styles.bookAppointmentButtonText}>Book</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
