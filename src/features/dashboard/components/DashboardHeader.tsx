import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../styles/dashboardStyles';

interface Props {
  greeting: string;
  userName: string;
  userRole?: string;
  onProfilePress: () => void;
  onNotificationsPress: () => void;
}

export const DashboardHeader: React.FC<Props> = ({
  greeting,
  userName,
  userRole,
  onProfilePress,
  onNotificationsPress,
}) => {
  return (
    <View style={styles.header}>
      <StatusBar barStyle="light-content" backgroundColor="#2563eb" />

      <View style={styles.headerContent}>
        <View style={styles.greetingSection}>
          <Text style={styles.greeting}>{greeting},</Text>
          <Text style={styles.userName}>{userName}</Text>
          {userRole && (
            <View style={styles.roleBadge}>
              <Text style={styles.roleBadgeText}>
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={onNotificationsPress}
          >
            <Icon name="bell-outline" size={24} color="white" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>3</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.profileButton}
            onPress={onProfilePress}
          >
            <View style={styles.profileAvatar}>
              <Text style={styles.profileAvatarText}>
                {userName
                  .split(' ')
                  .map(n => n[0])
                  .join('')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
