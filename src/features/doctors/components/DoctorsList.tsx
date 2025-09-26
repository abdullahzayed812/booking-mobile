import React, { useState } from 'react';
import { View, FlatList, RefreshControl, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useListDoctorsQuery } from '../../doctors/api/doctorApi';
import { DoctorCard } from './DoctorCard';
import { styles } from '../styles/doctorStyles';

interface Props {
  searchQuery: string;
  specialization: string;
  acceptingOnly: boolean;
  onDoctorPress: (doctor: any) => void;
  onBookAppointment: (doctorId: string) => void;
}

export const DoctorsList: React.FC<Props> = ({
  searchQuery,
  specialization,
  acceptingOnly,
  onDoctorPress,
  onBookAppointment,
}) => {
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: doctorsData,
    isLoading,
    refetch,
  } = useListDoctorsQuery({
    search: searchQuery || undefined,
    specialization: specialization || undefined,
    acceptingAppointments: acceptingOnly || undefined,
    limit: 50,
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderDoctorItem = ({ item }: { item: any }) => (
    <DoctorCard
      doctor={item}
      onPress={() => onDoctorPress(item)}
      onBookAppointment={() => onBookAppointment(item.id)}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="doctor" size={80} color="#d1d5db" />
      <Text style={styles.emptyStateTitle}>No Doctors Found</Text>
      <Text style={styles.emptyStateSubtitle}>
        {searchQuery || specialization || acceptingOnly
          ? 'Try adjusting your search criteria'
          : 'No doctors available at the moment'}
      </Text>
    </View>
  );

  const renderLoadingState = () => (
    <View style={styles.loadingState}>
      {[1, 2, 3].map(item => (
        <View key={item} style={styles.loadingCard}>
          <View style={styles.loadingAvatar} />
          <View style={styles.loadingContent}>
            <View style={styles.loadingLine} />
            <View style={styles.loadingLineShort} />
            <View style={styles.loadingLineShort} />
          </View>
        </View>
      ))}
    </View>
  );

  if (isLoading && !refreshing) {
    return renderLoadingState();
  }

  return (
    <FlatList
      data={doctorsData?.doctors || []}
      renderItem={renderDoctorItem}
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
