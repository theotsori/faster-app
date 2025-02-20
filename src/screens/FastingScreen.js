import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, SafeAreaView, Modal, ScrollView } from 'react-native';
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

const BIBLICAL_FASTS = [
  {
    name: "Daniel Fast",
    duration: 21 * 24 * 60 * 60 * 1000, // 21 days
    description: "A partial fast abstaining from choice foods (Daniel 10:2-3)",
    verse: "Daniel 10:2-3",
  },
  {
    name: "Esther Fast",
    duration: 3 * 24 * 60 * 60 * 1000, // 3 days
    description: "Complete fast for spiritual breakthrough",
    verse: "Esther 4:16",
  },
  {
    name: "Day of Atonement",
    duration: 24 * 60 * 60 * 1000, // 24 hours
    description: "Sunset to sunset fast for spiritual cleansing",
    verse: "Leviticus 23:27-32",
  },
];

const ENCOURAGING_VERSES = [
  "But when you fast, put oil on your head and wash your face... - Matthew 6:17-18",
  "Prayer and fasting moves mountains... - Matthew 17:21",
  "This kind can only come out by prayer and fasting... - Mark 9:29",
];

const FastingScreen = () => {
  const navigation = useNavigation();
  const [fasting, setFasting] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [customFastingModalVisible, setCustomFastingModalVisible] = useState(false);
  const [feelingLogModalVisible, setFeelingLogModalVisible] = useState(false);
  const [selectedFastIndex, setSelectedFastIndex] = useState(null);
  const [currentVerse, setCurrentVerse] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  const [customTarget, setCustomTarget] = useState(BIBLICAL_FASTS[0].duration);

  useEffect(() => {
    const verseInterval = setInterval(() => {
      setCurrentVerse((prev) => (prev + 1) % ENCOURAGING_VERSES.length);
    }, 10000);

    return () => clearInterval(verseInterval);
  }, []);

  useEffect(() => {
    let interval;
    if (fasting && startTime) {
      interval = setInterval(() => {
        const now = new Date();
        setElapsedTime(now - startTime);
        if (elapsedTime >= customTarget) {
          scheduleNotification('Fast Completed! 🙏', 'May your sacrifice be blessed.');
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [fasting, startTime, customTarget, elapsedTime]);

  const animateButton = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  const toggleFasting = () => {
    animateButton();
    if (fasting) {
      setFasting(false);
      setStartTime(null);
      setElapsedTime(0);
      scheduleNotification('Fast Completed', 'Remember to break your fast mindfully.');
    } else {
      setFasting(true);
      setStartTime(new Date());
      scheduleNotification('Fast Begun', 'May this time draw you closer to God.', 3600000);
    }
  };

  const selectBiblicalFast = (index) => {
    setSelectedFastIndex(index);
    setCustomTarget(BIBLICAL_FASTS[index].duration);
  };

  const formatElapsedTime = () => {
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    
    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    }
    return `${hours}h ${minutes}m`;
  };

  const calculateProgress = () => {
    return Math.min((elapsedTime / customTarget) * 100, 100);
  };

  const scheduleNotification = useCallback(async (title, body, delay = null) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger: delay ? { seconds: delay / 1000 } : null,
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1E3A8A', '#3B82F6']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Sacred Fast</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person-circle-outline" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={styles.verseContainer}>
            <Text style={styles.verseText}>{ENCOURAGING_VERSES[currentVerse]}</Text>
          </View>

          <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
            <View style={styles.progressContainer}>
              <CircularProgress
                size={280}
                progress={calculateProgress()}
                strokeWidth={15}
                progressColor="#60A5FA"
                backgroundColor="rgba(255,255,255,0.2)"
              >
                <View style={styles.progressContent}>
                  <Text style={styles.timeText}>
                    {fasting ? formatElapsedTime() : 'Ready'}
                  </Text>
                  <Text style={styles.targetText}>
                    {selectedFastIndex !== null ? 
                      BIBLICAL_FASTS[selectedFastIndex].name :
                      'Select a fast type'
                    }
                  </Text>
                </View>
              </CircularProgress>
            </View>

            <View style={styles.fastTypesContainer}>
              {BIBLICAL_FASTS.map((fast, index) => (
                <TouchableOpacity
                  key={fast.name}
                  style={[
                    styles.fastTypeButton,
                    selectedFastIndex === index && styles.selectedFastType
                  ]}
                  onPress={() => selectBiblicalFast(index)}
                >
                  <Text style={styles.fastTypeName}>{fast.name}</Text>
                  <Text style={styles.fastTypeVerse}>{fast.verse}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[
                styles.mainButton,
                { backgroundColor: fasting ? '#DC2626' : '#059669' }
              ]}
              onPress={toggleFasting}
              disabled={selectedFastIndex === null && !fasting}
            >
              <Text style={styles.mainButtonText}>
                {fasting ? 'End Fast' : 'Begin Fast'}
              </Text>
            </TouchableOpacity>

            <View style={styles.optionsContainer}>
              <TouchableOpacity 
                onPress={() => setCustomFastingModalVisible(true)} 
                style={styles.optionButton}
              >
                <Text style={styles.optionButtonText}>Custom Fast</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setFeelingLogModalVisible(true)} 
                style={styles.optionButton}
              >
                <Text style={styles.optionButtonText}>Spiritual Journal</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Devotional')}>
            <Ionicons name="book-outline" size={24} color="#fff" />
            <Text style={styles.footerText}>Devotional</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Statistics')}>
            <Ionicons name="stats-chart-outline" size={24} color="#fff" />
            <Text style={styles.footerText}>Progress</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

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
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },
  verseContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
  },
  verseText: {
    color: '#fff',
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  content: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  progressContainer: {
    marginVertical: 20,
  },
  progressContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
  targetText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 8,
  },
  fastTypesContainer: {
    width: '100%',
    marginBottom: 20,
  },
  fastTypeButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  selectedFastType: {
    backgroundColor: 'rgba(96, 165, 250, 0.3)',
    borderColor: '#60A5FA',
    borderWidth: 1,
  },
  fastTypeName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  fastTypeVerse: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  mainButton: {
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  mainButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  optionButton: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  optionButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopColor: 'rgba(255,255,255,0.2)',
    borderTopWidth: 1,
    paddingVertical: 12,
  },
  footerItem: {
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
});

export default FastingScreen;
