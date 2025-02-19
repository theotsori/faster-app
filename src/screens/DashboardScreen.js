import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
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
  };

  const navigationItems = [
    { screen: 'Fasting', label: 'Fasting Timer', icon: 'timer', color: '#4A90E2' },
    { screen: 'Devotional', label: 'Devotional', icon: 'book', color: '#50E3C2' },
    { screen: 'Journal', label: 'Journal', icon: 'create', color: '#F5A623' },
    { screen: 'DailyInspirations', label: 'Inspirations', icon: 'sunny', color: '#FF3860' },
    { screen: 'Achievements', label: 'Achievements', icon: 'trophy', color: '#B8E986' },
    { screen: 'Profile', label: 'Profile', icon: 'person', color: '#BD10E0' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#2A2D3E', '#3E4258']} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Header Section */}
          <View style={styles.headerContainer}>
            <Text style={styles.greeting}>Good Morning, User!</Text>
            <Text style={styles.header}>Dashboard</Text>
          </View>

          {/* Metrics Cards */}
          <View style={styles.cardContainer}>
            <View style={[styles.metricCard, styles.cardShadow]}>
              <Ionicons name="timer" size={28} color="#4A90E2" />
              <Text style={styles.metricValue}>{metrics.fastingProgress}%</Text>
              <Text style={styles.metricLabel}>Fasting Progress</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${metrics.fastingProgress}%` }]} />
              </View>
            </View>
            
            <View style={[styles.metricCard, styles.cardShadow]}>
              <Ionicons name="book" size={28} color="#50E3C2" />
              <Text style={styles.metricValue}>{metrics.journalEntries}</Text>
              <Text style={styles.metricLabel}>Journal Entries</Text>
            </View>
            
            <View style={[styles.metricCard, styles.cardShadow]}>
              <Ionicons name="happy" size={28} color="#F5A623" />
              <Text style={styles.metricValue}>{metrics.mood}</Text>
              <Text style={styles.metricLabel}>Current Mood</Text>
            </View>
          </View>

          {/* Quick Access Grid */}
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.gridContainer}>
            {navigationItems.map((item) => (
              <TouchableOpacity
                key={item.screen}
                style={[styles.gridItem, { backgroundColor: item.color }]}
                onPress={() => navigation.navigate(item.screen)}
              >
                <Ionicons name={item.icon} size={32} color="white" />
                <Text style={styles.gridLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Daily Inspiration */}
          <View style={[styles.inspirationCard, styles.cardShadow]}>
            <Text style={styles.inspirationText}>"The secret of getting ahead is getting started."</Text>
            <Text style={styles.inspirationAuthor}>- Mark Twain</Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');
const CARD_MARGIN = 15;
const cardWidth = (width - (CARD_MARGIN * 4)) / 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A2D3E',
  },
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  headerContainer: {
    marginBottom: 30,
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 5,
  },
  header: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFF',
    fontFamily: 'HelveticaNeue-Bold',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  metricCard: {
    backgroundColor: '#3A3F54',
    borderRadius: 20,
    width: cardWidth,
    padding: 20,
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
    marginVertical: 10,
  },
  metricLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
  },
  progressBar: {
    height: 4,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    marginTop: 15,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4A90E2',
    borderRadius: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: (width - 60) / 2,
    height: 120,
    borderRadius: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  gridLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center',
  },
  inspirationCard: {
    backgroundColor: '#3A3F54',
    borderRadius: 20,
    padding: 25,
    marginTop: 10,
  },
  inspirationText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  inspirationAuthor: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    textAlign: 'right',
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
});

export default DashboardScreen;
