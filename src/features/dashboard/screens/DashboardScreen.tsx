import React, { useState } from 'react';
import { View, ScrollView, RefreshControl, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import {
  useUpcomingAppointmentsQuery,
  useAppointmentStatsQuery,
} from '../../appointments/api/appointmentApi';
import { useMeQuery } from '../../auth/api/authApi';

import { DashboardHeader } from '../components/DashboardHeader';
import { StatsOverview } from '../components/StatsOverview';
import { QuickActions } from '../components/QuickActions';
import { UpcomingAppointments } from '../components/UpcomingAppointments';
import { RecentActivity } from '../components/RecentActivity';
import { styles } from '../styles/dashboardStyles';

interface Props {
  navigation: any;
}

export const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [refreshing, setRefreshing] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: userProfile, refetch: refetchProfile } = useMeQuery();

  const { data: upcomingAppointments = [], refetch: refetchAppointments } =
    useUpcomingAppointmentsQuery({ limit: 5 });

  const { data: stats, refetch: refetchStats } = useAppointmentStatsQuery();

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([
      refetchProfile(),
      refetchAppointments(),
      refetchStats(),
    ]);
    setRefreshing(false);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getUserTitle = () => {
    switch (user?.role) {
      case 'doctor':
        return 'Dr.';
      case 'patient':
        return '';
      case 'admin':
        return 'Admin';
      default:
        return '';
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2563eb" />

      <DashboardHeader
        greeting={getGreeting()}
        userName={`${getUserTitle()} ${user?.firstName} ${user?.lastName}`}
        userRole={user?.role}
        onProfilePress={() => navigation.navigate('Profile')}
        onNotificationsPress={() => navigation.navigate('Notifications')}
      />

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Overview */}
        {stats && (
          <StatsOverview
            stats={stats}
            userRole={user?.role}
            onStatsPress={(type: any) =>
              navigation.navigate('Appointments', { filter: type })
            }
          />
        )}

        {/* Quick Actions */}
        <QuickActions userRole={user?.role} navigation={navigation} />

        {/* Upcoming Appointments */}
        <UpcomingAppointments
          appointments={upcomingAppointments}
          userRole={user?.role}
          onViewAll={() => navigation.navigate('Appointments')}
          onAppointmentPress={(appointment: { id: any }) =>
            navigation.navigate('AppointmentDetails', {
              appointmentId: appointment.id,
            })
          }
        />

        {/* Recent Activity */}
        <RecentActivity
          userRole={user?.role}
          onViewAll={() => navigation.navigate('Activity')}
        />

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};
