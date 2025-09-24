export interface MedicalNote {
  id: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  title: string;
  content: string;
  type:
    | 'consultation'
    | 'diagnosis'
    | 'treatment'
    | 'prescription'
    | 'follow_up'
    | 'lab_result';
  tags: string[];
  isPrivate: boolean;
  attachments?: {
    id: string;
    filename: string;
    mimetype: string;
    size: number;
    url: string;
  }[];
  createdAt: string;
  updatedAt: string;
  patient?: {
    id: string;
    firstName: string;
    lastName: string;
    medicalRecordNumber: string;
  };
  doctor?: {
    id: string;
    firstName: string;
    lastName: string;
    specialization: string;
  };
  appointment?: {
    id: string;
    scheduledAt: string;
    reason: string;
  };
}

export interface CreateMedicalNoteRequest {
  appointmentId: string;
  patientId: string;
  title: string;
  content: string;
  type:
    | 'consultation'
    | 'diagnosis'
    | 'treatment'
    | 'prescription'
    | 'follow_up'
    | 'lab_result';
  tags?: string[];
  isPrivate?: boolean;
}

export interface UpdateMedicalNoteRequest {
  title?: string;
  content?: string;
  type?:
    | 'consultation'
    | 'diagnosis'
    | 'treatment'
    | 'prescription'
    | 'follow_up'
    | 'lab_result';
  tags?: string[];
  isPrivate?: boolean;
}

export interface MedicalNoteStats {
  total: number;
  byType: { [key: string]: number };
  thisMonth: number;
}

export interface MedicalNoteListQuery {
  page?: number;
  limit?: number;
  patientId?: string;
  doctorId?: string;
  appointmentId?: string;
  type?: string;
  search?: string;
  tags?: string[];
  startDate?: string;
  endDate?: string;
}
