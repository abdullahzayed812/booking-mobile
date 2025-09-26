import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootState } from '../../../app/store';
import {
  useGetDoctorProfileQuery,
  useGetAvailabilityQuery,
  useToggleAcceptingAppointmentsMutation,
} from '../../doctors/api/doctorApi';

import { RealTimeAvailabilityCalendar } from '../components/RealTimeAvailabilityCalendar';
import { WeeklyScheduleEditor } from '../components/WeeklyScheduleEditor';
import { DatePickerModal } from '../components/DatePickerModal';
import { styles } from '../styles/doctorStyles';

interface Props {
  navigation: any;
  route: {
    params: {
      doctorId: string;
    };
  };
}

export const DoctorAvailabilityScreen: React.FC<Props> = ({
  navigation,
  route,
}) => {
  const { doctorId } = route.params;
  const { user } = useSelector((state: RootState) => state.auth);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [showWeeklyEditor, setShowWeeklyEditor] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { data: doctor } = useGetDoctorProfileQuery(doctorId);
  const { data: availability } = useGetAvailabilityQuery(doctorId);
  const [toggleAccepting, { isLoading: toggleLoading }] =
    useToggleAcceptingAppointmentsMutation();

  const isOwnProfile = user?.id === doctorId;
  const canManage = user?.role === 'admin' || isOwnProfile;

  const handleToggleAccepting = async () => {
    try {
      await toggleAccepting(doctorId).unwrap();
      Alert.alert(
        'Success',
        `Now ${
          doctor?.isAcceptingAppointments ? 'not accepting' : 'accepting'
        } appointments`,
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to update appointment status');
    }
  };

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

        <View style={styles.headerCenter}>
          <Text style={styles.detailHeaderTitle}>
            {isOwnProfile ? 'My Availability' : 'Doctor Availability'}
          </Text>
          {doctor && (
            <Text style={styles.headerSubtitle}>
              Dr. {doctor.firstName} {doctor.lastName}
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => {
            // Show options menu
          }}
        >
          <Icon name="dots-vertical" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Status Card */}
        <View style={styles.availabilityStatusCard}>
          <View style={styles.statusCardHeader}>
            <Icon
              name={
                doctor?.isAcceptingAppointments
                  ? 'check-circle'
                  : 'pause-circle'
              }
              size={32}
              color={doctor?.isAcceptingAppointments ? '#10b981' : '#ef4444'}
            />
            <View style={styles.statusCardInfo}>
              <Text style={styles.statusCardTitle}>
                {doctor?.isAcceptingAppointments
                  ? 'Accepting Appointments'
                  : 'Not Accepting'}
              </Text>
              <Text style={styles.statusCardSubtitle}>
                {doctor?.isAcceptingAppointments
                  ? 'Patients can book appointments with you'
                  : 'Appointment booking is currently paused'}
              </Text>
            </View>
          </View>

          {canManage && (
            <TouchableOpacity
              style={[
                styles.statusToggleButton,
                {
                  backgroundColor: doctor?.isAcceptingAppointments
                    ? '#ef4444'
                    : '#10b981',
                },
              ]}
              onPress={handleToggleAccepting}
              disabled={toggleLoading}
            >
              <Text style={styles.statusToggleButtonText}>
                {doctor?.isAcceptingAppointments
                  ? 'Pause Appointments'
                  : 'Resume Appointments'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* View Toggle */}
        {canManage && (
          <View style={styles.viewToggleSection}>
            <Text style={styles.sectionTitle}>Manage Availability</Text>

            <View style={styles.viewToggleButtons}>
              <TouchableOpacity
                style={[
                  styles.viewToggleButton,
                  !showWeeklyEditor && styles.viewToggleButtonActive,
                ]}
                onPress={() => setShowWeeklyEditor(false)}
              >
                <Icon
                  name="calendar-today"
                  size={18}
                  color={!showWeeklyEditor ? 'white' : '#6b7280'}
                />
                <Text
                  style={[
                    styles.viewToggleButtonText,
                    !showWeeklyEditor && styles.viewToggleButtonTextActive,
                  ]}
                >
                  Daily Calendar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.viewToggleButton,
                  showWeeklyEditor && styles.viewToggleButtonActive,
                ]}
                onPress={() => setShowWeeklyEditor(true)}
              >
                <Icon
                  name="calendar-week"
                  size={18}
                  color={showWeeklyEditor ? 'white' : '#6b7280'}
                />
                <Text
                  style={[
                    styles.viewToggleButtonText,
                    showWeeklyEditor && styles.viewToggleButtonTextActive,
                  ]}
                >
                  Weekly Schedule
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Date Selector (for daily view) */}
        {!showWeeklyEditor && (
          <View style={styles.dateSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Select Date</Text>
              <View style={styles.dateActions}>
                <TouchableOpacity
                  style={styles.todayButton}
                  onPress={() =>
                    setSelectedDate(new Date().toISOString().split('T')[0])
                  }
                >
                  <Text style={styles.todayButtonText}>Today</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.datePickerButton}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Icon name="calendar" size={16} color="#2563eb" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.selectedDateCard}>
              <Text style={styles.selectedDateText}>
                {new Date(selectedDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
            </View>
          </View>
        )}

        {/* Content */}
        {showWeeklyEditor ? (
          <WeeklyScheduleEditor
            doctorId={doctorId}
            currentSchedule={availability}
            canEdit={canManage}
            onScheduleUpdate={() => {
              Alert.alert('Success', 'Weekly schedule updated');
            }}
          />
        ) : (
          <RealTimeAvailabilityCalendar
            doctorId={doctorId}
            selectedDate={selectedDate}
            showOverrideControls={canManage}
          />
        )}
      </ScrollView>

      {/* Date Picker Modal */}
      <DatePickerModal
        visible={showDatePicker}
        selectedDate={new Date(selectedDate)}
        onDateChange={date => {
          setSelectedDate(date.toISOString().split('T')[0]);
          setShowDatePicker(false);
        }}
        onClose={() => setShowDatePicker(false)}
      />
    </View>
  );
};
