import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { styles } from '../../screens/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  visible: boolean;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onClose: () => void;
}

export const DatePickerModal: React.FC<Props> = ({
  visible,
  // selectedDate,
  onDateChange,
  onClose,
}) => {
  const handleDateSelect = (date: Date) => {
    onDateChange(date);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.datePickerContainer}>
          <View style={styles.datePickerHeader}>
            <Text style={styles.datePickerTitle}>Select Date</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>

          {/* Simple calendar implementation */}
          <View style={styles.calendarGrid}>
            {/* You can implement a proper calendar here or use a library */}
            <Text style={styles.calendarPlaceholder}>
              Calendar component would go here
            </Text>
          </View>

          <View style={styles.datePickerActions}>
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => handleDateSelect(new Date())}
            >
              <Text style={styles.datePickerButtonText}>Today</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.datePickerButton, styles.primaryButton]}
              onPress={onClose}
            >
              <Text
                style={[styles.datePickerButtonText, styles.primaryButtonText]}
              >
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
