import { StackScreenProps } from '@react-navigation/stack';
import { ProfileStackParamList } from '../navigation/ProfileNavigator';

interface Props extends StackScreenProps<ProfileStackParamList, 'HelpSupport'> {}

export const HelpSupportScreen: React.FC<Props> = ({
  navigation,
}) => {
  const helpItems = [
    {
      icon: 'frequently-asked-questions',
      title: 'Frequently Asked Questions',
      subtitle: 'Find answers to common questions',
      onPress: () => {
        // Navigate to FAQ screen
      },
    },
    {
      icon: 'message-text',
      title: 'Contact Support',
      subtitle: 'Get help from our support team',
      onPress: () => {
        Alert.alert(
          'Contact Support',
          'Email: support@medconnect.com\nPhone: +1 (555) 123-4567',
          [{ text: 'OK' }],
        );
      },
    },
    {
      icon: 'book-open',
      title: 'User Guide',
      subtitle: 'Learn how to use the app',
      onPress: () => {
        // Navigate to user guide
      },
    },
    {
      icon: 'bug',
      title: 'Report a Bug',
      subtitle: 'Let us know about any issues',
      onPress: () => {
        Alert.alert(
          'Report a Bug',
          'Please email us at bugs@medconnect.com with details about the issue.',
          [{ text: 'OK' }],
        );
      },
    },
    {
      icon: 'lightbulb',
      title: 'Feature Request',
      subtitle: 'Suggest new features',
      onPress: () => {
        Alert.alert(
          'Feature Request',
          "We'd love to hear your ideas! Email us at feedback@medconnect.com",
          [{ text: 'OK' }],
        );
      },
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How can we help you?</Text>
          <Text style={styles.sectionSubtitle}>
            Choose from the options below or contact us directly
          </Text>
        </View>

        <View style={styles.helpItemsList}>
          {helpItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.helpItem}
              onPress={item.onPress}
            >
              <View style={styles.helpItemIcon}>
                <Icon name={item.icon} size={24} color="#2563eb" />
              </View>

              <View style={styles.helpItemContent}>
                <Text style={styles.helpItemTitle}>{item.title}</Text>
                <Text style={styles.helpItemSubtitle}>{item.subtitle}</Text>
              </View>

              <Icon name="chevron-right" size={20} color="#6b7280" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Need immediate assistance?</Text>
          <Text style={styles.contactSubtitle}>
            Our support team is available Monday-Friday, 9 AM - 6 PM EST
          </Text>

          <View style={styles.contactButtons}>
            <TouchableOpacity style={styles.contactButton}>
              <Icon name="email" size={20} color="#2563eb" />
              <Text style={styles.contactButtonText}>Email Support</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactButton}>
              <Icon name="phone" size={20} color="#2563eb" />
              <Text style={styles.contactButtonText}>Call Support</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
