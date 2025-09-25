import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootState } from '../../../app/store';
import { useGetProfileQuery } from '../api/patientApi';
import { useListAppointmentsQuery } from '../../appointments/api/appointmentApi';
import { useListMedicalNotesQuery } from '../../medical-notes/api/medicalNoteApi';

import { PatientOverview } from '../components/PatientOverview';
import { PatientAppointments } from '../components/PatientAppointments';
import { PatientMedicalInfo } from '../components/PatientMedicalInfo';
import { PatientDocuments } from '../components/PatientDocuments';
import { EditPatientModal } from '../components/EditPatientModal';
import { styles } from '../styles/patientStyles';

interface Props {
  navigation: any;
  route: {
    params: {
      patientId: string;
    };
  };
}

export const PatientDetailsScreen: React.FC<Props> = ({
  navigation,
  route,
}) => {
  const { patientId } = route.params;
  const { user } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState('overview');
  const [showEditModal, setShowEditModal] = useState(false);

  const { data: patient, isLoading, error } = useGetProfileQuery(patientId);

  const { data: appointments } = useListAppointmentsQuery({
    patientId,
    limit: 10,
  });

  const { data: medicalNotes } = useListMedicalNotesQuery({
    patientId,
    limit: 10,
  });

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Loading patient details...</Text>
      </View>
    );
  }

  if (error || !patient) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Icon name="alert-circle" size={64} color="#ef4444" />
        <Text style={styles.errorTitle}>Unable to Load</Text>
        <Text style={styles.errorText}>
          Failed to load patient details. Please try again.
        </Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.retryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const canEdit =
    user?.role === 'admin' ||
    (user?.role === 'patient' && patient.userId === user.id) ||
    user?.role === 'doctor';

  const tabs = [
    { key: 'overview', label: 'Overview', icon: 'account' },
    { key: 'appointments', label: 'Appointments', icon: 'calendar' },
    { key: 'medical', label: 'Medical', icon: 'medical-bag' },
    { key: 'documents', label: 'Documents', icon: 'file-document' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.detailHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>

        <Text style={styles.detailHeaderTitle}>Patient Profile</Text>

        {canEdit && (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setShowEditModal(true)}
          >
            <Icon name="pencil" size={20} color="white" />
          </TouchableOpacity>
        )}
      </View>

      {/* Patient Header Info */}
      <View style={styles.patientHeaderCard}>
        <View style={styles.patientAvatar}>
          <Text style={styles.patientAvatarText}>
            {patient.firstName[0]}
            {patient.lastName[0]}
          </Text>
        </View>

        <View style={styles.patientHeaderInfo}>
          <Text style={styles.patientHeaderName}>
            {patient.firstName} {patient.lastName}
          </Text>
          <Text style={styles.patientHeaderEmail}>{patient.email}</Text>
          <View style={styles.patientHeaderMeta}>
            <Text style={styles.patientHeaderDetail}>
              MRN: {patient.medicalRecordNumber}
            </Text>
            <Text style={styles.patientHeaderDetail}>
              DOB: {new Date(patient.dateOfBirth).toLocaleDateString()}
            </Text>
            <Text style={styles.patientHeaderDetail}>
              Age:{' '}
              {new Date().getFullYear() -
                new Date(patient.dateOfBirth).getFullYear()}
            </Text>
          </View>
        </View>

        <View style={styles.patientHeaderActions}>
          {patient.phone && (
            <TouchableOpacity style={styles.contactActionButton}>
              <Icon name="phone" size={20} color="#2563eb" />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.contactActionButton}>
            <Icon name="email" size={20} color="#2563eb" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactActionButton}>
            <Icon name="message" size={20} color="#2563eb" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabBar}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Icon
              name={tab.icon}
              size={18}
              color={activeTab === tab.key ? '#2563eb' : '#6b7280'}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.tabTextActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <ScrollView
        style={styles.tabContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'overview' && <PatientOverview patient={patient} />}

        {activeTab === 'appointments' && (
          <PatientAppointments
            appointments={appointments?.appointments || []}
            onAppointmentPress={(appointment: { id: any }) =>
              navigation.navigate('AppointmentDetails', {
                appointmentId: appointment.id,
              })
            }
            onBookAppointment={() =>
              navigation.navigate('BookAppointment', { patientId })
            }
          />
        )}

        {activeTab === 'medical' && (
          <PatientMedicalInfo
            patient={patient}
            medicalNotes={medicalNotes?.notes || []}
            onAddAllergy={() =>
              navigation.navigate('EditPatientAllergies', { patientId })
            }
            onAddMedicalHistory={() =>
              navigation.navigate('EditPatientMedicalHistory', { patientId })
            }
            onNotePress={(note: { id: any }) =>
              navigation.navigate('MedicalNoteDetails', { noteId: note.id })
            }
          />
        )}

        {activeTab === 'documents' && (
          <PatientDocuments
            patientId={patientId}
            onUploadDocument={() => {
              // Handle document upload
            }}
          />
        )}
      </ScrollView>

      {/* Edit Patient Modal */}
      <EditPatientModal
        visible={showEditModal}
        patient={patient}
        onClose={() => setShowEditModal(false)}
        onSuccess={() => {
          setShowEditModal(false);
          // Data will refresh automatically via RTK Query
        }}
      />
    </View>
  );
};
