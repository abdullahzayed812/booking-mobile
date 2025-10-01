import { StackScreenProps } from '@react-navigation/stack';
import { ProfileStackParamList } from '../navigation/ProfileNavigator';

interface Props extends StackScreenProps<ProfileStackParamList, 'SessionManagement'> {}

export const SessionManagementScreen: React.FC<Props> = ({
  navigation,
}) => {
  const { data: sessions = [], isLoading } = useGetSessionsQuery();
  const [revokeSession] = useRevokeSessionMutation();

  const handleRevokeSession = (
    sessionId: string,
    isCurrentSession: boolean,
  ) => {
    if (isCurrentSession) {
      Alert.alert(
        'Sign Out Current Session',
        'This will sign you out of this device. Are you sure?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Sign Out',
            style: 'destructive',
            onPress: async () => {
              try {
                await revokeSession(sessionId).unwrap();
                // This will sign out the current session
              } catch (error) {
                Alert.alert('Error', 'Failed to revoke session');
              }
            },
          },
        ],
      );
    } else {
      Alert.alert(
        'Revoke Session',
        'This will sign out this device from your account.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Revoke',
            style: 'destructive',
            onPress: async () => {
              try {
                await revokeSession(sessionId).unwrap();
                Alert.alert('Success', 'Session revoked successfully');
              } catch (error) {
                Alert.alert('Error', 'Failed to revoke session');
              }
            },
          },
        ],
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Active Sessions</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Manage Your Sessions</Text>
          <Text style={styles.sectionSubtitle}>
            You can see where you're signed in and sign out of sessions you
            don't recognize.
          </Text>
        </View>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2563eb" />
            <Text style={styles.loadingText}>Loading sessions...</Text>
          </View>
        ) : (
          <View style={styles.sessionsList}>
            {sessions.map(session => (
              <View key={session.id} style={styles.sessionCard}>
                <View style={styles.sessionIcon}>
                  <Icon
                    name={session.isCurrentSession ? 'cellphone' : 'monitor'}
                    size={24}
                    color="#2563eb"
                  />
                </View>

                <View style={styles.sessionInfo}>
                  <View style={styles.sessionHeader}>
                    <Text style={styles.sessionTitle}>
                      {session.isCurrentSession
                        ? 'This Device'
                        : 'Other Device'}
                    </Text>
                    {session.isCurrentSession && (
                      <View style={styles.currentBadge}>
                        <Text style={styles.currentBadgeText}>Current</Text>
                      </View>
                    )}
                  </View>

                  <Text style={styles.sessionDetail}>
                    IP: {session.ipAddress}
                  </Text>
                  <Text style={styles.sessionDetail}>
                    Created: {new Date(session.createdAt).toLocaleDateString()}
                  </Text>
                  <Text style={styles.sessionDetail}>
                    Expires: {new Date(session.expiresAt).toLocaleDateString()}
                  </Text>

                  {session.userAgent && (
                    <Text style={styles.sessionUserAgent} numberOfLines={2}>
                      {session.userAgent}
                    </Text>
                  )}
                </View>

                <TouchableOpacity
                  style={styles.revokeButton}
                  onPress={() =>
                    handleRevokeSession(session.id, session.isCurrentSession)
                  }
                >
                  <Icon
                    name={session.isCurrentSession ? 'logout' : 'close'}
                    size={20}
                    color="#ef4444"
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};
