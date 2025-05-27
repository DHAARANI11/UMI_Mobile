import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '@/constants/theme';
import ProfileHeader from '@/components/shared/ProfileHeader';
import { useAuth } from '@/context/AuthContext';
import { Mail, Phone, Shield, Key, Clock, Settings, ChevronRight } from 'lucide-react-native';

// Mock admin data
const mockAdminData = {
  id: '1',
  name: 'Admin User',
  email: 'admin@university.edu',
  phone: '+1 (555) 123-4567',
  role: 'System Administrator',
  department: 'IT Administration',
  joinDate: '2020-01-15',
  lastLogin: '2024-03-15 09:30 AM',
  permissions: [
    'User Management',
    'Course Management',
    'Faculty Management',
    'Student Management',
    'System Configuration',
  ],
  recentActivities: [
    {
      id: '1',
      action: 'Added new faculty member',
      timestamp: '2024-03-14 02:30 PM',
    },
    {
      id: '2',
      action: 'Updated course schedule',
      timestamp: '2024-03-14 11:45 AM',
    },
    {
      id: '3',
      action: 'Approved student registration',
      timestamp: '2024-03-13 04:15 PM',
    },
  ],
};

export default function AdminProfileScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <ProfileHeader 
        name={user?.name || mockAdminData.name}
        role="Administrator"
        profileImage={user?.profilePicture}
        canEdit={true}
      />
      
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Mail size={20} color={COLORS.gray} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{mockAdminData.email}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Phone size={20} color={COLORS.gray} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Phone</Text>
                <Text style={styles.infoValue}>{mockAdminData.phone}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Administrative Information</Text>
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Shield size={20} color={COLORS.gray} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Role</Text>
                <Text style={styles.infoValue}>{mockAdminData.role}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Settings size={20} color={COLORS.gray} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Department</Text>
                <Text style={styles.infoValue}>{mockAdminData.department}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Clock size={20} color={COLORS.gray} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Join Date</Text>
                <Text style={styles.infoValue}>
                  {new Date(mockAdminData.joinDate).toLocaleDateString()}
                </Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Key size={20} color={COLORS.gray} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Last Login</Text>
                <Text style={styles.infoValue}>{mockAdminData.lastLogin}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System Permissions</Text>
          <View style={styles.card}>
            {mockAdminData.permissions.map((permission, index) => (
              <View 
                key={index} 
                style={[
                  styles.permissionRow,
                  index === mockAdminData.permissions.length - 1 && styles.lastRow
                ]}
              >
                <Shield size={20} color={COLORS.success} />
                <Text style={styles.permissionText}>{permission}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
          <View style={styles.card}>
            {mockAdminData.recentActivities.map((activity, index) => (
              <TouchableOpacity 
                key={activity.id} 
                style={[
                  styles.activityRow,
                  index === mockAdminData.recentActivities.length - 1 && styles.lastRow
                ]}
              >
                <View style={styles.activityInfo}>
                  <Text style={styles.activityText}>{activity.action}</Text>
                  <Text style={styles.activityTime}>{activity.timestamp}</Text>
                </View>
                <ChevronRight size={20} color={COLORS.gray} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flex: 1,
    padding: SPACING.md,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.md,
    color: COLORS.darkGray,
    marginBottom: SPACING.sm,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    ...SHADOWS.small,
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  lastRow: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  infoIcon: {
    width: 40,
    alignItems: 'center',
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontFamily: FONT.regular,
    fontSize: SIZES.sm,
    color: COLORS.gray,
    marginBottom: 2,
  },
  infoValue: {
    fontFamily: FONT.medium,
    fontSize: SIZES.md,
    color: COLORS.darkGray,
  },
  permissionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    gap: SPACING.sm,
  },
  permissionText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.md,
    color: COLORS.darkGray,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  activityInfo: {
    flex: 1,
  },
  activityText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.md,
    color: COLORS.darkGray,
  },
  activityTime: {
    fontFamily: FONT.regular,
    fontSize: SIZES.sm,
    color: COLORS.gray,
    marginTop: 2,
  },
});