import React, { useState } from 'react';
<<<<<<< HEAD
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
=======
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Modal, TouchableOpacity } from 'react-native';
>>>>>>> 4b5646ce3fe17203e5ef115b24c073d7b7315606
import { COLORS, FONT, SIZES, SPACING } from '@/constants/theme';
import Header from '@/components/shared/Header';
import CourseCard, { Course } from '@/components/student/CourseCard';
import { TriangleAlert as AlertTriangle } from 'lucide-react-native';

<<<<<<< HEAD
// Initial mock data
const mockEnrolledCourses: Course[] = [];
const mockAvailableCourses: Course[] = [
  {
    id: '1',
    name: 'Introduction to Computer Science',
    description: 'Basics of computer science, algorithms, and programming.',
=======
// Mock enrolled courses data - in a real app, this would come from an API
const mockEnrolledCourses: Course[] = [
  {
    id: '1',
    name: 'Introduction to Computer Science',
    description: 'A foundational course covering the basics of computer science, algorithms, and programming concepts.',
>>>>>>> 4b5646ce3fe17203e5ef115b24c073d7b7315606
    faculty: 'Dr. John Smith',
    credits: 4,
    duration: '16 weeks',
    image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg',
<<<<<<< HEAD
    enrolled: false,
  },
  {
    id: '2',
    name: 'Artificial Intelligence',
    description: 'AI concepts, machine learning, and neural networks.',
=======
    enrolled: true,
  },
  {
    id: '3',
    name: 'Artificial Intelligence',
    description: 'An introduction to artificial intelligence concepts, machine learning algorithms, and neural networks.',
>>>>>>> 4b5646ce3fe17203e5ef115b24c073d7b7315606
    faculty: 'Prof. Michael Lee',
    credits: 4,
    duration: '16 weeks',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
<<<<<<< HEAD
    enrolled: false,
  },
  {
    id: '3',
    name: 'Data Structures',
    description: 'Arrays, stacks, queues, linked lists, and trees.',
    faculty: 'Prof. Jane Doe',
    credits: 3,
    duration: '12 weeks',
    image: 'https://images.pexels.com/photos/2566581/pexels-photo-2566581.jpeg',
    enrolled: false,
  },
];

export default function CoursesScreen() {
=======
    enrolled: true,
  },
];

export default function EnrolledCoursesScreen() {
>>>>>>> 4b5646ce3fe17203e5ef115b24c073d7b7315606
  const [loading, setLoading] = useState(false);
  const [dropModalVisible, setDropModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState(mockEnrolledCourses);
<<<<<<< HEAD
  const [availableCourses, setAvailableCourses] = useState(mockAvailableCourses);

  const handleEnrollCourse = (course: Course) => {
    setAvailableCourses(prev => prev.filter(c => c.id !== course.id));
    setEnrolledCourses(prev => [...prev, { ...course, enrolled: true }]);
  };
=======
>>>>>>> 4b5646ce3fe17203e5ef115b24c073d7b7315606

  const handleDropCourse = (course: Course) => {
    setSelectedCourse(course);
    setDropModalVisible(true);
  };

  const confirmDropCourse = () => {
    if (selectedCourse) {
<<<<<<< HEAD
      setEnrolledCourses(prev => prev.filter(c => c.id !== selectedCourse.id));
      setAvailableCourses(prev => [...prev, { ...selectedCourse, enrolled: false }]);
=======
      setEnrolledCourses(prev => prev.filter(course => course.id !== selectedCourse.id));
      // In a real app, you would make an API call here
>>>>>>> 4b5646ce3fe17203e5ef115b24c073d7b7315606
    }
    setDropModalVisible(false);
    setSelectedCourse(null);
  };

  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <Header title="My Courses" />
      <ScrollView contentContainerStyle={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
        ) : (
          <>
            <Text style={styles.sectionTitle}>Enrolled Courses</Text>
            {enrolledCourses.length === 0 ? (
              <Text style={styles.emptyStateText}>You have not enrolled in any courses yet.</Text>
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
                scrollEnabled={false}
                contentContainerStyle={styles.coursesList}
              />
            )}

            <Text style={styles.sectionTitle}>Available Courses</Text>
            {availableCourses.length === 0 ? (
              <Text style={styles.emptyStateText}>No more courses available to enroll.</Text>
            ) : (
              <FlatList
                data={availableCourses}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <CourseCard
                    course={item}
                    showEnrollButton
                    onEnroll={() => handleEnrollCourse(item)}
                  />
                )}
                scrollEnabled={false}
                contentContainerStyle={styles.coursesList}
              />
            )}
          </>
        )}

        {/* Drop Modal */}
        <Modal
          visible={dropModalVisible}
          transparent
=======
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
>>>>>>> 4b5646ce3fe17203e5ef115b24c073d7b7315606
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
<<<<<<< HEAD
=======
              
>>>>>>> 4b5646ce3fe17203e5ef115b24c073d7b7315606
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setDropModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
<<<<<<< HEAD
=======
                
>>>>>>> 4b5646ce3fe17203e5ef115b24c073d7b7315606
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
<<<<<<< HEAD
      </ScrollView>
=======
      </View>
>>>>>>> 4b5646ce3fe17203e5ef115b24c073d7b7315606
    </View>
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.md, paddingBottom: 100 },
  sectionTitle: {
=======
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
>>>>>>> 4b5646ce3fe17203e5ef115b24c073d7b7315606
    fontFamily: FONT.semiBold,
    fontSize: SIZES.lg,
    color: COLORS.darkGray,
    marginBottom: SPACING.sm,
<<<<<<< HEAD
    marginTop: SPACING.lg,
  },
  coursesList: { gap: SPACING.md },
  loader: { marginTop: SPACING.xl },
=======
  },
>>>>>>> 4b5646ce3fe17203e5ef115b24c073d7b7315606
  emptyStateText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.md,
    color: COLORS.gray,
    textAlign: 'center',
<<<<<<< HEAD
    marginBottom: SPACING.lg,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
=======
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
>>>>>>> 4b5646ce3fe17203e5ef115b24c073d7b7315606
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
<<<<<<< HEAD
  warningIcon: { marginBottom: SPACING.md },
=======
  warningIcon: {
    marginBottom: SPACING.md,
  },
>>>>>>> 4b5646ce3fe17203e5ef115b24c073d7b7315606
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
<<<<<<< HEAD
  cancelButton: { backgroundColor: COLORS.background },
  dropButton: { backgroundColor: COLORS.error },
=======
  cancelButton: {
    backgroundColor: COLORS.background,
  },
  dropButton: {
    backgroundColor: COLORS.error,
  },
>>>>>>> 4b5646ce3fe17203e5ef115b24c073d7b7315606
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
<<<<<<< HEAD
});
=======
});
>>>>>>> 4b5646ce3fe17203e5ef115b24c073d7b7315606
