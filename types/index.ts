/**
 * Shared TypeScript types for DrxVisit mobile app
 */

// User Types
export type UserRole = 'patient' | 'professional' | 'admin';

export interface User {
  id: string;
  email: string;
  phone: string;
  name: string;
  role: UserRole;
  profilePicture?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Patient extends User {
  role: 'patient';
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  medicalHistory?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relation: string;
  };
}

export interface Professional extends User {
  role: 'professional';
  category: ProfessionalCategory;
  specialization?: string;
  licenseNumber: string;
  qualifications: string[];
  certificates: string[];
  resume?: string;
  clinicDetails?: {
    name: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
  fees: {
    clinic: number;
    home: number;
    video: number;
  };
  averageRating: number;
  totalReviews: number;
  isVerified: boolean;
  verificationDate?: Date;
  documents: ProfessionalDocument[];
  availability: AvailabilitySlot[];
}

export interface Admin extends User {
  role: 'admin';
  permissions: string[];
}

// Professional Categories
export type ProfessionalCategory =
  | 'doctor'
  | 'nurse'
  | 'physiotherapist'
  | 'lab_technician'
  | 'pharmacist'
  | 'psychologist'
  | 'dentist'
  | 'nutritionist'
  | 'caregiver'
  | 'ambulance'
  | 'medical_equipment'
  | 'home_nursing';

// Appointments & Bookings
export type BookingType = 'clinic' | 'home' | 'video';
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';

export interface Booking {
  id: string;
  patientId: string;
  professionalId: string;
  type: BookingType;
  status: BookingStatus;
  scheduledDate: Date;
  duration: number; // in minutes
  symptoms?: string;
  notes?: string;
  location?: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  amount: number;
  prescription?: string;
  medicalRecords?: string[];
  rating?: number;
  review?: string;
  cancelledBy?: 'patient' | 'professional';
  cancellationReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Medical Records
export interface MedicalRecord {
  id: string;
  patientId: string;
  title: string;
  type: 'prescription' | 'report' | 'test_result' | 'document' | 'other';
  fileUrl: string;
  uploadedBy?: string; // professional ID if uploaded by professional
  uploadedDate: Date;
  description?: string;
  relatedBookingId?: string;
}

// Prescriptions
export interface Prescription {
  id: string;
  bookingId: string;
  professionalId: string;
  patientId: string;
  medicines: Medicine[];
  instructions: string;
  duration: string;
  followUpDate?: Date;
  createdAt: Date;
}

export interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

// Notifications
export type NotificationType =
  | 'booking_confirmed'
  | 'booking_cancelled'
  | 'prescription_ready'
  | 'appointment_reminder'
  | 'professional_verified'
  | 'review_received'
  | 'document_expiry_warning';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: Date;
}

// Reviews & Ratings
export interface Review {
  id: string;
  bookingId: string;
  patientId: string;
  professionalId: string;
  rating: number; // 1-5
  comment: string;
  createdAt: Date;
}

// Professional Documents
export interface ProfessionalDocument {
  id: string;
  professionalId: string;
  type: 'aadhaar' | 'pan' | 'license' | 'qualification' | 'certificate' | 'resume' | 'other';
  fileUrl: string;
  uploadedDate: Date;
  expiryDate?: Date;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  verificationNotes?: string;
}

// Availability
export interface AvailabilitySlot {
  id: string;
  professionalId: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  isRecurring: boolean;
  blockedDates?: Date[];
}

// Healthcare Services
export type ServiceType = 'lab_test' | 'medicine' | 'ambulance' | 'physiotherapy' | 'home_nursing' | 'medical_equipment';

export interface HealthcareService {
  id: string;
  type: ServiceType;
  name: string;
  description: string;
  price: number;
  providerId: string;
  category?: string;
  details?: Record<string, any>;
  createdAt: Date;
}

export interface ServiceBooking {
  id: string;
  serviceId: string;
  patientId: string;
  providerId: string;
  type: ServiceType;
  scheduledDate: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: Date;
}

// Admin
export interface VerificationQueue {
  id: string;
  professionalId: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: Date;
  reviewedDate?: Date;
  reviewedBy?: string;
  rejectionReason?: string;
  documents: ProfessionalDocument[];
}

export interface AdminReport {
  id: string;
  type: 'users' | 'bookings' | 'professionals' | 'services';
  startDate: Date;
  endDate: Date;
  data: Record<string, any>;
  generatedAt: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Auth Context
export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isSignedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

// Navigation Types
export interface RootStackParamList {
  Auth: undefined;
  PatientTabs: undefined;
  ProfessionalTabs: undefined;
  AdminTabs: undefined;
}

export interface PatientTabsParamList {
  Dashboard: undefined;
  Appointments: undefined;
  Records: undefined;
  Profile: undefined;
}

export interface ProfessionalTabsParamList {
  Dashboard: undefined;
  Bookings: undefined;
  Documents: undefined;
  Profile: undefined;
}

export interface AdminTabsParamList {
  Dashboard: undefined;
  Users: undefined;
  Professionals: undefined;
  Bookings: undefined;
  Reports: undefined;
  Verification: undefined;
}
