import React from 'react';
import { Modal } from 'react-native';
import { CreateAppointmentForm } from '../../../components/forms/CreateAppointmentForm';

interface CreateAppointmentModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateAppointmentModal: React.FC<CreateAppointmentModalProps> = ({
  isVisible,
  onClose,
  onSuccess,
}) => {
  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
      <CreateAppointmentForm onCancel={onClose} onSuccess={onSuccess} />
    </Modal>
  );
};
