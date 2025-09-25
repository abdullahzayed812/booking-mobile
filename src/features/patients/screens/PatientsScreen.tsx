import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootState } from '../../../app/store';
import { usePatientStatsQuery } from '../api/patientApi';

import { PatientsList } from '../components/PatientsList';
import { PatientStatsHeader } from '../components/PatientStatsHeader';
import { CreatePatientModal } from '../components/CreatePatientModal';
import { PatientFilters } from '../components/PatientFilters';
import { styles } from '../styles/patientStyles';

interface Props {
  navigation: any;
}

export const PatientsScreen: React.FC<Props> = ({ navigation }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [sortBy, setSortBy] = useState('firstName');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const { data: stats } = usePatientStatsQuery();

  const handlePatientPress = (patient: any) => {
    navigation.navigate('PatientDetails', { patientId: patient.id });
  };

  const canCreatePatient = user?.role === 'admin' || user?.role === 'doctor';

  // If user is a patient, redirect to their profile
  if (user?.role === 'patient') {
    navigation.replace('PatientProfile', { patientId: user.id });
    return null;
  }

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
          <Text style={styles.headerTitle}>Patients</Text>
          {stats && (
            <Text style={styles.headerSubtitle}>
              {stats.active} active • {stats.total} total
            </Text>
          )}
        </View>

        {canCreatePatient && (
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
        <PatientStatsHeader
          stats={stats}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          onStatPress={(filter: any) => {
            // Handle stat filter if needed
          }}
        />
      )}

      {/* Search and Filters */}
      <View style={styles.searchContainer}>
        <Icon
          name="magnify"
          size={20}
          color="#6b7280"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search patients by name, email, or MRN..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          placeholderTextColor="#9ca3af"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            style={styles.clearSearch}
            onPress={() => setSearchQuery('')}
          >
            <Icon name="close" size={20} color="#6b7280" />
          </TouchableOpacity>
        )}
      </View>

      {/* Sort Options */}
      <PatientFilters
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={(field: any, order: any) => {
          setSortBy(field);
          setSortOrder(order);
        }}
      />

      {/* Patients List */}
      <PatientsList
        searchQuery={searchQuery}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onPatientPress={handlePatientPress}
      />

      {/* Create Patient Modal */}
      <CreatePatientModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={() => {
          setShowCreateModal(false);
          // List will refresh automatically
        }}
      />
    </View>
  );
};
