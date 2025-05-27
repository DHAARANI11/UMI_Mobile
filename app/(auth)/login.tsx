import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, ScrollView, KeyboardAvoidingView, ActivityIndicator, Alert } from 'react-native';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { useLocalSearchParams, Link } from 'expo-router';
import { ChevronLeft, Lock, Mail } from 'lucide-react-native';

export default function LoginScreen() {
  const { login } = useAuth();
  const { role } = useLocalSearchParams<{ role: string }>();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Set default email based on role
  useEffect(() => {
    if (role === 'student') {
      setEmail('student@university.edu');
    } else if (role === 'faculty') {
      setEmail('faculty@university.edu');
    } else if (role === 'admin') {
      setEmail('admin@university.edu');
    }
  }, [role]);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await login(email, password);
    } catch (error: any) {
      setError(error.message || 'Failed to login. Please try again.');
      if (Platform.OS === 'web') {
        Alert.alert('Login Failed', error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleTitle = () => {
    switch (role) {
      case 'student':
        return 'Student Login';
      case 'faculty':
        return 'Faculty Login';
      case 'admin':
        return 'Admin Login';
      default:
        return 'Login';
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <View style={styles.backButtonWrapper}>
            <Link href="/(auth)" style={styles.backButtonLink}>
              <View style={styles.backButtonContent}>
                <ChevronLeft size={24} color={COLORS.primary} />
                <Text style={styles.backText}>Back</Text>
              </View>
            </Link>
          </View>
          <Text style={styles.title}>{getRoleTitle()}</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Mail size={20} color={COLORS.gray} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={COLORS.gray}
            />
          </View>

          <View style={styles.inputContainer}>
            <Lock size={20} color={COLORS.gray} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor={COLORS.gray}
            />
          </View>

          {error && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity 
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={COLORS.white} size="small" />
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
          </TouchableOpacity>

          <View style={styles.forgotPasswordWrapper}>
            <Link 
              href={{ pathname: '/(auth)/forgot-password', params: { email } }}
              style={styles.forgotPasswordLink}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </Link>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.helpText}>
            For any support, please contact admin@university.edu
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: SPACING.lg,
    justifyContent: 'space-between',
  },
  header: {
    marginBottom: SPACING.xl,
  },
  backButtonWrapper: {
    marginBottom: SPACING.md,
  },
  backButtonLink: {
    width: 'auto',
  },
  backButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
    color: COLORS.primary,
    marginLeft: SPACING.xs,
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xl,
    color: COLORS.darkGray,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    ...Platform.select({
      web: {
        width: 400,
      },
    }),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 8,
    marginBottom: SPACING.md,
    backgroundColor: COLORS.white,
    ...SHADOWS.small,
  },
  inputIcon: {
    marginHorizontal: SPACING.md,
  },
  input: {
    flex: 1,
    fontFamily: FONT.regular,
    fontSize: SIZES.md,
    color: COLORS.darkGray,
    paddingVertical: SPACING.md,
  },
  errorText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.sm,
    color: COLORS.error,
    marginBottom: SPACING.md,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  loginButtonText: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.md,
    color: COLORS.white,
  },
  forgotPasswordWrapper: {
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  forgotPasswordLink: {
    width: 'auto',
  },
  forgotPasswordText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
    color: COLORS.primary,
  },
  footer: {
    marginTop: SPACING.xl,
    alignItems: 'center',
  },
  helpText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.xs,
    color: COLORS.gray,
    textAlign: 'center',
  },
});