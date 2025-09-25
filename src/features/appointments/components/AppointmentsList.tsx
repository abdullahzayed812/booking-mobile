import React, { useState } from 'react';
import { View, FlatList, RefreshControl, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useListAppointmentsQuery } from '../api/appointmentApi';
import { AppointmentCard } from './AppointmentCard';
import { styles } from '../styles/appointmentStyles';

interface Props {
  filter: string;
  searchQuery: string;
  userRole?: string;
  userId?: string;
  onAppointmentPress: (appointment: any) => void;
}

export const AppointmentsList: React.FC<Props> = ({
  filter,
  searchQuery,
  userRole,
  userId,
  onAppointmentPress,
}) => {
  const [refreshing, setRefreshing] = useState(false);

  const getQueryParams = () => ({
    ...(userRole === 'doctor' && { doctorId: userId }),
    ...(userRole === 'patient' && { patientId: userId }),
    ...(filter !== 'all' && { status: filter }),
    ...(searchQuery && { search: searchQuery }),
    limit: 50,
  });

  const {
    data: appointmentsData,
    isLoading,
    refetch,
  } = useListAppointmentsQuery(getQueryParams());

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderAppointmentItem = ({ item }: { item: any }) => (
    <AppointmentCard
      appointment={item}
      userRole={userRole}
      onPress={() => onAppointmentPress(item)}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="calendar-blank" size={80} color="#d1d5db" />
      <Text style={styles.emptyStateTitle}>No Appointments Found</Text>
      <Text style={styles.emptyStateSubtitle}>
        {filter === 'all'
          ? "You don't have any appointments yet"
          : `No ${filter} appointments found`}
      </Text>
    </View>
  );

  const renderLoadingState = () => (
    <View style={styles.loadingState}>
      {[1, 2, 3].map(item => (
        <View key={item} style={styles.loadingCard}>
          <View style={styles.loadingLine} />
          <View style={styles.loadingLineShort} />
          <View style={styles.loadingLineShort} />
        </View>
      ))}
    </View>
  );

  if (isLoading && !refreshing) {
    return renderLoadingState();
  }

  return (
    <FlatList
      data={appointmentsData?.appointments || []}
      renderItem={renderAppointmentItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.listContent}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={['#2563eb']}
          tintColor="#2563eb"
        />
      }
      ListEmptyComponent={renderEmptyState}
      showsVerticalScrollIndicator={false}
    />
  );
};
