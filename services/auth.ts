import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
} from 'firebase/auth';
import { auth } from './firebase';
import { userService } from './firestore';
import { User, UserRole } from '@/types';

export const authService = {
  async register(
    email: string,
    password: string,
    name: string,
    phone: string,
    role: UserRole
  ): Promise<User> {
    try {
      // Create Firebase auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Update profile
      await updateProfile(firebaseUser, { displayName: name });

      // Create user document in Firestore
      const userData: Partial<User> = {
        id: firebaseUser.uid,
        email,
        phone,
        name,
        role,
        profilePicture: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await userService.createUser(firebaseUser.uid, userData);

      return {
        id: firebaseUser.uid,
        email,
        phone,
        name,
        role,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    } catch (error: any) {
      throw new Error(error.message || 'Registration failed');
    }
  },

  async login(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Get user data from Firestore
      const userData = await userService.getUser(firebaseUser.uid);
      if (!userData) {
        throw new Error('User data not found');
      }

      return userData;
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    }
  },

  async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error(error.message || 'Logout failed');
    }
  },

  async getCurrentUser(): Promise<User | null> {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        async (firebaseUser: FirebaseUser | null) => {
          if (firebaseUser) {
            try {
              const userData = await userService.getUser(firebaseUser.uid);
              resolve(userData);
            } catch (error) {
              reject(error);
            }
          } else {
            resolve(null);
          }
          unsubscribe();
        },
        reject
      );
    });
  },

  async updateUserProfile(userId: string, updates: Partial<User>): Promise<void> {
    try {
      const firebaseUser = auth.currentUser;
      if (firebaseUser && firebaseUser.uid === userId) {
        if (updates.name) {
          await updateProfile(firebaseUser, { displayName: updates.name });
        }
      }
      await userService.updateUser(userId, updates);
    } catch (error: any) {
      throw new Error(error.message || 'Profile update failed');
    }
  },

  async verifyPhoneOTP(phone: string, otp: string): Promise<boolean> {
    // This would integrate with a phone verification service
    // For now, returning true for demo purposes
    return true;
  },

  onAuthStateChanged(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        try {
          const userData = await userService.getUser(firebaseUser.uid);
          callback(userData);
        } catch (error) {
          console.error('Error getting user data:', error);
          callback(null);
        }
      } else {
        callback(null);
      }
    });
  },
};

export default authService;
