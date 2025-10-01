
import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../styles/patientStyles';

interface Props {
  patientId: string;
  onUploadDocument: () => void;
}

export const PatientDocuments: React.FC<Props> = ({
  patientId,
  onUploadDocument,
}) => {
  // TODO: Fetch patient documents
  const documents: any[] = [
    {
      id: '1',
      name: 'Lab Results - Blood Test',
      type: 'pdf',
      date: '2023-10-20',
    },
    {
      id: '2',
      name: 'X-Ray - Chest',
      type: 'jpg',
      date: '2023-09-15',
    },
  ];

  const renderDocumentItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.documentCard}>
      <Icon
        name={item.type === 'pdf' ? 'file-pdf-box' : 'file-image'}
        size={24}
        color="#2563eb"
      />
      <View style={styles.documentInfo}>
        <Text style={styles.documentName}>{item.name}</Text>
        <Text style={styles.documentDate}>{item.date}</Text>
      </View>
      <Icon name="download" size={20} color="#6b7280" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.documentsContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Documents</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={onUploadDocument}>
          <Icon name="upload" size={16} color="white" />
          <Text style={styles.uploadButtonText}>Upload</Text>
        </TouchableOpacity>
      </View>

      {documents.length === 0 ? (
        <View style={styles.emptyState}>
          <Icon name="file-document-outline" size={48} color="#d1d5db" />
          <Text style={styles.emptyStateTitle}>No Documents</Text>
          <Text style={styles.emptyStateSubtitle}>
            Patient documents will appear here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={documents}
          keyExtractor={(item) => item.id}
          renderItem={renderDocumentItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};
