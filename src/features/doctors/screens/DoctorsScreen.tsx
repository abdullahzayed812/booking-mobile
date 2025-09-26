import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  useDoctorStatsQuery,
  useGetSpecializationsQuery,
} from '../../doctors/api/doctorApi';

import { DoctorsList } from '../components/DoctorsList';
import { DoctorStatsHeader } from '../components/DoctorStatsHeader';
import { CreateDoctorModal } from '../components/CreateDoctorModal';
import { styles } from '../styles/doctorStyles';
import { RootState } from '../../../app/store';

interface Props {
  navigation: any;
}

export const DoctorsScreen: React.FC<Props> = ({ navigation }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] =
    useState<string>('');
  const [acceptingOnly, setAcceptingOnly] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { data: specializations = [] } = useGetSpecializationsQuery();
  const { data: stats } = useDoctorStatsQuery();

  const handleDoctorPress = (doctor: any) => {
    navigation.navigate('DoctorDetails', { doctorId: doctor.id });
  };

  const canCreateDoctor = user?.role === 'admin';

  // If user is a doctor, show their own profile
  if (user?.role === 'doctor') {
    navigation.replace('DoctorProfile', { doctorId: user.id });
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
          <Text style={styles.headerTitle}>Doctors</Text>
          {stats && (
            <Text style={styles.headerSubtitle}>
              {stats.accepting} available • {stats.total} total
            </Text>
          )}
        </View>

        {canCreateDoctor && (
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
        <DoctorStatsHeader
          stats={stats}
          onStatPress={filter => {
            // Handle stat filter if needed
          }}
        />
      )}

      {/* Search and Filters */}
      <View style={styles.filtersContainer}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon
            name="magnify"
            size={20}
            color="#6b7280"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search doctors by name or specialization..."
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

        {/* Filters */}
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              acceptingOnly && styles.filterButtonActive,
            ]}
            onPress={() => setAcceptingOnly(!acceptingOnly)}
          >
            <Icon
              name={acceptingOnly ? 'check-circle' : 'check-circle-outline'}
              size={16}
              color={acceptingOnly ? 'white' : '#6b7280'}
            />
            <Text
              style={[
                styles.filterButtonText,
                acceptingOnly && styles.filterButtonTextActive,
              ]}
            >
              Accepting Patients
            </Text>
          </TouchableOpacity>
        </View>

        {/* Specialization Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.specializationFilters}
        >
          <TouchableOpacity
            style={[
              styles.specializationChip,
              selectedSpecialization === '' && styles.specializationChipActive,
            ]}
            onPress={() => setSelectedSpecialization('')}
          >
            <Text
              style={[
                styles.specializationChipText,
                selectedSpecialization === '' &&
                  styles.specializationChipTextActive,
              ]}
            >
              All Specializations
            </Text>
          </TouchableOpacity>

          {specializations.map(specialization => (
            <TouchableOpacity
              key={specialization}
              style={[
                styles.specializationChip,
                selectedSpecialization === specialization &&
                  styles.specializationChipActive,
              ]}
              onPress={() => setSelectedSpecialization(specialization)}
            >
              <Text
                style={[
                  styles.specializationChipText,
                  selectedSpecialization === specialization &&
                    styles.specializationChipTextActive,
                ]}
              >
                {specialization}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Doctors List */}
      <DoctorsList
        searchQuery={searchQuery}
        specialization={selectedSpecialization}
        acceptingOnly={acceptingOnly}
        onDoctorPress={handleDoctorPress}
        onBookAppointment={doctorId =>
          navigation.navigate('BookAppointment', { doctorId })
        }
      />

      {/* Create Doctor Modal */}
      {canCreateDoctor && (
        <CreateDoctorModal
          visible={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            // List will refresh automatically
          }}
        />
      )}
    </View>
  );
};
