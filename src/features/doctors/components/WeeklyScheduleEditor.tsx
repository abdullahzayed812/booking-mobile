import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useGetAvailabilityQuery, useSetWeeklyScheduleMutation } from '../api/doctorApi';
import { styles } from '../styles/doctorStyles';
import { DayOfWeek, WeeklySchedule } from '../../../types/doctors';

interface WeeklyScheduleEditorProps {
  doctorId: string;
  currentSchedule?: WeeklySchedule;
  canEdit: boolean;
  onScheduleUpdate: () => void;
}

const DAYS_OF_WEEK: DayOfWeek[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const WeeklyScheduleEditor: React.FC<WeeklyScheduleEditorProps> = ({
  doctorId,
  currentSchedule,
  canEdit,
  onScheduleUpdate,
}) => {
  const { data: schedule, isLoading } = useGetAvailabilityQuery(doctorId, {
    skip: !!currentSchedule,
  });
  const [setWeeklySchedule, { isLoading: isUpdating }] = useSetWeeklyScheduleMutation();

  const [localSchedule, setLocalSchedule] = useState<WeeklySchedule | undefined>(
    currentSchedule || schedule,
  );

  useEffect(() => {
    if (schedule) {
      setLocalSchedule(schedule);
    }
  }, [schedule]);

  const handleTimeChange = (day: DayOfWeek, field: 'startTime' | 'endTime', time: string) => {
    if (!localSchedule) return;

    const updatedSlots = localSchedule[day]?.map(slot => ({ ...slot })) || [];
    // For simplicity, we assume one slot per day in this editor
    if (updatedSlots.length > 0) {
      updatedSlots[0][field] = time;
    } else {
      updatedSlots.push({ startTime: '09:00', endTime: '17:00', [field]: time });
    }

    setLocalSchedule({
      ...localSchedule,
      [day]: updatedSlots,
    });
  };

  const handleSaveChanges = async () => {
    if (!localSchedule) return;

    try {
      await setWeeklySchedule({ id: doctorId, schedule: localSchedule }).unwrap();
      onScheduleUpdate();
    } catch (error) {
      Alert.alert('Error', 'Failed to update schedule.');
    }
  };

  if (isLoading) {
    return <ActivityIndicator style={{ marginTop: 20 }} />;
  }

  return (
    <View style={styles.scheduleEditorContainer}>
      {DAYS_OF_WEEK.map(day => (
        <View key={day} style={styles.dayEditorRow}>
          <Text style={styles.dayLabel}>{day}</Text>
          {/* Time inputs would go here. For brevity, this is a simplified view */}
          <View style={styles.timeInputContainer}>
            <Text>09:00 AM - 05:00 PM</Text>
          </View>
        </View>
      ))}

      {canEdit && (
        <TouchableOpacity
          style={[styles.saveButton, isUpdating && styles.saveButtonDisabled]}
          onPress={handleSaveChanges}
          disabled={isUpdating}
        >
          {isUpdating ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.saveButtonText}>Save Changes</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};