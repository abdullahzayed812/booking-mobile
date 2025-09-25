import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../styles/appointmentStyles';

interface Props {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const AppointmentFilters: React.FC<Props> = ({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}) => {
  const filters = [
    { key: 'all', label: 'All', icon: 'calendar' },
    { key: 'upcoming', label: 'Upcoming', icon: 'clock-outline' },
    { key: 'scheduled', label: 'Scheduled', icon: 'calendar-clock' },
    { key: 'confirmed', label: 'Confirmed', icon: 'check-circle' },
    { key: 'completed', label: 'Completed', icon: 'check-circle-outline' },
    { key: 'cancelled', label: 'Cancelled', icon: 'cancel' },
  ];

  return (
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
          placeholder="Search appointments..."
          value={searchQuery}
          onChangeText={onSearchChange}
          returnKeyType="search"
          placeholderTextColor="#9ca3af"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            style={styles.clearSearch}
            onPress={() => onSearchChange('')}
          >
            <Icon name="close" size={20} color="#6b7280" />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterTabs}
      >
        {filters.map(filter => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterTab,
              activeFilter === filter.key && styles.filterTabActive,
            ]}
            onPress={() => onFilterChange(filter.key)}
          >
            <Icon
              name={filter.icon}
              size={16}
              color={activeFilter === filter.key ? 'white' : '#6b7280'}
            />
            <Text
              style={[
                styles.filterTabText,
                activeFilter === filter.key && styles.filterTabTextActive,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
