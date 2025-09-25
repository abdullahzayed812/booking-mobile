import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../styles/dashboardStyles';

interface StatsData {
  total: number;
  scheduled: number;
  completed: number;
  cancelled: number;
  upcoming: number;
}

interface Props {
  stats: StatsData;
  userRole?: string;
  onStatsPress: (type: string) => void;
}

export const StatsOverview: React.FC<Props> = ({
  stats,
  userRole,
  onStatsPress,
}) => {
  const getStatsConfig = () => {
    const baseStats = [
      {
        key: 'upcoming',
        title: 'Upcoming',
        value: stats.upcoming.toString(),
        icon: 'clock-outline',
        color: '#f59e0b',
        bgColor: '#fef3c7',
      },
      {
        key: 'completed',
        title: 'Completed',
        value: stats.completed.toString(),
        icon: 'check-circle',
        color: '#10b981',
        bgColor: '#d1fae5',
      },
    ];

    if (userRole === 'doctor') {
      return [
        {
          key: 'total',
          title: 'Total Patients',
          value: stats.total.toString(),
          icon: 'account-group',
          color: '#2563eb',
          bgColor: '#dbeafe',
        },
        ...baseStats,
        {
          key: 'cancelled',
          title: 'Cancelled',
          value: stats.cancelled.toString(),
          icon: 'cancel',
          color: '#ef4444',
          bgColor: '#fee2e2',
        },
      ];
    }

    return [
      {
        key: 'total',
        title: 'Total Visits',
        value: stats.total.toString(),
        icon: 'calendar',
        color: '#2563eb',
        bgColor: '#dbeafe',
      },
      ...baseStats,
    ];
  };

  const statsConfig = getStatsConfig();

  return (
    <View style={styles.statsSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <TouchableOpacity onPress={() => onStatsPress('all')}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsGrid}>
        {statsConfig.map(stat => (
          <TouchableOpacity
            key={stat.key}
            style={styles.statCard}
            onPress={() => onStatsPress(stat.key)}
          >
            <View style={[styles.statIcon, { backgroundColor: stat.bgColor }]}>
              <Icon name={stat.icon} size={24} color={stat.color} />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statTitle}>{stat.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
