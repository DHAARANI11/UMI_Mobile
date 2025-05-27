export const COLORS = {
  // Primary Colors
  primary: '#1e40af',
  primaryLight: '#3b82f6',
  primaryDark: '#1e3a8a',
  
  // Secondary Colors
  secondary: '#0d9488',
  secondaryLight: '#5eead4',
  secondaryDark: '#0f766e',
  
  // Accent Colors
  accent: '#f97316',
  accentLight: '#fdba74',
  accentDark: '#c2410c',
  
  // Status Colors
  success: '#10b981',
  successLight: '#6ee7b7',
  warning: '#f59e0b',
  warningLight: '#fcd34d',
  error: '#ef4444',
  errorLight: '#fca5a5',
  
  // Neutral Colors
  black: '#000000',
  darkGray: '#333333',
  gray: '#6b7280',
  lightGray: '#d1d5db',
  background: '#f3f4f6',
  white: '#ffffff',
};

export const FONT = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semiBold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
};

export const SIZES = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const SHADOWS = {
  small: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  large: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
};