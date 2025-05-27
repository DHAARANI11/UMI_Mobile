import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '@/constants/theme';
import ProfileHeader from '@/components/shared/ProfileHeader';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import { Mail, Phone, CalendarClock, User, MapPin, GraduationCap, Github, Linkedin, ChevronRight } from 'lucide-react-native';

// Mock student data
const mockStudentData = {
  id: '1',
  name: 'John Student',
  email: 'student@university.edu',
  rollNumber: 'CS2023001',
  phone: '+1 (555) 123-4567',
  dob: '1998-05-15',
  gender: 'Male',
  address: '123 University Ave, Campus City',
  department: 'Computer Science',
  batch: '2023-2027',
  fathersName: 'Robert Student',
  mothersName: 'Mary Student',
  firstGraduate: 'No',
  github: 'johndoe',
  linkedin: 'johndoe',
  education: {
    college: {
      institution: 'University College',
      startYear: '2023',
      endYear: '2027',
      cgpa: '3.8',
    },
    highSchool: {
      institution: 'City High School',
      startYear: '2021',
      endYear: '2023',
      percentage: '92%',
    },
    school: {
      institution: 'City Secondary School',
      startYear: '2019',
      endYear: '2021',
      percentage: '90%',
    },
  },
};

export default function StudentProfileScreen() {
  const { user } = useAuth();

  const navigateToEditProfile = () => {
    router.push('/(student)/profile/edit');
  };

  const navigateToEducationDetails = () => {
    router.push('/(student)/profile/education');
  };

  return (
    <View style={styles.container}>
      <ProfileHeader 
        name={user?.name || mockStudentData.name}
        role="Student"
        profileImage={user?.profilePicture}
        canEdit={true}
        onEditPress={navigateToEditProfile}
      />
      
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={navigateToEditProfile}
          >
            <Text style={styles.actionButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={navigateToEducationDetails}
          >
            <Text style={styles.secondaryButtonText}>Education Details</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <User size={16} color={COLORS.gray} />
                <Text style={styles.infoLabel}>Roll Number</Text>
              </View>
              <Text style={styles.infoValue}>{mockStudentData.rollNumber}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <Mail size={16} color={COLORS.gray} />
                <Text style={styles.infoLabel}>Email</Text>
              </View>
              <Text style={styles.infoValue}>{mockStudentData.email}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <Phone size={16} color={COLORS.gray} />
                <Text style={styles.infoLabel}>Phone</Text>
              </View>
              <Text style={styles.infoValue}>{mockStudentData.phone}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <CalendarClock size={16} color={COLORS.gray} />
                <Text style={styles.infoLabel}>Date of Birth</Text>
              </View>
              <Text style={styles.infoValue}>
                {new Date(mockStudentData.dob).toLocaleDateString()}
              </Text>
            </View>
            
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <User size={16} color={COLORS.gray} />
                <Text style={styles.infoLabel}>Gender</Text>
              </View>
              <Text style={styles.infoValue}>{mockStudentData.gender}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <MapPin size={16} color={COLORS.gray} />
                <Text style={styles.infoLabel}>Address</Text>
              </View>
              <Text style={styles.infoValue}>{mockStudentData.address}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Academic Information</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <GraduationCap size={16} color={COLORS.gray} />
                <Text style={styles.infoLabel}>Department</Text>
              </View>
              <Text style={styles.infoValue}>{mockStudentData.department}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <User size={16} color={COLORS.gray} />
                <Text style={styles.infoLabel}>Batch</Text>
              </View>
              <Text style={styles.infoValue}>{mockStudentData.batch}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <User size={16} color={COLORS.gray} />
                <Text style={styles.infoLabel}>Father's Name</Text>
              </View>
              <Text style={styles.infoValue}>{mockStudentData.fathersName}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <User size={16} color={COLORS.gray} />
                <Text style={styles.infoLabel}>Mother's Name</Text>
              </View>
              <Text style={styles.infoValue}>{mockStudentData.mothersName}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <GraduationCap size={16} color={COLORS.gray} />
                <Text style={styles.infoLabel}>First Graduate</Text>
              </View>
              <Text style={styles.infoValue}>{mockStudentData.firstGraduate}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Social Profiles</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <Github size={16} color={COLORS.gray} />
                <Text style={styles.infoLabel}>GitHub</Text>
              </View>
              <Text style={styles.infoValue}>
                {mockStudentData.github ? `@${mockStudentData.github}` : 'Not provided'}
              </Text>
            </View>
            
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <Linkedin size={16} color={COLORS.gray} />
                <Text style={styles.infoLabel}>LinkedIn</Text>
              </View>
              <Text style={styles.infoValue}>
                {mockStudentData.linkedin ? `@${mockStudentData.linkedin}` : 'Not provided'}
              </Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.educationDetailsButton}
          onPress={navigateToEducationDetails}
        >
          <View style={styles.educationButtonContent}>
            <GraduationCap size={20} color={COLORS.primary} />
            <Text style={styles.educationButtonText}>View Education Details</Text>
          </View>
          <ChevronRight size={20} color={COLORS.primary} />
        </TouchableOpacity>
        
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
  buttonsContainer: {
    flexDirection: 'row',
    marginBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  actionButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  actionButtonText: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.sm,
    color: COLORS.white,
  },
  secondaryButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  secondaryButtonText: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.sm,
    color: COLORS.primary,
  },
  sectionContainer: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.md,
    color: COLORS.darkGray,
    marginBottom: SPACING.sm,
  },
  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    ...SHADOWS.small,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  infoLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: {
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
    color: COLORS.gray,
    marginLeft: SPACING.xs,
  },
  infoValue: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.sm,
    color: COLORS.darkGray,
    maxWidth: '50%',
    textAlign: 'right',
  },
  educationDetailsButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    ...SHADOWS.small,
  },
  educationButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  educationButtonText: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.md,
    color: COLORS.primary,
    marginLeft: SPACING.sm,
  },
});