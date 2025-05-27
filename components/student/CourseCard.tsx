import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { User, Clock, FileText } from 'lucide-react-native';

export interface Course {
  id: string;
  name: string;
  description: string;
  faculty: string;
  credits?: number;
  duration?: string;
  image?: string;
  enrolled?: boolean;
}

interface CourseCardProps {
  course: Course;
  showEnrollButton?: boolean;
  onEnroll?: (courseId: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  showEnrollButton = false,
  onEnroll,
}) => {
  const router = useRouter();

  const handleViewCourse = () => {
    router.push(`/course/${course.id}`);
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{ 
            uri: course.image || 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg'
          }}
          style={styles.image}
        />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>{course.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {course.description}
        </Text>
        
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <User size={14} color={COLORS.gray} />
            <Text style={styles.detailText}>{course.faculty}</Text>
          </View>
          
          {course.credits && (
            <View style={styles.detailItem}>
              <FileText size={14} color={COLORS.gray} />
              <Text style={styles.detailText}>{course.credits} Credits</Text>
            </View>
          )}
          
          {course.duration && (
            <View style={styles.detailItem}>
              <Clock size={14} color={COLORS.gray} />
              <Text style={styles.detailText}>{course.duration}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.viewButton}
            onPress={handleViewCourse}
          >
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
          
          {showEnrollButton && !course.enrolled && (
            <TouchableOpacity 
              style={styles.enrollButton}
              onPress={() => onEnroll && onEnroll(course.id)}
            >
              <Text style={styles.enrollButtonText}>Enroll</Text>
            </TouchableOpacity>
          )}
          
          {course.enrolled && (
            <View style={styles.enrolledBadge}>
              <Text style={styles.enrolledText}>Enrolled</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
  },
  imageContainer: {
    height: 140,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    padding: SPACING.md,
  },
  title: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.lg,
    color: COLORS.darkGray,
    marginBottom: SPACING.xs,
  },
  description: {
    fontFamily: FONT.regular,
    fontSize: SIZES.sm,
    color: COLORS.gray,
    marginBottom: SPACING.sm,
  },
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SPACING.md,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.md,
    marginBottom: SPACING.xs,
  },
  detailText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.xs,
    color: COLORS.gray,
    marginLeft: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
  },
  viewButtonText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
    color: COLORS.white,
  },
  enrollButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: 6,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
  },
  enrollButtonText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
    color: COLORS.white,
  },
  enrolledBadge: {
    backgroundColor: `${COLORS.success}20`,
    borderRadius: 6,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
  },
  enrolledText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
    color: COLORS.success,
  },
});

export default CourseCard;