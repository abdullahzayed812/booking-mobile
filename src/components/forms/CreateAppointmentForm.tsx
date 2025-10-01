import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import {
  useCreateAppointmentMutation,
  useGetAvailableSlotsQuery,
} from '../../features/appointments/api/appointmentApi';
import { useListDoctorsQuery } from '../../features/doctors/api/doctorApi';
// import { useListPatientsQuery } from '../../features/patients/api/patientApi';
import { styles } from '../../screens/styles';

const appointmentSchema = z.object({
  patientId: z.string().min(1, 'Patient is required'),
  doctorId: z.string().min(1, 'Doctor is required'),
  scheduledAt: z.string().min(1, 'Date and time is required'),
  duration: z.number().min(15, 'Minimum duration is 15 minutes'),
  reason: z.string().min(5, 'Reason must be at least 5 characters'),
  notes: z.string().optional(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

interface Props {
  doctorId?: string;
  patientId?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const CreateAppointmentForm: React.FC<Props> = ({
  doctorId: initialDoctorId,
  patientId: initialPatientId,
  onSuccess,
  onCancel,
}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [selectedDate, setSelectedDate] = useState('');

  const [createAppointment, { isLoading }] = useCreateAppointmentMutation();

  const { data: doctors = [] } = useListDoctorsQuery({
    acceptingAppointments: true,
    limit: 50,
  });

  // const { data: patientsData } = useListPatientsQuery({ limit: 100 });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      patientId: initialPatientId || (user?.role === 'patient' ? user.id : ''),
      doctorId: initialDoctorId || '',
      scheduledAt: '',
      duration: 30,
      reason: '',
      notes: '',
    },
  });

  const selectedDoctorId = watch('doctorId');
  // const selectedDateTime = watch('scheduledAt');

  const { data: availableSlots = [] } = useGetAvailableSlotsQuery(
    {
      doctorId: selectedDoctorId,
      date: selectedDate,
      duration: watch('duration'),
    },
    {
      skip: !selectedDoctorId || !selectedDate,
    },
  );

  const onSubmit = async (data: AppointmentFormData) => {
    try {
      await createAppointment(data).unwrap();
      Alert.alert('Success', 'Appointment booked successfully!');
      onSuccess();
    } catch (error: any) {
      Alert.alert(
        'Booking Failed',
        error?.data?.message || 'Failed to book appointment',
      );
    }
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setValue('scheduledAt', '');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.formContainer}>
        {/* Header */}
        <View style={styles.formHeader}>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Icon name="close" size={24} color="#6b7280" />
          </TouchableOpacity>
          <Text style={styles.formTitle}>Book Appointment</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Doctor Selection */}
        {!initialDoctorId && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Doctor</Text>
            <Controller
              control={control}
              name="doctorId"
              render={({ field: { onChange, value } }) => (
                <View style={styles.doctorsList}>
                  {doctors?.map(doctor => (
                    <TouchableOpacity
                      key={doctor.id}
                      style={[
                        styles.doctorOption,
                        value === doctor.id && styles.doctorOptionSelected,
                      ]}
                      onPress={() => onChange(doctor.id)}
                    >
                      <View style={styles.doctorAvatar}>
                        <Text style={styles.doctorAvatarText}>
                          {doctor.firstName[0]}
                          {doctor.lastName[0]}
                        </Text>
                      </View>
                      <View style={styles.doctorInfo}>
                        <Text style={styles.doctorName}>
                          Dr. {doctor.firstName} {doctor.lastName}
                        </Text>
                        <Text style={styles.doctorSpecialization}>
                          {doctor.specialization}
                        </Text>
                        <Text style={styles.doctorExperience}>
                          {doctor.experience} years experience
                        </Text>
                      </View>
                      {value === doctor.id && (
                        <Icon name="check-circle" size={24} color="#10b981" />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            />
            {errors.doctorId && (
              <Text style={styles.errorText}>{errors.doctorId.message}</Text>
            )}
          </View>
        )}

        {/* Patient Selection (for doctors/admins) */}
        {user?.role !== 'patient' && !initialPatientId && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Patient</Text>
            <Controller
              control={control}
              name="patientId"
              render={() => (
                <View style={styles.patientSearch}>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search patients by name or email..."
                    placeholderTextColor="#9ca3af"
                  />
                  {/* Add patient search results here */}
                </View>
              )}
            />
            {errors.patientId && (
              <Text style={styles.errorText}>{errors.patientId.message}</Text>
            )}
          </View>
        )}

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dateScroll}
          >
            {Array.from({ length: 14 }, (_, i) => {
              const date = new Date();
              date.setDate(date.getDate() + i);
              const dateString = date.toISOString().split('T')[0];
              const isSelected = selectedDate === dateString;
              const isToday = i === 0;

              return (
                <TouchableOpacity
                  key={dateString}
                  style={[
                    styles.dateCard,
                    isSelected && styles.dateCardSelected,
                    isToday && styles.dateCardToday,
                  ]}
                  onPress={() => handleDateSelect(dateString)}
                >
                  <Text
                    style={[
                      styles.dateDayName,
                      isSelected && styles.dateTextSelected,
                      isToday && styles.dateTextToday,
                    ]}
                  >
                    {isToday
                      ? 'Today'
                      : date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </Text>
                  <Text
                    style={[
                      styles.dateNumber,
                      isSelected && styles.dateTextSelected,
                      isToday && styles.dateTextToday,
                    ]}
                  >
                    {date.getDate()}
                  </Text>
                  <Text
                    style={[
                      styles.dateMonth,
                      isSelected && styles.dateTextSelected,
                      isToday && styles.dateTextToday,
                    ]}
                  >
                    {date.toLocaleDateString('en-US', { month: 'short' })}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Time Selection */}
        {selectedDate && selectedDoctorId && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Available Times</Text>
            <Controller
              control={control}
              name="scheduledAt"
              render={({ field: { onChange, value } }) => (
                <View style={styles.timeSlotsGrid}>
                  {availableSlots.map((slot, index) => {
                    const isSelected = value === slot.datetime;
                    const timeString = new Date(
                      slot.datetime,
                    ).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    });

                    return (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.timeSlot,
                          !slot.isAvailable && styles.timeSlotDisabled,
                          isSelected && styles.timeSlotSelected,
                        ]}
                        onPress={() =>
                          slot.isAvailable && onChange(slot.datetime)
                        }
                        disabled={!slot.isAvailable}
                      >
                        <Text
                          style={[
                            styles.timeSlotText,
                            !slot.isAvailable && styles.timeSlotTextDisabled,
                            isSelected && styles.timeSlotTextSelected,
                          ]}
                        >
                          {timeString}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            />
            {errors.scheduledAt && (
              <Text style={styles.errorText}>{errors.scheduledAt.message}</Text>
            )}
          </View>
        )}

        {/* Duration */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Duration</Text>
          <Controller
            control={control}
            name="duration"
            render={({ field: { onChange, value } }) => (
              <View style={styles.durationOptions}>
                {[15, 30, 45, 60].map(duration => (
                  <TouchableOpacity
                    key={duration}
                    style={[
                      styles.durationOption,
                      value === duration && styles.durationOptionSelected,
                    ]}
                    onPress={() => onChange(duration)}
                  >
                    <Text
                      style={[
                        styles.durationOptionText,
                        value === duration && styles.durationOptionTextSelected,
                      ]}
                    >
                      {duration} min
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          />
        </View>

        {/* Reason */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reason for Visit</Text>
          <Controller
            control={control}
            name="reason"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.textArea, errors.reason && styles.inputError]}
                placeholder="Please describe the reason for your appointment..."
                value={value}
                onChangeText={onChange}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                placeholderTextColor="#9ca3af"
              />
            )}
          />
          {errors.reason && (
            <Text style={styles.errorText}>{errors.reason.message}</Text>
          )}
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Notes (Optional)</Text>
          <Controller
            control={control}
            name="notes"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.textArea}
                placeholder="Any additional information or special requests..."
                value={value}
                onChangeText={onChange}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                placeholderTextColor="#9ca3af"
              />
            )}
          />
        </View>

        {/* Submit Button */}
        <View style={styles.submitSection}>
          <TouchableOpacity
            style={[
              styles.submitButton,
              isLoading && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Icon name="calendar-plus" size={20} color="white" />
                <Text style={styles.submitButtonText}>Book Appointment</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
