import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, ScrollView, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { useLocalSearchParams, Link, router } from 'expo-router';
import { ChevronLeft, Mail, CircleCheck as CheckCircle } from 'lucide-react-native';

export default function ForgotPasswordScreen() {
  const { forgotPassword } = useAuth();
  const params = useLocalSearchParams<{ email: string }>();
  
  const [email, setEmail] = useState(params.email || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await forgotPassword(email);
      setIsSuccess(true);
    } catch (error: any) {
      setError(error.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackToLogin}>
            <ChevronLeft size={24} color={COLORS.primary} />
            <Text style={styles.backText}>Back to Login</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Forgot Password</Text>
        </View>

        <View style={styles.formContainer}>
          {isSuccess ? (
            <View style={styles.successContainer}>
              <CheckCircle size={64} color={COLORS.success} />
              <Text style={styles.successTitle}>Email Sent!</Text>
              <Text style={styles.successText}>
                Password reset instructions have been sent to your email address.
              </Text>
              <TouchableOpacity 
                style={styles.backToLoginButton}
                onPress={handleBackToLogin}
              >
                <Text style={styles.backToLoginText}>Back to Login</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Text style={styles.instruction}>
                Enter your email address and we'll send you instructions to reset your password.
              </Text>

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

              {error && <Text style={styles.errorText}>{error}</Text>}

              <TouchableOpacity 
                style={styles.resetButton}
                onPress={handleResetPassword}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color={COLORS.white} size="small" />
                ) : (
                  <Text style={styles.resetButtonText}>Reset Password</Text>
                )}
              </TouchableOpacity>
            </>
          )}
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
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
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
  instruction: {
    fontFamily: FONT.regular,
    fontSize: SIZES.md,
    color: COLORS.gray,
    marginBottom: SPACING.lg,
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
  resetButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  resetButtonText: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.md,
    color: COLORS.white,
  },
  successContainer: {
    alignItems: 'center',
    padding: SPACING.lg,
  },
  successTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.lg,
    color: COLORS.success,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  successText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.md,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  backToLoginButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    marginTop: SPACING.md,
  },
  backToLoginText: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.md,
    color: COLORS.white,
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