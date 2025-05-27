import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Modal } from 'react-native';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '@/constants/theme';
import Header from '@/components/shared/Header';
import { Search, Plus, Mail, Phone, GraduationCap, Trash2, CreditCard as Edit2 } from 'lucide-react-native';

const mockFaculty = [
  {
    id: '1',
    name: 'Dr. John Smith',
    email: 'john.smith@university.edu',
    phone: '+1 (555) 123-4567',
    department: 'Computer Science',
    designation: 'Professor',
    courses: ['Advanced Database Systems', 'Web Development'],
  },
  {
    id: '2',
    name: 'Dr. Sarah Wilson',
    email: 'sarah.wilson@university.edu',
    phone: '+1 (555) 234-5678',
    department: 'Computer Science',
    designation: 'Associate Professor',
    courses: ['Machine Learning', 'Artificial Intelligence'],
  },
];

export default function FacultyManagementScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [newFaculty, setNewFaculty] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
  });

  const filteredFaculty = mockFaculty.filter(
    (faculty) =>
      faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faculty.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faculty.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddFaculty = () => {
    // Add faculty logic here
    setIsAddModalVisible(false);
    setNewFaculty({
      name: '',
      email: '',
      phone: '',
      department: '',
      designation: '',
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Faculty Management" />
      
      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <Search size={20} color={COLORS.gray} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search faculty..."
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
          data={filteredFaculty}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.facultyCard}>
              <View style={styles.facultyHeader}>
                <View>
                  <Text style={styles.facultyName}>{item.name}</Text>
                  <Text style={styles.designation}>{item.designation}</Text>
                </View>
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.editButton}>
                    <Edit2 size={16} color={COLORS.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteButton}>
                    <Trash2 size={16} color={COLORS.error} />
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.facultyDetails}>
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
                <Text style={styles.coursesLabel}>Assigned Courses:</Text>
                <View style={styles.coursesList}>
                  {item.courses.map((course, index) => (
                    <View key={index} style={styles.courseBadge}>
                      <Text style={styles.courseBadgeText}>{course}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}
          contentContainerStyle={styles.facultyList}
        />

        <Modal
          visible={isAddModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsAddModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add New Faculty</Text>
              
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={newFaculty.name}
                onChangeText={(text) => setNewFaculty({ ...newFaculty, name: text })}
                placeholderTextColor={COLORS.gray}
              />
              
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={newFaculty.email}
                onChangeText={(text) => setNewFaculty({ ...newFaculty, email: text })}
                placeholderTextColor={COLORS.gray}
                keyboardType="email-address"
              />
              
              <TextInput
                style={styles.input}
                placeholder="Phone"
                value={newFaculty.phone}
                onChangeText={(text) => setNewFaculty({ ...newFaculty, phone: text })}
                placeholderTextColor={COLORS.gray}
                keyboardType="phone-pad"
              />
              
              <TextInput
                style={styles.input}
                placeholder="Department"
                value={newFaculty.department}
                onChangeText={(text) => setNewFaculty({ ...newFaculty, department: text })}
                placeholderTextColor={COLORS.gray}
              />
              
              <TextInput
                style={styles.input}
                placeholder="Designation"
                value={newFaculty.designation}
                onChangeText={(text) => setNewFaculty({ ...newFaculty, designation: text })}
                placeholderTextColor={COLORS.gray}
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
                  onPress={handleAddFaculty}
                >
                  <Text style={styles.addButtonText}>Add Faculty</Text>
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
  facultyList: {
    paddingBottom: 100,
  },
  facultyCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  facultyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  facultyName: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.lg,
    color: COLORS.darkGray,
  },
  designation: {
    fontFamily: FONT.regular,
    fontSize: SIZES.sm,
    color: COLORS.gray,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  editButton: {
    padding: SPACING.xs,
  },
  deleteButton: {
    padding: SPACING.xs,
  },
  facultyDetails: {
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