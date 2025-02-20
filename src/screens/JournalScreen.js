import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HEADER_HEIGHT = 180;
const { width } = Dimensions.get('window');

const JournalScreen = () => {
  const [entry, setEntry] = useState('');
  const [journalEntries, setJournalEntries] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [HEADER_HEIGHT, 80],
    extrapolate: 'clamp',
  });

  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT - 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const saveEntry = () => {
    if (entry.trim()) {
      const newEntry = {
        id: Date.now().toString(),
        text: entry,
        date: new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        time: new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
        }),
      };

      setJournalEntries([newEntry, ...journalEntries]);
      setEntry('');
      setIsExpanded(false);
    }
  };

  const renderHeader = () => (
    <Animated.View style={[styles.header, { height: headerHeight }]}>
      <Animated.Text style={[styles.headerTitle, { opacity: headerTitleOpacity }]}>
        Journal
      </Animated.Text>
      <View style={styles.headerContent}>
        <Text style={styles.mainTitle}>Personal Journal</Text>
        <Text style={styles.subtitle}>Record your thoughts and reflections</Text>
      </View>
    </Animated.View>
  );

  const renderEntry = ({ item }) => (
    <Animated.View
      style={[styles.entryContainer]}
      entering={Animated.FadeInDown}
      layout={Animated.Layout}
    >
      <View style={styles.entryHeader}>
        <Text style={styles.entryDate}>{item.date}</Text>
        <Text style={styles.entryTime}>{item.time}</Text>
      </View>
      <Text style={styles.entryText}>{item.text}</Text>
    </Animated.View>
  );

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        {renderHeader()}
        
        <Animated.FlatList
          data={journalEntries}
          renderItem={renderEntry}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="journal-outline" size={48} color="#CBD5E1" />
              <Text style={styles.emptyText}>Start your journaling journey</Text>
              <Text style={styles.emptySubtext}>Your entries will appear here</Text>
            </View>
          }
        />

        <View style={styles.inputWrapper}>
          <View style={[styles.inputContainer, isExpanded && styles.inputContainerExpanded]}>
            <TextInput
              style={[styles.textInput, isExpanded && styles.textInputExpanded]}
              placeholder="Write your thoughts..."
              placeholderTextColor="#94A3B8"
              value={entry}
              onChangeText={setEntry}
              multiline
              onFocus={() => setIsExpanded(true)}
              maxLength={1000}
            />
            {isExpanded && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    setIsExpanded(false);
                    setEntry('');
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.saveButton, !entry.trim() && styles.saveButtonDisabled]}
                  onPress={saveEntry}
                  disabled={!entry.trim()}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
    zIndex: 100,
  },
  headerTitle: {
    position: 'absolute',
    top: 20,
    left: 20,
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
  },
  headerContent: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '400',
  },
  listContent: {
    padding: 20,
    paddingTop: 10,
  },
  entryContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  entryDate: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  entryTime: {
    fontSize: 14,
    color: '#94A3B8',
  },
  entryText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#334155',
  },
  inputWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#F8FAFC',
    borderTopColor: '#E2E8F0',
    borderTopWidth: 1,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  inputContainerExpanded: {
    minHeight: 180,
  },
  textInput: {
    padding: 16,
    fontSize: 16,
    color: '#1E293B',
    maxHeight: 100,
  },
  textInputExpanded: {
    maxHeight: 120,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  saveButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 12,
  },
  saveButtonDisabled: {
    backgroundColor: '#CBD5E1',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  cancelButtonText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 4,
  },
});

export default JournalScreen;
