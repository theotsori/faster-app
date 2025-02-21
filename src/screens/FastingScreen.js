import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  TouchableOpacity, 
  SafeAreaView, 
  Modal, 
  ScrollView, 
  Platform, 
  StatusBar, 
  Dimensions, 
  Easing 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import CircularProgress from '../components/CircularProgress';
import CustomFastingModal from '../components/CustomFastingModal';
import FeelingLogModal from '../components/FeelingLogModal';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Biblical fasts data with enhanced styling properties and unique icons
const BIBLICAL_FASTS = [
  {
    id: '1',
    name: "Daniel Fast",
    duration: 21 * 24 * 60 * 60 * 1000, // 21 days
    description: "A partial fast abstaining from choice foods",
    verse: "Daniel 10:2-3",
    exactWords: "At that time I, Daniel, mourned for three weeks. I ate no choice food; no meat or wine touched my lips; and I used no lotions at all until the three weeks were over.",
    detailedDescription: "A 21-day fast focused on simple foods and spiritual clarity, following Daniel's example of devotion.",
    icon: "leaf-outline",
    themeColor: "#10B981",
    gradient: ['#059669', '#10B981']
  },
  {
    id: '2',
    name: "Esther Fast",
    duration: 3 * 24 * 60 * 60 * 1000, // 3 days
    description: "Complete fast for divine intervention",
    verse: "Esther 4:16",
    exactWords: "Go, gather together all the Jews who are in Susa, and fast for me. Do not eat or drink for three days, night or day.",
    detailedDescription: "A three-day fast for urgent spiritual breakthrough, following Queen Esther's example.",
    icon: "star-outline",
    themeColor: "#8B5CF6",
    gradient: ['#7C3AED', '#8B5CF6']
  },
  {
    id: '3',
    name: "Day of Atonement",
    duration: 24 * 60 * 60 * 1000, // 1 day
    description: "Sunset to sunset spiritual cleansing",
    verse: "Leviticus 23:27-32",
    exactWords: "The tenth day of this seventh month is the Day of Atonement. Hold a sacred assembly and deny yourselves.",
    detailedDescription: "A 24-hour fast from sunset to sunset, focused on repentance and spiritual renewal.",
    icon: "moon-outline",
    themeColor: "#6366F1",
    gradient: ['#4F46E5', '#6366F1']
  },
  {
    id: '4',
    name: "40-Day Fast",
    duration: 40 * 24 * 60 * 60 * 1000, // 40 days
    description: "A fast practiced by Moses and Jesus for spiritual preparation",
    verse: "Exodus 34:28 / Matthew 4:1-2",
    exactWords: "Moses: 'Moses was there with the Lord forty days and forty nights without eating bread or drinking water.' / Jesus: 'Then Jesus was led by the Spirit into the wilderness...'",
    detailedDescription: "A 40-day fast demonstrating total reliance on God, as exemplified by Moses on Mount Sinai and Jesus in the wilderness.",
    icon: "sunny-outline",
    themeColor: "#F59E0B",
    gradient: ['#FBBF24', '#F59E0B']
  }
];

const ENCOURAGING_VERSES = [
  "But when you fast, put oil on your head and wash your face, so that it will not be obvious to others that you are fasting. - Matthew 6:17-18",
  "Prayer and fasting can move mountains and bring breakthrough in your life. - Matthew 17:21",
  "This kind can only come out by prayer and fasting. - Mark 9:29",
  "Declare a holy fast; call a sacred assembly. - Joel 1:14"
];

const FastingScreen = () => {
  const navigation = useNavigation();
  const [fasting, setFasting] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [selectedFastIndex, setSelectedFastIndex] = useState(null);
  const [currentVerse, setCurrentVerse] = useState(0);
  const [customFastingModalVisible, setCustomFastingModalVisible] = useState(false);
  const [feelingLogModalVisible, setFeelingLogModalVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const cardSlideAnim = useRef(new Animated.Value(0)).current;
  const [customTarget, setCustomTarget] = useState(BIBLICAL_FASTS[0].duration);

  // Animation setup
  useEffect(() => {
    Animated.spring(cardSlideAnim, {
      toValue: 1,
      tension: 20,
      friction: 7,
      useNativeDriver: true
    }).start();

    const verseInterval = setInterval(() => {
      setCurrentVerse(prev => (prev + 1) % ENCOURAGING_VERSES.length);
    }, 10000);

    return () => clearInterval(verseInterval);
  }, []);

  // Timer management
  useEffect(() => {
    let interval;
    if (fasting && startTime) {
      interval = setInterval(() => {
        const now = new Date();
        const newElapsed = now - startTime;
        setElapsedTime(newElapsed);
        
        if (newElapsed >= customTarget) {
          handleFastComplete();
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [fasting, startTime, customTarget]);

  const handleFastComplete = async () => {
    await scheduleNotification(
      'Fast Completed! 🎉',
      'Congratulations on completing your fast. Take time to reflect on your spiritual journey.'
    );
    setFasting(false);
    setStartTime(null);
    setElapsedTime(0);
  };

  const scheduleNotification = async (title, body, delay = 0) => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          sound: true,
        },
        trigger: delay ? { seconds: delay } : null,
      });
    } catch (error) {
      console.error('Failed to schedule notification:', error);
    }
  };

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
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  const toggleFasting = async () => {
    animateButton();
    if (fasting) {
      await handleFastComplete();
    } else {
      setFasting(true);
      setStartTime(new Date());
      await scheduleNotification(
        'Fast Started 🙏',
        'May this time of fasting bring you closer to God.',
        3600 // Notification after 1 hour
      );
    }
  };

  const selectBiblicalFast = (index) => {
    setSelectedFastIndex(index);
    setCustomTarget(BIBLICAL_FASTS[index].duration);
    animateButton();
  };

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    }
    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    }
    return `${minutes}m ${seconds}s`;
  };

  const formatTimeLeft = () => {
    const remaining = customTarget - elapsedTime;
    return remaining > 0 ? formatTime(remaining) : "0s";
  };

  const formatEndTime = () => {
    if (!startTime) return "";
    const endTime = new Date(startTime.getTime() + customTarget);
    return endTime.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const calculateProgress = () => {
    return Math.min((elapsedTime / customTarget) * 100, 100);
  };

  const renderFastCard = (fast, index) => (
    <Animated.View
      key={fast.id}
      style={[
        styles.fastCard,
        {
          transform: [
            {
              translateY: cardSlideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50 * (index + 1), 0]
              })
            }
          ]
        }
      ]}
    >
      <TouchableOpacity
        style={[
          styles.fastCardContent,
          selectedFastIndex === index && styles.selectedFastCard,
          { borderColor: fast.themeColor }
        ]}
        onPress={() => selectBiblicalFast(index)}
        activeOpacity={0.7}
      >
        <LinearGradient
          colors={selectedFastIndex === index ? fast.gradient : ['transparent', 'transparent']}
          style={styles.fastCardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.fastCardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: fast.themeColor }]}>
              <Ionicons name={fast.icon} size={24} color="#fff" />
            </View>
            <View style={styles.fastCardHeaderText}>
              <Text style={styles.fastName}>{fast.name}</Text>
              <Text style={styles.fastVerse}>{fast.verse}</Text>
            </View>
          </View>
          <Text style={styles.fastDescription}>{fast.description}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#1E1B4B', '#312E81']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Sacred Fast</Text>
            <Text style={styles.headerSubtitle}>Your spiritual journey</Text>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Ionicons name="person-circle-outline" size={32} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.progressContainer}>
            <CircularProgress
              size={300}
              progress={calculateProgress()}
              strokeWidth={20}
              progressColor={selectedFastIndex !== null ? BIBLICAL_FASTS[selectedFastIndex].themeColor : '#6366F1'}
              backgroundColor="rgba(255,255,255,0.1)"
            >
              <View style={styles.progressContent}>
                {fasting ? (
                  <>
                    <Text style={styles.timeLeftLabel}>Remaining</Text>
                    <Text style={styles.timeLeft}>{formatTimeLeft()}</Text>
                    <Text style={styles.endTime}>Ends at {formatEndTime()}</Text>
                    <Text style={styles.fastingType}>
                      {BIBLICAL_FASTS[selectedFastIndex].name}
                    </Text>
                  </>
                ) : (
                  <Text style={styles.readyText}>Select a Fast</Text>
                )}
              </View>
            </CircularProgress>
          </View>

          <View style={styles.verseContainer}>
            <BlurView intensity={80} style={styles.verseCard}>
              <Text style={styles.verseText}>{ENCOURAGING_VERSES[currentVerse]}</Text>
            </BlurView>
          </View>

          <View style={styles.fastsSection}>
            <Text style={styles.sectionTitle}>Biblical Fasts</Text>
            {BIBLICAL_FASTS.map((fast, index) => renderFastCard(fast, index))}
          </View>

          {selectedFastIndex !== null && (
            <View style={styles.detailsCard}>
              <Text style={styles.detailsTitle}>
                About {BIBLICAL_FASTS[selectedFastIndex].name}
              </Text>
              <Text style={styles.detailsDescription}>
                {BIBLICAL_FASTS[selectedFastIndex].detailedDescription}
              </Text>
              <Text style={styles.scriptureQuote}>
                "{BIBLICAL_FASTS[selectedFastIndex].exactWords}"
              </Text>
            </View>
          )}

          <View style={styles.actionContainer}>
            <TouchableOpacity
              style={[
                styles.mainButton,
                {
                  backgroundColor: fasting ? '#DC2626' : '#10B981',
                  transform: [{ scale: scaleAnim }],
                  opacity: fadeAnim
                }
              ]}
              onPress={toggleFasting}
              disabled={selectedFastIndex === null && !fasting}
            >
              <Text style={styles.mainButtonText}>
                {fasting ? 'End Fast' : 'Begin Fast'}
              </Text>
            </TouchableOpacity>

            <View style={styles.secondaryButtons}>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => setCustomFastingModalVisible(true)}
              >
                <Ionicons name="timer-outline" size={24} color="#fff" />
                <Text style={styles.secondaryButtonText}>Custom Fast</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => navigation.navigate('Journal')}
              >
                <Ionicons name="journal-outline" size={24} color="#fff" />
                <Text style={styles.secondaryButtonText}>Journal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerItem}>
            <Ionicons name="home" size={24} color="#fff" />
            <Text style={styles.footerText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem}>
            <Ionicons name="book-outline" size={24} color="#fff" />
            <Text style={styles.footerText}>Devotional</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem}>
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
        <CustomFastingModal onClose={() => setCustomFastingModalVisible(false)} onSave={setCustomTarget} />
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
    backgroundColor: '#1E1B4B'
  },
  gradient: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight + 20,
    paddingBottom: 20
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4
  },
  profileButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20
  },
  scrollView: {
    flex: 1
  },
  scrollContent: {
    padding: 20
  },
  progressContainer: {
    alignItems: 'center',
    marginVertical: 20
  },
  progressContent: {
    alignItems: 'center'
  },
  timeLeftLabel: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 8
  },
  timeLeft: {
    fontSize: 36,
    fontWeight: '700',
    color: '#fff'
  },
  endTime: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 8
  },
  readyText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center'
  },
  verseContainer: {
    marginVertical: 20
  },
  verseCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 20
  },
  verseText: {
    fontSize: 16,
    color: '#fff',
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 24
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16
  },
  fastsSection: {
    marginBottom: 20
  },
  fastCard: {
    marginBottom: 12
  },
  fastCardContent: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 16
  },
  selectedFastCard: {
    backgroundColor: 'rgba(99,102,241,0.2)'
  },
  fastCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  fastCardHeaderText: {
    flex: 1
  },
  fastName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff'
  },
  fastVerse: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2
  },
  fastDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 20
  },
  fastCardGradient: {
    borderRadius: 16,
    padding: 16
  },
  detailsCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12
  },
  detailsDescription: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 24,
    marginBottom: 16
  },
  scriptureQuote: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 20
  },
  mainButton: {
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5
  },
  mainButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff'
  },
  actionContainer: {
    marginBottom: 20
  },
  secondaryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 6
  },
  secondaryButtonText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 8
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)'
  },
  footerItem: {
    alignItems: 'center'
  },
  footerText: {
    fontSize: 12,
    color: '#fff',
    marginTop: 4
  }
});

export default FastingScreen;
