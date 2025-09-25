import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../styles/patientStyles';

interface Props {
  patient: any;
}

export const PatientOverview: React.FC<Props> = ({ patient }) => {
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

  return (
    <View style={styles.overviewContent}>
      {/* Personal Information */}
      <View style={styles.overviewSection}>
        <Text style={styles.overviewSectionTitle}>Personal Information</Text>

        <View style={styles.overviewGrid}>
          <View style={styles.overviewItem}>
            <Text style={styles.overviewLabel}>Full Name</Text>
            <Text style={styles.overviewValue}>
              {patient.firstName} {patient.lastName}
            </Text>
          </View>

          <View style={styles.overviewItem}>
            <Text style={styles.overviewLabel}>Date of Birth</Text>
            <Text style={styles.overviewValue}>
              {new Date(patient.dateOfBirth).toLocaleDateString()}
            </Text>
          </View>

          <View style={styles.overviewItem}>
            <Text style={styles.overviewLabel}>Age</Text>
            <Text style={styles.overviewValue}>
              {calculateAge(patient.dateOfBirth)} years old
            </Text>
          </View>

          <View style={styles.overviewItem}>
            <Text style={styles.overviewLabel}>Gender</Text>
            <Text style={styles.overviewValue}>
              {patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1)}
            </Text>
          </View>

          <View style={styles.overviewItem}>
            <Text style={styles.overviewLabel}>Medical Record Number</Text>
            <Text style={styles.overviewValue}>
              {patient.medicalRecordNumber}
            </Text>
          </View>
        </View>
      </View>

      {/* Contact Information */}
      <View style={styles.overviewSection}>
        <Text style={styles.overviewSectionTitle}>Contact Information</Text>

        <View style={styles.contactList}>
          <TouchableOpacity style={styles.contactItem}>
            <Icon name="email" size={20} color="#6b7280" />
            <Text style={styles.contactText}>{patient.email}</Text>
            <Icon name="open-in-new" size={16} color="#6b7280" />
          </TouchableOpacity>

          {patient.phone && (
            <TouchableOpacity style={styles.contactItem}>
              <Icon name="phone" size={20} color="#6b7280" />
              <Text style={styles.contactText}>{patient.phone}</Text>
              <Icon name="open-in-new" size={16} color="#6b7280" />
            </TouchableOpacity>
          )}

          <View style={styles.contactItem}>
            <Icon name="map-marker" size={20} color="#6b7280" />
            <View style={styles.addressContainer}>
              <Text style={styles.contactText}>{patient.address.street}</Text>
              <Text style={styles.contactSubText}>
                {patient.address.city}, {patient.address.state}{' '}
                {patient.address.zipCode}
              </Text>
              <Text style={styles.contactSubText}>
                {patient.address.country}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Emergency Contact */}
      <View style={styles.overviewSection}>
        <Text style={styles.overviewSectionTitle}>Emergency Contact</Text>

        <View style={styles.emergencyContactCard}>
          <View style={styles.emergencyContactHeader}>
            <Icon name="account-alert" size={24} color="#ef4444" />
            <View style={styles.emergencyContactInfo}>
              <Text style={styles.emergencyContactName}>
                {patient.emergencyContact.name}
              </Text>
              <Text style={styles.emergencyContactRelation}>
                {patient.emergencyContact.relationship}
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.emergencyContactPhone}>
            <Icon name="phone" size={18} color="#ef4444" />
            <Text style={styles.emergencyContactPhoneText}>
              {patient.emergencyContact.phone}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Insurance Information */}
      {patient.insuranceInfo && (
        <View style={styles.overviewSection}>
          <Text style={styles.overviewSectionTitle}>Insurance Information</Text>

          <View style={styles.insuranceCard}>
            <Icon name="shield-account" size={24} color="#2563eb" />
            <View style={styles.insuranceInfo}>
              <Text style={styles.insuranceProvider}>
                {patient.insuranceInfo.provider}
              </Text>
              <Text style={styles.insurancePolicy}>
                Policy: {patient.insuranceInfo.policyNumber}
              </Text>
              {patient.insuranceInfo.groupNumber && (
                <Text style={styles.insuranceGroup}>
                  Group: {patient.insuranceInfo.groupNumber}
                </Text>
              )}
            </View>
          </View>
        </View>
      )}

      {/* Account Information */}
      <View style={styles.overviewSection}>
        <Text style={styles.overviewSectionTitle}>Account Information</Text>

        <View style={styles.overviewGrid}>
          <View style={styles.overviewItem}>
            <Text style={styles.overviewLabel}>Member Since</Text>
            <Text style={styles.overviewValue}>
              {new Date(patient.createdAt).toLocaleDateString()}
            </Text>
          </View>

          <View style={styles.overviewItem}>
            <Text style={styles.overviewLabel}>Last Updated</Text>
            <Text style={styles.overviewValue}>
              {new Date(patient.updatedAt).toLocaleDateString()}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
