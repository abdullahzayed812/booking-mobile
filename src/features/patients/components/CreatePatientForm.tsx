import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useCreatePatientMutation } from '../api/patientApi';
import { styles } from '../styles/patientStyles';

const patientSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
  medicalRecordNumber: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  bloodType: z.string().optional(),
  allergies: z.string().optional(),
  medicalHistory: z.string().optional(),
});

type PatientFormData = z.infer<typeof patientSchema>;

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
}

export const CreatePatientForm: React.FC<Props> = ({ onSuccess, onCancel }) => {
  const [createPatient, { isLoading }] = useCreatePatientMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      medicalRecordNumber: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
      bloodType: '',
      allergies: '',
      medicalHistory: '',
    },
  });

  const onSubmit = async (data: PatientFormData) => {
    try {
      await createPatient(data as any).unwrap();
      Alert.alert('Success', 'Patient created successfully!');
      onSuccess();
    } catch (error: any) {
      Alert.alert(
        'Creation Failed',
        error?.data?.message || 'Failed to create patient',
      );
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.formContainer}>
        {/* Header */}
        <View style={styles.formHeader}>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Icon name="close" size={24} color="#6b7280" />
          </TouchableOpacity>
          <Text style={styles.formTitle}>Create Patient</Text>
          <View style={styles.placeholder} />
        </View>

        {/* First Name */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>First Name</Text>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.firstName && styles.inputError]}
                placeholder="Enter first name"
                value={value}
                onChangeText={onChange}
                placeholderTextColor="#9ca3af"
              />
            )}
          />
          {errors.firstName && (
            <Text style={styles.errorText}>{errors.firstName.message}</Text>
          )}
        </View>

        {/* Last Name */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Last Name</Text>
          <Controller
            control={control}
            name="lastName"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.lastName && styles.inputError]}
                placeholder="Enter last name"
                value={value}
                onChangeText={onChange}
                placeholderTextColor="#9ca3af"
              />
            )}
          />
          {errors.lastName && (
            <Text style={styles.errorText}>{errors.lastName.message}</Text>
          )}
        </View>

        {/* Email */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Email</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="Enter email address"
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#9ca3af"
              />
            )}
          />
          {errors.email && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}
        </View>

        {/* Submit Button */}
        <View style={styles.submitSection}>
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
                <Icon name="account-plus" size={20} color="white" />
                <Text style={styles.submitButtonText}>Create Patient</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
