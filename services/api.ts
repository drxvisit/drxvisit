import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  // TODO: Add auth token from AsyncStorage
  return config;
});

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/api/auth/login', { email, password }),
  register: (userData: any) =>
    api.post('/api/auth/register', userData),
  logout: () =>
    api.post('/api/auth/logout'),
  verifyPhone: (phone: string, otp: string) =>
    api.post('/api/auth/verify-phone', { phone, otp }),
};

export const patientAPI = {
  getDashboard: () =>
    api.get('/api/patients/dashboard'),
  getAppointments: () =>
    api.get('/api/patients/appointments'),
  bookAppointment: (data: any) =>
    api.post('/api/patients/appointments', data),
  getRecords: () =>
    api.get('/api/patients/records'),
  uploadRecord: (formData: FormData) =>
    api.post('/api/patients/records', formData),
  getWallet: () =>
    api.get('/api/patients/wallet'),
  addWalletBalance: (amount: number) =>
    api.post('/api/patients/wallet/add', { amount }),
};

export const professionalAPI = {
  getDashboard: () =>
    api.get('/api/professionals/dashboard'),
  getBookings: () =>
    api.get('/api/professionals/bookings'),
  updateAvailability: (data: any) =>
    api.put('/api/professionals/availability', data),
  getEarnings: () =>
    api.get('/api/professionals/earnings'),
  getDocuments: () =>
    api.get('/api/professionals/documents'),
  uploadDocument: (formData: FormData) =>
    api.post('/api/professionals/documents', formData),
};

export const adminAPI = {
  getUsers: (page: number = 1, limit: number = 20) =>
    api.get('/api/admin/users', { params: { page, limit } }),
  getProfessionals: (page: number = 1, limit: number = 20) =>
    api.get('/api/admin/professionals', { params: { page, limit } }),
  getVerificationQueue: () =>
    api.get('/api/admin/verification-queue'),
  verifyProfessional: (professionalId: string, approved: boolean) =>
    api.post('/api/admin/verify-professional', { professionalId, approved }),
  getBookings: () =>
    api.get('/api/admin/bookings'),
  getPayments: () =>
    api.get('/api/admin/payments'),
  getReports: (startDate: string, endDate: string) =>
    api.get('/api/admin/reports', { params: { startDate, endDate } }),
};

export default api;
