import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/medicalNotesStyles';

interface MedicalNoteStatsHeaderProps {
  stats: any;
}

export const MedicalNoteStatsHeader: React.FC<MedicalNoteStatsHeaderProps> = ({ stats }) => {
  return (
    <View style={styles.statsHeader}>
      <Text>Medical Note Stats Header</Text>
    </View>
  );
};
