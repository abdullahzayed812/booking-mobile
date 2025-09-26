import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../styles/patientStyles';

interface Props {
  patient: any;
  medicalNotes: any[];
  onAddAllergy: () => void;
  onAddMedicalHistory: () => void;
  onNotePress: (note: any) => void;
}

export const PatientMedicalInfo: React.FC<Props> = ({
  patient,
  medicalNotes,
  onAddAllergy,
  onAddMedicalHistory,
  onNotePress,
}) => {
  const renderNoteItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.medicalNoteItem}
      onPress={() => onNotePress(item)}
    >
      <View style={styles.medicalNoteHeader}>
        <Text style={styles.medicalNoteTitle}>{item.title}</Text>
        <Text style={styles.medicalNoteDate}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <Text style={styles.medicalNoteContent} numberOfLines={2}>
        {item.content}
      </Text>
      <Text style={styles.medicalNoteType}>
        {item.type.charAt(0).toUpperCase() +
          item.type.slice(1).replace('_', ' ')}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.medicalTab}>
      {/* Allergies Section */}
      <View style={styles.medicalSection}>
        <View style={styles.medicalSectionHeader}>
          <Text style={styles.medicalSectionTitle}>Allergies</Text>
          <TouchableOpacity style={styles.addButton} onPress={onAddAllergy}>
            <Icon name="plus" size={16} color="#2563eb" />
          </TouchableOpacity>
        </View>

        {patient.allergies && patient.allergies.length > 0 ? (
          <View style={styles.allergiesList}>
            {patient.allergies.map((allergy: string, index: number) => (
              <View key={index} style={styles.allergyItem}>
                <Icon name="alert" size={16} color="#ef4444" />
                <Text style={styles.allergyText}>{allergy}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.noDataText}>No known allergies</Text>
        )}
      </View>

      {/* Medical History Section */}
      <View style={styles.medicalSection}>
        <View style={styles.medicalSectionHeader}>
          <Text style={styles.medicalSectionTitle}>Medical History</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={onAddMedicalHistory}
          >
            <Icon name="plus" size={16} color="#2563eb" />
          </TouchableOpacity>
        </View>

        {patient.medicalHistory && patient.medicalHistory.length > 0 ? (
          <View style={styles.historyList}>
            {patient.medicalHistory.map((condition: string, index: number) => (
              <View key={index} style={styles.historyItem}>
                <Icon name="medical-bag" size={16} color="#6b7280" />
                <Text style={styles.historyText}>{condition}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.noDataText}>No medical history recorded</Text>
        )}
      </View>

      {/* Recent Medical Notes */}
      <View style={styles.medicalSection}>
        <Text style={styles.medicalSectionTitle}>Recent Medical Notes</Text>

        {medicalNotes.length > 0 ? (
          <FlatList
            data={medicalNotes.slice(0, 5)}
            renderItem={renderNoteItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        ) : (
          <Text style={styles.noDataText}>No medical notes yet</Text>
        )}
      </View>
    </View>
  );
};
