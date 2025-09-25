import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../styles/appointmentStyles';

interface Props {
  appointment: any;
  userRole?: string;
  onCancel: () => void;
  onConfirm: () => void;
  onStart: () => void;
  onComplete: () => void;
  onNoShow: () => void;
  onReschedule: () => void;
  isLoading: {
    cancelling: boolean;
    confirming: boolean;
    starting: boolean;
    completing: boolean;
    markingNoShow: boolean;
  };
}

export const AppointmentActions: React.FC<Props> = ({
  appointment,
  userRole,
  onCancel,
  onConfirm,
  onStart,
  onComplete,
  onNoShow,
  onReschedule,
  isLoading,
}) => {
  const canCancel = ['scheduled', 'confirmed'].includes(appointment.status);
  const canConfirm = appointment.status === 'scheduled';
  const canStart = appointment.status === 'confirmed' && userRole === 'doctor';
  const canComplete =
    appointment.status === 'in_progress' && userRole === 'doctor';
  const canMarkNoShow =
    ['scheduled', 'confirmed'].includes(appointment.status) &&
    userRole === 'doctor';
  const canReschedule = ['scheduled', 'confirmed'].includes(appointment.status);

  if (
    !canCancel &&
    !canConfirm &&
    !canStart &&
    !canComplete &&
    !canMarkNoShow &&
    !canReschedule
  ) {
    return null;
  }

  return (
    <View style={styles.actionsSection}>
      <Text style={styles.sectionTitle}>Actions</Text>

      <View style={styles.actionButtons}>
        {canConfirm && (
          <TouchableOpacity
            style={[styles.actionButton, styles.confirmButton]}
            onPress={onConfirm}
            disabled={isLoading.confirming}
          >
            {isLoading.confirming ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <>
                <Icon name="check" size={16} color="white" />
                <Text style={styles.actionButtonText}>Confirm</Text>
              </>
            )}
          </TouchableOpacity>
        )}

        {canStart && (
          <TouchableOpacity
            style={[styles.actionButton, styles.startButton]}
            onPress={onStart}
            disabled={isLoading.starting}
          >
            {isLoading.starting ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <>
                <Icon name="play" size={16} color="white" />
                <Text style={styles.actionButtonText}>Start</Text>
              </>
            )}
          </TouchableOpacity>
        )}

        {canComplete && (
          <TouchableOpacity
            style={[styles.actionButton, styles.completeButton]}
            onPress={onComplete}
            disabled={isLoading.completing}
          >
            {isLoading.completing ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <>
                <Icon name="check-circle" size={16} color="white" />
                <Text style={styles.actionButtonText}>Complete</Text>
              </>
            )}
          </TouchableOpacity>
        )}

        {canReschedule && (
          <TouchableOpacity
            style={[styles.actionButton, styles.rescheduleButton]}
            onPress={onReschedule}
          >
            <Icon name="calendar-edit" size={16} color="#2563eb" />
            <Text style={[styles.actionButtonText, { color: '#2563eb' }]}>
              Reschedule
            </Text>
          </TouchableOpacity>
        )}

        {canCancel && (
          <TouchableOpacity
            style={[styles.actionButton, styles.cancelButton]}
            onPress={onCancel}
            disabled={isLoading.cancelling}
          >
            {isLoading.cancelling ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <>
                <Icon name="close" size={16} color="white" />
                <Text style={styles.actionButtonText}>Cancel</Text>
              </>
            )}
          </TouchableOpacity>
        )}

        {canMarkNoShow && (
          <TouchableOpacity
            style={[styles.actionButton, styles.noShowButton]}
            onPress={onNoShow}
            disabled={isLoading.markingNoShow}
          >
            {isLoading.markingNoShow ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <>
                <Icon name="account-remove" size={16} color="white" />
                <Text style={styles.actionButtonText}>No Show</Text>
              </>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
