// DailyInspirationsScreen.js
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const inspirations = [
  { id: '1', quote: "Every day is a new beginning.", author: "Unknown" },
  { id: '2', quote: "Keep your face always toward the sunshine—and shadows will fall behind you.", author: "Walt Whitman" },
  { id: '3', quote: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
  // Add more inspirations as desired
];

const DailyInspirationsScreen = () => {
  const [dailyInspiration, setDailyInspiration] = useState(null);

  useEffect(() => {
    // Select a random inspiration when the component mounts
    const randomIndex = Math.floor(Math.random() * inspirations.length);
    setDailyInspiration(inspirations[randomIndex]);
  }, []);

  const refreshInspiration = () => {
    const randomIndex = Math.floor(Math.random() * inspirations.length);
    setDailyInspiration(inspirations[randomIndex]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#E0EAFC', '#CFDEF3']} style={styles.gradient}>
        <View style={styles.card}>
          <Text style={styles.title}>Daily Inspiration</Text>
          {dailyInspiration && (
            <>
              <Text style={styles.quote}>"{dailyInspiration.quote}"</Text>
              <Text style={styles.author}>- {dailyInspiration.author}</Text>
            </>
          )}
          <TouchableOpacity style={styles.refreshButton} onPress={refreshInspiration}>
            <Ionicons name="refresh" size={24} color="#fff" />
            <Text style={styles.refreshText}>New Inspiration</Text>
          </TouchableOpacity>
        </View>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 30,
    width: Dimensions.get('window').width - 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: '#333',
  },
  quote: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 10,
    color: '#555',
  },
  author: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  refreshText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DailyInspirationsScreen;
