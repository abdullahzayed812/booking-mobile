import { styles } from './styles';

import { StackScreenProps } from '@react-navigation/stack';
import { ProfileStackParamList } from '../navigation/ProfileNavigator';

interface Props extends StackScreenProps<ProfileStackParamList, 'ChangePassword'> {}

export const ChangePasswordScreen: React.FC<Props> = ({
  navigation,
}) => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const passwordSchema = z
    .object({
      currentPassword: z.string().min(1, 'Current password is required'),
      newPassword: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
          'Password must contain uppercase, lowercase, and number',
        ),
      confirmPassword: z.string(),
    })
    .refine(data => data.newPassword === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    });

  type PasswordFormData = z.infer<typeof passwordSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data: PasswordFormData) => {
    try {
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      }).unwrap();

      Alert.alert('Success', 'Password changed successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error?.data?.message || 'Failed to change password');
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
        <Text style={styles.headerTitle}>Change Password</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.formContainer}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Update Your Password</Text>
          <Text style={styles.sectionSubtitle}>
            Choose a strong password to keep your account secure
          </Text>
        </View>

        <View style={styles.section}>
          <Controller
            control={control}
            name="currentPassword"
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputContainer}>
                <Icon
                  name="lock-outline"
                  size={20}
                  color="#6b7280"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[
                    styles.input,
                    errors.currentPassword && styles.inputError,
                  ]}
                  placeholder="Current Password"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry
                  placeholderTextColor="#9ca3af"
                />
              </View>
            )}
          />
          {errors.currentPassword && (
            <Text style={styles.errorText}>
              {errors.currentPassword.message}
            </Text>
          )}
        </View>

        <View style={styles.section}>
          <Controller
            control={control}
            name="newPassword"
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputContainer}>
                <Icon
                  name="lock"
                  size={20}
                  color="#6b7280"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[
                    styles.input,
                    errors.newPassword && styles.inputError,
                  ]}
                  placeholder="New Password"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry
                  placeholderTextColor="#9ca3af"
                />
              </View>
            )}
          />
          {errors.newPassword && (
            <Text style={styles.errorText}>{errors.newPassword.message}</Text>
          )}
        </View>

        <View style={styles.section}>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputContainer}>
                <Icon
                  name="lock-check"
                  size={20}
                  color="#6b7280"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[
                    styles.input,
                    errors.confirmPassword && styles.inputError,
                  ]}
                  placeholder="Confirm New Password"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry
                  placeholderTextColor="#9ca3af"
                />
              </View>
            )}
          />
          {errors.confirmPassword && (
            <Text style={styles.errorText}>
              {errors.confirmPassword.message}
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            isLoading && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Icon name="check" size={20} color="white" />
              <Text style={styles.submitButtonText}>Update Password</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
