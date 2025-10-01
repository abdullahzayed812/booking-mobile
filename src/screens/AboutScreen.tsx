import { StackScreenProps } from '@react-navigation/stack';
import { ProfileStackParamList } from '../navigation/ProfileNavigator';

interface Props extends StackScreenProps<ProfileStackParamList, 'About'> {}

export const AboutScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.aboutHeader}>
          <Icon name="medical-bag" size={80} color="#2563eb" />
          <Text style={styles.appName}>MedConnect</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          <Text style={styles.appTagline}>Your Healthcare Partner</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About MedConnect</Text>
          <Text style={styles.aboutText}>
            MedConnect is a comprehensive healthcare management platform that
            connects patients with healthcare providers, streamlines appointment
            booking, and provides secure access to medical records.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Icon name="check-circle" size={16} color="#10b981" />
              <Text style={styles.featureText}>Easy appointment booking</Text>
            </View>
            <View style={styles.featureItem}>
              <Icon name="check-circle" size={16} color="#10b981" />
              <Text style={styles.featureText}>Secure medical records</Text>
            </View>
            <View style={styles.featureItem}>
              <Icon name="check-circle" size={16} color="#10b981" />
              <Text style={styles.featureText}>Real-time notifications</Text>
            </View>
            <View style={styles.featureItem}>
              <Icon name="check-circle" size={16} color="#10b981" />
              <Text style={styles.featureText}>
                Doctor availability tracking
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal</Text>
          <TouchableOpacity style={styles.legalItem}>
            <Text style={styles.legalText}>Terms of Service</Text>
            <Icon name="external-link" size={16} color="#6b7280" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.legalItem}>
            <Text style={styles.legalText}>Privacy Policy</Text>
            <Icon name="external-link" size={16} color="#6b7280" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.legalItem}>
            <Text style={styles.legalText}>Cookie Policy</Text>
            <Icon name="external-link" size={16} color="#6b7280" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.copyrightText}>
            © 2024 MedConnect. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};
