// src/screens/FastingScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';

const FastingScreen = ({ navigation }) => {
  const [fasting, setFasting] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const toggleFasting = () => {
    if (fasting) {
      setFasting(false);
      setStartTime(null);
    } else {
      setFasting(true);
      setStartTime(new Date());
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fasting Tracker</Text>
      <Text style={styles.status}>
        {fasting && startTime
          ? `Fasting started at: ${startTime.toLocaleTimeString()}`
          : 'Not currently fasting'}
      </Text>
      <Button 
        title={fasting ? "Stop Fasting" : "Start Fasting"} 
        onPress={toggleFasting} 
      />
      <Button 
        title="Devotional" 
        onPress={() => navigation.navigate('Devotional')} 
        style={styles.secondaryButton}
      />
      <Button 
        title="Profile" 
        onPress={() => navigation.navigate('Profile')} 
        style={styles.secondaryButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 20,
  },
  status: {
    textAlign: 'center',
    marginBottom: 20,
  },
  secondaryButton: {
    marginTop: 10,
    backgroundColor: '#28a745'
  }
});

export default FastingScreen;
