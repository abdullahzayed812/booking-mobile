import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../styles/appointmentStyles';

interface Props {
  stats: any;
  userRole?: string;
  onStatPress: (filter: string) => void;
}

export const AppointmentStatsHeader: React.FC<Props> = ({
  stats,
  onStatPress,
}) => {
  const getStatsConfig = () => {
    return [
      {
        key: 'total',
        title: 'Total',
        value: stats.total,
        icon: 'calendar',
        color: '#2563eb',
        bgColor: '#eff6ff',
      },
      {
        key: 'upcoming',
        title: 'Upcoming',
        value: stats.upcoming,
        icon: 'clock-outline',
        color: '#f59e0b',
        bgColor: '#fef3c7',
      },
      {
        key: 'completed',
        title: 'Completed',
        value: stats.completed,
        icon: 'check-circle',
        color: '#10b981',
        bgColor: '#d1fae5',
      },
      {
        key: 'cancelled',
        title: 'Cancelled',
        value: stats.cancelled,
        icon: 'cancel',
        color: '#ef4444',
        bgColor: '#fee2e2',
      },
    ];
  };

  const statsConfig = getStatsConfig();

  return (
    <View style={styles.statsHeader}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.statsScroll}
      >
        {statsConfig.map(stat => (
          <TouchableOpacity
            key={stat.key}
            style={styles.statCard}
            onPress={() => onStatPress(stat.key)}
          >
            <View style={[styles.statIcon, { backgroundColor: stat.bgColor }]}>
              <Icon name={stat.icon} size={20} color={stat.color} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
