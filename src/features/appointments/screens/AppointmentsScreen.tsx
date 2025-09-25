import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { useState } from 'react';
import { useAppointmentStatsQuery } from '../api/appointmentApi';
import { styles } from '../styles/appointmentStyles';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-vector-icons/Icon';
import { AppointmentStatsHeader } from '../components/AppointmentStatsHeader';
import { AppointmentFilters } from '../components/AppointmentFilters';
import { AppointmentsList } from '../components/AppointmentsList';

interface Props {
  navigation: any;
  route?: {
    params?: {
      filter?: string;
    };
  };
}

export const AppointmentsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>(
    route?.params?.filter || 'all',
  );
  const [searchQuery, setSearchQuery] = useState('');

  const { data: stats } = useAppointmentStatsQuery();

  const handleAppointmentPress = (appointment: any) => {
    navigation.navigate('AppointmentDetails', {
      appointmentId: appointment.id,
    });
  };

  const canCreateAppointment =
    user?.role === 'patient' || user?.role === 'admin';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2563eb" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Appointments</Text>
          {stats && (
            <Text style={styles.headerSubtitle}>
              {stats.upcoming} upcoming • {stats.total} total
            </Text>
          )}
        </View>

        {canCreateAppointment && (
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => setShowCreateModal(true)}
          >
            <Icon name="plus" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>

      {/* Stats Header */}
      {stats && (
        <AppointmentStatsHeader
          stats={stats}
          userRole={user?.role}
          onStatPress={filter => setActiveFilter(filter)}
        />
      )}

      {/* Filters */}
      <AppointmentFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Appointments List */}
      <AppointmentsList
        filter={activeFilter}
        searchQuery={searchQuery}
        userRole={user?.role}
        userId={user?.id}
        onAppointmentPress={handleAppointmentPress}
      />

      {/* Create Appointment Modal */}
      <CreateAppointmentModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={() => {
          setShowCreateModal(false);
          // List will refresh automatically via RTK Query
        }}
      />
    </View>
  );
};
