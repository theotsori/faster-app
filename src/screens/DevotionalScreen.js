import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  Share,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const DevotionalScreen = () => {
  // Date setup for header
  const [currentDate] = useState(
    new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  );

  // New interactive features
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [textSize, setTextSize] = useState(16);

  // Sample devotional content
  const devotional = {
    verse: 'Philippians 4:13',
    verseText: 'I can do all things through Christ who strengthens me.',
    title: 'Finding Strength in Faith',
    content:
      "In moments of challenge and uncertainty, remember that your strength comes not from your own abilities alone, but through your faith in Christ. Today's verse reminds us that with divine support, we can overcome any obstacle and achieve what might seem impossible.\n\nTake a moment to reflect on areas in your life where you need strength. Remember that you're not facing these challenges alone.",
    reflection: [
      'How has your faith helped you overcome difficult situations?',
      "Where do you need to rely more on God's strength today?",
      'What seemingly impossible task can you approach with renewed confidence?',
    ],
    prayer:
      'Dear Lord, grant me the wisdom to recognize Your strength working in my life. Help me to face today’s challenges with the confidence that comes from knowing You are with me. Amen.',
  };

  // Handlers for interactive features
  const toggleBookmark = () => setIsBookmarked((prev) => !prev);
  const toggleAudio = () => setIsAudioPlaying((prev) => !prev);
  const increaseTextSize = () => setTextSize((prev) => (prev < 24 ? prev + 2 : prev));
  const decreaseTextSize = () => setTextSize((prev) => (prev > 12 ? prev - 2 : prev));

  const onShare = async () => {
    try {
      await Share.share({
        message: `${devotional.title}\n\n${devotional.content}\n\nReflection:\n${devotional.reflection.join(
          '\n'
        )}\n\nPrayer:\n${devotional.prayer}`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <LinearGradient colors={['#f7f9fe', '#ffffff']} style={styles.gradientContainer}>
          {/* Header & Banner */}
          <View style={styles.headerContainer}>
            <Text style={styles.date}>{currentDate}</Text>
            <View style={styles.bannerContainer}>
              <Image
                source={{ uri: 'https://via.placeholder.com/400x200.png?text=Devotional+Banner' }}
                style={styles.bannerImage}
              />
            </View>
          </View>

          {/* Control Bar */}
          <View style={styles.controlBar}>
            <TouchableOpacity onPress={toggleBookmark} style={styles.controlButton}>
              <Ionicons
                name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                size={24}
                color="#4A90E2"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleAudio} style={styles.controlButton}>
              <Ionicons
                name={isAudioPlaying ? 'pause-circle' : 'play-circle'}
                size={24}
                color="#4A90E2"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={decreaseTextSize} style={styles.controlButton}>
              <Ionicons name="remove-circle-outline" size={24} color="#4A90E2" />
            </TouchableOpacity>
            <TouchableOpacity onPress={increaseTextSize} style={styles.controlButton}>
              <Ionicons name="add-circle-outline" size={24} color="#4A90E2" />
            </TouchableOpacity>
          </View>

          {/* Devotional Card */}
          <View style={styles.cardContainer}>
            <View style={styles.verseContainer}>
              <Text style={styles.verse}>{devotional.verse}</Text>
              <Text style={styles.verseText}>"{devotional.verseText}"</Text>
            </View>

            <View style={styles.contentContainer}>
              <Text style={[styles.title, { fontSize: textSize + 8 }]}>{devotional.title}</Text>
              <Text style={[styles.content, { fontSize: textSize }]}>{devotional.content}</Text>
            </View>

            <View style={styles.reflectionContainer}>
              <Text style={styles.sectionTitle}>For Reflection</Text>
              {devotional.reflection.map((question, index) => (
                <View key={index} style={styles.reflectionItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={[styles.reflectionText, { fontSize: textSize }]}>{question}</Text>
                </View>
              ))}
            </View>

            <View style={styles.prayerContainer}>
              <Text style={styles.sectionTitle}>Prayer</Text>
              <Text style={[styles.prayer, { fontSize: textSize }]}>{devotional.prayer}</Text>
            </View>
          </View>

          {/* Share Button */}
          <TouchableOpacity style={styles.shareButton} onPress={onShare}>
            <Ionicons name="share-social-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.shareButtonText}>Share This Devotional</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f9fe',
  },
  scrollView: {
    flex: 1,
  },
  gradientContainer: {
    minHeight: Dimensions.get('window').height,
    padding: 20,
  },
  headerContainer: {
    marginBottom: 20,
  },
  date: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 10,
  },
  bannerContainer: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  controlBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  controlButton: {
    marginHorizontal: 10,
  },
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  verseContainer: {
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  verse: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  verseText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#1a1a1a',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  contentContainer: {
    marginBottom: 24,
  },
  title: {
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  content: {
    lineHeight: 24,
    color: '#444',
  },
  reflectionContainer: {
    marginBottom: 24,
    backgroundColor: '#f8f9fb',
    padding: 16,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  reflectionItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  bullet: {
    fontSize: 16,
    marginRight: 8,
    color: '#666',
  },
  reflectionText: {
    color: '#444',
    flex: 1,
  },
  prayerContainer: {
    backgroundColor: '#fff',
    padding: 16,
  },
  prayer: {
    fontStyle: 'italic',
    color: '#444',
    lineHeight: 24,
  },
  shareButton: {
    flexDirection: 'row',
    backgroundColor: '#4A90E2',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  shareButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DevotionalScreen;
