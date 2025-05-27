import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Modal, TouchableOpacity } from 'react-native';
import { COLORS, FONT, SIZES, SPACING } from '@/constants/theme';
import Header from '@/components/shared/Header';
import CourseCard, { Course } from '@/components/student/CourseCard';
import { TriangleAlert as AlertTriangle } from 'lucide-react-native';

// Mock enrolled courses data - in a real app, this would come from an API
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
];

export default function EnrolledCoursesScreen() {
  const [loading, setLoading] = useState(false);
  const [dropModalVisible, setDropModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState(mockEnrolledCourses);

  const handleDropCourse = (course: Course) => {
    setSelectedCourse(course);
    setDropModalVisible(true);
  };

  const confirmDropCourse = () => {
    if (selectedCourse) {
      setEnrolledCourses(prev => prev.filter(course => course.id !== selectedCourse.id));
      // In a real app, you would make an API call here
    }
    setDropModalVisible(false);
    setSelectedCourse(null);
  };

  return (
    <View style={styles.container}>
      <Header title="Enrolled Courses" />
      
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large\" color={COLORS.primary} style={styles.loader} />
        ) : enrolledCourses.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No Enrolled Courses</Text>
            <Text style={styles.emptyStateText}>
              You haven't enrolled in any courses yet. Browse available courses to get started.
            </Text>
          </View>
        ) : (
          <FlatList
            data={enrolledCourses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CourseCard 
                course={item} 
                showDropButton
                onDrop={() => handleDropCourse(item)}
              />
            )}
            contentContainerStyle={styles.coursesList}
            showsVerticalScrollIndicator={false}
          />
        )}

        <Modal
          visible={dropModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setDropModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <AlertTriangle size={48} color={COLORS.warning} style={styles.warningIcon} />
              <Text style={styles.modalTitle}>Drop Course</Text>
              <Text style={styles.modalText}>
                Are you sure you want to drop {selectedCourse?.name}? This action cannot be undone.
              </Text>
              
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setDropModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.modalButton, styles.dropButton]}
                  onPress={confirmDropCourse}
                >
                  <Text style={styles.dropButtonText}>Drop Course</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
    paddingBottom: 100,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.lg,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
  },
  warningIcon: {
    marginBottom: SPACING.md,
  },
  modalTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.lg,
    color: COLORS.darkGray,
    marginBottom: SPACING.sm,
  },
  modalText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.md,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: SPACING.md,
  },
  modalButton: {
    flex: 1,
    borderRadius: 8,
    padding: SPACING.md,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: COLORS.background,
  },
  dropButton: {
    backgroundColor: COLORS.error,
  },
  cancelButtonText: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.md,
    color: COLORS.gray,
  },
  dropButtonText: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.md,
    color: COLORS.white,
  },
});