// AchievementsScreen.js
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const achievementsData = [
  { id: '1', title: 'First Fast', description: 'Completed your first fast', badge: '🏅' },
  { id: '2', title: '7-Day Streak', description: 'Fasted for 7 consecutive days', badge: '🥇' },
  { id: '3', title: 'Reflective Soul', description: 'Logged 10 journal entries', badge: '📖' },
  // Add more achievements as needed
];

const AchievementsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#FDEB71', '#F8D800']} style={styles.gradient}>
        <Text style={styles.header}>Achievements & Milestones</Text>
        <FlatList
          data={achievementsData}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.achievementsList}
          renderItem={({ item }) => (
            <View style={styles.achievementCard}>
              <Text style={styles.badge}>{item.badge}</Text>
              <View style={styles.achievementInfo}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>No achievements yet. Keep going!</Text>}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  achievementsList: {
    paddingBottom: 20,
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  badge: {
    fontSize: 40,
    marginRight: 15,
  },
  achievementInfo: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});

export default AchievementsScreen;
