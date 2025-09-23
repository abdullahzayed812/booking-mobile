export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  scheduledAt: string;
  duration: number;
  status:
    | 'scheduled'
    | 'confirmed'
    | 'in_progress'
    | 'completed'
    | 'cancelled'
    | 'no_show';
  reason: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  patient?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  doctor?: {
    id: string;
    firstName: string;
    lastName: string;
    specialization: string;
    isAcceptingAppointments: boolean;
  };
}

export interface AppointmentStats {
  total: number;
  scheduled: number;
  completed: number;
  cancelled: number;
  upcoming: number;
}

export interface AvailableSlot {
  datetime: string;
  duration: number;
  isAvailable: boolean;
}

export interface CreateAppointmentRequest {
  patientId: string;
  doctorId: string;
  scheduledAt: string;
  duration: number;
  reason: string;
  notes?: string;
}

export interface UpdateAppointmentRequest {
  scheduledAt?: string;
  duration?: number;
  reason?: string;
  notes?: string;
}

export interface AppointmentListQuery {
  page?: number;
  limit?: number;
  status?: string;
  doctorId?: string;
  patientId?: string;
  startDate?: string;
  endDate?: string;
}
