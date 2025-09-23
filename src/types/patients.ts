export interface Doctor {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  specialization: string;
  licenseNumber: string;
  isAcceptingAppointments: boolean;
  bio?: string;
  education: string[];
  experience: number; // years
  languages: string[];
  consultationFee?: number;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface WeeklySchedule {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface DaySchedule {
  isAvailable: boolean;
  slots: TimeSlot[];
}

export interface TimeSlot {
  startTime: string; // "09:00"
  endTime: string; // "17:00"
  duration: number; // minutes per appointment
}

export interface AvailabilityOverride {
  id: string;
  doctorId: string;
  date: string;
  isAvailable: boolean;
  slots?: TimeSlot[];
  reason?: string;
  createdAt: string;
}

export interface CreateDoctorProfileRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  specialization: string;
  licenseNumber: string;
  bio?: string;
  education: string[];
  experience: number;
  languages: string[];
  consultationFee?: number;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export interface UpdateDoctorProfileRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  specialization?: string;
  bio?: string;
  education?: string[];
  experience?: number;
  languages?: string[];
  consultationFee?: number;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export interface DoctorStats {
  total: number;
  accepting: number;
  specializations: { [key: string]: number };
}

export interface DoctorListQuery {
  page?: number;
  limit?: number;
  specialization?: string;
  acceptingAppointments?: boolean;
  search?: string;
}
