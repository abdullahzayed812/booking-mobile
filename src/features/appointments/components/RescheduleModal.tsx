
import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { styles } from '../styles/appointmentStyles';

interface Props {
  visible: boolean;
  appointment: any;
  onClose: () => void;
  onSuccess: () => void;
}

export const RescheduleModal: React.FC<Props> = ({ visible, appointment, onClose, onSuccess }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleReschedule = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Error', 'Please select a date and time.');
      return;
    }

    // TODO: Implement reschedule logic
    Alert.alert('Success', `Appointment rescheduled to ${selectedDate} at ${selectedTime}`
    , [
      { text: 'OK', onPress: onSuccess },
    ]);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Reschedule Appointment</Text>

          <Calendar
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: '#2563eb' },
            }}
          />

          {/* TODO: Add time selection UI */}

          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.modalButton} onPress={onClose}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.modalButtonConfirm]} onPress={handleReschedule}>
              <Text style={[styles.modalButtonText, { color: 'white' }]}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
