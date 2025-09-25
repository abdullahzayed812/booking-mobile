import React, { useState } from 'react';
import { View, FlatList, RefreshControl, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useListPatientsQuery } from '../api/patientApi';
import { PatientCard } from './PatientCard';
import { styles } from '../styles/patientStyles';

interface Props {
  searchQuery: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onPatientPress: (patient: any) => void;
}

export const PatientsList: React.FC<Props> = ({
  searchQuery,
  sortBy,
  sortOrder,
  onPatientPress,
}) => {
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: patientsData,
    isLoading,
    refetch,
  } = useListPatientsQuery({
    search: searchQuery || undefined,
    sortBy,
    sortOrder,
    limit: 50,
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderPatientItem = ({ item }: { item: any }) => (
    <PatientCard patient={item} onPress={() => onPatientPress(item)} />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="account-search" size={80} color="#d1d5db" />
      <Text style={styles.emptyStateTitle}>No Patients Found</Text>
      <Text style={styles.emptyStateSubtitle}>
        {searchQuery
          ? 'Try adjusting your search criteria'
          : 'No patients registered yet'}
      </Text>
    </View>
  );

  const renderLoadingState = () => (
    <View style={styles.loadingState}>
      {[1, 2, 3, 4].map(item => (
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
      data={patientsData?.patients || []}
      renderItem={renderPatientItem}
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
