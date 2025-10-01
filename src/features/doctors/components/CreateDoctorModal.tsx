import React from 'react';
import { Modal } from 'react-native';
import { CreateDoctorForm } from './CreateDoctorForm';

interface CreateDoctorModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateDoctorModal: React.FC<CreateDoctorModalProps> = ({ isVisible, onClose, onSuccess }) => {
  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
      <CreateDoctorForm onCancel={onClose} onSuccess={onSuccess} />
    </Modal>
  );
};