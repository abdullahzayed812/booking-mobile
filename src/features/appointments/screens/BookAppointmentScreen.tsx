export const BookAppointmentScreen: React.FC<{
  navigation: any;
  route: any;
}> = ({ navigation, route }) => {
  const { doctorId, patientId } = route.params || {};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Appointment</Text>
      </View>

      <CreateAppointmentForm
        doctorId={doctorId}
        patientId={patientId}
        onSuccess={() => {
          Alert.alert('Success', 'Appointment booked successfully!', [
            { text: 'OK', onPress: () => navigation.goBack() },
          ]);
        }}
        onCancel={() => navigation.goBack()}
      />
    </View>
  );
};
