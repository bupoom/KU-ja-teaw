import React, { useState, useEffect, JSX } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import GuideBox , { MockDataGuides } from '@/components/GuideBox'
import PlaceBox , { MockDataPlace } from '@/components/PlaceBox';
import TripBox , { CurrentTripData , MockTripsData } from '@/components/TripBox';

export default function HomeScreen(): JSX.Element {
  // State Management
  const [currentTrip, setCurrentTrip] = useState<TripDetails | null>(null);
  const [tripInvitations, setTripInvitations] = useState<TripDetails[]>([]);
  const [placesToVisit, setPlacesToVisit] = useState<PlaceDetails[]>([]);
  const [guidePlans, setGuidePlans] = useState<GuideDetails[]>([]);
  const [loading, setLoading] = useState<LoadingState>({
    currentTrip: false,
    invitations: false,
    places: false,
    guidePlans: false,
    refreshing: false,
  });
  const [error, setError] = useState<string | null>(null);
  // ------------------------------- จำลองการ Fetch ------------------------------
  const fetchCurrentTrip = async (): Promise<void> => {
    setLoading(prev => ({ ...prev, currentTrip: true }));
    try {
      setCurrentTrip(CurrentTripData);
    } catch (error) {
      console.error('Failed to fetch current trip:', error);
      setError('Failed to load current trip');
    } finally {
      setLoading(prev => ({ ...prev, currentTrip: false }));
    }
  };

  const fetchTripInvitations = async (): Promise<void> => {
    setLoading(prev => ({ ...prev, invitations: true }));
    try {
      setTripInvitations(MockTripsData);
    } catch (error) {
      console.error('Failed to fetch trip invitations:', error);
      setError('Failed to load trip invitations');
    } finally {
      setLoading(prev => ({ ...prev, invitations: false }));
    }
  };

  const fetchPlacesToVisit = async (): Promise<void> => {
    setLoading(prev => ({ ...prev, places: true }));
    try {
      const PlacesData: PlaceDetails[] = MockDataPlace
      setPlacesToVisit(PlacesData);
    } catch (error) {
      console.error('Failed to fetch places:', error);
      setError('Failed to load places');
    } finally {
      setLoading(prev => ({ ...prev, places: false }));
    }
  };

  const fetchGuidePlans = async (): Promise<void> => {
    setLoading(prev => ({ ...prev, guidePlans: true }));
    try {
      const mockData: GuideDetails[] = MockDataGuides
      setGuidePlans(mockData);
    } catch (error) {
      console.error('Failed to fetch guide plans:', error);
      setError('Failed to load guide plans');
    } finally {
      setLoading(prev => ({ ...prev, guidePlans: false }));
    }
  };
  // ------------------------------------------------------------------------------
  // -------------------------------- API Action Functions ------------------------
  const handlecurrentPlanPress = (trip: TripDetails) : void => {                 // handle current trip
    Alert.alert("Navigate to Current Plan", `Going to ${trip.title}`)
  }
  
  const handleJoinTrip = async (tripId: number): Promise<void> => {       // handle join trip
    Alert.alert(
      'Success',
      'You have successfully joined the trip!',
      [
        {
          text: 'OK',
          onPress: () => {
            // Remove the invitation from the list after joining
            setTripInvitations(prev => 
              prev.filter(invitation => invitation.id !== tripId)
            );
          }
        }
      ]
    );
  };

  const handleRejectTrip = async (tripId: number): Promise<void> => {     // handle reject trip
    setTripInvitations(prev => 
      prev.filter(invitation => invitation.id !== tripId)
    );

  };

  const onRefresh = async (): Promise<void> => {                          // refresh function
    setLoading(prev => ({ ...prev, refreshing: true }));
    setError(null);
    await Promise.all([
      fetchCurrentTrip(),
      fetchTripInvitations(),
      fetchPlacesToVisit(),
      fetchGuidePlans()
    ]);

    setLoading(prev => ({ ...prev, refreshing: false }));
  };

  // Initial data loading
  useEffect(() => {
    const loadInitialData = async (): Promise<void> => {
      await Promise.all([
        fetchCurrentTrip(),
        fetchTripInvitations(),
        fetchPlacesToVisit(),
        fetchGuidePlans()
      ]);
    };

    loadInitialData();
  }, []);
  // ------------------------------ ------------- ----------------------------------------------------------
  // ------------------------- Render Functions ------------------------------------------------------------
  const renderLoadingSpinner = (): JSX.Element => (
    <View className="flex-row justify-center items-center py-4">
      <ActivityIndicator size="small" color="#075952" />
      <Text className="text-gray-600 ml-2">Loading...</Text>
    </View>
  );

  //  ------------------- Invitation  -------------------
  const renderTripInvitation = ({ item }: { item: TripDetails }): JSX.Element => (
    <TouchableOpacity className="bg-white rounded-xl p-4 mb-4 mx-4 shadow-sm border border-gray-100" 
      onPress={() => handlecurrentPlanPress(item)}
    >
      <View className="flex-row">
        <Image 
          source={{ uri: item.image }} 
          className="w-20 h-full rounded-lg mr-3"
          resizeMode="cover"
        />
        <View className="flex-1">
          <Text className="text-lg font-semibold text-black mb-1">{item.title}</Text>
          <View className="flex-row items-center mb-1">
            <Feather name="calendar" size={14} color="#666" />
            <Text className="text-sm text-gray-600 ml-1 mr-3">{item.dateRange}</Text>
            <Feather name="users" size={14} color="#666" />
            <Text className="text-sm text-gray-600 ml-1">{item.participantsCount} participants</Text>
          </View>
          <View className="flex-row items-center mb-1">
            <Image 
              source={{ uri: item.creator_image }} 
              className="w-6 h-6 rounded-full mr-3"
              resizeMode="cover"
            />
            <Text className="text-sm text-gray-600">{item.creator}</Text>
          </View>
        </View>
      </View>
      <View className="flex-row mt-3 gap-2">
        <TouchableOpacity 
          onPress={() => handleJoinTrip(item.id)}
          className="flex-1 bg-teal-700 py-2 rounded-lg"
          activeOpacity={0.7}
        >
          <Text className="text-white text-center font-medium">JOIN</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => handleRejectTrip(item.id)}
          className="flex-1 border border-gray-300 py-2 rounded-lg"
          activeOpacity={0.7}
        >
          <Text className="text-gray-700 text-center font-medium">Reject</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  //  ------------------- ---------  -------------------
  //  ------------------- HOME PAGE -------------------
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <ScrollView 
        className="flex-1 mb-10" 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading.refreshing}
            onRefresh={onRefresh}
            colors={['#075952']}
            tintColor="#075952"
          />
        }
      >
        {/* Error Message */}
        {error && (
          <View className="bg-red-100 border border-red-400 px-4 py-2 mx-4 mt-2 rounded">
            <Text className="text-red-700 text-sm">{error}</Text>
          </View>
        )}

        {/* ------------------------------- Continue Your Trip Section ------------------------------- */}
        <View className="bg-white mt-2 p-4 shadow-sm border border-gray-100">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-xl font-bold text-black">Continue Your Trip</Text>
            {/* <Feather name="chevron-down" size={20} color="#666" /> */}
          </View>
          
          {loading.currentTrip ? (
            renderLoadingSpinner()
          ) : currentTrip ? (
            <View>
              <TripBox {...currentTrip}/>
            </View>
          ) : (
            <View className="bg-gray-50 rounded-xl p-4 items-center">
              <Text className="text-gray-500">No active trips</Text>
            </View>
          )}
        </View>
        {/* ---------------------------------------------------------------------------- */}

        {/* -------------------------------------- Picture Section --------------------- */}
        <TouchableOpacity className="mt-4" activeOpacity={0.8}>
          <Image 
            source={{ uri: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop" }} 
            className="w-full h-48"
            resizeMode="cover"
          />
          <View className="absolute bottom-4 left-4">
            <Text className="text-white text-xl font-bold mb-1">
              See Invite From
            </Text>
            <Text className="text-white text-xl font-bold">
              Your Friend
            </Text>
          </View>
        </TouchableOpacity>
        {/* ---------------------------------------------------------------------------------------------- */}

        {/* ---------------------------- --------------- Trip Invitations Section -------------------*/}
        <View className="mt-4">
          <Text className="text-xl font-bold text-black px-4 mb-4">
            Trip Invitations
          </Text>
          
          {loading.invitations ? (
            renderLoadingSpinner()
          ) : tripInvitations.length > 0 ? (
            <FlatList
              data={tripInvitations}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderTripInvitation}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          ) : (
            <View className="px-4 py-8 items-center">
              <Text className="text-gray-500">No trip invitations</Text>
            </View>
          )}
        </View>
        {/* ---------------------------------------------------------------------------------------*/}
        
        {/* ----------------------------------------- Places to Visit Section -------------------*/}
        <View className="mt-6 ">
          <Text className="text-xl font-bold text-black px-4 mb-4">
            Places to Visit
          </Text>
          
          {loading.places ? (
            renderLoadingSpinner()
          ) : (
            <FlatList
              data={placesToVisit}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) => (
                <View>
                  <PlaceBox {...item} />
                </View>
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16, marginBottom:10 }}
              ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
            />
          )}
        </View>
        {/* ------------------------------------------------------------------------------------- */}
        {/* -------------------------------------- Picture Section --------------------- */}
        <TouchableOpacity className="mt-4" activeOpacity={0.8}>
          <Image 
            source={{ uri: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?cs=srgb&dl=pexels-jaime-reimer-1376930-2662116.jpg&fm=jpg" }} 
            className="w-full h-60"
            resizeMode="cover"
          />
          <View className="absolute bottom-4 left-4">
            <Text className="text-white text-xl font-bold mb-1">
              See Guides From
            </Text>
            <Text className="text-white text-xl font-bold">
              Others
            </Text>
          </View>
        </TouchableOpacity>
        {/* ---------------------------------------------------------------------------------------------- */}

        {/* ---------------------------------- Interesting Guide Plans Section -------------------*/}
        <View className="mt-6 mb-8">
          <Text className="text-xl font-bold text-black px-4 mb-4">
            Interesting Guide Plans
          </Text>
          
          {loading.guidePlans ? (
            renderLoadingSpinner()
          ) : (
            <FlatList
              data={guidePlans}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) => (
                <TouchableOpacity>
                  <GuideBox {...item} />
                </TouchableOpacity>
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16 }}
              ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
            />
          )}
        </View>
        {/* ------------------------------------------------------------------------------------- */}
      </ScrollView>
    </SafeAreaView>
  );
}