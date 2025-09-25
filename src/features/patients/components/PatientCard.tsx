import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../styles/patientStyles';

interface Props {
  patient: any;
  onPress: () => void;
}

export const PatientCard: React.FC<Props> = ({ patient, onPress }) => {
  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const getGenderIcon = (gender: string) => {
    switch (gender) {
      case 'male':
        return 'gender-male';
      case 'female':
        return 'gender-female';
      default:
        return 'account';
    }
  };

  return (
    <TouchableOpacity style={styles.patientCard} onPress={onPress}>
      <View style={styles.patientCardHeader}>
        <View style={styles.patientCardAvatar}>
          <Text style={styles.patientCardAvatarText}>
            {patient.firstName[0]}
            {patient.lastName[0]}
          </Text>
        </View>

        <View style={styles.patientCardInfo}>
          <Text style={styles.patientCardName}>
            {patient.firstName} {patient.lastName}
          </Text>
          <Text style={styles.patientCardEmail}>{patient.email}</Text>

          <View style={styles.patientCardMeta}>
            <View style={styles.patientCardMetaItem}>
              <Icon name="card-account-details" size={14} color="#6b7280" />
              <Text style={styles.patientCardMetaText}>
                MRN: {patient.medicalRecordNumber}
              </Text>
            </View>

            <View style={styles.patientCardMetaItem}>
              <Icon
                name={getGenderIcon(patient.gender)}
                size={14}
                color="#6b7280"
              />
              <Text style={styles.patientCardMetaText}>
                {patient.gender.charAt(0).toUpperCase() +
                  patient.gender.slice(1)}
                , {calculateAge(patient.dateOfBirth)} years
              </Text>
            </View>

            {patient.phone && (
              <View style={styles.patientCardMetaItem}>
                <Icon name="phone" size={14} color="#6b7280" />
                <Text style={styles.patientCardMetaText}>{patient.phone}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.patientCardActions}>
          <Icon name="chevron-right" size={24} color="#6b7280" />
        </View>
      </View>

      {/* Quick Info Footer */}
      <View style={styles.patientCardFooter}>
        <View style={styles.patientCardFooterItem}>
          <Icon name="map-marker" size={14} color="#6b7280" />
          <Text style={styles.patientCardFooterText}>
            {patient.address.city}, {patient.address.state}
          </Text>
        </View>

        <View style={styles.patientCardFooterItem}>
          <Icon name="calendar" size={14} color="#6b7280" />
          <Text style={styles.patientCardFooterText}>
            Registered {new Date(patient.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </View>

      {/* Medical Alerts */}
      {patient.allergies && patient.allergies.length > 0 && (
        <View style={styles.patientCardAlerts}>
          <View style={styles.allergyAlert}>
            <Icon name="alert" size={14} color="#ef4444" />
            <Text style={styles.allergyAlertText}>
              {patient.allergies.length} allergi
              {patient.allergies.length === 1 ? 'y' : 'es'}
            </Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};
