export const ProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  
  const { data: userProfile, isLoading } = useMeQuery();
  const { data: sessions } = useGetSessionsQuery();
  const [logout, { isLoading: loggingOut }] = useLogoutMutation();

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout().unwrap();
              await EncryptedStorage.removeItem('access_token');
              await EncryptedStorage.removeItem('refresh_token');
              dispatch({ type: 'auth/logout' });
            } catch (error) {
              console.error('Logout failed:', error);
              dispatch({ type: 'auth/logout' });
            }
          },
        },
      ]
    );
  };

  const profileItems = [
    {
      icon: 'account-edit',
      title: 'Edit Profile',
      subtitle: 'Update your personal information',
      onPress: () => navigation.navigate('EditProfile'),
    },
    {
      icon: 'lock',
      title: 'Change Password',
      subtitle: 'Update your password',
      onPress: () => navigation.navigate('ChangePassword'),
    },
    {
      icon: 'devices',
      title: 'Active Sessions',
      subtitle: `${sessions?.length || 0} active sessions`,
      onPress: () => navigation.navigate('SessionManagement'),
    },
    {
      icon: 'bell',
      title: 'Notifications',
      subtitle: 'Manage notification preferences',
      onPress: () => navigation.navigate('NotificationSettings'),
    },
    {
      icon: 'shield-check',
      title: 'Privacy & Security',
      subtitle: 'Privacy settings and security options',
      onPress: () => navigation.navigate('PrivacySettings'),
    },
    {
      icon: 'help-circle',
      title: 'Help & Support',
      subtitle: 'Get help or contact support',
      onPress          onPress={() => setShowCreateModal(true)}
          >
            <Icon name="plus" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>

      {/* Stats Header */}
      {stats && (
        <DoctorStatsHeader
          stats={stats}
          onStatPress={(filter) => {
            // Handle stat filter if needed
          }}
        />
      )}

      {/* Search and Filters */}
      <View style={styles.filtersContainer}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="magnify" size={20} color="#6b7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search doctors by name or specialization..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            placeholderTextColor="#9ca3af"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              style={styles.clearSearch}
              onPress={() => setSearchQuery('')}
            >
              <Icon name="close" size={20} color="#6b7280" />
            </TouchableOpacity>
          )}
        </View>

        {/* Filters */}
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              acceptingOnly && styles.filterButtonActive
            ]}
            onPress={() => setAcceptingOnly(!acceptingOnly)}
          >
            <Icon 
              name={acceptingOnly ? "check-circle" : "check-circle-outline"} 
              size={16} 
              color={acceptingOnly ? "white" : "#6b7280"} 
            />
            <Text style={[
              styles.filterButtonText,
              acceptingOnly && styles.filterButtonTextActive
            ]}>
              Accepting Patients
            </Text>
          </TouchableOpacity>
        </View>

        {/* Specialization Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.specializationFilters}
        >
          <TouchableOpacity
            style={[
              styles.specializationChip,
              selectedSpecialization === '' && styles.specializationChipActive
            ]}
            onPress={() => setSelectedSpecialization('')}
          >
            <Text style={[
              styles.specializationChipText,
              selectedSpecialization === '' && styles.specializationChipTextActive
            ]}>
              All Specializations
            </Text>
          </TouchableOpacity>
          
          {specializations.map((specialization) => (
            <TouchableOpacity
              key={specialization}
              style={[
                styles.specializationChip,
                selectedSpecialization === specialization && styles.specializationChipActive
              ]}
              onPress={() => setSelectedSpecialization(specialization)}
            >
              <Text style={[
                styles.specializationChipText,
                selectedSpecialization === specialization && styles.specializationChipTextActive
              ]}>
                {specialization}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Doctors List */}
      <DoctorsList
        searchQuery={searchQuery}
        specialization={selectedSpecialization}
        acceptingOnly={acceptingOnly}
        onDoctorPress={handleDoctorPress}
        onBookAppointment={(doctorId) => 
          navigation.navigate('BookAppointment', { doctorId })
        }
      />

      {/* Create Doctor Modal */}
      {canCreateDoctor && (
        <CreateDoctorModal
          visible={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            // List will refresh automatically
          }}
        />
      )}
    </View>
  );
};