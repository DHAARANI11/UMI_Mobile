import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { GraduationCap as Graduation, School, UserCog } from 'lucide-react-native';

export default function RoleSelection() {
  const { selectRole } = useAuth();

  const roles = [
    {
      id: 'student',
      title: 'Student',
      description: 'Access your courses, view grades, and manage your academic profile',
      icon: <Graduation size={48} color={COLORS.primary} />,
      color: COLORS.primaryLight,
    },
    {
      id: 'faculty',
      title: 'Faculty',
      description: 'Manage courses, mark attendance, and view assigned students',
      icon: <School size={48} color={COLORS.secondary} />,
      color: COLORS.secondaryLight,
    },
    {
      id: 'admin',
      title: 'Admin',
      description: 'Manage faculty, students, courses, and system configuration',
      icon: <UserCog size={48} color={COLORS.accent} />,
      color: COLORS.accentLight,
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg' }}
          style={styles.logo}
        />
        <Text style={styles.title}>University Management System</Text>
        <Text style={styles.subtitle}>Select your role to continue</Text>
      </View>

      <View style={styles.roleContainer}>
        {roles.map((role) => (
          <TouchableOpacity
            key={role.id}
            style={[styles.roleCard, { borderColor: role.color }]}
            onPress={() => selectRole(role.id as any)}
          >
            <View style={[styles.iconContainer, { backgroundColor: role.color }]}>
              {role.icon}
            </View>
            <Text style={styles.roleTitle}>{role.title}</Text>
            <Text style={styles.roleDescription}>{role.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: SPACING.md,
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xl,
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontFamily: FONT.regular,
    fontSize: SIZES.md,
    color: COLORS.gray,
    textAlign: 'center',
  },
  roleContainer: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: SPACING.lg,
  },
  roleCard: {
    width: Platform.OS === 'web' ? 300 : '100%',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.lg,
    borderWidth: 2,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  roleTitle: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.lg,
    color: COLORS.darkGray,
    marginBottom: SPACING.xs,
  },
  roleDescription: {
    fontFamily: FONT.regular,
    fontSize: SIZES.sm,
    color: COLORS.gray,
    textAlign: 'center',
  },
});