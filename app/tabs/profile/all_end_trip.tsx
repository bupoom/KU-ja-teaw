// app/(tabs)/profile/all_end_trip.tsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StatusBar, 
  RefreshControl,
  Alert,
  ActivityIndicator,
  FlatList,
  SafeAreaView
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import TripBox from '@/components/TripBox';
import { mockTripBoxes } from '@/mock/mockDataComplete';
import { calculateTripStatus } from '@/util/calculateTripStatus';
import Header from '@/components/Header';


const AllEndTripsScreen: React.FC = () => {
  const router = useRouter();
  const [endTrips, setEndTrips] = useState<TripBox[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchEndTripsData = async (): Promise<TripBox[]> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    console.log('All mock trips:', mockTripBoxes.length);
    
    // Filter only completed trips based on dates
    const allTrips = mockTripBoxes;
    const completedTrips = allTrips.filter(trip => {
      const status = calculateTripStatus(trip.start_date, trip.end_date);
      console.log(`Trip ${trip.trip_name}: ${trip.start_date} - ${trip.end_date} = Status: ${status}`);
      return status === 'END';
    });

    console.log('Filtered completed trips:', completedTrips.length);
    console.log('Completed trips data:', completedTrips);
    
    return completedTrips;
  };

  const loadData = async () => {
    try {
      const tripsData = await fetchEndTripsData();
      console.log('Setting end trips data:', tripsData.length);
      setEndTrips(tripsData);
      // setEndTrips([])
      
      // Log the actual data that's being set
      console.log('Trip data being set:', tripsData);
    } catch (error) {
      Alert.alert('Error', 'Failed to load end trips data');
      console.error('Error loading end trips:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleBackPress = () => {
    router.back();
  };

  const handleTripPress = (trip: TripBox) => {
    // Navigate to trip details
    router.push(`./trips/${trip.trip_id}`);
  };

  // Log when endTrips state actually changes
  // useEffect(() => {
  //   console.log('EndTrips state updated:', endTrips.length);
  //   if (endTrips.length > 0) {
  //     console.log('Current endTrips:', endTrips);
  //   }
  // }, [endTrips]);

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar barStyle="dark-content" />
        
        {/* Header */}
        <Header title='All End Trips' onBackPress={handleBackPress} />

        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="green_2" />
          <Text className="mt-4 text-gray-600">Loading trips...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Add debug info to see what's happening
  // console.log('Rendering with endTrips length:', endTrips.length);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <Header title='All End Trips' onBackPress={handleBackPress} />
      
      {/* Debug info - remove this in production */}
      {/* <View className="bg-yellow-100 p-2 mx-4 my-2 rounded">
        <Text className="text-xs">Debug: Found {endTrips.length} end trips</Text>
      </View> */}
      
      {/* Content */}
      {endTrips.length === 0 ? (
        <View className="flex-1 justify-center items-center px-4">
          <Text className="text-[18px] font-sf-bold text-gray-400 mt-4">No End Trips</Text>
          <Text className="text-[14px] text-gray-400 text-center mt-2">
            You haven't completed any trips yet
          </Text>
        </View>
      ) : (
        <FlatList
          data={endTrips}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleTripPress(item)}>
              <TripBox 
                trip_id={item.trip_id}
                trip_name={item.trip_name}
                trip_image={item.trip_image}
                start_date={item.start_date}
                end_date={item.end_date}
                member_count={item.member_count}
                status_planning={item.status_planning}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.trip_id.toString()}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh}
              colors={['#10B981']}
              tintColor="#10B981"
            />
          }
          ItemSeparatorComponent={() => <View className="h-3" />}
          ListFooterComponent={() => <View className="h-6" />}
        />
      )}
    </SafeAreaView>
  );
};

export default AllEndTripsScreen;