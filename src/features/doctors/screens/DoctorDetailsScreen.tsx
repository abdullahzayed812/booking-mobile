import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootState } from '../../../app/store';
import {
  useGetDoctorProfileQuery,
  useToggleAcceptingAppointmentsMutation,
} from '../../doctors/api/doctorApi';
import { useListAppointmentsQuery } from '../../appointments/api/appointmentApi';

import { DoctorOverview } from '../components/DoctorOverview';
import { DoctorAppointments } from '../components/DoctorAppointments';
import { DoctorAvailabilityPreview } from '../components/DoctorAvailabilityPreview';
import { DoctorReviews } from '../components/DoctorReviews';
import { BookAppointmentModal } from '../components/BookAppointmentModal';
import { styles } from '../styles/doctorStyles';

interface Props {
  navigation: any;
  route: {
    params: {
      doctorId: string;
    };
  };
}

export const DoctorDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { doctorId } = route.params;
  const { user } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState('overview');
  const [showBookModal, setShowBookModal] = useState(false);

  const { data: doctor, isLoading, error } = useGetDoctorProfileQuery(doctorId);

  const { data: appointments } = useListAppointmentsQuery({
    doctorId,
    limit: 10,
  });

  const [toggleAccepting, { isLoading: toggling }] =
    useToggleAcceptingAppointmentsMutation();

  const handleToggleAccepting = async () => {
    if (user?.role !== 'admin' && user?.id !== doctorId) return;

    Alert.alert(
      'Change Status',
      `${
        doctor?.isAcceptingAppointments ? 'Stop' : 'Start'
      } accepting new appointments?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: doctor?.isAcceptingAppointments
            ? 'Stop Accepting'
            : 'Start Accepting',
          onPress: async () => {
            try {
              await toggleAccepting(doctorId).unwrap();
              Alert.alert('Success', 'Status updated successfully');
            } catch (error) {
              Alert.alert('Error', 'Failed to update status');
            }
          },
        },
      ],
    );
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Loading doctor details...</Text>
      </View>
    );
  }

  if (error || !doctor) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Icon name="alert-circle" size={64} color="#ef4444" />
        <Text style={styles.errorTitle}>Unable to Load</Text>
        <Text style={styles.errorText}>
          Failed to load doctor details. Please try again.
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

  const canManage = user?.role === 'admin' || user?.id === doctorId;
  const canBook = user?.role === 'patient' && doctor.isAcceptingAppointments;

  const tabs = [
    { key: 'overview', label: 'Overview', icon: 'account' },
    { key: 'appointments', label: 'Schedule', icon: 'calendar' },
    { key: 'availability', label: 'Availability', icon: 'clock-outline' },
    { key: 'reviews', label: 'Reviews', icon: 'star' },
  ];

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

        <Text style={styles.detailHeaderTitle}>Doctor Profile</Text>

        {canManage && (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditDoctor', { doctorId })}
          >
            <Icon name="pencil" size={20} color="white" />
          </TouchableOpacity>
        )}
      </View>

      {/* Doctor Header Card */}
      <View style={styles.doctorHeaderCard}>
        <View style={styles.doctorAvatar}>
          <Text style={styles.doctorAvatarText}>
            {doctor.firstName[0]}
            {doctor.lastName[0]}
          </Text>
        </View>

        <View style={styles.doctorHeaderInfo}>
          <Text style={styles.doctorHeaderName}>
            Dr. {doctor.firstName} {doctor.lastName}
          </Text>
          <Text style={styles.doctorHeaderSpecialization}>
            {doctor.specialization}
          </Text>
          <Text style={styles.doctorHeaderExperience}>
            {doctor.experience} years experience
          </Text>

          {/* Status and Actions */}
          <View style={styles.doctorHeaderStatus}>
            <View
              style={[
                styles.statusIndicator,
                {
                  backgroundColor: doctor.isAcceptingAppointments
                    ? '#10b981'
                    : '#ef4444',
                },
              ]}
            />
            <Text style={styles.statusText}>
              {doctor.isAcceptingAppointments
                ? 'Accepting Patients'
                : 'Not Accepting'}
            </Text>
          </View>
        </View>

        <View style={styles.doctorHeaderActions}>
          {canBook && (
            <TouchableOpacity
              style={styles.bookButton}
              onPress={() => setShowBookModal(true)}
            >
              <Icon name="calendar-plus" size={20} color="white" />
              <Text style={styles.bookButtonText}>Book</Text>
            </TouchableOpacity>
          )}

          {canManage && (
            <TouchableOpacity
              style={[
                styles.toggleButton,
                {
                  backgroundColor: doctor.isAcceptingAppointments
                    ? '#ef4444'
                    : '#10b981',
                },
              ]}
              onPress={handleToggleAccepting}
              disabled={toggling}
            >
              {toggling ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <>
                  <Icon
                    name={doctor.isAcceptingAppointments ? 'pause' : 'play'}
                    size={16}
                    color="white"
                  />
                  <Text style={styles.toggleButtonText}>
                    {doctor.isAcceptingAppointments ? 'Pause' : 'Resume'}
                  </Text>
                </>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabBar}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Icon
              name={tab.icon}
              size={18}
              color={activeTab === tab.key ? '#2563eb' : '#6b7280'}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.tabTextActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <ScrollView
        style={styles.tabContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'overview' && <DoctorOverview doctor={doctor} />}

        {activeTab === 'appointments' && (
          <DoctorAppointments
            appointments={appointments?.appointments || []}
            doctorId={doctorId}
            onAppointmentPress={appointment =>
              navigation.navigate('AppointmentDetails', {
                appointmentId: appointment.id,
              })
            }
          />
        )}

        {activeTab === 'availability' && (
          <DoctorAvailabilityPreview
            doctorId={doctorId}
            onViewFull={() =>
              navigation.navigate('DoctorAvailability', { doctorId })
            }
          />
        )}

        {activeTab === 'reviews' && <DoctorReviews doctorId={doctorId} />}
      </ScrollView>

      {/* Book Appointment Modal */}
      <BookAppointmentModal
        visible={showBookModal}
        doctor={doctor}
        onClose={() => setShowBookModal(false)}
        onSuccess={() => {
          setShowBookModal(false);
          Alert.alert('Success', 'Appointment booked successfully!');
        }}
      />
    </View>
  );
};
