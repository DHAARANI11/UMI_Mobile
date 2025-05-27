import React from 'react';
import { Tabs } from 'expo-router';
import { COLORS } from '@/constants/theme';
import { LayoutGrid, BookOpen, GraduationCap, User } from 'lucide-react-native';
import TabBar from '@/components/shared/TabBar';
import { View, StyleSheet } from 'react-native';
import { useAuth } from '@/context/AuthContext';

export default function StudentTabsLayout() {
  const { user } = useAuth();

  // If no user or user is not a student, this layout should not render
  if (!user || user.role !== 'student') {
    return null;
  }

  const tabs = [
    {
      name: 'index',
      href: '/(student)',
      icon: LayoutGrid,
      label: 'Dashboard',
    },
    {
      name: 'available-courses',
      href: '/(student)/available-courses',
      icon: BookOpen,
      label: 'Available',
    },
    {
      name: 'enrolled-courses',
      href: '/(student)/enrolled-courses',
      icon: GraduationCap,
      label: 'Enrolled',
    },
    {
      name: 'profile',
      href: '/(student)/profile',
      icon: User,
      label: 'Profile',
    },
  ];

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
        tabBar={() => <TabBar tabs={tabs} />}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="available-courses" />
        <Tabs.Screen name="enrolled-courses" />
        <Tabs.Screen name="profile" />
        <Tabs.Screen name="profile/edit" />
        <Tabs.Screen name="profile/education" />
        <Tabs.Screen name="course/[id]" />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});