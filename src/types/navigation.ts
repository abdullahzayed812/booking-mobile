export type RootStackParamList = {
  // Auth Stack
  Auth: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;

  // Main Stack
  Main: undefined;
  Dashboard: undefined;

  // Appointments
  Appointments: { filter?: string };
  AppointmentDetails: { appointmentId: string };
  BookAppointment: { doctorId?: string; patientId?: string };
  CreateAppointment: { doctorId?: string; patientId?: string };
  RescheduleAppointment: { appointmentId: string };

  // Patients
  Patients: undefined;
  PatientDetails: { patientId: string };
  PatientProfile: { patientId: string };
  CreatePatient: undefined;
  EditPatient: { patientId: string };
  EditPatientAllergies: { patientId: string };
  EditPatientMedicalHistory: { patientId: string };

  // Doctors
  Doctors: undefined;
  DoctorDetails: { doctorId: string };
  DoctorProfile: { doctorId: string };
  CreateDoctor: undefined;
  EditDoctor: { doctorId: string };
  DoctorAvailability: { doctorId: string };
  DoctorSchedule: { doctorId?: string };

  // Medical Notes
  MedicalNotes: undefined;
  MedicalNoteDetails: { noteId: string };
  CreateMedicalNote: { appointmentId?: string; patientId?: string };
  EditMedicalNote: { noteId: string };
  MedicalRecords: { patientId?: string };

  // Profile & Settings
  Profile: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
  SessionManagement: undefined;
  NotificationSettings: undefined;
  PrivacySettings: undefined;
  HelpSupport: undefined;
  About: undefined;

  // Other
  Notifications: undefined;
  Activity: undefined;
  Search: undefined;
  Settings: undefined;
};
