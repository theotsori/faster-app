import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  Platform,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');
const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const DashboardScreen = () => {
  const navigation = useNavigation();
  const [scrollY] = useState(new Animated.Value(0));

  const metrics = {
    fastingProgress: 67,
    journalEntries: 12,
    mood: 'Positive',
    streak: 7,
  };

  const navigationItems = [
    { 
      screen: 'Fasting', 
      label: 'Fasting Timer', 
      icon: 'timer-outline',
      gradient: ['#FF6B6B', '#FF8E8E'],
      description: 'Track your fasting progress'
    },
    { 
      screen: 'Devotional', 
      label: 'Devotional', 
      icon: 'book-outline',
      gradient: ['#4ECDC4', '#45B7AF'],
      description: 'Daily spiritual guidance'
    },
    { 
      screen: 'Journal', 
      label: 'Journal', 
      icon: 'create-outline',
      gradient: ['#FFD93D', '#FFE169'],
      description: 'Record your thoughts'
    },
    { 
      screen: 'DailyInspirations', 
      label: 'Inspirations', 
      icon: 'sunny-outline',
      gradient: ['#6C5CE7', '#8177EA'],
      description: 'Get motivated'
    }
  ];

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const renderMetricCard = (icon, value, label, progress = null, gradientColors) => (
    <View style={styles.metricCardContainer}>
      <BlurView intensity={80} style={styles.metricCard}>
        <LinearGradient
          colors={gradientColors}
          style={styles.metricIconContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Ionicons name={icon} size={24} color="#FFF" />
        </LinearGradient>
        <Text style={styles.metricValue}>{value}</Text>
        <Text style={styles.metricLabel}>{label}</Text>
        {progress !== null && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <LinearGradient
                colors={gradientColors}
                style={[styles.progressFill, { width: `${progress}%` }]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            </View>
            <Text style={styles.progressText}>{progress}%</Text>
          </View>
        )}
      </BlurView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#2C3E50', '#3498DB']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Animated Header Background */}
        <Animated.View style={[styles.headerBackground, { opacity: headerOpacity }]}>
          <BlurView intensity={80} style={StyleSheet.absoluteFill} />
        </Animated.View>

        {/* Header Content */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning,</Text>
            <Text style={styles.username}>Sarah</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="search-outline" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => navigation.navigate('Notifications')}
            >
              <Ionicons name="notifications-outline" size={24} color="#FFF" />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          {/* Streak Card */}
          <View style={styles.streakContainer}>
            <BlurView intensity={80} style={styles.streakCard}>
              <LinearGradient
                colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
                style={styles.streakContent}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.streakIconContainer}>
                  <Ionicons name="flame" size={32} color="#FFD93D" />
                </View>
                <View style={styles.streakTextContainer}>
                  <Text style={styles.streakCount}>{metrics.streak} Day Streak!</Text>
                  <Text style={styles.streakSubtext}>You're on fire! Keep going!</Text>
                </View>
              </LinearGradient>
            </BlurView>
          </View>

          {/* Metrics Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today's Progress</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.metricsScrollContainer}
            >
              {renderMetricCard(
                'timer-outline',
                `${metrics.fastingProgress}%`,
                'Fasting Progress',
                metrics.fastingProgress,
                ['#FF6B6B', '#FF8E8E']
              )}
              {renderMetricCard(
                'book-outline',
                metrics.journalEntries,
                'Journal Entries',
                null,
                ['#4ECDC4', '#45B7AF']
              )}
              {renderMetricCard(
                'sunny-outline',
                metrics.mood,
                'Current Mood',
                null,
                ['#FFD93D', '#FFE169']
              )}
            </ScrollView>
          </View>

          {/* Quick Actions Grid */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.gridContainer}>
              {navigationItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.gridItem}
                  onPress={() => navigation.navigate(item.screen)}
                >
                  <BlurView intensity={80} style={styles.gridItemContent}>
                    <LinearGradient
                      colors={item.gradient}
                      style={styles.gridIconContainer}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <Ionicons name={item.icon} size={24} color="#FFF" />
                    </LinearGradient>
                    <Text style={styles.gridLabel}>{item.label}</Text>
                    <Text style={styles.gridDescription}>{item.description}</Text>
                  </BlurView>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Daily Wisdom Card */}
          <View style={styles.section}>
            <BlurView intensity={80} style={styles.wisdomCard}>
              <View style={styles.wisdomHeader}>
                <Ionicons name="quote" size={24} color="#FFD93D" />
                <Text style={styles.wisdomTitle}>Daily Wisdom</Text>
              </View>
              <Text style={styles.wisdomQuote}>
                "The secret of getting ahead is getting started."
              </Text>
              <Text style={styles.wisdomAuthor}>- Mark Twain</Text>
            </BlurView>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E50',
  },
  gradient: {
    flex: 1,
  },
  headerBackground: {
    ...StyleSheet.absoluteFillObject,
    height: 100 + (Platform.OS === 'ios' ? 44 : StatusBar.currentHeight),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SPACING.sm,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B6B',
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: SPACING.xs,
  },
  username: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFF',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: SPACING.md,
  },
  streakContainer: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  streakCard: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  streakContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  streakIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 217, 61, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  streakTextContainer: {
    flex: 1,
  },
  streakCount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: SPACING.xs,
  },
  streakSubtext: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  metricsScrollContainer: {
    paddingRight: SPACING.lg,
  },
  metricCardContainer: {
    width: width * 0.4,
    marginRight: SPACING.md,
  },
  metricCard: {
    borderRadius: 20,
    padding: SPACING.md,
    overflow: 'hidden',
  },
  metricIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: SPACING.xs,
  },
  metricLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  progressContainer: {
    marginTop: SPACING.sm,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginTop: SPACING.xs,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SPACING.sm,
  },
  gridItem: {
    width: '50%',
    padding: SPACING.sm,
  },
  gridItemContent: {
    borderRadius: 20,
    padding: SPACING.md,
    overflow: 'hidden',
  },
  gridIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  gridLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: SPACING.xs,
  },
  gridDescription: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
  },
  wisdomCard: {
    borderRadius: 20,
    padding: SPACING.lg,
    overflow: 'hidden',
  },
  wisdomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  wisdomTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFD93D',
    marginLeft: SPACING.sm,
  },
  wisdomQuote: {
    fontSize: 18,
    lineHeight: 26,
    color: '#FFF',
    fontStyle: 'italic',
    marginBottom: SPACING.md,
  },
  wisdomAuthor: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'right',
  },
});

export default DashboardScreen;
