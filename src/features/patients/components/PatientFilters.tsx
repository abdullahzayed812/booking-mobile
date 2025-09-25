import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../styles/patientStyles';

interface Props {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSortChange: (field: string, order: 'asc' | 'desc') => void;
}

export const PatientFilters: React.FC<Props> = ({
  sortBy,
  sortOrder,
  onSortChange,
}) => {
  const sortOptions = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'createdAt', label: 'Registration Date' },
    { key: 'email', label: 'Email' },
  ];

  const handleSortPress = (field: string) => {
    if (sortBy === field) {
      // Toggle order if same field
      onSortChange(field, sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field with ascending order
      onSortChange(field, 'asc');
    }
  };

  return (
    <View style={styles.filtersContainer}>
      <Text style={styles.filtersLabel}>Sort by:</Text>
      <View style={styles.sortButtons}>
        {sortOptions.map(option => (
          <TouchableOpacity
            key={option.key}
            style={[
              styles.sortButton,
              sortBy === option.key && styles.sortButtonActive,
            ]}
            onPress={() => handleSortPress(option.key)}
          >
            <Text
              style={[
                styles.sortButtonText,
                sortBy === option.key && styles.sortButtonTextActive,
              ]}
            >
              {option.label}
            </Text>
            {sortBy === option.key && (
              <Icon
                name={sortOrder === 'asc' ? 'arrow-up' : 'arrow-down'}
                size={14}
                color="white"
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
