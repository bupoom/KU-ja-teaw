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
import TripBox from '@/components/TripBox';
import { 
  mockUserDetails, 
  mockTripBoxes
} from '@/mock/mockDataComplete';
import { calculateTripStatus } from '@/util/calculateTripStatus';

interface TripSection {
  title: string;
  trips: TripBox[];
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
    
    // Return custom user data for Mr.Terrific
    // Note: When properties have the same name, the later ones override the earlier ones
    // So name: 'Mr.Terrific' will override name: 'John Smith' from mockUserDetails[0]
    return {
      id: "1",
      name: 'Mr.Terrific', // This will override mockUserDetails[0].name
      phone: 'Tel. 0654105555', // This will override mockUserDetails[0].phone  
      email: 'terrific@example.com', // This will override mockUserDetails[0].email
      user_image: mockUserDetails[0].user_image // Keep the same image
    };
  };

  const fetchTripsData = async (): Promise<TripBox[]> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockTripBoxes;
  };

  const organizeTrips = (trips: TripBox[]): TripSection[] => {
    const nowTrips: TripBox[] = [];
    const comingTrips: TripBox[] = [];
    const endTrips: TripBox[] = [];

    trips.forEach(trip => {
      // Use utility function to calculate status based only on dates
      // status_planning is separate and just for UI tags
      const status = calculateTripStatus(trip.start_date, trip.end_date);
      
      switch (status) {
        case 'Now':
          nowTrips.push(trip);
          break;
        case 'Coming':
          comingTrips.push(trip);
          break;
        case 'END':
          endTrips.push(trip);
          break;
      }
    });

    // Always return all three sections, even if empty
    const sections: TripSection[] = [
      { title: 'Now', trips: nowTrips },
      { title: 'Coming', trips: comingTrips },
      { title: 'END', trips: endTrips }
    ];

    return sections;
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

  // Custom navigation function for END trips
  const handleEndTripPress = (trip_id: number) => {
    router.push(`/trips/${trip_id}`);
  };

  const handleSeeAllEndTrips = () => {
    // Navigate to all completed trips using your file structure  
    router.push('/tabs/profile/all_end_trip');
  };

  // Function to get empty state message for each section
  const getEmptyStateMessage = (sectionTitle: string): string => {
    switch (sectionTitle) {
      case 'Now':
        return 'No ongoing trips';
      case 'Coming':
        return 'No upcoming trips';
      case 'END':
        return 'No completed trips';
      default:
        return 'No trips available';
    }
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
          colors={['#284D44', '#059669']}
        >
          {/* Settings Button */}
          <View className="flex-row justify-end items-center pt-12 px-4">
            <TouchableOpacity 
              onPress={handleSettings}
              className="p-2 bg-white/0 rounded-full"
            >
              <Feather name="settings" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Profile Pic */}
          <View className="items-center px-4 mt-4">
            <View className="relative mb-4 w-40 h-40">
              <Image
                source={{ uri: user.user_image }}
                className="w-40 h-40 rounded-full border-4 border-white shadow-lg"
              />
              <TouchableOpacity 
                onPress={handleEditProfile}
                className="absolute -bottom-0 -right-2 w-9 h-9 bg-white rounded-full border-2 border-white items-center justify-center shadow-sm"
              >
                <Foundation name="pencil" size={18} color="#374151" />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        {/* User Info */}
        <View className="items-center px-4">
          <Text className="text-[25px] font-sf-bold text-black mb-0">{user.name}</Text>
          <Text className="text-dark_gray mb-2">{user.email}</Text>
          <Text className="text-dark_gray mb-2">{user.phone}</Text>
        </View>

        {/* Trips Sections */}
        <View className="px-4 mt-6">
          {tripSections.map((section, sectionIndex) => (
            <View key={section.title}>
              <View className="flex-row justify-between items-center">
                <Text className="text-[15px] font-sf-bold text-black ml-5">
                  {section.title}
                </Text>
                {section.title === 'END' && section.trips.length > 0 && (
                  <TouchableOpacity onPress={handleSeeAllEndTrips}>
                    <Text className="text-[12px] text-black font-sf mr-2">
                      See All End Trips
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              
              <View className="mb-4 w-full h-px bg-gray-300" />
              
              {section.trips.length > 0 ? (
                <FlatList
                  data={section.title === 'END' ? section.trips.slice(0, 2) : section.trips}
                  renderItem={({ item }) => (
                    <TripBox 
                      trip_id={item.trip_id}
                      trip_name={item.trip_name}
                      trip_image={item.trip_image}
                      start_date={item.start_date}
                      end_date={item.end_date}
                      member_count={item.member_count}
                      status_planning={item.status_planning}
                      onPress={section.title === 'END' ? handleEndTripPress : undefined}
                    />
                  )}
                  keyExtractor={(item) => item.trip_id.toString()}
                  className="pb-5"
                  scrollEnabled={false}
                  showsVerticalScrollIndicator={false}
                />
              ) : (
                <View className="py-8 items-center">
                  <Text className="text-gray-500 text-[14px] font-sf">
                    {getEmptyStateMessage(section.title)}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Bottom spacing */}
        <View className="h-24" />
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;