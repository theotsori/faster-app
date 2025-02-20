import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const DashboardScreen = () => {
  const navigation = useNavigation();

  const metrics = {
    fastingProgress: 65,
    journalEntries: 12,
    mood: 'Positive',
    streak: 7,
  };

  const navigationItems = [
    { screen: 'Fasting', label: 'Fasting Timer', icon: 'timer-outline', color: '#4A90E2', gradient: ['#4A90E2', '#357ABD'] },
    { screen: 'Devotional', label: 'Devotional', icon: 'book-outline', color: '#50E3C2', gradient: ['#50E3C2', '#3AA893'] },
    { screen: 'Journal', label: 'Journal', icon: 'create-outline', color: '#F5A623', gradient: ['#F5A623', '#D48A15'] },
    { screen: 'DailyInspirations', label: 'Inspirations', icon: 'sunny-outline', color: '#FF3860', gradient: ['#FF3860', '#E82448'] },
    { screen: 'Achievements', label: 'Achievements', icon: 'trophy-outline', color: '#B8E986', gradient: ['#B8E986', '#96C56B'] },
    { screen: 'Profile', label: 'Profile', icon: 'person-outline', color: '#BD10E0', gradient: ['#BD10E0', '#9B0DB8'] },
  ];

  const renderMetricCard = (icon, value, label, progress = null, color) => (
    <View style={[styles.metricCard, styles.cardShadow]}>
      <View style={[styles.metricIconContainer, { backgroundColor: `${color}20` }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
      {progress !== null && (
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: color }]} />
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1D2E" />
      <LinearGradient
        colors={['#1A1D2E', '#2A2D3E']}
        style={styles.gradient}
      >
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.headerContainer}>
            <View style={styles.greetingContainer}>
              <Text style={styles.greeting}>Good Morning,</Text>
              <View style={styles.userContainer}>
                <Text style={styles.username}>Sarah</Text>
                <TouchableOpacity 
                  style={styles.notificationBadge}
                  onPress={() => navigation.navigate('Notifications')}
                >
                  <Ionicons name="notifications-outline" size={24} color="#FFF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.streakContainer}>
            <LinearGradient
              colors={['#4A90E2', '#357ABD']}
              style={styles.streakCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.streakContent}>
                <Ionicons name="flame-outline" size={32} color="#FFF" />
                <Text style={styles.streakText}>{metrics.streak} Day Streak!</Text>
              </View>
              <Text style={styles.streakSubtext}>Keep up the great work!</Text>
            </LinearGradient>
          </View>

          <Text style={styles.sectionTitle}>Today's Progress</Text>
          <View style={styles.metricsContainer}>
            {renderMetricCard('timer-outline', `${metrics.fastingProgress}%`, 'Fasting Progress', metrics.fastingProgress, '#4A90E2')}
            {renderMetricCard('book-outline', metrics.journalEntries, 'Journal Entries', null, '#50E3C2')}
            {renderMetricCard('sunny-outline', metrics.mood, 'Current Mood', null, '#F5A623')}
          </View>

          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.gridContainer}>
            {navigationItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.gridItem, styles.cardShadow]}
                onPress={() => navigation.navigate(item.screen)}
              >
                <LinearGradient
                  colors={item.gradient}
                  style={styles.gridItemGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name={item.icon} size={28} color="#FFF" />
                  <Text style={styles.gridLabel}>{item.label}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

          <View style={[styles.inspirationCard, styles.cardShadow]}>
            <Text style={styles.inspirationTitle}>Daily Wisdom</Text>
            <Text style={styles.inspirationText}>
              "The secret of getting ahead is getting started."
            </Text>
            <Text style={styles.inspirationAuthor}>- Mark Twain</Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1D2E',
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  headerContainer: {
    marginBottom: 24,
  },
  greetingContainer: {
    marginTop: 20,
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 4,
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  username: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFF',
  },
  notificationBadge: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
  },
  streakContainer: {
    marginBottom: 24,
  },
  streakCard: {
    borderRadius: 20,
    padding: 20,
  },
  streakContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  streakText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
    marginLeft: 12,
  },
  streakSubtext: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 16,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  metricCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: 16,
    width: '31%',
  },
  metricIconContainer: {
    padding: 8,
    borderRadius: 12,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  gridItem: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  gridItemGradient: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridLabel: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    textAlign: 'center',
  },
  inspirationCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: 24,
  },
  inspirationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 12,
  },
  inspirationText: {
    color: '#FFF',
    fontSize: 18,
    lineHeight: 26,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  inspirationAuthor: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    textAlign: 'right',
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
});

export default DashboardScreen;
