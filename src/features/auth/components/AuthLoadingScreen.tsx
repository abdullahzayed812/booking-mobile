import { ActivityIndicator, Text, View } from 'react-native';
import { Icon } from 'react-native-vector-icons/Icon';
import { styles } from '../styles/authStyles';

export const AuthLoadingScreen: React.FC = () => {
  return (
    <View style={styles.loadingContainer}>
      <Icon name="medical-bag" size={80} color="#2563eb" />
      <Text style={styles.loadingTitle}>MedConnect</Text>
      <ActivityIndicator
        size="large"
        color="#2563eb"
        style={styles.loadingSpinner}
      />
      <Text style={styles.loadingText}>Initializing...</Text>
    </View>
  );
};
