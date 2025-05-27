import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '@/constants/theme';
import Header from '@/components/shared/Header';
import { Calendar, ChevronDown, Check, X } from 'lucide-react-native';
import { Picker } from '@react-native-picker/picker';

const mockStudents = [
  { id: '1', name: 'John Doe', rollNumber: 'CS001' },
  { id: '2', name: 'Jane Smith', rollNumber: 'CS002' },
  { id: '3', name: 'Mike Johnson', rollNumber: 'CS003' },
];

const mockCourses = [
  { id: '1', name: 'Advanced Database Systems' },
  { id: '2', name: 'Web Development' },
];

export default function AttendanceScreen() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});

  const toggleAttendance = (studentId: string) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };

  const handleSubmit = () => {
    // Submit attendance logic here
    console.log('Attendance submitted:', attendance);
  };

  return (
    <View style={styles.container}>
      <Header title="Mark Attendance" />
      
      <View style={styles.content}>
        <View style={styles.filters}>
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
                  label={course.name}
                  value={course.id}
                />
              ))}
            </Picker>
          </View>

          <TouchableOpacity style={styles.dateButton}>
            <Calendar size={20} color={COLORS.gray} />
            <Text style={styles.dateButtonText}>
              {selectedDate.toLocaleDateString()}
            </Text>
            <ChevronDown size={20} color={COLORS.gray} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.studentList}>
          {mockStudents.map(student => (
            <View key={student.id} style={styles.studentRow}>
              <View style={styles.studentInfo}>
                <Text style={styles.studentName}>{student.name}</Text>
                <Text style={styles.rollNumber}>{student.rollNumber}</Text>
              </View>
              
              <View style={styles.attendanceButtons}>
                <TouchableOpacity
                  style={[
                    styles.attendanceButton,
                    attendance[student.id] === true && styles.presentButton
                  ]}
                  onPress={() => toggleAttendance(student.id)}
                >
                  <Check
                    size={20}
                    color={attendance[student.id] === true ? COLORS.white : COLORS.success}
                  />
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.attendanceButton,
                    attendance[student.id] === false && styles.absentButton
                  ]}
                  onPress={() => toggleAttendance(student.id)}
                >
                  <X
                    size={20}
                    color={attendance[student.id] === false ? COLORS.white : COLORS.error}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Submit Attendance</Text>
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
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: SPACING.md,
    ...SHADOWS.small,
  },
  dateButtonText: {
    flex: 1,
    fontFamily: FONT.medium,
    fontSize: SIZES.md,
    color: COLORS.darkGray,
    marginHorizontal: SPACING.sm,
  },
  studentList: {
    flex: 1,
  },
  studentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOWS.small,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.md,
    color: COLORS.darkGray,
  },
  rollNumber: {
    fontFamily: FONT.regular,
    fontSize: SIZES.sm,
    color: COLORS.gray,
  },
  attendanceButtons: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  attendanceButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  presentButton: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  absentButton: {
    backgroundColor: COLORS.error,
    borderColor: COLORS.error,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.md,
    ...SHADOWS.small,
  },
  submitButtonText: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.md,
    color: COLORS.white,
  },
});