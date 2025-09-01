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
  ActivityIndicator,
  FlatList
} from 'react-native';
import { Feather, Foundation } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import '../../global.css'
import { useRouter } from 'expo-router'
import TripBox , { MockTripsData }from '@/components/TripBox';

interface TripSection {
  title: string;
  trips: TripDetails[];
}

const ProfileScreen: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserDetails | null>(null);
  const [tripSections, setTripSections] = useState<TripSection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchUserData = async (): Promise<UserDetails> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      id: 1,
      name: 'Mr.Terrific',
      username: '@man300iq',
      phone: 'Tel. 0654105555',
      user_image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      email: 'terrific@example.com',
      bio: 'Adventure seeker & travel enthusiast 🌍'
    };
  };

  const fetchTripsData = async (): Promise<TripDetails[]> => {
    // Simulate API call
    return MockTripsData;
  };

  const organizeTrips = (trips: TripDetails[]): TripSection[] => {
    const now = trips.filter(trip => trip.status === 'Traveling');
    const coming = trips.filter(trip => trip.status === 'Coming');
    const completed = trips.filter(trip => trip.status === 'Completed');

    return [
      { title: 'Now', trips: now },
      { title: 'Coming', trips: coming },
      { title: 'END', trips: completed }
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
    router.push('/tabs/profile/profile_setting')
  };

  const handleSettings = () => {
    router.push('/tabs/profile/setting')
  };

  useEffect(() => {
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
                source={{ uri: user.user_image }}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
              <TouchableOpacity 
                onPress={handleEditProfile}
                className="absolute -bottom-0 -right-2 w-8 h-8 bg-purple-300 rounded-full border-2  border-white items-center justify-center shadow-sm"
              >
                <Foundation name="pencil" size={16} color="#374151" />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        {/* Info Sections */}
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
              <View className='mb-4 w-15/16 border-hairline border-s border-gray-400'/>
              <FlatList // Trips in TipsBox Component
                data={section.trips}
                renderItem={({ item }) => (
                  <TouchableOpacity>
                    <TripBox {...item} />
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                className="pb-5"
                scrollEnabled={false}
              />
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