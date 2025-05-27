import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { COLORS, FONT, SIZES, SPACING } from '@/constants/theme';
import Header from '@/components/shared/Header';
import CourseCard, { Course } from '@/components/student/CourseCard';

// Mock enrolled courses data
const mockEnrolledCourses: Course[] = [
  {
    id: '1',
    name: 'Introduction to Computer Science',
    description: 'A foundational course covering the basics of computer science, algorithms, and programming concepts.',
    faculty: 'Dr. John Smith',
    credits: 4,
    duration: '16 weeks',
    image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg',
    enrolled: true,
  },
  {
    id: '3',
    name: 'Artificial Intelligence',
    description: 'An introduction to artificial intelligence concepts, machine learning algorithms, and neural networks.',
    faculty: 'Prof. Michael Lee',
    credits: 4,
    duration: '16 weeks',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
    enrolled: true,
  },
  {
    id: '5',
    name: 'Data Structures and Algorithms',
    description: 'A comprehensive study of data structures, algorithms, and their analysis for efficient problem-solving.',
    faculty: 'Prof. Robert Chen',
    credits: 4,
    duration: '16 weeks',
    image: 'https://images.pexels.com/photos/7095/people-coffee-notes-tea.jpg',
    enrolled: true,
  },
];

export default function EnrolledCoursesScreen() {
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      <Header title="Enrolled Courses" />
      
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
        ) : mockEnrolledCourses.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No Enrolled Courses</Text>
            <Text style={styles.emptyStateText}>
              You haven't enrolled in any courses yet. Browse available courses to get started.
            </Text>
          </View>
        ) : (
          <FlatList
            data={mockEnrolledCourses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CourseCard course={item} />
            )}
            contentContainerStyle={styles.coursesList}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: SPACING.md,
  },
  coursesList: {
    paddingBottom: 100, // Extra space for the tab bar
  },
  loader: {
    marginTop: SPACING.xl,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  emptyStateTitle: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.lg,
    color: COLORS.darkGray,
    marginBottom: SPACING.sm,
  },
  emptyStateText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.md,
    color: COLORS.gray,
    textAlign: 'center',
  },
});