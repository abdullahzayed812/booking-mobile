import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MedicalNotesList } from '../components/MedicalNotesList';
import { MedicalNoteStatsHeader } from '../components/MedicalNoteStatsHeader';
import { CreateMedicalNoteModal } from '../components/CreateMedicalNoteModal';
import { styles } from '../styles/medicalNotesStyles';

export const MedicalNotesScreen: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <View style={styles.container}>
      <MedicalNoteStatsHeader stats={{}} />
      <TouchableOpacity onPress={() => setShowCreateModal(true)}>
        <Text>Create Medical Note</Text>
      </TouchableOpacity>
      <MedicalNotesList notes={[]} />
      <CreateMedicalNoteModal
        isVisible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </View>
  );
};