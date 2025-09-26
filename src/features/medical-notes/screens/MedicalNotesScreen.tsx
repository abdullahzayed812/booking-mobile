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
import { RootState } from '../../../app/store';
import { useMedicalNoteStatsQuery } from '../../medical-notes/api/medicalNoteApi';

import { MedicalNotesList } from '../components/MedicalNotesList';
import { MedicalNoteStatsHeader } from '../components/MedicalNoteStatsHeader';
import { CreateMedicalNoteModal } from '../components/CreateMedicalNoteModal';
import { styles } from '../styles/medicalNotesStyles';

export const MedicalNotesScreen: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const noteTypes = [
    'consultation',
    'diagnosis',
    'treatment',
    'prescription',
    'follow_up',
    'lab_result',
  ];

  const { data: stats } = useMedicalNoteStatsQuery();

  const handleNotePress = (note: any) => {
    navigation.navigate('MedicalNoteDetails', { noteId: note.id });
  };

  const canCreateNote = user?.role === 'doctor';

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
          <Text style={styles.headerTitle}>
            {user?.role === 'patient' ? 'Medical Records' : 'Medical Notes'}
          </Text>
          {stats && (
            <Text style={styles.headerSubtitle}>
              {stats.thisMonth} this month • {stats.total} total
            </Text>
          )}
        </View>

        {canCreateNote && (
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
        <MedicalNoteStatsHeader
          stats={stats}
          onStatPress={type => setSelectedType(type)}
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
            placeholder="Search notes by title or content..."
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

        {/* Type Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.typeFilters}
        >
          <TouchableOpacity
            style={[
              styles.typeChip,
              selectedType === '' && styles.typeChipActive,
            ]}
            onPress={() => setSelectedType('')}
          >
            <Text
              style={[
                styles.typeChipText,
                selectedType === '' && styles.typeChipTextActive,
              ]}
            >
              All Types
            </Text>
          </TouchableOpacity>

          {noteTypes.map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeChip,
                selectedType === type && styles.typeChipActive,
              ]}
              onPress={() => setSelectedType(type)}
            >
              <Text
                style={[
                  styles.typeChipText,
                  selectedType === type && styles.typeChipTextActive,
                ]}
              >
                {type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Notes List */}
      <MedicalNotesList
        searchQuery={searchQuery}
        selectedType={selectedType}
        userRole={user?.role}
        onNotePress={handleNotePress}
      />

      {/* Create Note Modal */}
      {canCreateNote && (
        <CreateMedicalNoteModal
          visible={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
          }}
        />
      )}
    </View>
  );
};
