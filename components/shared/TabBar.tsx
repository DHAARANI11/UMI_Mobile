import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { usePathname, Link } from 'expo-router';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';


interface TabItem {
  name: string;
  href: string;
  icon: React.ComponentType<{
    size: number;
    color: string;
  }>;
  label: string;
}

interface TabBarProps {
  tabs: TabItem[];
}

const TabBar: React.FC<TabBarProps> = ({ tabs }) => {
  const pathname = usePathname();
  const { user } = useAuth();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/');
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <Link key={tab.name} href={tab.href as any} asChild>
          <TouchableOpacity 
            style={[
              styles.tab, 
              isActive(tab.href) && styles.activeTab
            ]}
          >
            <View style={styles.tabContent}>
              <View style={styles.iconContainer}>
                <tab.icon 
                  size={24} 
                  color={isActive(tab.href) ? COLORS.primary : COLORS.gray} 
                />
              </View>
              <Text 
                style={[
                  styles.tabLabel, 
                  isActive(tab.href) && styles.activeTabLabel
                ]}
              >
                {tab.label}
              </Text>
            </View>
          </TouchableOpacity>
        </Link>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    height: Platform.select({
      ios: 80,
      android: 70,
      default: 70,
    }),
    ...Platform.select({
      web: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
      },
      default: {
        elevation: 8,
        shadowColor: COLORS.black,
        shadowOffset: {
          width: 0,
          height: -3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
    }),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  iconContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  activeTab: {
    borderRadius: 8,
    backgroundColor: COLORS.primaryLight,
  },
  tabLabel: {
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
    color: COLORS.gray,
    includeFontPadding: false,
    textAlign: 'center',
  },
  activeTabLabel: {
    color: COLORS.primary,
  },
});

export default TabBar;