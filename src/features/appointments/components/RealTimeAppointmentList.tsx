import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Alert,
} from 'react-native';
import { useRealTime } from '../../../components/realtime/RealTimeProvider';
import {
  useListAppointmentsQuery,
  useCancelAppointmentMutation,
  useConfirmAppointmentMutation,
} from '../api/appointmentApi';
import { Appointment } from '../../../types/appointments';

interface Props {
  doctorId?: string;
  patientId?: string;
  onAppointmentPress?: (appointment: Appointment) => void;
}

export const RealTimeAppointmentList: React.FC<Props> = ({
  doctorId,
  patientId,
  onAppointmentPress,
}) => {
  const { websocket } = useRealTime();
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: appointmentsData,
    isLoading,
    refetch,
  } = useListAppointmentsQuery({
    doctorId,
    patientId,
    limit: 50,
  });

  const [cancelAppointment] = useCancelAppointmentMutation();
  const [confirmAppointment] = useConfirmAppointmentMutation();

  useEffect(() => {
    // Subscribe to real-time updates for appointments
    if (doctorId) {
      websocket.emit('subscribe:doctor_appointments', { doctorId });
    }
    if (patientId) {
      websocket.emit('subscribe:patient_appointments', { patientId });
    }

    return () => {
      if (doctorId) {
        websocket.emit('unsubscribe:doctor_appointments', { doctorId });
      }
      if (patientId) {
        websocket.emit('unsubscribe:patient_appointments', { patientId });
      }
    };
  }, [doctorId, patientId, websocket]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleCancelAppointment = (appointmentId: string) => {
    Alert.alert(
      'Cancel Appointment',
      'Are you sure you want to cancel this appointment?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            cancelAppointment(appointmentId);
          },
        },
      ],
    );
  };

  const handleConfirmAppointment = (appointmentId: string) => {
    confirmAppointment(appointmentId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return '#f59e0b';
      case 'confirmed':
        return '#10b981';
      case 'in_progress':
        return '#3b82f6';
      case 'completed':
        return '#6b7280';
      case 'cancelled':
        return '#ef4444';
      case 'no_show':
        return '#f87171';
      default:
        return '#6b7280';
    }
  };

  const renderAppointmentItem = ({ item }: { item: Appointment }) => (
    <TouchableOpacity
      style={styles.appointmentItem}
      onPress={() => onAppointmentPress?.(item)}
    >
      <View style={styles.appointmentHeader}>
        <View>
          <Text style={styles.patientName}>
            {item.patient?.firstName} {item.patient?.lastName}
          </Text>
          <Text style={styles.doctorName}>
            Dr. {item.doctor?.firstName} {item.doctor?.lastName}
          </Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) },
          ]}
        >
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.appointmentDetails}>
        <Text style={styles.dateTime}>
          {new Date(item.scheduledAt).toLocaleDateString()} at{' '}
          {new Date(item.scheduledAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
        <Text style={styles.reason}>{item.reason}</Text>
        <Text style={styles.duration}>{item.duration} minutes</Text>
      </View>

      {item.status === 'scheduled' && (
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.confirmButton]}
            onPress={() => handleConfirmAppointment(item.id)}
          >
            <Text style={styles.actionButtonText}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.cancelButton]}
            onPress={() => handleCancelAppointment(item.id)}
          >
            <Text style={styles.actionButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <Text>Loading appointments...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={appointmentsData?.appointments || []}
      renderItem={renderAppointmentItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No appointments found</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
  },
  appointmentItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  patientName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  doctorName: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  appointmentDetails: {
    marginBottom: 12,
  },
  dateTime: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 4,
  },
  reason: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 4,
  },
  duration: {
    fontSize: 14,
    color: '#6b7280',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#10b981',
  },
  cancelButton: {
    backgroundColor: '#ef4444',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});
