import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const inspirations = [
  { 
    id: '1', 
    quote: "Every day is a new beginning.", 
    author: "Unknown",
    category: "Motivation"
  },
  { 
    id: '2', 
    quote: "Keep your face always toward the sunshine—and shadows will fall behind you.", 
    author: "Walt Whitman",
    category: "Positivity"
  },
  { 
    id: '3', 
    quote: "You are never too old to set another goal or to dream a new dream.", 
    author: "C.S. Lewis",
    category: "Growth"
  },
];

const DailyInspirationsScreen = () => {
  const [dailyInspiration, setDailyInspiration] = useState(null);
  const fadeAnim = useState(new Animated.Value(1))[0];
  const scaleAnim = useState(new Animated.Value(1))[0];

  const animateTransition = useCallback(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  const refreshInspiration = useCallback(() => {
    animateTransition();
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * inspirations.length);
      setDailyInspiration(inspirations[randomIndex]);
    }, 200);
  }, [animateTransition]);

  useEffect(() => {
    refreshInspiration();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E3192" />
      <LinearGradient
        colors={['#2E3192', '#1BFFFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Daily Wisdom</Text>
          <Text style={styles.headerSubtitle}>Find your inspiration</Text>
        </View>

        <Animated.View
          style={[
            styles.cardContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.card}>
            {dailyInspiration && (
              <>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{dailyInspiration.category}</Text>
                </View>
                <Text style={styles.quote}>"{dailyInspiration.quote}"</Text>
                <Text style={styles.author}>― {dailyInspiration.author}</Text>
              </>
            )}
            <TouchableOpacity
              style={styles.refreshButton}
              onPress={refreshInspiration}
              android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}
            >
              <Ionicons name="refresh" size={20} color="#fff" />
              <Text style={styles.refreshText}>New Quote</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
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
  header: {
    paddingTop: StatusBar.currentHeight + 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'left',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 40,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 24,
    padding: 30,
    width: '100%',
    alignItems: 'center',
    elevation: 4,
  },
  categoryBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 20,
  },
  categoryText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  quote: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
    lineHeight: 32,
  },
  author: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 30,
    fontWeight: '500',
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  refreshText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DailyInspirationsScreen;
