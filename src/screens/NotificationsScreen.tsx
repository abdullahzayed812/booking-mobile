export const NotificationsScreen: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'appointment_reminder',
      title: 'Appointment Reminder',
      message: 'You have an appointment with Dr. Smith tomorrow at 2:00 PM',
      time: '2 hours ago',
      read: false,
      icon: 'calendar-clock',
      color: '#f59e0b',
    },
    {
      id: '2',
      type: 'appointment_confirmed',
      title: 'Appointment Confirmed',
      message: 'Your appointment has been confirmed for March 15, 2024',
      time: '1 day ago',
      read: false,
      icon: 'check-circle',
      color: '#10b981',
    },
    {
      id: '3',
      type: 'prescription_ready',
      title: 'Prescription Ready',
      message: 'Your prescription is ready for pickup at the pharmacy',
      time: '2 days ago',
      read: true,
      icon: 'pill',
      color: '#2563eb',
    },
  ]);

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true })),
    );
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

        <Text style={styles.headerTitle}>Notifications</Text>

        <TouchableOpacity style={styles.markAllButton} onPress={markAllAsRead}>
          <Text style={styles.markAllButtonText}>Mark All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.notificationsList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.notificationCard,
              !item.read && styles.notificationCardUnread,
            ]}
            onPress={() => markAsRead(item.id)}
          >
            <View
              style={[
                styles.notificationIcon,
                { backgroundColor: `${item.color}20` },
              ]}
            >
              <Icon name={item.icon} size={24} color={item.color} />
            </View>

            <View style={styles.notificationContent}>
              <View style={styles.notificationHeader}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationTime}>{item.time}</Text>
              </View>

              <Text style={styles.notificationMessage}>{item.message}</Text>

              {!item.read && <View style={styles.unreadIndicator} />}
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyNotifications}>
            <Icon name="bell-outline" size={64} color="#d1d5db" />
            <Text style={styles.emptyNotificationsTitle}>No Notifications</Text>
            <Text style={styles.emptyNotificationsText}>
              You're all caught up! New notifications will appear here.
            </Text>
          </View>
        }
      />
    </View>
  );
};
