import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '@/constants/theme';
import Header from '@/components/shared/Header';
import { Search, Mail, Phone, GraduationCap } from 'lucide-react-native';

const mockStudents = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@university.edu',
    phone: '+1 (555) 123-4567',
    department: 'Computer Science',
    year: '2nd Year',
    courses: ['Advanced Database Systems', 'Web Development'],
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@university.edu',
    phone: '+1 (555) 234-5678',
    department: 'Computer Science',
    year: '3rd Year',
    courses: ['Web Development'],
  },
];

export default function FacultyStudentsScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = mockStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Header title="My Students" />
      
      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <Search size={20} color={COLORS.gray} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search students..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={COLORS.gray}
          />
        </View>

        <FlatList
          data={filteredStudents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.studentCard}>
              <View style={styles.studentHeader}>
                <Text style={styles.studentName}>{item.name}</Text>
                <View style={styles.yearBadge}>
                  <Text style={styles.yearText}>{item.year}</Text>
                </View>
              </View>
              
              <View style={styles.studentDetails}>
                <View style={styles.detailItem}>
                  <Mail size={16} color={COLORS.gray} />
                  <Text style={styles.detailText}>{item.email}</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Phone size={16} color={COLORS.gray} />
                  <Text style={styles.detailText}>{item.phone}</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <GraduationCap size={16} color={COLORS.gray} />
                  <Text style={styles.detailText}>{item.department}</Text>
                </View>
              </View>
              
              <View style={styles.coursesContainer}>
                <Text style={styles.coursesLabel}>Enrolled Courses:</Text>
                <View style={styles.coursesList}>
                  {item.courses.map((course, index) => (
                    <View key={index} style={styles.courseBadge}>
                      <Text style={styles.courseBadgeText}>{course}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.studentsList}
        />
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
  studentsList: {
    paddingBottom: 100,
  },
  studentCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  studentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  studentName: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.lg,
    color: COLORS.darkGray,
  },
  yearBadge: {
    backgroundColor: `${COLORS.primary}20`,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    borderRadius: 12,
  },
  yearText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.xs,
    color: COLORS.primary,
  },
  studentDetails: {
    marginBottom: SPACING.md,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  detailText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.sm,
    color: COLORS.gray,
    marginLeft: SPACING.xs,
  },
  coursesContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    paddingTop: SPACING.sm,
  },
  coursesLabel: {
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
    color: COLORS.darkGray,
    marginBottom: SPACING.xs,
  },
  coursesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  courseBadge: {
    backgroundColor: `${COLORS.secondary}20`,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    borderRadius: 12,
  },
  courseBadgeText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.xs,
    color: COLORS.secondary,
  },
});