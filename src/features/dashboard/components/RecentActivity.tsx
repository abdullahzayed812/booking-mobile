import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../styles/dashboardStyles';

interface Props {
  userRole?: string;
  onViewAll: () => void;
}

export const RecentActivity: React.FC<Props> = ({ onViewAll }) => {
  // Mock recent activity data
  const activities = [
    {
      id: '1',
      type: 'appointment_completed',
      title: 'Appointment Completed',
      description: 'Consultation with Dr. Smith',
      time: '2 hours ago',
      icon: 'check-circle',
      iconColor: '#10b981',
    },
    {
      id: '2',
      type: 'prescription_issued',
      title: 'Prescription Issued',
      description: 'New medication prescribed',
      time: '1 day ago',
      icon: 'pill',
      iconColor: '#f59e0b',
    },
    {
      id: '3',
      type: 'appointment_scheduled',
      title: 'Appointment Scheduled',
      description: 'Follow-up visit booked',
      time: '2 days ago',
      icon: 'calendar-plus',
      iconColor: '#2563eb',
    },
  ];

  return (
    <View style={styles.activitySection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.activityList}>
        {activities.map(activity => (
          <View key={activity.id} style={styles.activityItem}>
            <View
              style={[
                styles.activityIcon,
                { backgroundColor: `${activity.iconColor}20` },
              ]}
            >
              <Icon name={activity.icon} size={20} color={activity.iconColor} />
            </View>

            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>{activity.title}</Text>
              <Text style={styles.activityDescription}>
                {activity.description}
              </Text>
            </View>

            <Text style={styles.activityTime}>{activity.time}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
