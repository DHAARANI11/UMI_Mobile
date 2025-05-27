import React from 'react';
import { Tabs } from 'expo-router';
import { COLORS } from '@/constants/theme';
import { LayoutGrid, BookOpen, Users, Calendar, User } from 'lucide-react-native';
import TabBar from '@/components/shared/TabBar';
import { View, StyleSheet } from 'react-native';
import { useAuth } from '@/context/AuthContext';

export default function FacultyTabsLayout() {
  const { user } = useAuth();

  if (!user || user.role !== 'faculty') {
    return null;
  }

  const tabs = [
    {
      name: 'index',
      href: '/(faculty)',
      icon: LayoutGrid,
      label: 'Dashboard',
    },
    {
      name: 'courses',
      href: '/(faculty)/courses',
      icon: BookOpen,
      label: 'Courses',
    },
    {
      name: 'students',
      href: '/(faculty)/students',
      icon: Users,
      label: 'Students',
    },
    {
      name: 'attendance',
      href: '/(faculty)/attendance',
      icon: Calendar,
      label: 'Attendance',
    },
    {
      name: 'profile',
      href: '/(faculty)/profile',
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
        <Tabs.Screen name="courses" />
        <Tabs.Screen name="students" />
        <Tabs.Screen name="attendance" />
        <Tabs.Screen name="profile" />
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