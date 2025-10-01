import React from 'react';
import { Modal, View, Text, Button } from 'react-native';

interface CreateMedicalNoteModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export const CreateMedicalNoteModal: React.FC<CreateMedicalNoteModalProps> = ({ isVisible, onClose }) => {
  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Create Medical Note</Text>
        <Button title="Close" onPress={onClose} />
      </View>
    </Modal>
  );
};
