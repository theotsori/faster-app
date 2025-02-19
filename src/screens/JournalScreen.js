// JournalScreen.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const JournalScreen = () => {
  const [entry, setEntry] = useState('');
  const [journalEntries, setJournalEntries] = useState([]);

  const saveEntry = () => {
    if (entry.trim()) {
      setJournalEntries([
        { id: Date.now().toString(), text: entry, date: new Date().toLocaleDateString() },
        ...journalEntries,
      ]);
      setEntry('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Personal Reflection & Journal</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Write your reflection, prayer request, or gratitude here..."
          value={entry}
          onChangeText={setEntry}
          multiline
        />
        <TouchableOpacity style={styles.saveButton} onPress={saveEntry}>
          <Ionicons name="save-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={journalEntries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.entryContainer}>
            <Text style={styles.entryDate}>{item.date}</Text>
            <Text style={styles.entryText}>{item.text}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No journal entries yet.</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9FAFC',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  textInput: {
    flex: 1,
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
  },
  saveButton: {
    marginLeft: 10,
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  entryContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  entryDate: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  entryText: {
    fontSize: 16,
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});

export default JournalScreen;
