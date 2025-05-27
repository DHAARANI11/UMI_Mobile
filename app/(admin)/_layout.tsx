import React from 'react';
import { Tabs } from 'expo-router';
import { COLORS } from '@/constants/theme';
import { LayoutGrid, Users, GraduationCap, BookOpen, UserPlus } from 'lucide-react-native';
import TabBar from '@/components/shared/TabBar';
import { View, StyleSheet } from 'react-native';
import { useAuth } from '@/context/AuthContext';

export default function AdminTabsLayout() {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') {
    return null;
  }

  const tabs = [
    {
      name: 'index',
      href: '/(admin)',
      icon: LayoutGrid,
      label: 'Dashboard',
    },
    {
      name: 'faculty',
      href: '/(admin)/faculty',
      icon: Users,
      label: 'Faculty',
    },
    {
      name: 'students',
      href: '/(admin)/students',
      icon: GraduationCap,
      label: 'Students',
    },
    {
      name: 'courses',
      href: '/(admin)/courses',
      icon: BookOpen,
      label: 'Courses',
    },
    {
      name: 'assign',
      href: '/(admin)/assign',
      icon: UserPlus,
      label: 'Assign',
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
        <Tabs.Screen name="faculty" />
        <Tabs.Screen name="students" />
        <Tabs.Screen name="courses" />
        <Tabs.Screen name="assign" />
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