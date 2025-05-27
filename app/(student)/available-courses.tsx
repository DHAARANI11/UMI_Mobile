import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { COLORS, FONT, SIZES, SPACING } from '@/constants/theme';
import Header from '@/components/shared/Header';
import CourseCard, { Course } from '@/components/student/CourseCard';
import { Search } from 'lucide-react-native';

// Mock course data
const mockCourses: Course[] = [
  {
    id: '1',
    name: 'Introduction to Computer Science',
    description: 'A foundational course covering the basics of computer science, algorithms, and programming concepts.',
    faculty: 'Dr. John Smith',
    credits: 4,
    duration: '16 weeks',
    image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg',
  },
  {
    id: '2',
    name: 'Advanced Database Systems',
    description: 'This course covers advanced topics in database design, query optimization, and distributed databases.',
    faculty: 'Dr. Lisa Johnson',
    credits: 3,
    duration: '12 weeks',
    image: 'https://images.pexels.com/photos/5496463/pexels-photo-5496463.jpeg',
  },
  {
    id: '3',
    name: 'Artificial Intelligence',
    description: 'An introduction to artificial intelligence concepts, machine learning algorithms, and neural networks.',
    faculty: 'Prof. Michael Lee',
    credits: 4,
    duration: '16 weeks',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
  },
  {
    id: '4',
    name: 'Web Development',
    description: 'Learn modern web development techniques, frameworks, and best practices for building responsive web applications.',
    faculty: 'Dr. Sarah Williams',
    credits: 3,
    duration: '12 weeks',
    image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg',
  },
  {
    id: '5',
    name: 'Data Structures and Algorithms',
    description: 'A comprehensive study of data structures, algorithms, and their analysis for efficient problem-solving.',
    faculty: 'Prof. Robert Chen',
    credits: 4,
    duration: '16 weeks',
    image: 'https://images.pexels.com/photos/7095/people-coffee-notes-tea.jpg',
  },
];

export default function AvailableCoursesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [enrollingCourseId, setEnrollingCourseId] = useState<string | null>(null);

  // Filter courses based on search query
  const filteredCourses = mockCourses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.faculty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEnroll = (courseId: string) => {
    setEnrollingCourseId(courseId);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would update the backend
      setEnrollingCourseId(null);
      // Show success message or update UI
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Header title="Available Courses" />
      
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
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
        ) : filteredCourses.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No courses found matching your search.</Text>
          </View>
        ) : (
          <FlatList
            data={filteredCourses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CourseCard 
                course={item} 
                showEnrollButton={true}
                onEnroll={handleEnroll}
              />
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    fontFamily: FONT.regular,
    fontSize: SIZES.md,
    color: COLORS.darkGray,
    paddingVertical: SPACING.md,
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
  emptyStateText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.md,
    color: COLORS.gray,
    textAlign: 'center',
  },
});