import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '@/constants/theme';
import Header from '@/components/shared/Header';
import { Picker } from '@react-native-picker/picker';
import { Check, ChevronDown } from 'lucide-react-native';

const mockDepartments = [
  { id: '1', name: 'Computer Science' },
  { id: '2', name: 'Electrical Engineering' },
];

const mockCourses = [
  { id: '1', name: 'Advanced Database Systems', faculty: 'Dr. John Smith' },
  { id: '2', name: 'Web Development', faculty: 'Dr. Sarah Wilson' },
];

const mockStudents = [
  { id: '1', name: 'Alice Johnson', department: 'Computer Science' },
  { id: '2', name: 'Bob Wilson', department: 'Computer Science' },
  { id: '3', name: 'Charlie Brown', department: 'Computer Science' },
];

export default function AssignStudentsScreen() {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const toggleStudent = (studentId: string) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleAssign = () => {
    // Assign students logic here
    console.log('Assigning students:', selectedStudents);
  };

  return (
    <View style={styles.container}>
      <Header title="Assign Students" />
      
      <View style={styles.content}>
        <View style={styles.filters}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedDepartment}
              onValueChange={setSelectedDepartment}
              style={styles.picker}
            >
              <Picker.Item label="Select Department" value="" />
              {mockDepartments.map(dept => (
                <Picker.Item
                  key={dept.id}
                  label={dept.name}
                  value={dept.id}
                />
              ))}
            </Picker>
          </View>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedCourse}
              onValueChange={setSelectedCourse}
              style={styles.picker}
            >
              <Picker.Item label="Select Course" value="" />
              {mockCourses.map(course => (
                <Picker.Item
                  key={course.id}
                  label={`${course.name} (${course.faculty})`}
                  value={course.id}
                />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.selectedCount}>
          <Text style={styles.selectedText}>
            Selected Students: {selectedStudents.length}/30
          </Text>
        </View>

        <ScrollView style={styles.studentList}>
          {mockStudents.map(student => (
            <TouchableOpacity
              key={student.id}
              style={[
                styles.studentCard,
                selectedStudents.includes(student.id) && styles.selectedCard
              ]}
              onPress={() => toggleStudent(student.id)}
            >
              <View style={styles.studentInfo}>
                <Text style={styles.studentName}>{student.name}</Text>
                <Text style={styles.departmentName}>{student.department}</Text>
              </View>
              {selectedStudents.includes(student.id) && (
                <View style={styles.checkmark}>
                  <Check size={20} color={COLORS.white} />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={[
            styles.assignButton,
            (!selectedDepartment || !selectedCourse || selectedStudents.length === 0) &&
              styles.disabledButton
          ]}
          onPress={handleAssign}
          disabled={!selectedDepartment || !selectedCourse || selectedStudents.length === 0}
        >
          <Text style={styles.assignButtonText}>
            Assign Students
          </Text>
        </TouchableOpacity>
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
  filters: {
    marginBottom: SPACING.md,
  },
  pickerContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginBottom: SPACING.sm,
    ...SHADOWS.small,
  },
  picker: {
    height: 50,
  },
  selectedCount: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  selectedText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.md,
    color: COLORS.primary,
  },
  studentList: {
    flex: 1,
  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOWS.small,
  },
  selectedCard: {
    backgroundColor: `${COLORS.primary}10`,
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.md,
    color: COLORS.darkGray,
  },
  departmentName: {
    fontFamily: FONT.regular,
    fontSize: SIZES.sm,
    color: COLORS.gray,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  assignButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.md,
    ...SHADOWS.small,
  },
  disabledButton: {
    backgroundColor: COLORS.gray,
    opacity: 0.5,
  },
  assignButtonText: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.md,
    color: COLORS.white,
  },
});