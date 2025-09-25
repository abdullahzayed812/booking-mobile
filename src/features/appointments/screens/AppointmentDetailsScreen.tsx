import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootState } from '../../../app/store';
import {
  useGetAppointmentQuery,
  useCancelAppointmentMutation,
  useConfirmAppointmentMutation,
  useStartAppointmentMutation,
  useCompleteAppointmentMutation,
  useMarkNoShowMutation,
} from '../api/appointmentApi';

import { AppointmentInfo } from '../components/AppointmentInfo';
import { AppointmentParticipants } from '../components/AppointmentParticipants';
import { AppointmentActions } from '../components/AppointmentActions';
import { AppointmentNotes } from '../components/AppointmentNotes';
import { RescheduleModal } from '../components/RescheduleModal';
import { styles } from '../styles/appointmentStyles';

interface Props {
  navigation: any;
  route: {
    params: {
      appointmentId: string;
    };
  };
}

export const AppointmentDetailsScreen: React.FC<Props> = ({
  navigation,
  route,
}) => {
  const { appointmentId } = route.params;
  const { user } = useSelector((state: RootState) => state.auth);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);

  const {
    data: appointment,
    isLoading,
    error,
  } = useGetAppointmentQuery(appointmentId);

  const [cancelAppointment, { isLoading: cancelling }] =
    useCancelAppointmentMutation();
  const [confirmAppointment, { isLoading: confirming }] =
    useConfirmAppointmentMutation();
  const [startAppointment, { isLoading: starting }] =
    useStartAppointmentMutation();
  const [completeAppointment, { isLoading: completing }] =
    useCompleteAppointmentMutation();
  const [markNoShow, { isLoading: markingNoShow }] = useMarkNoShowMutation();

  const handleCancel = () => {
    Alert.alert(
      'Cancel Appointment',
      'Are you sure you want to cancel this appointment? This action cannot be undone.',
      [
        { text: 'Keep Appointment', style: 'cancel' },
        {
          text: 'Cancel Appointment',
          style: 'destructive',
          onPress: async () => {
            try {
              await cancelAppointment(appointmentId).unwrap();
              Alert.alert('Success', 'Appointment cancelled successfully');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Failed to cancel appointment');
            }
          },
        },
      ],
    );
  };

  const handleConfirm = async () => {
    try {
      await confirmAppointment(appointmentId).unwrap();
      Alert.alert('Success', 'Appointment confirmed successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to confirm appointment');
    }
  };

  const handleStart = async () => {
    try {
      await startAppointment(appointmentId).unwrap();
      Alert.alert('Success', 'Appointment started');
    } catch (error) {
      Alert.alert('Error', 'Failed to start appointment');
    }
  };

  const handleComplete = async () => {
    Alert.alert('Complete Appointment', 'Mark this appointment as completed?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Complete',
        onPress: async () => {
          try {
            await completeAppointment(appointmentId).unwrap();
            Alert.alert('Success', 'Appointment completed');
            navigation.navigate('CreateMedicalNote', {
              appointmentId,
              patientId: appointment?.patientId,
            });
          } catch (error) {
            Alert.alert('Error', 'Failed to complete appointment');
          }
        },
      },
    ]);
  };

  const handleNoShow = async () => {
    Alert.alert('Mark as No Show', 'Mark this appointment as no show?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Mark No Show',
        style: 'destructive',
        onPress: async () => {
          try {
            await markNoShow(appointmentId).unwrap();
            Alert.alert('Success', 'Appointment marked as no show');
          } catch (error) {
            Alert.alert('Error', 'Failed to mark appointment');
          }
        },
      },
    ]);
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Loading appointment details...</Text>
      </View>
    );
  }

  if (error || !appointment) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Icon name="alert-circle" size={64} color="#ef4444" />
        <Text style={styles.errorTitle}>Unable to Load</Text>
        <Text style={styles.errorText}>
          Failed to load appointment details. Please try again.
        </Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.retryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const canModify =
    user?.role === 'doctor' ||
    user?.role === 'admin' ||
    (user?.role === 'patient' && appointment.patientId === user.id);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.detailHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>

        <Text style={styles.detailHeaderTitle}>Appointment Details</Text>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => {
            // Show action sheet with more options
          }}
        >
          <Icon name="dots-vertical" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.detailContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Appointment Info */}
        <AppointmentInfo appointment={appointment} />

        {/* Participants */}
        <AppointmentParticipants
          appointment={appointment}
          userRole={user?.role}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          onContactPress={(type: any, contactInfo: any) => {
            // Handle contact actions
          }}
        />

        {/* Action Buttons */}
        {canModify && (
          <AppointmentActions
            appointment={appointment}
            userRole={user?.role}
            onCancel={handleCancel}
            onConfirm={handleConfirm}
            onStart={handleStart}
            onComplete={handleComplete}
            onNoShow={handleNoShow}
            onReschedule={() => setShowRescheduleModal(true)}
            isLoading={{
              cancelling,
              confirming,
              starting,
              completing,
              markingNoShow,
            }}
          />
        )}

        {/* Medical Notes Section */}
        {appointment.status === 'completed' && (
          <AppointmentNotes
            appointmentId={appointmentId}
            userRole={user?.role}
            onCreateNote={() =>
              navigation.navigate('CreateMedicalNote', {
                appointmentId,
                patientId: appointment.patientId,
              })
            }
            onNotePress={(noteId: any) =>
              navigation.navigate('MedicalNoteDetails', { noteId })
            }
          />
        )}
      </ScrollView>

      {/* Reschedule Modal */}
      <RescheduleModal
        visible={showRescheduleModal}
        appointment={appointment}
        onClose={() => setShowRescheduleModal(false)}
        onSuccess={() => {
          setShowRescheduleModal(false);
          Alert.alert('Success', 'Appointment rescheduled successfully');
        }}
      />
    </View>
  );
};
