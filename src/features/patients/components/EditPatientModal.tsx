
import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../styles/patientStyles';

interface Props {
  visible: boolean;
  patient: any;
  onClose: () => void;
  onSuccess: () => void;
}

export const EditPatientModal: React.FC<Props> = ({
  visible,
  patient,
  onClose,
  onSuccess,
}) => {
  const [firstName, setFirstName] = useState(patient?.firstName || '');
  const [lastName, setLastName] = useState(patient?.lastName || '');
  const [email, setEmail] = useState(patient?.email || '');
  const [phone, setPhone] = useState(patient?.phone || '');

  const handleSave = () => {
    // TODO: Implement save logic
    Alert.alert('Success', 'Patient details updated successfully!');
    onSuccess();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Patient Details</Text>

          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.modalButton} onPress={onClose}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonConfirm]}
              onPress={handleSave}
            >
              <Text style={[styles.modalButtonText, { color: 'white' }]}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
