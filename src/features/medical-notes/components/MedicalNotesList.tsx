import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { styles } from '../styles/medicalNotesStyles';

interface MedicalNotesListProps {
  notes: any[];
}

export const MedicalNotesList: React.FC<MedicalNotesListProps> = ({ notes }) => {
  return (
    <FlatList
      data={notes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.noteItem}>
          <Text>{item.title}</Text>
        </View>
      )}
    />
  );
};
