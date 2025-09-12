import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../../../components/Header';

const select_create_join = () => {
  const router = useRouter();
  const [selectedCard, setSelectedCard] = useState("");

  const handleCreateTrip = () => {
    console.log('Navigate to set plan detail');
    setSelectedCard('create');
    setTimeout(() => {
      router.push('/tabs/plan/set_plan_detail');
    }, 50);
  };

  const handleJoinTrip = () => {
    console.log('Navigate to join plan');
    setSelectedCard('join');
    setTimeout(() => {
      router.push('/tabs/plan/join');
    }, 50);
  };

  const handleBackPress = () => {
    console.log('Navigate back to Home');
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <Header 
        title="Choose your action"
        onBackPress={handleBackPress}
      />

      {/* Content */}
      <View className="flex-1 px-5 pt-10 mt-6 mb-6">
        {/* Create Trip Card */}
        <TouchableOpacity 
          className={`rounded-xl p-6 mb-5 shadow-sm border-2 w-[95%] h-[120px] mx-auto ${
            selectedCard === 'create' 
              ? 'border-[#284D44]' 
              : 'border-gray-300'
          }`}
          style={{
            backgroundColor: selectedCard === 'create' ? '#284D44' : '#ffffff'
          }}
          onPress={handleCreateTrip}
          activeOpacity={0.7}
        >
          <Text className={`text-2xl font-bold mb-2 ${
            selectedCard === 'create' ? 'text-white' : 'text-gray-800'
          }`}>
            Create your new trip
          </Text>
          <Text className={`text-sm leading-5 ${
            selectedCard === 'create' ? 'text-white' : 'text-gray-600'
          }`}>
            Enter Your Trip Name, Date Duration, Roster Trip, etc
          </Text>
        </TouchableOpacity>

        {/* Join Trip Card */}
        <TouchableOpacity 
          className={`rounded-xl p-6 mb-5 shadow-sm border-2 w-[95%] h-[120px] mx-auto ${
            selectedCard === 'join' 
              ? 'border-[#284D44]' 
              : 'border-gray-300'
          }`}
          style={{
            backgroundColor: selectedCard === 'join' ? '#284D44' : '#ffffff'
          }}
          onPress={handleJoinTrip}
          activeOpacity={0.7}
        >
          <Text className={`text-2xl font-bold mb-2 ${
            selectedCard === 'join' ? 'text-white' : 'text-gray-800'
          }`}>
            Join someone trip
          </Text>
          <Text className={`text-sm leading-5 ${
            selectedCard === 'join' ? 'text-white' : 'text-gray-600'
          }`}>
            Enter the trip code & password
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default select_create_join;