
import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../styles/doctorStyles';

interface Props {
  doctor: any;
}

export const DoctorOverview: React.FC<Props> = ({ doctor }) => {
  return (
    <View style={styles.overviewContainer}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Dr. {doctor.lastName}</Text>
        <Text style={styles.aboutText}>{doctor.bio || 'No bio available.'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.contactItem}>
          <Icon name="email" size={20} color="#6b7280" />
          <Text style={styles.contactText}>{doctor.email}</Text>
        </View>
        {doctor.phone && (
          <View style={styles.contactItem}>
            <Icon name="phone" size={20} color="#6b7280" />
            <Text style={styles.contactText}>{doctor.phone}</Text>
          </View>
        )}
        {doctor.address && (
          <View style={styles.contactItem}>
            <Icon name="map-marker" size={20} color="#6b7280" />
            <Text style={styles.contactText}>{doctor.address}</Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education & Experience</Text>
        {doctor.education && doctor.education.length > 0 ? (
          doctor.education.map((edu: any, index: number) => (
            <View key={index} style={styles.educationItem}>
              <Icon name="school" size={18} color="#6b7280" />
              <Text style={styles.educationText}>{edu.degree} from {edu.university} ({edu.year})</Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No education information available.</Text>
        )}
        {doctor.experience && doctor.experience.length > 0 ? (
          doctor.experience.map((exp: any, index: number) => (
            <View key={index} style={styles.experienceItem}>
              <Icon name="briefcase" size={18} color="#6b7280" />
              <Text style={styles.experienceText}>{exp.position} at {exp.hospital} ({exp.years})</Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No experience information available.</Text>
        )}
      </View>
    </View>
  );
};
