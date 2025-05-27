import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '@/constants/theme';
import Header from '@/components/shared/Header';
import { useAuth } from '@/context/AuthContext';
import { Calendar, BookOpen, ClipboardCheck, ChevronRight, ChartBar as BarChart3 } from 'lucide-react-native';

// Mock data
const mockAttendanceData = {
  overall: 85,
  subjects: [
    { name: 'Mathematics', attendance: 90 },
    { name: 'Physics', attendance: 75 },
    { name: 'Computer Science', attendance: 95 },
  ],
};

const mockCourseData = {
  enrolled: 5,
  available: 12,
  recent: [
    { id: '1', name: 'Advanced Algorithms', lastAccessed: '2 days ago' },
    { id: '2', name: 'Database Systems', lastAccessed: '1 week ago' },
  ],
};

const mockAssignmentData = {
  total: 8,
  pending: 3,
  upcoming: [
    { id: '1', name: 'Algorithm Analysis', dueDate: '2023-06-20', course: 'Advanced Algorithms' },
    { id: '2', name: 'Database Design', dueDate: '2023-06-25', course: 'Database Systems' },
  ],
};

export default function StudentDashboard() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Header title={`Hello, ${user?.name.split(' ')[0] || 'Student'}`} />
      
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, styles.attendanceCard]}>
            <View style={styles.statIconContainer}>
              <BarChart3 size={24} color={COLORS.primary} />
            </View>
            <View>
              <Text style={styles.statValue}>{mockAttendanceData.overall}%</Text>
              <Text style={styles.statLabel}>Attendance</Text>
            </View>
          </View>
          
          <View style={[styles.statCard, styles.coursesCard]}>
            <View style={styles.statIconContainer}>
              <BookOpen size={24} color={COLORS.secondary} />
            </View>
            <View>
              <Text style={styles.statValue}>{mockCourseData.enrolled}</Text>
              <Text style={styles.statLabel}>Enrolled Courses</Text>
            </View>
          </View>
          
          <View style={[styles.statCard, styles.assignmentsCard]}>
            <View style={styles.statIconContainer}>
              <ClipboardCheck size={24} color={COLORS.accent} />
            </View>
            <View>
              <Text style={styles.statValue}>{mockAssignmentData.pending}</Text>
              <Text style={styles.statLabel}>Pending Assignments</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Assignments</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {mockAssignmentData.upcoming.map((assignment) => (
            <TouchableOpacity key={assignment.id} style={styles.assignmentCard}>
              <View style={styles.assignmentInfo}>
                <Text style={styles.assignmentName}>{assignment.name}</Text>
                <Text style={styles.assignmentCourse}>{assignment.course}</Text>
              </View>
              <View style={styles.assignmentDueContainer}>
                <Text style={styles.assignmentDueLabel}>Due Date</Text>
                <Text style={styles.assignmentDueDate}>
                  {new Date(assignment.dueDate).toLocaleDateString()}
                </Text>
              </View>
              <ChevronRight size={20} color={COLORS.gray} />
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Courses</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {mockCourseData.recent.map((course) => (
            <TouchableOpacity key={course.id} style={styles.courseCard}>
              <View style={styles.courseInfo}>
                <Text style={styles.courseName}>{course.name}</Text>
                <Text style={styles.courseLastAccessed}>Last accessed: {course.lastAccessed}</Text>
              </View>
              <ChevronRight size={20} color={COLORS.gray} />
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Exam Timetable</Text>
            <Calendar size={20} color={COLORS.primary} />
          </View>
          
          <View style={styles.examTimetableCard}>
            <Text style={styles.examTimetableText}>
              Your next exam is <Text style={styles.examHighlight}>Mathematics</Text> on <Text style={styles.examHighlight}>June 15, 2023</Text>
            </Text>
            <TouchableOpacity style={styles.viewTimetableButton}>
              <Text style={styles.viewTimetableText}>View Full Timetable</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Extra padding at the bottom for tab bar */}
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
  },
  statCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    minWidth: '30%',
    flex: 1,
    marginHorizontal: 4,
    ...SHADOWS.small,
  },
  attendanceCard: {
    borderTopColor: COLORS.primary,
    borderTopWidth: 3,
  },
  coursesCard: {
    borderTopColor: COLORS.secondary,
    borderTopWidth: 3,
  },
  assignmentsCard: {
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
  assignmentCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  assignmentInfo: {
    flex: 1,
  },
  assignmentName: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.md,
    color: COLORS.darkGray,
    marginBottom: 2,
  },
  assignmentCourse: {
    fontFamily: FONT.regular,
    fontSize: SIZES.xs,
    color: COLORS.gray,
  },
  assignmentDueContainer: {
    marginRight: SPACING.md,
    alignItems: 'center',
  },
  assignmentDueLabel: {
    fontFamily: FONT.regular,
    fontSize: SIZES.xs,
    color: COLORS.gray,
  },
  assignmentDueDate: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.sm,
    color: COLORS.accent,
  },
  courseCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  courseInfo: {
    flex: 1,
  },
  courseName: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.md,
    color: COLORS.darkGray,
    marginBottom: 2,
  },
  courseLastAccessed: {
    fontFamily: FONT.regular,
    fontSize: SIZES.xs,
    color: COLORS.gray,
  },
  examTimetableCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.lg,
    ...SHADOWS.small,
  },
  examTimetableText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.md,
    color: COLORS.darkGray,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  examHighlight: {
    fontFamily: FONT.semiBold,
    color: COLORS.primary,
  },
  viewTimetableButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    alignSelf: 'center',
  },
  viewTimetableText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
    color: COLORS.white,
  },
});