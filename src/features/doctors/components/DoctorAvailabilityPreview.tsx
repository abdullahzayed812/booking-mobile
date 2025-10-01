
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../styles/doctorStyles';

interface Props {
  doctorId: string;
  onViewFull: () => void;
}

export const DoctorAvailabilityPreview: React.FC<Props> = ({
  doctorId,
  onViewFull,
}) => {
  // TODO: Fetch doctor's upcoming availability
  const availability: any[] = [];

  return (
    <View style={styles.availabilityContainer}>
      <Text style={styles.sectionTitle}>Next Available Slots</Text>
      {availability.length === 0 ? (
        <View style={styles.emptyState}>
          <Icon name="calendar-remove" size={48} color="#d1d5db" />
          <Text style={styles.emptyStateTitle}>No Availability Found</Text>
          <Text style={styles.emptyStateSubtitle}>This doctor has no upcoming availability.</Text>
        </View>
      ) : (
        <View>
          {availability.map((slot, index) => (
            <View key={index} style={styles.availabilitySlot}>
              <Text style={styles.availabilityDate}>{new Date(slot.date).toLocaleDateString()}</Text>
              <Text style={styles.availabilityTime}>{slot.time}</Text>
            </View>
          ))}
          <TouchableOpacity style={styles.viewFullButton} onPress={onViewFull}>
            <Text style={styles.viewFullButtonText}>View Full Availability</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
