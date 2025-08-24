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
import { router } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';

// TypeScript Interfaces
interface Trip {
  id: number;
  title: string;
  dateRange: string;
  image: string;
  agent: string;
  agentImage: string;
  participantsCount: number;
}

interface Place {
  id: number;
  title: string;
  rating: number;
  reviewCount: number,
  location: string;
  image: string;
}

interface GuidePlan {
  id: number;
  title: string;
  duration: number;
  price: number;
  rating: number;
  image: string;
  highlights: string[];
  guideId: string;
}

interface LoadingState {
  currentTrip: boolean;
  invitations: boolean;
  places: boolean;
  guidePlans: boolean;
  refreshing: boolean;
}

export default function HomeScreen(): JSX.Element {
  // State Management
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);
  const [tripInvitations, setTripInvitations] = useState<Trip[]>([]);
  const [placesToVisit, setPlacesToVisit] = useState<Place[]>([]);
  const [guidePlans, setGuidePlans] = useState<GuidePlan[]>([]);
  const [loading, setLoading] = useState<LoadingState>({
    currentTrip: false,
    invitations: false,
    places: false,
    guidePlans: false,
    refreshing: false,
  });
  const [error, setError] = useState<string | null>(null);
  
  const fetchCurrentTrip = async (): Promise<void> => {
    setLoading(prev => ({ ...prev, currentTrip: true }));
    try {
      // API call here
      const CurrentTripData: Trip = {
        id: 1,
        title: "Trip to Paris",
        dateRange: "25/06/65-01/07/65",
        image: "https://wallpaperbat.com/img/172005-4k-paris-wallpaper-top-free-4k-paris-background.jpg",
        agent: "Keen_Kung",
        agentImage: "https://i.pinimg.com/474x/fa/d5/e7/fad5e79954583ad50ccb3f16ee64f66d.jpg",
        participantsCount: 4,
      };
      
      //  เซ็ตข้อมูลลง state
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
      const InvitationsTripsData: Trip[] = [
        {
          id: 1,
          title: "Trip to Thailand",
          dateRange: "25/08/65-01/08/65",
          image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=300&h=200&fit=crop",
          agent: "Keen_Kung",
          agentImage: "https://i.pinimg.com/474x/fa/d5/e7/fad5e79954583ad50ccb3f16ee64f66d.jpg",
          participantsCount: 5
        },
        {
          id: 2,
          title: "Trip of Osaka",
          dateRange: "15/09/65-22/09/65",
          image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&h=200&fit=crop",
          agent: "Oshi_Kung",
          agentImage: "https://i.pinimg.com/474x/fa/d5/e7/fad5e79954583ad50ccb3f16ee64f66d.jpg",
          participantsCount: 3,
        },
        {
          id: 3,
          title: "Trip to Tokyo",
          dateRange: "10/10/65-17/10/65",
          image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&h=200&fit=crop",
          agent: "Travel_Pro",
          agentImage: "https://i.pinimg.com/474x/fa/d5/e7/fad5e79954583ad50ccb3f16ee64f66d.jpg",
          participantsCount: 7,
        }
      ];
      
      //  เซ็ตข้อมูลลง state
      setTripInvitations(InvitationsTripsData);
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
      const PlacesData: Place[] = [
        {
          id: 1,
          title: "Eiffel Tower",
          location: "Paris, France",
          rating: 4.8,
          image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=300&h=200&fit=crop",
          reviewCount: 15420
        },
        {
          id: 2,
          title: "Santorini",
          location: "Greece",
          rating: 4.9,
          image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=300&h=200&fit=crop",
          reviewCount: 8932
        },
        {
          id: 3,
          title: "Bali Temple",
          location: "Indonesia",
          rating: 4.7,
          image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=300&h=200&fit=crop",
          reviewCount: 6785
        },
        {
          id: 4,
          title: "Mount Fuji",
          location: "Japan",
          rating: 4.8,
          image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=300&h=200&fit=crop",
          reviewCount: 12340
        }
      ];
      
      // เซ็ตข้อมูลลง state
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
      const mockData: GuidePlan[] = [
        {
          id: 1,
          title: "7-Day European Adventure",
          duration: 7,
          price: 45000,
          rating: 4.8,
          image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&h=200&fit=crop",
          highlights: ["Visit 5 countries", "Professional guide", "All meals included"],
          guideId: "europe_expert"
        },
        {
          id: 2,
          title: "Asian Culture Tour",
          duration: 10,
          price: 32000,
          rating: 4.9,
          image: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=300&h=200&fit=crop",
          highlights: ["Temple visits", "Cultural workshops", "Local cuisine"],
          guideId: "asia_guide"
        },
        {
          id: 3,
          title: "Beach Paradise",
          duration: 5,
          price: 28000,
          rating: 4.7,
          image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
          highlights: ["Private beach", "Water sports", "Sunset cruise"],
          guideId: "beach_pro"
        }
      ];
      
      //  เซ็ตข้อมูลลง state
      setGuidePlans(mockData);
    } catch (error) {
      console.error('Failed to fetch guide plans:', error);
      setError('Failed to load guide plans');
    } finally {
      setLoading(prev => ({ ...prev, guidePlans: false }));
    }
  };

  // API Action Functions
  const handleJoinTrip = async (tripId: number): Promise<void> => {
    try {
      // API join
      //if (success)
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
      
    } catch (error) {
      Alert.alert('Error', 'Failed to join trip. Please try again.');
    }
  };

  const handleRejectTrip = async (tripId: number): Promise<void> => {
    try {
      // API call reject the trip
      //if (success) {
      // Remove the invitation from the list after rejecting
      setTripInvitations(prev => 
        prev.filter(invitation => invitation.id !== tripId)
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to reject trip. Please try again.');
    }
  };

  const handlePlacePress = (place: Place): void => {
    // ----- Push หน้าใหม่เข้าไปโดย set params ----
    // router.push({
    //   pathname: '/place/[id]',
    //   params: { 
    //     id: place.id.toString(),
    //     title: place.title,
    //     location: place.location
    //   }
    // });
    Alert.alert("Navigate to Place", `Going to ${place.title}`)
  };

  const handleGuidePlanPress = (plan: GuidePlan): void => {
    // ----- Push หน้าใหม่เข้าไปโดย set params ----
    // router.push({
    //   pathname: '/guide-plan/[id]',
    //   params: { 
    //     id: plan.id.toString(),
    //     title: plan.title,
    //     price: plan.price
    //   }
    // });
    Alert.alert("Navigate to Guide Plan", `Going to ${plan.title}`)
  };

  const onRefresh = async (): Promise<void> => {
    setLoading(prev => ({ ...prev, refreshing: true }));
    setError(null);
    
    try {
      await Promise.all([
        fetchCurrentTrip(),
        fetchTripInvitations(),
        fetchPlacesToVisit(),
        fetchGuidePlans()
      ]);
    } catch (error) {
      setError('Failed to refresh data');
    } finally {
      setLoading(prev => ({ ...prev, refreshing: false }));
    }
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

  // Render Functions
  const renderLoadingSpinner = (): JSX.Element => (
    <View className="flex-row justify-center items-center py-4">
      <ActivityIndicator size="small" color="#075952" />
      <Text className="text-gray-600 ml-2">Loading...</Text>
    </View>
  );

  //  ------------------- Invitation  -------------------
  const renderTripInvitation = ({ item }: { item: Trip }): JSX.Element => (
    <View className="bg-white rounded-xl p-4 mb-4 mx-4 shadow-sm border border-gray-100">
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
              source={{ uri: item.agentImage }} 
              className="w-6 h-6 rounded-full mr-3"
              resizeMode="cover"
            />
            <Text className="text-sm text-gray-600">{item.agent}</Text>
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
    </View>
  );
  //  ------------------- Place -------------------
  const renderPlace = ({ item }: { item: Place }): JSX.Element => (
    <TouchableOpacity 
      className="mr-4 w-48"
      onPress={() => handlePlacePress(item)}
      activeOpacity={0.7}
    >
      <Image 
        source={{ uri: item.image }} 
        className="w-48 h-32 rounded-xl mb-2"
        resizeMode="cover"
      />
      <Text className="text-base font-semibold text-black mb-1">{item.title}
      </Text>
      <Text className="text-sm text-gray-600 mb-1">{item.location}</Text>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Feather name="star" size={14} color="#FFA500" />
          <Text className="text-sm text-gray-600 ml-1">{item.rating}</Text>
        </View>
        <Text className="text-xs text-gray-500">{item.reviewCount.toLocaleString()} reviews</Text>
      </View>
    </TouchableOpacity>
  );

  //  ------------------- Place -------------------
  const renderGuidePlan = ({ item }: { item: GuidePlan }): JSX.Element => (
    <TouchableOpacity 
      className="mr-4 w-56"
      onPress={() => handleGuidePlanPress(item)}
      activeOpacity={0.7}
    >
      <Image 
        source={{ uri: item.image }} 
        className="w-56 h-36 rounded-xl mb-2"
        resizeMode="cover"
      />
      <Text className="text-base font-semibold text-black mb-1" numberOfLines={2}>{item.title}</Text>
      <View className="flex-row justify-between items-center mb-1">
        <Text className="text-sm text-gray-600">{item.duration} days</Text>
        <Text className="text-lg font-bold text-teal-700">฿{item.price}</Text>
      </View>
      <View className="flex-row items-center">
        <Feather name="star" size={14} color="#FFA500" />
        <Text className="text-sm text-gray-600 ml-1">{item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

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

        {/* --------------------------------------------------------- Continue Your Trip Section --------------------------------------------------------- */}
        <View className="bg-white mt-2 p-4 shadow-sm border border-gray-100">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-xl font-bold text-black">Continue Your Trip</Text>
            {/* <Feather name="chevron-down" size={20} color="#666" /> */}
          </View>
          
          {loading.currentTrip ? (
            renderLoadingSpinner()
          ) : currentTrip ? (
            <TouchableOpacity 
              className="flex-row bg-teal-700 rounded-xl p-3 shadow-sm border-gray-100"
              //onPress={() => router.push(`/trip/${currentTrip.id}`)}
              activeOpacity={0.7}
            >
              {/* รูป Trips */}
              <Image 
                source={{ uri: currentTrip.image }} 
                className="w-20 h-full rounded-lg mr-3"
                resizeMode="cover"
              />
              <View className="flex-1">
                <Text className="text-lg font-semibold text-white mb-1">
                  {currentTrip.title}
                </Text>
                <View className="flex-row items-center mb-1">
                  <Feather name="calendar" size={14} color="#ffffff" />
                  <Text className="text-sm text-white ml-1">
                    {currentTrip.dateRange}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  {/* รูป user */}
                  <Image 
                    source={{ uri: currentTrip.agentImage }} 
                    className="w-6 h-6 rounded-full mr-3"
                    resizeMode="cover"
                  />
                  <Text className="text-sm text-white">{currentTrip.agent}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ) : (
            <View className="bg-gray-50 rounded-xl p-4 items-center">
              <Text className="text-gray-500">No active trips</Text>
            </View>
          )}
        </View>
        {/* --------------------------------------------------------- Continue Your Trip Section ------------------- */}

        {/* --------------------------------------------------------- Ads Picture Section ------------------- */}
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
        {/* --------------------------------------------------------- Ads Picture Section ------------------- */}

        {/* --------------------------------------------------------- Trip Invitations Section -------------------*/}
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
        {/* --------------------------------------------------------- Trip Invitations Section -------------------*/}
        
        {/* --------------------------------------------------------- Places to Visit Section -------------------*/}
        <View className="mt-6">
          <Text className="text-xl font-bold text-black px-4 mb-4">
            Places to Visit
          </Text>
          
          {loading.places ? (
            renderLoadingSpinner()
          ) : (
            <FlatList
              data={placesToVisit}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderPlace}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16 }}
            />
          )}
        </View>

        {/* --------------------------------------------------------- Interesting Guide Plans Section ----------*/}
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
              renderItem={renderGuidePlan}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16 }}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}