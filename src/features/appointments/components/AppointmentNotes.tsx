
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../styles/appointmentStyles';

interface Props {
  appointmentId: string;
  userRole?: string;
  onCreateNote: () => void;
  onNotePress: (noteId: string) => void;
}

export const AppointmentNotes: React.FC<Props> = ({
  appointmentId,
  userRole,
  onCreateNote,
  onNotePress,
}) => {
  // TODO: Fetch notes for the appointment
  const notes: any[] = [];

  return (
    <View style={styles.notesSection}>
      <Text style={styles.sectionTitle}>Medical Notes</Text>

      {notes.length === 0 ? (
        <View style={styles.emptyNotesContainer}>
          <Icon name="note-off" size={48} color="#9ca3af" />
          <Text style={styles.emptyNotesText}>No medical notes found for this appointment.</Text>
          {userRole === 'doctor' && (
            <TouchableOpacity style={styles.createNoteButton} onPress={onCreateNote}>
              <Icon name="plus" size={16} color="white" />
              <Text style={styles.createNoteButtonText}>Create Note</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View>
          {notes.map(note => (
            <TouchableOpacity key={note.id} style={styles.noteCard} onPress={() => onNotePress(note.id)}>
              <Text style={styles.noteTitle}>{note.title}</Text>
              <Text style={styles.notePreview} numberOfLines={2}>{note.content}</Text>
              <Text style={styles.noteDate}>{new Date(note.createdAt).toLocaleDateString()}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};
