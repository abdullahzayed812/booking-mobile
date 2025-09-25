import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../styles/patientStyles';

interface Props {
  stats: any;
  onStatPress: (filter: string) => void;
}

export const PatientStatsHeader: React.FC<Props> = ({ stats, onStatPress }) => {
  const statsConfig = [
    {
      key: 'total',
      title: 'Total',
      value: stats.total,
      icon: 'account-group',
      color: '#2563eb',
      bgColor: '#eff6ff',
    },
    {
      key: 'active',
      title: 'Active',
      value: stats.active,
      icon: 'account-check',
      color: '#10b981',
      bgColor: '#d1fae5',
    },
    {
      key: 'new',
      title: 'New This Month',
      value: stats.newThisMonth,
      icon: 'account-plus',
      color: '#f59e0b',
      bgColor: '#fef3c7',
    },
  ];

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
              <Icon name={stat.icon} size={24} color={stat.color} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
