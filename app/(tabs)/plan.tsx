import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TripActionScreen = () => {
  const insets = useSafeAreaInsets();
  const home = () => router.replace('/(tabs)'); // jumps to /(tabs)/index
  //const create = () => router.push('/(tabs)/plan/create');
  //const join = () => router.push('/(tabs)/plan/join');

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" translucent={Platform.OS === 'android'} />
      
      {/* Header */}
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity onPress={home} className="mr-3">
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-center flex-1 mr-6">
          Choose your action
        </Text>
      </View>

      <View className='mt-5 w-full border-hairline border-s border-gray-200'/>

      {/* Content */}
      <View className="flex-1 px-6 pt-8">
        
        {/* Create Trip Card */}
        <TouchableOpacity 
          // onPress={create}
          className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6"
          activeOpacity={0.7}
        >
          <Text className="text-xl font-bold text-gray-900 mb-2">
            Create your new trip
          </Text>
          <Text className="text-gray-500 text-base">
            Enter Your Trip Name, Date Duration, Poster Trip, etc
          </Text>
        </TouchableOpacity>

        {/* Join Trip Card */}
        <TouchableOpacity 
          // onPress={join}
          className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
          activeOpacity={0.7}
        >
          <Text className="text-xl font-bold text-gray-900 mb-2">
            Join someone trip
          </Text>
          <Text className="text-gray-500 text-base">
            Enter trip code & password.
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default TripActionScreen;