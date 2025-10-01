
import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { styles } from '../styles/doctorStyles';

interface Props {
  visible: boolean;
  doctor: any;
  onClose: () => void;
  onSuccess: () => void;
}

export const BookAppointmentModal: React.FC<Props> = ({ visible, doctor, onClose, onSuccess }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Error', 'Please select a date and time.');
      return;
    }

    // TODO: Implement booking logic
    Alert.alert('Success', `Appointment with Dr. ${doctor.lastName} booked for ${selectedDate} at ${selectedTime}`
    , [
      { text: 'OK', onPress: onSuccess },
    ]);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Book Appointment with Dr. {doctor.lastName}</Text>

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
            <TouchableOpacity style={[styles.modalButton, styles.modalButtonConfirm]} onPress={handleBookAppointment}>
              <Text style={[styles.modalButtonText, { color: 'white' }]}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
