import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  QueryConstraint,
  Query,
  writeBatch,
} from 'firebase/firestore';
import { db } from './firebase';
import { User, Booking, Professional, MedicalRecord, Review, Notification } from '@/types';

// Collections
const USERS_COLLECTION = 'users';
const BOOKINGS_COLLECTION = 'bookings';
const MEDICAL_RECORDS_COLLECTION = 'medical_records';
const REVIEWS_COLLECTION = 'reviews';
const NOTIFICATIONS_COLLECTION = 'notifications';

// User Operations
export const userService = {
  async createUser(userId: string, userData: Partial<User>) {
    await setDoc(doc(db, USERS_COLLECTION, userId), {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },

  async getUser(userId: string): Promise<User | null> {
    const docSnap = await getDoc(doc(db, USERS_COLLECTION, userId));
    return docSnap.exists() ? (docSnap.data() as User) : null;
  },

  async updateUser(userId: string, userData: Partial<User>) {
    await updateDoc(doc(db, USERS_COLLECTION, userId), {
      ...userData,
      updatedAt: new Date(),
    });
  },

  async getUserByEmail(email: string): Promise<User | null> {
    const q = query(collection(db, USERS_COLLECTION), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty ? null : (querySnapshot.docs[0].data() as User);
  },

  async listProfessionals(
    constraints: QueryConstraint[] = [],
    pageSize: number = 20
  ): Promise<Professional[]> {
    const q = query(
      collection(db, USERS_COLLECTION),
      where('role', '==', 'professional'),
      ...constraints,
      limit(pageSize)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data() as Professional);
  },
};

// Booking Operations
export const bookingService = {
  async createBooking(bookingData: Partial<Booking>) {
    const bookingRef = doc(collection(db, BOOKINGS_COLLECTION));
    await setDoc(bookingRef, {
      ...bookingData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return bookingRef.id;
  },

  async getBooking(bookingId: string): Promise<Booking | null> {
    const docSnap = await getDoc(doc(db, BOOKINGS_COLLECTION, bookingId));
    return docSnap.exists() ? (docSnap.data() as Booking) : null;
  },

  async updateBooking(bookingId: string, bookingData: Partial<Booking>) {
    await updateDoc(doc(db, BOOKINGS_COLLECTION, bookingId), {
      ...bookingData,
      updatedAt: new Date(),
    });
  },

  async getPatientBookings(patientId: string): Promise<Booking[]> {
    const q = query(
      collection(db, BOOKINGS_COLLECTION),
      where('patientId', '==', patientId),
      orderBy('scheduledDate', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data() as Booking);
  },

  async getProfessionalBookings(professionalId: string): Promise<Booking[]> {
    const q = query(
      collection(db, BOOKINGS_COLLECTION),
      where('professionalId', '==', professionalId),
      orderBy('scheduledDate', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data() as Booking);
  },

  async cancelBooking(bookingId: string, cancelledBy: 'patient' | 'professional', reason: string) {
    await updateDoc(doc(db, BOOKINGS_COLLECTION, bookingId), {
      status: 'cancelled',
      cancelledBy,
      cancellationReason: reason,
      updatedAt: new Date(),
    });
  },
};

// Medical Records Operations
export const medicalRecordService = {
  async createRecord(recordData: Partial<MedicalRecord>) {
    const recordRef = doc(collection(db, MEDICAL_RECORDS_COLLECTION));
    await setDoc(recordRef, {
      ...recordData,
      uploadedDate: new Date(),
    });
    return recordRef.id;
  },

  async getPatientRecords(patientId: string): Promise<MedicalRecord[]> {
    const q = query(
      collection(db, MEDICAL_RECORDS_COLLECTION),
      where('patientId', '==', patientId),
      orderBy('uploadedDate', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data() as MedicalRecord);
  },

  async deleteRecord(recordId: string) {
    await deleteDoc(doc(db, MEDICAL_RECORDS_COLLECTION, recordId));
  },
};

// Review Operations
export const reviewService = {
  async createReview(reviewData: Partial<Review>) {
    const reviewRef = doc(collection(db, REVIEWS_COLLECTION));
    await setDoc(reviewRef, {
      ...reviewData,
      createdAt: new Date(),
    });
    return reviewRef.id;
  },

  async getProfessionalReviews(professionalId: string): Promise<Review[]> {
    const q = query(
      collection(db, REVIEWS_COLLECTION),
      where('professionalId', '==', professionalId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data() as Review);
  },

  async getBookingReview(bookingId: string): Promise<Review | null> {
    const q = query(collection(db, REVIEWS_COLLECTION), where('bookingId', '==', bookingId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty ? null : (querySnapshot.docs[0].data() as Review);
  },
};

// Notification Operations
export const notificationService = {
  async createNotification(notificationData: Partial<Notification>) {
    const notifRef = doc(collection(db, NOTIFICATIONS_COLLECTION));
    await setDoc(notifRef, {
      ...notificationData,
      isRead: false,
      createdAt: new Date(),
    });
    return notifRef.id;
  },

  async getUserNotifications(userId: string): Promise<Notification[]> {
    const q = query(
      collection(db, NOTIFICATIONS_COLLECTION),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(50)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data() as Notification);
  },

  async markAsRead(notificationId: string) {
    await updateDoc(doc(db, NOTIFICATIONS_COLLECTION, notificationId), {
      isRead: true,
    });
  },

  async deleteNotification(notificationId: string) {
    await deleteDoc(doc(db, NOTIFICATIONS_COLLECTION, notificationId));
  },
};

export default {
  userService,
  bookingService,
  medicalRecordService,
  reviewService,
  notificationService,
};
