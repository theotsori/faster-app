// src/navigation/AppNavigator.js
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import FastingScreen from '../screens/FastingScreen';
import DevotionalScreen from '../screens/DevotionalScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AuthScreen from '../screens/AuthScreen';
import DashboardScreen from '../screens/DashboardScreen';
import JournalScreen from '../screens/JournalScreen';
import DailyInspirationsScreen from '../screens/DailyInspirationsScreen';
import AchievementsScreen from '../screens/AchievementsScreen';

const Stack = createStackNavigator();

const defaultHeaderOptions = {
  headerStyle: {
    backgroundColor: '#2C3E50',
    shadowColor: 'transparent', // iOS
    elevation: 0, // Android
    borderBottomWidth: 0,
  },
  headerTintColor: '#ecf0f1',
  headerTitleStyle: {
    fontWeight: '600',
    fontSize: 18,
  },
};

const MainStack = () => (
  <Stack.Navigator screenOptions={defaultHeaderOptions}>
    <Stack.Screen 
      name="Dashboard" 
      component={DashboardScreen}
      options={{
        title: 'Dashboard',
      }}
    />
    <Stack.Screen 
      name="Fasting" 
      component={FastingScreen}
      options={{
        title: 'Fasting Timer',
      }}
    />
    <Stack.Screen 
      name="Devotional" 
      component={DevotionalScreen}
      options={{
        title: 'Daily Devotional',
      }}
    />
    <Stack.Screen 
      name="Journal" 
      component={JournalScreen}
      options={{
        title: 'Personal Journal',
      }}
    />
    <Stack.Screen 
      name="DailyInspirations" 
      component={DailyInspirationsScreen}
      options={{
        title: 'Daily Inspirations',
      }}
    />
    <Stack.Screen 
      name="Achievements" 
      component={AchievementsScreen}
      options={{
        title: 'Achievements',
      }}
    />
    <Stack.Screen 
      name="Profile" 
      component={ProfileScreen}
      options={({ navigation }) => ({
        title: 'Profile',
        headerRight: () => (
          <TouchableOpacity 
            onPress={() => navigation.navigate('Auth')}
            style={{ marginRight: 15 }}
          >
            <Text style={{ color: '#ecf0f1', fontWeight: '600' }}>Login</Text>
          </TouchableOpacity>
        ),
      })}
    />
    <Stack.Screen 
      name="Auth" 
      component={AuthScreen}
      options={{
        title: 'Login / Register',
        headerLeft: () => null,
        gestureEnabled: false,
      }}
    />
  </Stack.Navigator>
);

export default MainStack;
