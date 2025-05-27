import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import { Bell, LogOut } from 'lucide-react-native';

interface HeaderProps {
  title: string;
  showNotification?: boolean;
  showProfile?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showNotification = true,
  showProfile = true,
}) => {
  const { user, logout } = useAuth();
  const [profileModalVisible, setProfileModalVisible] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/(auth)');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navigateToProfile = () => {
    setProfileModalVisible(false);

    if (user?.role === 'student') {
      router.push('/(student)/profile');
    } else if (user?.role === 'faculty') {
      router.push('/(faculty)/profile');
    } else if (user?.role === 'admin') {
      router.push('/(admin)');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.innerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.actionContainer}>
          {showNotification && (
            <TouchableOpacity style={styles.iconButton}>
              <Bell size={24} color={COLORS.darkGray} />
            </TouchableOpacity>
          )}

          {showProfile && user && (
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => setProfileModalVisible(true)}
            >
              <Image
                source={{
                  uri:
                    user.profilePicture ||
                    'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
                }}
                style={styles.profileImage}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <Modal
        visible={profileModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setProfileModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setProfileModalVisible(false)}
        >
          <View
            style={styles.profileModal}
            onStartShouldSetResponder={() => true}
          >
            <View style={styles.profileHeader}>
              <Image
                source={{
                  uri:
                    user?.profilePicture ||
                    'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
                }}
                style={styles.profileModalImage}
              />
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{user?.name}</Text>
                <Text style={styles.profileRole}>{user?.role}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={navigateToProfile}
            >
              <Text style={styles.menuItemText}>My Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.menuItem, styles.logoutItem]}
              onPress={handleLogout}
            >
              <LogOut size={18} color={COLORS.error} />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    ...SHADOWS.small,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.lg,
    color: COLORS.darkGray,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.sm,
  },
  profileButton: {
    marginLeft: SPACING.sm,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.lightGray,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  profileModal: {
    width: Platform.OS === 'web' ? 300 : '80%',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginTop: 60,
    marginRight: SPACING.md,
    ...SHADOWS.large,
    overflow: 'hidden',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  profileModalImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileInfo: {
    marginLeft: SPACING.md,
  },
  profileName: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.md,
    color: COLORS.darkGray,
  },
  profileRole: {
    fontFamily: FONT.regular,
    fontSize: SIZES.sm,
    color: COLORS.gray,
    textTransform: 'capitalize',
  },
  menuItem: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  menuItemText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.md,
    color: COLORS.darkGray,
  },
  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0,
  },
  logoutText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.md,
    color: COLORS.error,
    marginLeft: SPACING.sm,
  },
});

export default Header;
