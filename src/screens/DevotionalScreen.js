import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,
  Share,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const DevotionalScreen = () => {
  const [currentDate] = useState(
    new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  );

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [textSize, setTextSize] = useState(16);

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
      'Dear Lord, grant me the wisdom to recognize Your strength working in my life. Help me to face today\'s challenges with the confidence that comes from knowing You are with me. Amen.',
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: `${devotional.title}\n\n${devotional.verseText}\n\n${devotional.content}\n\nReflection:\n${devotional.reflection.join('\n')}\n\nPrayer:\n${devotional.prayer}`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <LinearGradient colors={['#F8FAFC', '#FFFFFF']} style={styles.gradient}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.date}>{currentDate}</Text>
            <View style={styles.bannerContainer}>
              <Image
                source={{ uri: 'https://via.placeholder.com/800x400' }}
                style={styles.bannerImage}
              />
              <View style={styles.bannerOverlay} />
            </View>
          </View>

          {/* Control Bar */}
          <View style={styles.controlBar}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => setIsBookmarked(!isBookmarked)}
            >
              <Ionicons
                name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                size={24}
                color={isBookmarked ? '#2563EB' : '#64748B'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => setIsAudioPlaying(!isAudioPlaying)}
            >
              <Ionicons
                name={isAudioPlaying ? 'pause-circle' : 'play-circle'}
                size={24}
                color="#64748B"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => setTextSize(prev => Math.max(12, prev - 2))}
            >
              <Ionicons name="remove-circle-outline" size={24} color="#64748B" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => setTextSize(prev => Math.min(24, prev + 2))}
            >
              <Ionicons name="add-circle-outline" size={24} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* Main Content Card */}
          <View style={styles.card}>
            {/* Verse Section */}
            <View style={styles.verseSection}>
              <Text style={styles.verseReference}>{devotional.verse}</Text>
              <Text style={[styles.verseText, { fontSize: textSize + 4 }]}>
                "{devotional.verseText}"
              </Text>
            </View>

            {/* Title & Content */}
            <Text style={[styles.title, { fontSize: textSize + 8 }]}>
              {devotional.title}
            </Text>
            <Text style={[styles.content, { fontSize: textSize }]}>
              {devotional.content}
            </Text>

            {/* Reflection Section */}
            <View style={styles.reflectionSection}>
              <Text style={styles.sectionTitle}>For Reflection</Text>
              {devotional.reflection.map((question, index) => (
                <View key={index} style={styles.reflectionItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={[styles.reflectionText, { fontSize: textSize }]}>
                    {question}
                  </Text>
                </View>
              ))}
            </View>

            {/* Prayer Section */}
            <View style={styles.prayerSection}>
              <Text style={styles.sectionTitle}>Prayer</Text>
              <Text style={[styles.prayer, { fontSize: textSize }]}>
                {devotional.prayer}
              </Text>
            </View>
          </View>

          {/* Share Button */}
          <TouchableOpacity style={styles.shareButton} onPress={onShare}>
            <Ionicons name="share-outline" size={20} color="#FFFFFF" />
            <Text style={styles.shareButtonText}>Share This Devotional</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  gradient: {
    minHeight: Dimensions.get('window').height,
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  date: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 16,
  },
  bannerContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  controlBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  controlButton: {
    padding: 8,
    marginHorizontal: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  verseSection: {
    alignItems: 'center',
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    marginBottom: 24,
  },
  verseReference: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  verseText: {
    fontWeight: '500',
    color: '#0F172A',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  title: {
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 16,
  },
  content: {
    color: '#334155',
    lineHeight: 24,
    marginBottom: 24,
  },
  reflectionSection: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 16,
  },
  reflectionItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  bullet: {
    fontSize: 16,
    marginRight: 8,
    color: '#94A3B8',
  },
  reflectionText: {
    flex: 1,
    color: '#334155',
  },
  prayerSection: {
    marginBottom: 8,
  },
  prayer: {
    color: '#334155',
    fontStyle: 'italic',
    lineHeight: 24,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DevotionalScreen;
