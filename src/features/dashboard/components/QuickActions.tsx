import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../styles/dashboardStyles';

interface Props {
  userRole?: string;
  navigation: any;
}

export const QuickActions: React.FC<Props> = ({ userRole, navigation }) => {
  const getQuickActions = () => {
    switch (userRole) {
      case 'doctor':
        return [
          {
            icon: 'calendar-check',
            title: "Today's Schedule",
            subtitle: 'View appointments',
            color: '#10b981',
            onPress: () => navigation.navigate('DoctorSchedule'),
          },
          {
            icon: 'account-plus',
            title: 'New Patient',
            subtitle: 'Register patient',
            color: '#f59e0b',
            onPress: () => navigation.navigate('CreatePatient'),
          },
          {
            icon: 'note-plus',
            title: 'Medical Note',
            subtitle: 'Create note',
            color: '#8b5cf6',
            onPress: () => navigation.navigate('CreateMedicalNote'),
          },
          {
            icon: 'clock-outline',
            title: 'Availability',
            subtitle: 'Manage schedule',
            color: '#06b6d4',
            onPress: () => navigation.navigate('DoctorAvailability'),
          },
        ];

      case 'patient':
        return [
          {
            icon: 'calendar-plus',
            title: 'Book Appointment',
            subtitle: 'Schedule visit',
            color: '#2563eb',
            onPress: () => navigation.navigate('BookAppointment'),
          },
          {
            icon: 'doctor',
            title: 'Find Doctor',
            subtitle: 'Browse doctors',
            color: '#10b981',
            onPress: () => navigation.navigate('Doctors'),
          },
          {
            icon: 'file-document',
            title: 'My Records',
            subtitle: 'View history',
            color: '#f59e0b',
            onPress: () => navigation.navigate('MedicalRecords'),
          },
          {
            icon: 'pill',
            title: 'Prescriptions',
            subtitle: 'View medications',
            color: '#ef4444',
            onPress: () => navigation.navigate('Prescriptions'),
          },
        ];

      default:
        return [
          {
            icon: 'calendar-plus',
            title: 'Book Appointment',
            subtitle: 'Schedule visit',
            color: '#2563eb',
            onPress: () => navigation.navigate('BookAppointment'),
          },
          {
            icon: 'account-group',
            title: 'Manage Users',
            subtitle: 'User management',
            color: '#10b981',
            onPress: () => navigation.navigate('UserManagement'),
          },
        ];
    }
  };

  const actions = getQuickActions();

  return (
    <View style={styles.quickActionsSection}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.quickActionsScroll}
      >
        {actions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={styles.quickActionCard}
            onPress={action.onPress}
          >
            <View
              style={[
                styles.quickActionIcon,
                { backgroundColor: action.color },
              ]}
            >
              <Icon name={action.icon} size={28} color="white" />
            </View>
            <Text style={styles.quickActionTitle}>{action.title}</Text>
            <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
