import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar, 
  RefreshControl,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Feather, Foundation } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import '../../global.css'

// TypeScript interfaces
interface Trip {
  id: string;
  title: string;
  image: string;
  date: string;
  people: string;
  status: 'Now' | 'Coming' | 'Completed';
  statusColor: string;
  location?: string;
  duration?: string;
}

interface User {
  id: string;
  name: string;
  username: string;
  phone: string;
  avatar: string;
  email?: string;
  bio?: string;
}

interface TripSection {
  title: string;
  trips: Trip[];
}

const ProfileScreen: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [tripSections, setTripSections] = useState<TripSection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchUserData = async (): Promise<User> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      id: '1',
      name: 'Mr.Terrific',
      username: '@man300iq',
      phone: 'Tel. 0654105555',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      email: 'terrific@example.com',
      bio: 'Adventure seeker & travel enthusiast 🌍'
    };
  };

  const fetchTripsData = async (): Promise<Trip[]> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    return [
      {
        id: '1',
        title: 'Tokyo Adventure',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=80&h=80&fit=crop',
        date: 'Dec 15-22, 2024',
        people: '4 people',
        status: 'Now',
        statusColor: '#10B981',
        location: 'Tokyo, Japan',
        duration: '7 days'
      },
      {
        id: '2',
        title: 'Bali Retreat',
        image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=80&h=80&fit=crop',
        date: 'Jan 10-17, 2025',
        people: '2 people',
        status: 'Coming',
        statusColor: '#3B82F6',
        location: 'Bali, Indonesia',
        duration: '7 days'
      },
      {
        id: '3',
        title: 'Paris Getaway',
        image: 'https://images2.alphacoders.com/546/546391.jpg',
        date: 'Nov 5-12, 2024',
        people: '3 people',
        status: 'Completed',
        statusColor: '#6B7280',
        location: 'Paris, France',
      },
      {
        id: '4',
        title: 'Swiss Alps',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=80&fit=crop',
        date: 'Sep 20-27, 2024',
        people: '5 people',
        status: 'Completed',
        statusColor: '#6B7280',
        location: 'Swiss Alps',
      }
    ];
  };

  const organizeTrips = (trips: Trip[]): TripSection[] => {
    const now = trips.filter(trip => trip.status === 'Now');
    const coming = trips.filter(trip => trip.status === 'Coming');
    const completed = trips.filter(trip => trip.status === 'Completed');

    return [
      { title: 'Current Trip', trips: now },
      { title: 'Upcoming Trips', trips: coming },
      { title: 'Past Adventures', trips: completed }
    ].filter(section => section.trips.length > 0);
  };

  const loadData = async () => {
    try {
      const [userData, tripsData] = await Promise.all([
        fetchUserData(),
        fetchTripsData()
      ]);
      
      setUser(userData);
      setTripSections(organizeTrips(tripsData));
    } catch (error) {
      Alert.alert('Error', 'Failed to load profile data');
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Edit profile feature will be implemented');
  };

  const handleSettings = () => {
    Alert.alert('Settings', 'Settings page will be opened');
  };

  const handleTripPress = (trip: Trip) => {
    Alert.alert('Trip Details', `${trip.title}\n${trip.location}\n`);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#10B981" />
        <Text className="mt-4 text-gray-600">Loading profile...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <Text className="text-gray-600">Failed to load profile</Text>
        <TouchableOpacity 
          onPress={loadData}
          className="mt-4 px-6 py-3 bg-green-500 rounded-lg"
        >
          <Text className="text-white font-semibold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="light-content" />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <LinearGradient
          // 059669
          colors={['#284D44', '#059669']}
        >
          {/* Settings Button */}
          <View className="flex-row justify-end items-center pt-12 px-4">
            <TouchableOpacity 
              onPress={handleSettings}
              className="p-2 bg-white/20 rounded-full"
            >
              <Feather name="settings" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Profile Pic */}
          <View className="items-center px-4 mt-4">
            <View className="relative mb- w-130 h-130">
              <Image
                source={{ uri: user.avatar }}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
              <TouchableOpacity 
                onPress={handleEditProfile}
                className="absolute -bottom-0 -right-2 w-8 h-8 bg-purple-300 rounded-full border-2  border-white items-center justify-center shadow-sm"
              >
                <Foundation name="pencil" size={16} color="#374151" />
              </TouchableOpacity>
            </View>

            {/* <Text className="text-2xl font-bold text-white mb-1">{user.name}</Text>
            <Text className="text-green-100 mb-1">{user.username}</Text>
            <Text className="text-green-100 mb-2">{user.phone}</Text>
            {user.bio && (
              <Text className="text-green-100 text-center text-sm px-4">{user.bio}</Text>
            )}*/}
          </View>
        </LinearGradient>

        {/* Stats Section */}
        {/* {/* 
  
        <View className="mx-4 -mt-6 mb-6">
          <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <View className="flex-row justify-around">
              <View className="items-center">
                <Text className="text-2xl font-bold text-gray-800">
                  {tripSections.reduce((acc, section) => acc + section.trips.length, 0)}
                </Text>
                <Text className="text-gray-500 text-sm">Total Trips</Text>
              </View>
              <View className="w-px bg-gray-200" />
              <View className="items-center">
                <Text className="text-2xl font-bold text-green-600">
                  {tripSections.find(s => s.title === 'Current Trip')?.trips.length || 0}
                </Text>
                <Text className="text-gray-500 text-sm">Active</Text>
              </View>
              <View className="w-px bg-gray-200" />
              <View className="items-center">
                <Text className="text-2xl font-bold text-blue-600">
                  {tripSections.find(s => s.title === 'Upcoming Trips')?.trips.length || 0}
                </Text>
                <Text className="text-gray-500 text-sm">Upcoming</Text>
              </View>
            </View>
          </View>
        </View>
        */}
        <View className="items-center px-4 mt-4">
          <Text className="text-2xl font-bold color-black mb-1">{user.name}</Text>
          <Text className="color-grey mb-1">{user.username}</Text>
          <Text className="color-grey mb-2">{user.phone}</Text>
          {user.bio && (
            <Text className="color-grey text-center text-sm px-4">{user.bio}</Text>
          )}
        </View>
        {/* Trips Sections */}
        <View className="px-4">
          {tripSections.map((section, sectionIndex) => (
            <View key={section.title} className="mb-6">
              <Text className="text-xl font-bold text-gray-800 mb-4">
                {section.title}
              </Text>
              <View
                className='mb-4 w-15/16 border-hairline border-s border-gray-500'
              />
              {section.trips.map((trip) => (
                <TouchableOpacity 
                  key={trip.id}
                  onPress={() => handleTripPress(trip)}
                  className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100"
                  activeOpacity={0.7}
                >
                  <View className="flex-row items-center">
                    <Image
                      source={{ uri: trip.image }}
                      className="w-14 h-14 rounded-xl mr-4"
                    />
                    
                    <View className="flex-1">
                      <View className="flex-row items-center justify-between mb-2">
                        <Text className="text-lg font-semibold text-gray-800 flex-1 mr-2">
                          {trip.title}
                        </Text>
                        <View 
                          className="px-3 py-1 rounded-full"
                          style={{ backgroundColor: trip.statusColor }}
                        >
                          <Text className="text-white text-xs font-medium">
                            {trip.status}
                          </Text>
                        </View>
                      </View>
                      
                      <View className="flex-row items-center mb-1">
                        <Feather name="calendar" size={14} color="#6B7280" />
                        <Text className="text-gray-600 text-sm ml-2">{trip.date}</Text>
                      </View>
                      
                      <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center">
                          <Feather name="users" size={14} color="#6B7280" />
                          <Text className="text-gray-600 text-sm ml-2">{trip.people}</Text>
                        </View>
                        
                        {trip.location && (
                          <View className="flex-row items-center">
                            <Feather name="map-pin" size={14} color="#6B7280" />
                            <Text className="text-gray-600 text-sm ml-2">{trip.location}</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        {/* Empty State */}
        {tripSections.length === 0 && (
          <View className="items-center justify-center py-16">
            <Feather name="map" size={48} color="#D1D5DB" />
            <Text className="text-gray-500 mt-4 text-lg">No trips yet</Text>
            <Text className="text-gray-400 mt-2 text-center px-8">
              Start planning your first adventure!
            </Text>
          </View>
        )}

        {/* Bottom spacing */}
        <View className="h-24" />
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;