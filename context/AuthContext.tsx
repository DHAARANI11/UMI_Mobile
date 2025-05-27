import React, { createContext, useState, useContext, useEffect } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types
export type UserRole = 'student' | 'faculty' | 'admin' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profilePicture?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  selectRole: (role: UserRole) => void;
}

// Default value
const defaultAuthContext: AuthContextType = {
  user: null,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  forgotPassword: async () => {},
  selectRole: () => {},
};

// Create context
const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// Mock user data for demonstration
const MOCK_USERS = [
  {
    id: '1',
    name: 'John Student',
    email: 'student@university.edu',
    password: 'password123',
    role: 'student',
    profilePicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  },
  {
    id: '2',
    name: 'Jane Faculty',
    email: 'faculty@university.edu',
    password: 'password123',
    role: 'faculty',
    profilePicture: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@university.edu',
    password: 'password123',
    role: 'admin',
    profilePicture: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
  },
];

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing user session on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Route to the appropriate dashboard based on user role
  useEffect(() => {
    if (!isLoading && user) {
      switch (user.role) {
        case 'student':
          router.replace('/(student)');
          break;
        case 'faculty':
          router.replace('/(faculty)');
          break;
        case 'admin':
          router.replace('/(admin)');
          break;
        default:
          router.replace('/(auth)');
      }
    } else if (!isLoading) {
      router.replace('/(auth)');
    }
  }, [user, isLoading]);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Mock authentication - in a real app, this would be an API call
      const foundUser = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
      );

      if (foundUser) {
        const userData = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          role: foundUser.role as UserRole,
          profilePicture: foundUser.profilePicture,
        };
        
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Failed to logout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Forgot password function
  const forgotPassword = async (email: string) => {
    // Mock implementation - in a real app, this would send a password reset email
    const user = MOCK_USERS.find((u) => u.email === email);
    if (!user) {
      throw new Error('User not found');
    }
    
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return;
  };

  // Select role function for the landing page
  const selectRole = (role: UserRole) => {
    router.push({
      pathname: '/(auth)/login',
      params: { role },
    });
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    forgotPassword,
    selectRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};