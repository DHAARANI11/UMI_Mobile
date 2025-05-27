import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Modal } from 'react-native';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '@/constants/theme';
import Header from '@/components/shared/Header';
import { Plus, Search, Users, Clock, FileText } from 'lucide-react-native';

const mockCourses = [
  {
    id: '1',
    name: 'Advanced Database Systems',
    description: 'Advanced concepts in database management and design',
    students: 30,
    duration: '16 weeks',
    credits: 4,
  },
  {
    id: '2',
    name: 'Web Development',
    description: 'Modern web development techniques and frameworks',
    students: 25,
    duration: '12 weeks',
    credits: 3,
  },
];

export default function FacultyCoursesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [newCourse, setNewCourse] = useState({
    name: '',
    description: '',
    duration: '',
    credits: '',
  });

  const filteredCourses = mockCourses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCourse = () => {
    // Add course logic here
    setIsAddModalVisible(false);
    setNewCourse({ name: '', description: '', duration: '', credits: '' });
  };

  return (
    <View style={styles.container}>
      <Header title="My Courses" />
      
      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <Search size={20} color={COLORS.gray} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search courses..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={COLORS.gray}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setIsAddModalVisible(true)}
          >
            <Plus size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredCourses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.courseCard}>
              <Text style={styles.courseName}>{item.name}</Text>
              <Text style={styles.courseDescription}>{item.description}</Text>
              
              <View style={styles.courseStats}>
                <View style={styles.statItem}>
                  <Users size={16} color={COLORS.gray} />
                  <Text style={styles.statText}>{item.students} Students</Text>
                </View>
                
                <View style={styles.statItem}>
                  <Clock size={16} color={COLORS.gray} />
                  <Text style={styles.statText}>{item.duration}</Text>
                </View>
                
                <View style={styles.statItem}>
                  <FileText size={16} color={COLORS.gray} />
                  <Text style={styles.statText}>{item.credits} Credits</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.coursesList}
        />

        <Modal
          visible={isAddModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsAddModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add New Course</Text>
              
              <TextInput
                style={styles.input}
                placeholder="Course Name"
                value={newCourse.name}
                onChangeText={(text) => setNewCourse({ ...newCourse, name: text })}
                placeholderTextColor={COLORS.gray}
              />
              
              <TextInput
                style={styles.input}
                placeholder="Description"
                value={newCourse.description}
                onChangeText={(text) => setNewCourse({ ...newCourse, description: text })}
                placeholderTextColor={COLORS.gray}
                multiline
              />
              
              <TextInput
                style={styles.input}
                placeholder="Duration (e.g., 16 weeks)"
                value={newCourse.duration}
                onChangeText={(text) => setNewCourse({ ...newCourse, duration: text })}
                placeholderTextColor={COLORS.gray}
              />
              
              <TextInput
                style={styles.input}
                placeholder="Credits"
                value={newCourse.credits}
                onChangeText={(text) => setNewCourse({ ...newCourse, credits: text })}
                placeholderTextColor={COLORS.gray}
                keyboardType="numeric"
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setIsAddModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.modalButton, styles.addButtonModal]}
                  onPress={handleAddCourse}
                >
                  <Text style={styles.addButtonText}>Add Course</Text>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  searchIcon: {
    position: 'absolute',
    left: SPACING.md,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingVertical: SPACING.sm,
    paddingLeft: SPACING.xl,
    paddingRight: SPACING.md,
    fontFamily: FONT.regular,
    fontSize: SIZES.md,
    color: COLORS.darkGray,
    ...SHADOWS.small,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: SPACING.sm,
    marginLeft: SPACING.sm,
    ...SHADOWS.small,
  },
  coursesList: {
    paddingBottom: 100,
  },
  courseCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  courseName: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.lg,
    color: COLORS.darkGray,
    marginBottom: SPACING.xs,
  },
  courseDescription: {
    fontFamily: FONT.regular,
    fontSize: SIZES.md,
    color: COLORS.gray,
    marginBottom: SPACING.sm,
  },
  courseStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  statText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
    color: COLORS.gray,
    marginLeft: SPACING.xs,
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
    maxWidth: 500,
  },
  modalTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.lg,
    color: COLORS.darkGray,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    fontFamily: FONT.regular,
    fontSize: SIZES.md,
    color: COLORS.darkGray,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.md,
  },
  modalButton: {
    flex: 1,
    borderRadius: 8,
    padding: SPACING.md,
    alignItems: 'center',
    marginHorizontal: SPACING.xs,
  },
  cancelButton: {
    backgroundColor: COLORS.background,
  },
  addButtonModal: {
    backgroundColor: COLORS.primary,
  },
  cancelButtonText: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.md,
    color: COLORS.gray,
  },
  addButtonText: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.md,
    color: COLORS.white,
  },
});