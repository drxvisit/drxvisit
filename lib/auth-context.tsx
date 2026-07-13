import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, AuthContextType, UserRole } from '@/types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isSignedIn: boolean;
  token: string | null;
}

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_TOKEN'; payload: string | null }
  | { type: 'SIGN_IN'; payload: { user: User; token: string } }
  | { type: 'SIGN_OUT' }
  | { type: 'RESTORE_TOKEN'; payload: { user: User; token: string } | null };

const initialState: AuthState = {
  user: null,
  isLoading: true,
  isSignedIn: false,
  token: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_TOKEN':
      return { ...state, token: action.payload };
    case 'SIGN_IN':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isSignedIn: true,
        isLoading: false,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        user: null,
        token: null,
        isSignedIn: false,
        isLoading: false,
      };
    case 'RESTORE_TOKEN':
      return {
        ...state,
        user: action.payload?.user ?? null,
        token: action.payload?.token ?? null,
        isSignedIn: !!action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
} | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Restore token on app launch
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const userJson = await AsyncStorage.getItem('user');
        
        if (token && userJson) {
          const user = JSON.parse(userJson);
          dispatch({ type: 'RESTORE_TOKEN', payload: { user, token } });
        } else {
          dispatch({ type: 'RESTORE_TOKEN', payload: null });
        }
      } catch (e) {
        console.error('Failed to restore token:', e);
        dispatch({ type: 'RESTORE_TOKEN', payload: null });
      }
    };

    bootstrapAsync();
  }, []);

  const authContext: AuthContextType = {
    user: state.user,
    isLoading: state.isLoading,
    isSignedIn: state.isSignedIn,
    login: async (email: string, password: string) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        // TODO: Replace with actual API call
        // const response = await api.login(email, password);
        // const { user, token } = response.data;
        
        // Mock implementation
        const mockUser: User = {
          id: '1',
          email,
          phone: '',
          name: 'User',
          role: 'patient' as UserRole,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const mockToken = 'mock_token_' + Date.now();

        await AsyncStorage.setItem('authToken', mockToken);
        await AsyncStorage.setItem('user', JSON.stringify(mockUser));
        
        dispatch({ type: 'SIGN_IN', payload: { user: mockUser, token: mockToken } });
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },
    register: async (userData: Partial<User>) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        // TODO: Replace with actual API call
        // const response = await api.register(userData);
        // const { user, token } = response.data;
        
        // Mock implementation
        const mockUser: User = {
          id: String(Date.now()),
          email: userData.email || '',
          phone: userData.phone || '',
          name: userData.name || '',
          role: userData.role || 'patient',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const mockToken = 'mock_token_' + Date.now();

        await AsyncStorage.setItem('authToken', mockToken);
        await AsyncStorage.setItem('user', JSON.stringify(mockUser));
        
        dispatch({ type: 'SIGN_IN', payload: { user: mockUser, token: mockToken } });
      } catch (error) {
        console.error('Registration failed:', error);
        throw error;
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },
    logout: async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        // TODO: Call API logout endpoint
        await AsyncStorage.removeItem('authToken');
        await AsyncStorage.removeItem('user');
        dispatch({ type: 'SIGN_OUT' });
      } catch (error) {
        console.error('Logout failed:', error);
        throw error;
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },
    updateProfile: async (userData: Partial<User>) => {
      try {
        // TODO: Replace with actual API call
        if (state.user) {
          const updatedUser = { ...state.user, ...userData };
          await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
          dispatch({ type: 'SET_USER', payload: updatedUser });
        }
      } catch (error) {
        console.error('Profile update failed:', error);
        throw error;
      }
    },
  };

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return {
    user: context.state.user,
    isLoading: context.state.isLoading,
    isSignedIn: context.state.isSignedIn,
    login: async (email: string, password: string) => {
      // This will be implemented through the provider
      return Promise.resolve();
    },
    register: async (userData: Partial<User>) => {
      return Promise.resolve();
    },
    logout: async () => {
      return Promise.resolve();
    },
    updateProfile: async (userData: Partial<User>) => {
      return Promise.resolve();
    },
  };
}
