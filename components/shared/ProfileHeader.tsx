import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { ChevronLeft, CreditCard as Edit } from 'lucide-react-native';

interface ProfileHeaderProps {
  name: string;
  role: string;
  profileImage?: string;
  canEdit?: boolean;
  onEditPress?: () => void;
  showBackButton?: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  role,
  profileImage,
  canEdit = false,
  onEditPress,
  showBackButton = false,
}) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {showBackButton && (
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color={COLORS.white} />
        </TouchableOpacity>
      )}
      
      <View style={styles.profileImageContainer}>
        <Image 
          source={{ 
            uri: profileImage || 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg'
          }}
          style={styles.profileImage}
        />
        {canEdit && (
          <TouchableOpacity 
            style={styles.editIconContainer}
            onPress={onEditPress}
          >
            <Edit size={16} color={COLORS.white} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.role}>{role}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    paddingTop: SPACING.xxl,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    position: 'relative',
    ...SHADOWS.medium,
  },
  backButton: {
    position: 'absolute',
    top: SPACING.xl,
    left: SPACING.md,
    zIndex: 10,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: SPACING.md,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.accent,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  infoContainer: {
    alignItems: 'center',
  },
  name: {
    fontFamily: FONT.bold,
    fontSize: SIZES.lg,
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  role: {
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
    color: COLORS.white,
    opacity: 0.9,
  },
});

export default ProfileHeader;