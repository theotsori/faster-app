// src/screens/FastingScreen.js
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, SafeAreaView, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import CircularProgress from '../components/CircularProgress';
import CustomFastingModal from '../components/CustomFastingModal';
import FeelingLogModal from '../components/FeelingLogModal';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const FastingScreen = () => {
  const navigation = useNavigation();
  const [fasting, setFasting] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [customFastingModalVisible, setCustomFastingModalVisible] = useState(false);
  const [feelingLogModalVisible, setFeelingLogModalVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  
  const TARGET_DURATION = 16 * 60 * 60 * 1000; // 16 hours default
  const [customTarget, setCustomTarget] = useState(TARGET_DURATION);

  useEffect(() => {
    let interval;
    if (fasting && startTime) {
      interval = setInterval(() => {
        const now = new Date();
        setElapsedTime(now - startTime);
        if (elapsedTime >= customTarget) {
          scheduleNotification('Your fast has ended!', 'Time to break your fast.');
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [fasting, startTime, customTarget, elapsedTime, scheduleNotification]);

  const toggleFasting = () => {
    // Animate button press for a tactile feel
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    if (fasting) {
      // Stop fasting
      setFasting(false);
      setStartTime(null);
      setElapsedTime(0);
    } else {
      // Start fasting
      setFasting(true);
      setStartTime(new Date());
      scheduleNotification('Reminder', 'Remember to drink water during your fast!', 3600000); // 1 hour delay
    }
  };

  const formatElapsedTime = () => {
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const calculateProgress = () => {
    return Math.min((elapsedTime / customTarget) * 100, 100);
  };

  const scheduleNotification = useCallback(async (title, body, delay = null) => {
    await Notifications.scheduleNotificationAsync({
      content: { title, body },
      trigger: delay ? { seconds: delay / 1000 } : null,
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#2C3E50', '#4CA1AF']}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Fasting Tracker</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person-circle-outline" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <View style={styles.progressContainer}>
            <CircularProgress
              size={280}
              progress={calculateProgress()}
              strokeWidth={15}
              progressColor="#00ff87"
              backgroundColor="rgba(255,255,255,0.2)"
            >
              <View style={styles.progressContent}>
                <Text style={styles.timeText}>
                  {fasting ? formatElapsedTime() : '0h 0m'}
                </Text>
                <Text style={styles.targetText}>
                  {fasting ? `of ${customTarget / 3600000} hrs` : 'Ready to start'}
                </Text>
              </View>
            </CircularProgress>
          </View>

          <TouchableOpacity
            style={[
              styles.mainButton,
              { backgroundColor: fasting ? '#E74C3C' : '#2ECC71' }
            ]}
            onPress={toggleFasting}
          >
            <Text style={styles.mainButtonText}>
              {fasting ? 'End Fast' : 'Start Fast'}
            </Text>
          </TouchableOpacity>

          <View style={styles.optionsContainer}>
            <TouchableOpacity 
              onPress={() => setCustomFastingModalVisible(true)} 
              style={styles.optionButton}
            >
              <Text style={styles.optionButtonText}>Set Custom Fast</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setFeelingLogModalVisible(true)} 
              style={styles.optionButton}
            >
              <Text style={styles.optionButtonText}>Log Feeling</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Footer Navigation */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Devotional')}>
            <Ionicons name="book-outline" size={24} color="#fff" />
            <Text style={styles.footerText}>Devotional</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Statistics')}>
            <Ionicons name="stats-chart-outline" size={24} color="#fff" />
            <Text style={styles.footerText}>Statistics</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Modals */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={customFastingModalVisible}
        onRequestClose={() => setCustomFastingModalVisible(false)}
      >
        <CustomFastingModal 
          onClose={() => setCustomFastingModalVisible(false)} 
          onSave={setCustomTarget} 
        />
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={feelingLogModalVisible}
        onRequestClose={() => setFeelingLogModalVisible(false)}
      >
        <FeelingLogModal onClose={() => setFeelingLogModalVisible(false)} />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    marginBottom: 30,
  },
  progressContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
  },
  targetText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  mainButton: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  mainButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  optionsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  optionButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  optionButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopColor: 'rgba(255,255,255,0.3)',
    borderTopWidth: 1,
    paddingVertical: 10,
    marginBottom: 10,
  },
  footerItem: {
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 3,
  },
});

export default FastingScreen;
