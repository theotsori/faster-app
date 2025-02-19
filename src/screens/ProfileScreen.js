// src/screens/ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  const user = {
    username: "John Doe",
    email: "john@example.com"
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.label}>Username:</Text>
      <Text style={styles.info}>{user.username}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.info}>{user.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center'
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  info: {
    fontSize: 16,
    marginBottom: 10
  }
});

export default ProfileScreen;
