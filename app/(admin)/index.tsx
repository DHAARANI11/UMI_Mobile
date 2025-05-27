import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '@/constants/theme';
import Header from '@/components/shared/Header';
import { useAuth } from '@/context/AuthContext';
import { Users, GraduationCap, BookOpen, ChevronRight, ChartBar as BarChart } from 'lucide-react-native';

const mockDashboardData = {
  totalFaculty: 25,
  totalStudents: 500,
  totalCourses: 30,
  recentActivities: [
    {
      id: '1',
      type: 'faculty_added',
      description: 'New faculty member added: Dr. Sarah Wilson',
      timestamp: '2024-03-10T10:30:00Z',
    },
    {
      id: '2',
      type: 'course_created',
      description: 'New course created: Advanced Machine Learning',
      timestamp: '2024-03-10T09:15:00Z',
    },
    {
      id: '3',
      type: 'students_assigned',
      description: '30 students assigned to Web Development course',
      timestamp: '2024-03-09T16:45:00Z',
    },
  ],
  departmentStats: [
    { name: 'Computer Science', students: 150, faculty: 8 },
    { name: 'Electrical Engineering', students: 120, faculty: 6 },
    { name: 'Mechanical Engineering', students: 100, faculty: 5 },
  ],
};

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Header title={`Welcome, ${user?.name.split(' ')[0] || 'Admin'}`} />
      
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, styles.facultyCard]}>
            <View style={styles.statIconContainer}>
              <Users size={24} color={COLORS.primary} />
            </View>
            <View>
              <Text style={styles.statValue}>{mockDashboardData.totalFaculty}</Text>
              <Text style={styles.statLabel}>Total Faculty</Text>
            </View>
          </View>
          
          <View style={[styles.statCard, styles.studentsCard]}>
            <View style={styles.statIconContainer}>
              <GraduationCap size={24} color={COLORS.secondary} />
            </View>
            <View>
              <Text style={styles.statValue}>{mockDashboardData.totalStudents}</Text>
              <Text style={styles.statLabel}>Total Students</Text>
            </View>
          </View>
          
          <View style={[styles.statCard, styles.coursesCard]}>
            <View style={styles.statIconContainer}>
              <BookOpen size={24} color={COLORS.accent} />
            </View>
            <View>
              <Text style={styles.statValue}>{mockDashboardData.totalCourses}</Text>
              <Text style={styles.statLabel}>Total Courses</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activities</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {mockDashboardData.recentActivities.map((activity) => (
            <TouchableOpacity key={activity.id} style={styles.activityCard}>
              <View style={styles.activityInfo}>
                <Text style={styles.activityDescription}>{activity.description}</Text>
                <Text style={styles.activityTime}>
                  {new Date(activity.timestamp).toLocaleString()}
                </Text>
              </View>
              <ChevronRight size={20} color={COLORS.gray} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Department Statistics</Text>
            <BarChart size={20} color={COLORS.primary} />
          </View>
          
          {mockDashboardData.departmentStats.map((dept, index) => (
            <View key={index} style={styles.departmentCard}>
              <Text style={styles.departmentName}>{dept.name}</Text>
              <View style={styles.departmentStats}>
                <View style={styles.departmentStat}>
                  <GraduationCap size={16} color={COLORS.secondary} />
                  <Text style={styles.statText}>{dept.students} Students</Text>
                </View>
                <View style={styles.departmentStat}>
                  <Users size={16} color={COLORS.primary} />
                  <Text style={styles.statText}>{dept.faculty} Faculty</Text>
                </View>
              </View>
            </View>
          ))}
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  statCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    flex: 1,
    minWidth: '30%',
    ...SHADOWS.small,
  },
  facultyCard: {
    borderTopColor: COLORS.primary,
    borderTopWidth: 3,
  },
  studentsCard: {
    borderTopColor: COLORS.secondary,
    borderTopWidth: 3,
  },
  coursesCard: {
    borderTopColor: COLORS.accent,
    borderTopWidth: 3,
  },
  statIconContainer: {
    marginBottom: SPACING.sm,
  },
  statValue: {
    fontFamily: FONT.bold,
    fontSize: SIZES.lg,
    color: COLORS.darkGray,
  },
  statLabel: {
    fontFamily: FONT.regular,
    fontSize: SIZES.xs,
    color: COLORS.gray,
  },
  sectionContainer: {
    marginBottom: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.md,
    color: COLORS.darkGray,
  },
  viewAllText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
    color: COLORS.primary,
  },
  activityCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  activityInfo: {
    flex: 1,
  },
  activityDescription: {
    fontFamily: FONT.medium,
    fontSize: SIZES.md,
    color: COLORS.darkGray,
    marginBottom: 2,
  },
  activityTime: {
    fontFamily: FONT.regular,
    fontSize: SIZES.sm,
    color: COLORS.gray,
  },
  departmentCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOWS.small,
  },
  departmentName: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.md,
    color: COLORS.darkGray,
    marginBottom: SPACING.sm,
  },
  departmentStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  departmentStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
    color: COLORS.gray,
    marginLeft: SPACING.xs,
  },
});