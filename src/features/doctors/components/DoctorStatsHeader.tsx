
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../styles/doctorStyles';

interface Props {
  stats: any;
  onStatPress: (filter: string) => void;
}

export const DoctorStatsHeader: React.FC<Props> = ({ stats, onStatPress }) => {
  return (
    <View style={styles.statsContainer}>
      <TouchableOpacity style={styles.statCard} onPress={() => onStatPress('total')}>
        <Icon name="doctor" size={24} color="#2563eb" />
        <Text style={styles.statValue}>{stats.total}</Text>
        <Text style={styles.statLabel}>Total Doctors</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.statCard} onPress={() => onStatPress('accepting')}>
        <Icon name="account-check" size={24} color="#10b981" />
        <Text style={styles.statValue}>{stats.accepting}</Text>
        <Text style={styles.statLabel}>Accepting Patients</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.statCard} onPress={() => onStatPress('specializations')}>
        <Icon name="star" size={24} color="#f59e0b" />
        <Text style={styles.statValue}>{stats.specializations}</Text>
        <Text style={styles.statLabel}>Specializations</Text>
      </TouchableOpacity>
    </View>
  );
};
