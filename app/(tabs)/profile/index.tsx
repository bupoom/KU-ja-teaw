import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StatusBar, ImageBackground} from 'react-native';
import { Feather, Foundation } from '@expo/vector-icons';
import { trips , user_details } from './data';
import '../../global.css'

const ProfileScreen = () => {

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with Settings */}
        <View className="bg-Green">
          <View className="flex-row justify-between items-center p-4 pt-12">
            <View className="w-6" />
            <TouchableOpacity className="p-2">
              <Feather name="settings" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <View className="items-center px-4 pb-6">
            <View className="relative mb-4">
              <Image
                source={{ 
                  uri: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" 
                }}
                className="w-20 h-20 rounded-full"
                />
              <View className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white items-center justify-center ">
                <Foundation name="pencil" size={15} color="black" /> 
              </View>
            </View>
          </View>
        </View>
        {/* Profile Section */}
        <View className="items-center px-4 pb-6">  
          <Text className="text-xl font-semibold text-gray-800 mb-1">Mr.Terrific</Text>
          <Text className="text-gray-500 mb-1">@man300iq</Text>
          <Text className="text-gray-500">Tel. 0654105555</Text>
        </View>

        {/* Trips Section */}
        <View className="px-4">
          {trips.map((trip, index) => (
            <View key={trip.id}>
              {/* Section Header */}
              {index === 0 && (
                <Text className="text-lg font-semibold text-gray-800 mb-3">Now</Text>
              )}
              {index === 1 && (
                <Text className="text-lg font-semibold text-gray-800 mb-3 mt-6">Coming</Text>
              )}
              {index === 2 && (
                <Text className="text-lg font-semibold text-gray-800 mb-3 mt-6">END</Text>
              )}

              {/* Trip Card */}
              <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-xl mb-4 border border-gray-100 shadow-sm">
                <Image
                  source={{ uri: trip.image }}
                  className="w-12 h-12 rounded-lg mr-3"
                />
                
                <View className="flex-1">
                  <View className="flex-row items-center justify-between mb-1">
                    <Text className="text-base font-semibold text-gray-800 flex-1 mr-2">
                      {trip.title}
                    </Text>
                    <View 
                      className="px-3 py-1 rounded-full"
                      style={{ backgroundColor: trip.statusColor }}
                    >
                      <Text className="text-white text-xs font-medium">{trip.status}</Text>
                    </View>
                  </View>
                  
                  <View className="flex-row items-center mb-1">
                    <Feather name="calendar" size={14} color="#666" />
                    <Text className="text-gray-600 text-sm ml-2">{trip.date}</Text>
                  </View>
                  
                  <View className="flex-row items-center">
                    <Feather name="users" size={14} color="#666" />
                    <Text className="text-gray-600 text-sm ml-2">{trip.people}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Bottom spacing for tab bar */}
        <View className="h-24" />
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;