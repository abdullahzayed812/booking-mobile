import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useRealTime } from '../../../components/realtime/RealTimeProvider';
import {
  useGetAvailableSlotsQuery,
  useCreateOverrideMutation,
  useDeleteOverrideMutation,
} from '../api/doctorApi';
import { AvailableSlot } from '../../../types/appointments';

interface Props {
  doctorId: string;
  selectedDate: string;
  onSlotSelect?: (slot: AvailableSlot) => void;
  showOverrideControls?: boolean;
}

export const RealTimeAvailabilityCalendar: React.FC<Props> = ({
  doctorId,
  selectedDate,
  onSlotSelect,
  showOverrideControls = false,
}) => {
  const { subscribeToDoctorAvailability, unsubscribeFromDoctorAvailability } =
    useRealTime();
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  const {
    data: availableSlots = [],
    isLoading,
    refetch,
  } = useGetAvailableSlotsQuery({
    doctorId,
    date: selectedDate,
    duration: 30, // Default 30-minute slots
  });

  const [createOverride] = useCreateOverrideMutation();
  const [deleteOverride] = useDeleteOverrideMutation();

  useEffect(() => {
    subscribeToDoctorAvailability(doctorId);
    return () => {
      unsubscribeFromDoctorAvailability(doctorId);
    };
  }, [
    doctorId,
    subscribeToDoctorAvailability,
    unsubscribeFromDoctorAvailability,
  ]);

  const handleSlotPress = (slot: AvailableSlot) => {
    if (showOverrideControls) {
      const slotTime = slot.datetime;
      if (selectedSlots.includes(slotTime)) {
        setSelectedSlots(prev => prev.filter(s => s !== slotTime));
      } else {
        setSelectedSlots(prev => [...prev, slotTime]);
      }
    } else {
      onSlotSelect?.(slot);
    }
  };

  const handleCreateOverride = () => {
    if (selectedSlots.length === 0) {
      Alert.alert(
        'No slots selected',
        'Please select one or more slots to block',
      );
      return;
    }

    Alert.alert(
      'Block Selected Slots',
      `Are you sure you want to block ${selectedSlots.length} slot(s)?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Block',
          style: 'destructive',
          onPress: async () => {
            try {
              await createOverride({
                id: doctorId,
                override: {
                  date: selectedDate,
                  isAvailable: false,
                  reason: 'Manually blocked',
                  slots: selectedSlots.map(datetime => ({
                    startTime: new Date(datetime).toLocaleTimeString('en-US', {
                      hour12: false,
                      hour: '2-digit',
                      minute: '2-digit',
                    }),
                    endTime: new Date(
                      new Date(datetime).getTime() + 30 * 60000,
                    ).toLocaleTimeString('en-US', {
                      hour12: false,
                      hour: '2-digit',
                      minute: '2-digit',
                    }),
                    duration: 30,
                  })),
                },
              }).unwrap();

              setSelectedSlots([]);
              Alert.alert('Success', 'Slots have been blocked');
            } catch (error) {
              Alert.alert('Error', 'Failed to block slots');
            }
          },
        },
      ],
    );
  };

  const getSlotColor = (slot: AvailableSlot) => {
    const slotTime = slot.datetime;

    if (selectedSlots.includes(slotTime)) {
      return '#ef4444'; // Red for selected (to be blocked)
    }

    if (slot.isAvailable) {
      return '#10b981'; // Green for available
    } else {
      return '#6b7280'; // Gray for unavailable
    }
  };

  const getSlotTextColor = (slot: AvailableSlot) => {
    return slot.isAvailable || selectedSlots.includes(slot.datetime)
      ? 'white'
      : '#374151';
  };

  const formatTime = (datetime: string) => {
    return new Date(datetime).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <Text>Loading availability...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Availability for {new Date(selectedDate).toLocaleDateString()}
        </Text>
        {showOverrideControls && selectedSlots.length > 0 && (
          <TouchableOpacity
            style={styles.blockButton}
            onPress={handleCreateOverride}
          >
            <Text style={styles.blockButtonText}>
              Block {selectedSlots.length} slot(s)
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.slotsContainer}>
        {availableSlots.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              No slots available for this date
            </Text>
          </View>
        ) : (
          <View style={styles.slotsGrid}>
            {availableSlots.map((slot, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.slotButton,
                  { backgroundColor: getSlotColor(slot) },
                  !slot.isAvailable &&
                    !showOverrideControls &&
                    styles.disabledSlot,
                ]}
                onPress={() => handleSlotPress(slot)}
                disabled={!slot.isAvailable && !showOverrideControls}
              >
                <Text
                  style={[styles.slotText, { color: getSlotTextColor(slot) }]}
                >
                  {formatTime(slot.datetime)}
                </Text>
                <Text
                  style={[
                    styles.slotDuration,
                    { color: getSlotTextColor(slot) },
                  ]}
                >
                  {slot.duration}min
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {showOverrideControls && (
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: '#10b981' }]}
            />
            <Text style={styles.legendText}>Available</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: '#6b7280' }]}
            />
            <Text style={styles.legendText}>Blocked</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: '#ef4444' }]}
            />
            <Text style={styles.legendText}>Selected to block</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  blockButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  blockButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  slotsContainer: {
    padding: 16,
  },
  empty: {
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  slotButton: {
    width: '30%',
    aspectRatio: 2,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  disabledSlot: {
    opacity: 0.6,
  },
  slotText: {
    fontSize: 14,
    fontWeight: '600',
  },
  slotDuration: {
    fontSize: 12,
    marginTop: 2,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#4b5563',
  },
});
