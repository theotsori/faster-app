// src/screens/DevotionalScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const DevotionalScreen = () => {
  const devotionalContent = "This is your daily devotional. Reflect on God's word, find comfort, and guidance in His teachings.";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Daily Devotional</Text>
      <Text style={styles.content}>{devotionalContent}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center'
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    textAlign: 'center',
  }
});

export default DevotionalScreen;
