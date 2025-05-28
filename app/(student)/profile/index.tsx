<<<<<<< HEAD
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '@/constants/theme';
import ProfileHeader from '@/components/shared/ProfileHeader';
import { useAuth } from '@/context/AuthContext';
import { Mail, Phone, CalendarClock, User, MapPin, GraduationCap, Github, Linkedin } from 'lucide-react-native';

const initialData = {
  id: 'L302',
  name: 'Akash',
  email: 'akash@example.com',
  rollNumber: 'L302',
  phone: '9876543210',
  dob: '2004-03-07',
  gender: 'Male',
  address: '123, Main Street, Chennai, India',
  department: 'ECE',
  batch: '2021-2025',
  fathersName: 'Nagarajan',
  mothersName: 'Deepa',
  firstGraduate: 'Yes',
  github: 'johndoe',
  linkedin: 'johndoe',
  profilePicture: 'https://example.com/images/student123.jpg',
};

const education = {
  college: {
    institution: 'ABC Engineering College',
    startYear: '2021',
    endYear: '2025',
    cgpa: '8.5',
  },
  highSchool: {
    institution: 'XYZ Higher Secondary School',
    startYear: '2020',
    endYear: '2021',
    percentage: '90%',
  },
  school: {
    institution: 'XYZ Matric School',
    startYear: '2018',
    endYear: '2019',
    percentage: '92%',
  },
};


export default function StudentProfileScreen() {
  const { user } = useAuth();
  const [showEdit, setShowEdit] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [profile, setProfile] = useState({
    ...initialData,
    name: user?.name || initialData.name,
    email: user?.email || initialData.email,
    profilePicture: user?.profilePicture || null,
  });

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission denied', 'Camera roll permission is required!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });
    if (!result.canceled) setProfile({ ...profile, profilePicture: result.assets[0].uri });
  };

  const handleChange = (field: keyof typeof profile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <ScrollView style={styles.container}>
      <ProfileHeader
        name={profile.name}
        role="Student"
        profileImage={profile.profilePicture}
        canEdit={true}
        onEditPress={() => setShowEdit(p => !p)}
      />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={() => setShowEdit(p => !p)}>
          <Text style={styles.actionButtonText}>{showEdit ? 'Close Edit' : 'Edit Student Details'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.secondaryButton]}
          onPress={() => setShowEducation(p => !p)}
        >
          <Text style={styles.secondaryButtonText}>{showEducation ? 'Hide Education' : 'View Education Details'}</Text>
        </TouchableOpacity>
      </View>

      {showEdit ? (
        <View style={styles.editSection}>
          <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
            <Image
              source={
                profile.profilePicture
                  ? { uri: profile.profilePicture }
                  : require('@/assets/images/default-avatar.png')
              }
              style={styles.image}
            />
            <Text style={styles.imageText}>Tap to change photo</Text>
          </TouchableOpacity>

          {[
            { label: 'Name', field: 'name' },
            { label: 'Email', field: 'email' },
            { label: 'Roll Number', field: 'rollNumber' },
            { label: 'Phone', field: 'phone' },
            { label: 'Date of Birth', field: 'dob' },
            { label: 'Gender', field: 'gender' },
            { label: 'Address', field: 'address' },
            { label: 'Department', field: 'department' },
            { label: 'Batch', field: 'batch' },
            { label: "Father's Name", field: 'fathersName' },
            { label: "Mother's Name", field: 'mothersName' },
            { label: 'First Graduate', field: 'firstGraduate' },
            { label: 'GitHub', field: 'github' },
            { label: 'LinkedIn', field: 'linkedin' },
          ].map(({ label, field }) => (
            <View key={field} style={{ marginBottom: 12 }}>
              <Text style={styles.label}>{label}</Text>
              <TextInput
                style={styles.input}
                value={profile[field]}
                onChangeText={text => handleChange(field as keyof typeof profile, text)}
              />
            </View>
          ))}
        </View>
      ) : (
        <>
          {/* Display Basic Info */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Basic Information</Text>
            <View style={styles.infoCard}>
              <InfoRow icon={<User size={16} color={COLORS.gray} />} label="Roll Number" value={profile.rollNumber} />
              <InfoRow icon={<Mail size={16} color={COLORS.gray} />} label="Email" value={profile.email} />
              <InfoRow icon={<Phone size={16} color={COLORS.gray} />} label="Phone" value={profile.phone} />
              <InfoRow icon={<CalendarClock size={16} color={COLORS.gray} />} label="Date of Birth" value={new Date(profile.dob).toLocaleDateString()} />
              <InfoRow icon={<User size={16} color={COLORS.gray} />} label="Gender" value={profile.gender} />
              <InfoRow icon={<MapPin size={16} color={COLORS.gray} />} label="Address" value={profile.address} />
            </View>
          </View>

          {/* Academic Info */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Academic Information</Text>
            <View style={styles.infoCard}>
              <InfoRow icon={<GraduationCap size={16} color={COLORS.gray} />} label="Department" value={profile.department} />
              <InfoRow icon={<User size={16} color={COLORS.gray} />} label="Batch" value={profile.batch} />
              <InfoRow icon={<User size={16} color={COLORS.gray} />} label="Father's Name" value={profile.fathersName} />
              <InfoRow icon={<User size={16} color={COLORS.gray} />} label="Mother's Name" value={profile.mothersName} />
              <InfoRow icon={<GraduationCap size={16} color={COLORS.gray} />} label="First Graduate" value={profile.firstGraduate} />
            </View>
          </View>

          {/* Social Profiles */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Social Profiles</Text>
            <View style={styles.infoCard}>
              <InfoRow icon={<Github size={16} color={COLORS.gray} />} label="GitHub" value={profile.github ? `@${profile.github}` : 'Not provided'} />
              <InfoRow icon={<Linkedin size={16} color={COLORS.gray} />} label="LinkedIn" value={profile.linkedin ? `@${profile.linkedin}` : 'Not provided'} />
            </View>
          </View>
        </>
      )}

      {showEducation && (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Education Details</Text>
          {Object.entries(education).map(([key, edu]: any) => (
            <View key={key} style={styles.infoCard}>
              <Text style={styles.infoLabel}>{edu.institution}</Text>
              <Text style={styles.infoValue}>
                {edu.startYear} - {edu.endYear}
              </Text>
              <Text style={styles.infoValue}>{edu.cgpa || edu.percentage}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

const InfoRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <View style={styles.infoRow}>
    <View style={styles.infoLabelContainer}>
      {icon}
      <Text style={styles.infoLabel}>{label}</Text>
    </View>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.md,
    backgroundColor: COLORS.background,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
=======
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
>>>>>>> 4b5646ce3fe17203e5ef115b24c073d7b7315606
  },
  actionButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
<<<<<<< HEAD
    padding: SPACING.sm,
    alignItems: 'center',
    marginRight: 8,
  },
  secondaryButton: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
    borderWidth: 1,
    marginRight: 0,
  },
  actionButtonText: {
    color: COLORS.white,
    fontFamily: FONT.semiBold,
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontFamily: FONT.semiBold,
  },
  editSection: {
    marginBottom: SPACING.lg,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imageText: {
    marginTop: 8,
    color: COLORS.primary,
    fontFamily: FONT.medium,
  },
  label: {
    fontFamily: FONT.medium,
    color: COLORS.gray,
    marginBottom: 4,
  },
  input: {
    backgroundColor: COLORS.lightGray,
    padding: 10,
    borderRadius: 8,
=======
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
>>>>>>> 4b5646ce3fe17203e5ef115b24c073d7b7315606
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
<<<<<<< HEAD
    padding: SPACING.md,
    borderRadius: 12,
    marginBottom: SPACING.sm,
=======
    borderRadius: 12,
    padding: SPACING.md,
    ...SHADOWS.small,
>>>>>>> 4b5646ce3fe17203e5ef115b24c073d7b7315606
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
<<<<<<< HEAD
    marginBottom: 8,
=======
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
>>>>>>> 4b5646ce3fe17203e5ef115b24c073d7b7315606
  },
  infoLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: {
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
    color: COLORS.gray,
<<<<<<< HEAD
    marginLeft: 6,
=======
    marginLeft: SPACING.xs,
>>>>>>> 4b5646ce3fe17203e5ef115b24c073d7b7315606
  },
  infoValue: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.sm,
    color: COLORS.darkGray,
<<<<<<< HEAD
  },
});
=======
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
>>>>>>> 4b5646ce3fe17203e5ef115b24c073d7b7315606
