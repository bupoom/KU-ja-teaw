import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';

export default function PlanScreen() {
  const handleGoBack = () => {
    // กลับไปที่ home tab
    router.replace('/(tabs)');
  };

  const handleCreateTrip = () => {
    // Navigate to create trip page
    //router.push('');
  };

  const handleJoinTrip = () => {
    // Navigate to join trip page
    // router.push('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choose your action</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Create Trip Card */}
        <TouchableOpacity style={styles.actionCard} onPress={handleCreateTrip}>
          <Text style={styles.actionTitle}>Create your new trip</Text>
          <Text style={styles.actionSubtitle}>
            Start your trip journey. Get a complete itinerary, invite your friends and have fun!
          </Text>
        </TouchableOpacity>

        {/* Join Trip Card */}
        <TouchableOpacity style={styles.actionCard} onPress={handleJoinTrip}>
          <Text style={styles.actionTitle}>Join someone trip</Text>
          <Text style={styles.actionSubtitle}>
            Join trip with your friend code
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 8,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5E5',
    backgroundColor: '#ffffff',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    flex: 1,
    textAlign: 'center',
    marginRight: 34, // ชดเชย width ของปุ่มย้อนกลับ
  },
  headerRight: {
    width: 34, // เพื่อให้ title อยู่ตรงกลางจริงๆ
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  actionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  actionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});