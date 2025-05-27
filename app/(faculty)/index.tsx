import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '@/constants/theme';
import Header from '@/components/shared/Header';
import { useAuth } from '@/context/AuthContext';
import { Users, BookOpen, Calendar, ChevronRight, ChartBar as BarChart } from 'lucide-react-native';

const mockDashboardData = {
  totalStudents: 120,
  activeCourses: 4,
  attendanceToday: 85,
  upcomingClasses: [
    { id: '1', name: 'Advanced Database Systems', time: '10:00 AM', students: 30 },
    { id: '2', name: 'Web Development', time: '2:00 PM', students: 25 },
  ],
  recentAttendance: [
    { id: '1', course: 'Data Structures', date: '2024-03-10', present: 28, total: 30 },
    { id: '2', course: 'Algorithms', date: '2024-03-09', present: 25, total: 30 },
  ],
};

export default function FacultyDashboard() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Header title={`Welcome, ${user?.name.split(' ')[0] || 'Faculty'}`} />
      
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, styles.studentsCard]}>
            <View style={styles.statIconContainer}>
              <Users size={24} color={COLORS.primary} />
            </View>
            <View>
              <Text style={styles.statValue}>{mockDashboardData.totalStudents}</Text>
              <Text style={styles.statLabel}>Total Students</Text>
            </View>
          </View>
          
          <View style={[styles.statCard, styles.coursesCard]}>
            <View style={styles.statIconContainer}>
              <BookOpen size={24} color={COLORS.secondary} />
            </View>
            <View>
              <Text style={styles.statValue}>{mockDashboardData.activeCourses}</Text>
              <Text style={styles.statLabel}>Active Courses</Text>
            </View>
          </View>
          
          <View style={[styles.statCard, styles.attendanceCard]}>
            <View style={styles.statIconContainer}>
              <BarChart size={24} color={COLORS.accent} />
            </View>
            <View>
              <Text style={styles.statValue}>{mockDashboardData.attendanceToday}%</Text>
              <Text style={styles.statLabel}>Today's Attendance</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Classes</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View Schedule</Text>
            </TouchableOpacity>
          </View>
          
          {mockDashboardData.upcomingClasses.map((classItem) => (
            <TouchableOpacity key={classItem.id} style={styles.classCard}>
              <View style={styles.classInfo}>
                <Text style={styles.className}>{classItem.name}</Text>
                <Text style={styles.classTime}>{classItem.time}</Text>
              </View>
              <View style={styles.classStudents}>
                <Users size={16} color={COLORS.gray} />
                <Text style={styles.studentsCount}>{classItem.students} students</Text>
              </View>
              <ChevronRight size={20} color={COLORS.gray} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Attendance</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {mockDashboardData.recentAttendance.map((record) => (
            <TouchableOpacity key={record.id} style={styles.attendanceCard}>
              <View style={styles.attendanceInfo}>
                <Text style={styles.courseName}>{record.course}</Text>
                <Text style={styles.attendanceDate}>
                  {new Date(record.date).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.attendanceStats}>
                <Text style={styles.attendanceCount}>
                  {record.present}/{record.total}
                </Text>
                <Text style={styles.attendancePercentage}>
                  {Math.round((record.present / record.total) * 100)}%
                </Text>
              </View>
              <ChevronRight size={20} color={COLORS.gray} />
            </TouchableOpacity>
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
  studentsCard: {
    borderTopColor: COLORS.primary,
    borderTopWidth: 3,
  },
  coursesCard: {
    borderTopColor: COLORS.secondary,
    borderTopWidth: 3,
  },
  attendanceCard: {
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
  classCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  classInfo: {
    flex: 1,
  },
  className: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.md,
    color: COLORS.darkGray,
    marginBottom: 2,
  },
  classTime: {
    fontFamily: FONT.regular,
    fontSize: SIZES.sm,
    color: COLORS.gray,
  },
  classStudents: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  studentsCount: {
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
    color: COLORS.gray,
    marginLeft: SPACING.xs,
  },
  attendanceInfo: {
    flex: 1,
  },
  courseName: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.md,
    color: COLORS.darkGray,
    marginBottom: 2,
  },
  attendanceDate: {
    fontFamily: FONT.regular,
    fontSize: SIZES.sm,
    color: COLORS.gray,
  },
  attendanceStats: {
    alignItems: 'flex-end',
    marginRight: SPACING.md,
  },
  attendanceCount: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.md,
    color: COLORS.primary,
  },
  attendancePercentage: {
    fontFamily: FONT.regular,
    fontSize: SIZES.sm,
    color: COLORS.gray,
  },
});