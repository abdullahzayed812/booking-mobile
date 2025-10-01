import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './styles/loadingScreenStyles';

interface LoadingScreenProps {
  title?: string;
  message?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  title = 'MedConnect',
  message = 'Initializing...',
}) => {
  return (
    <View style={styles.loadingContainer}>
      <Icon name="medical-bag" size={80} color="#2563eb" />
      <Text style={styles.loadingTitle}>{title}</Text>
      <ActivityIndicator
        size="large"
        color="#2563eb"
        style={styles.loadingSpinner}
      />
      <Text style={styles.loadingText}>{message}</Text>
    </View>
  );
};
