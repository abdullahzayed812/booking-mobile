import React from 'react';
import { Modal } from 'react-native';
import { CreatePatientForm } from './CreatePatientForm';

interface CreatePatientModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreatePatientModal: React.FC<CreatePatientModalProps> = ({ isVisible, onClose, onSuccess }) => {
  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
      <CreatePatientForm onCancel={onClose} onSuccess={onSuccess} />
    </Modal>
  );
};