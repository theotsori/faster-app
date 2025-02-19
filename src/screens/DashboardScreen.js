// DashboardScreen.js
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const DashboardScreen = () => {
  const navigation = useNavigation();

  // Dummy metrics data
  const metrics = {
    fastingProgress: 65, // in percentage
    journalEntries: 12,
    mood: 'Positive',
  };

  // Navigation items to access other screens
  const navigationItems = [
    { screen: 'Fasting', label: 'Fasting Timer', icon: 'timer' },
    { screen: 'Devotional', label: 'Devotional', icon: 'book' },
    { screen: 'Journal', label: 'Journal', icon: 'create' },
    { screen: 'DailyInspirations', label: 'Inspirations', icon: 'sunny' },
    { screen: 'Achievements', label: 'Achievements', icon: 'trophy' },
    { screen: 'Profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#4CA1AF', '#C4E0E5']} style={styles.gradient}>
        <Text style={styles.header}>Your Dashboard</Text>
        <View style={styles.cardContainer}>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{metrics.fastingProgress}%</Text>
            <Text style={styles.metricLabel}>Fasting Progress</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{metrics.journalEntries}</Text>
            <Text style={styles.metricLabel}>Journal Entries</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{metrics.mood}</Text>
            <Text style={styles.metricLabel}>Mood</Text>
          </View>
        </View>

        {/* Quick Access Navigation Section */}
        <Text style={styles.navHeader}>Quick Access</Text>
        <View style={styles.navContainer}>
          {navigationItems.map((item) => (
            <TouchableOpacity
              key={item.screen}
              style={styles.navItem}
              onPress={() => navigation.navigate(item.screen)}
            >
              <Ionicons name={item.icon} size={30} color="#4CA1AF" />
              <Text style={styles.navLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const cardWidth = Dimensions.get('window').width / 3 - 30;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  metricCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    width: cardWidth,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  metricLabel: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
  navHeader: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  navContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  navItem: {
    width: '30%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  navLabel: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});

export default DashboardScreen;
