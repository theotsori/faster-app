import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const achievementsData = [
  {
    id: '1',
    title: 'First Fast',
    description: 'Completed your first fast',
    badge: '🏅',
    date: '2024-02-15',
    progress: 100,
    category: 'Milestone'
  },
  {
    id: '2',
    title: '7-Day Streak',
    description: 'Fasted for 7 consecutive days',
    badge: '🥇',
    date: '2024-02-10',
    progress: 100,
    category: 'Streak'
  },
  {
    id: '3',
    title: 'Reflective Soul',
    description: 'Logged 10 journal entries',
    badge: '📖',
    date: '2024-02-05',
    progress: 70,
    category: 'Journal'
  },
  {
    id: '4',
    title: 'Mindfulness Master',
    description: 'Complete 5 meditation sessions',
    badge: '🧘',
    date: null,
    progress: 40,
    category: 'Meditation'
  },
];

const AchievementsScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Milestone', 'Streak', 'Journal', 'Meditation'];
  
  const filteredAchievements = achievementsData.filter(achievement => 
    selectedCategory === 'All' || achievement.category === selectedCategory
  );

  const renderAchievementCard = ({ item }) => {
    const isCompleted = item.progress === 100;
    
    return (
      <Animated.View style={styles.achievementCard}>
        <View style={[styles.badgeContainer, isCompleted ? styles.badgeCompleted : styles.badgeIncomplete]}>
          <Text style={styles.badge}>{item.badge}</Text>
        </View>
        
        <View style={styles.achievementInfo}>
          <View style={styles.achievementHeader}>
            <Text style={styles.title}>{item.title}</Text>
            {isCompleted && (
              <View style={styles.completedBadge}>
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              </View>
            )}
          </View>
          
          <Text style={styles.description}>{item.description}</Text>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${item.progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{item.progress}%</Text>
          </View>
          
          {item.date && (
            <Text style={styles.dateText}>
              Achieved on {new Date(item.date).toLocaleDateString()}
            </Text>
          )}
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E3192" />
      <LinearGradient
        colors={['#2E3192', '#1BFFFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Achievements</Text>
          <Text style={styles.subHeader}>Track Your Progress</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {achievementsData.filter(a => a.progress === 100).length}
            </Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {achievementsData.filter(a => a.progress < 100).length}
            </Text>
            <Text style={styles.statLabel}>In Progress</Text>
          </View>
        </View>

        <View style={styles.categoriesContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setSelectedCategory(item)}
                style={[
                  styles.categoryButton,
                  selectedCategory === item && styles.categoryButtonActive
                ]}
              >
                <Text style={[
                  styles.categoryButtonText,
                  selectedCategory === item && styles.categoryButtonTextActive
                ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        <FlatList
          data={filteredAchievements}
          renderItem={renderAchievementCard}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.achievementsList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No achievements yet. Keep going!</Text>
            </View>
          }
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E3192',
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerContainer: {
    paddingTop: StatusBar.currentHeight + 20,
    marginBottom: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
  },
  subHeader: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesList: {
    paddingVertical: 10,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: 10,
  },
  categoryButtonActive: {
    backgroundColor: '#fff',
  },
  categoryButtonText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: '600',
  },
  categoryButtonTextActive: {
    color: '#2E3192',
  },
  achievementsList: {
    paddingBottom: 20,
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
  },
  badgeContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  badgeCompleted: {
    backgroundColor: '#E8F5E9',
  },
  badgeIncomplete: {
    backgroundColor: '#F5F5F5',
  },
  badge: {
    fontSize: 30,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  completedBadge: {
    marginLeft: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginRight: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    width: 35,
  },
  dateText: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 40,
  },
  emptyText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AchievementsScreen;
