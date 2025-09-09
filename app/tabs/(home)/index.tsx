import React, { useState, useEffect, JSX } from "react";
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
} from "react-native";
import { useRouter } from "expo-router";
import GuideBox from "@/components/GuideBox";
import PlaceBox from "@/components/PlaceBox";
import TripBox from "@/components/TripBox";
import InviteBox from "@/components/InviteBox";
import { 
  mockTripBoxes, 
  mockTripInvitations, 
  mockBookmarkPlaces, 
  mockGuideBoxes 
} from "@/mock/mockDataComplete";

// Import interfaces
interface TripBox {
  trip_id: number;
  trip_name: string;
  trip_image: string;
  start_date: string;
  end_date: string;
  member_count: number;
  status_planning: 'planning' | 'completed';
  owner_name: string;
  owner_image: string;
}

interface PlaceBox {
  id: number;
  title: string;
  rating?: number;
  review_count?: number;
  location: string;
  place_image?: string;
  place_id?: number;
}

interface GuideBox {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
  guide_image: string;
  copies: number;
  owner_name: string;
  owner_image: string;
  owner_comments: string;
  guide_id: number;
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
  const [currentTrip, setCurrentTrip] = useState<TripBox | null>(null);
  const [tripInvitations, setTripInvitations] = useState<TripBox[]>([]);
  const [placesToVisit, setPlacesToVisit] = useState<PlaceBox[]>([]);
  const [guidePlans, setGuidePlans] = useState<GuideBox[]>([]);
  const [loading, setLoading] = useState<LoadingState>({
    currentTrip: false,
    invitations: false,
    places: false,
    guidePlans: false,
    refreshing: false,
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // ------------------------------- จำลองการ Fetch ------------------------------
const fetchCurrentTrip = async (): Promise<void> => {
  setLoading((prev) => ({ ...prev, currentTrip: true }));
  try {
    const today = new Date().toISOString().split('T')[0]; // วันนี้ในรูปแบบ YYYY-MM-DD
    
    // หา trip ที่วันนี้อยู่ในช่วงระหว่าง start_date และ end_date
    const activeTripData = mockTripBoxes.find(trip => {
      const startDate = trip.start_date;
      const endDate = trip.end_date;
      
      // เช็คว่าวันนี้อยู่ระหว่าง start_date และ end_date หรือไม่
      return today >= startDate && today <= endDate;
    });
    
    setCurrentTrip(activeTripData || null);
  } catch (error) {
    console.error("Failed to fetch current trip:", error);
    setError("Failed to load current trip");
  } finally {
    setLoading((prev) => ({ ...prev, currentTrip: false }));
  }
};
  const fetchTripInvitations = async (): Promise<void> => {
    setLoading((prev) => ({ ...prev, invitations: true }));
    try {
      setTripInvitations(mockTripInvitations);
    } catch (error) {
      console.error("Failed to fetch trip invitations:", error);
      setError("Failed to load trip invitations");
    } finally {
      setLoading((prev) => ({ ...prev, invitations: false }));
    }
  };

  const fetchPlacesToVisit = async (): Promise<void> => {
    setLoading((prev) => ({ ...prev, places: true }));
    try {
      // ใช้ bookmark places สำหรับแสดงใน home
      setPlacesToVisit(mockBookmarkPlaces);
    } catch (error) {
      console.error("Failed to fetch places:", error);
      setError("Failed to load places");
    } finally {
      setLoading((prev) => ({ ...prev, places: false }));
    }
  };

  const fetchGuidePlans = async (): Promise<void> => {
    setLoading((prev) => ({ ...prev, guidePlans: true }));
    try {
      setGuidePlans(mockGuideBoxes);
    } catch (error) {
      console.error("Failed to fetch guide plans:", error);
      setError("Failed to load guide plans");
    } finally {
      setLoading((prev) => ({ ...prev, guidePlans: false }));
    }
  };

  // -------------------------------- API Action Functions ------------------------
  const handlePreviewTrip = (trip: TripBox): void => {
    router.push(`/trips/${trip.trip_id}`);
  };

  const handleCurrentTripPress = (): void => {
    if (currentTrip) {
      router.push(`/trips/${currentTrip.trip_id}`);
    }
  };

  const handleJoinTrip = async (trip: TripBox): Promise<void> => {
    Alert.alert("Success", "You have successfully joined the trip!", [
      {
        text: "OK",
        onPress: () => {
          router.push(`/trips/${trip.trip_id}`);
          setTripInvitations((prev) =>
            prev.filter((inv) => inv.trip_id !== trip.trip_id)
          );
        },
      },
    ]);
  };

  const handleRejectTrip = async (trip: TripBox): Promise<void> => {
    setTripInvitations((prev) => prev.filter((inv) => inv.trip_id !== trip.trip_id));
  };

  const handlePlacePress = (place: PlaceBox): void => {
    router.push(`/places/${place.place_id}`);
  };

  const handleGuidePress = (guide: GuideBox): void => {
    router.push(`/guides/${guide.guide_id}`);
  };

  const onRefresh = async (): Promise<void> => {
    setLoading((prev) => ({ ...prev, refreshing: true }));
    setError(null);
    await Promise.all([
      fetchCurrentTrip(),
      fetchTripInvitations(),
      fetchPlacesToVisit(),
      fetchGuidePlans(),
    ]);
    setLoading((prev) => ({ ...prev, refreshing: false }));
  };

  // Initial data loading
  useEffect(() => {
    const loadInitialData = async (): Promise<void> => {
      await Promise.all([
        fetchCurrentTrip(),
        fetchTripInvitations(),
        fetchPlacesToVisit(),
        fetchGuidePlans(),
      ]);
    };
    loadInitialData();
  }, []);

  // ------------------------- Render Functions ------------------------------------------------------------
  const renderLoadingSpinner = (): JSX.Element => (
    <View className="flex-row justify-center items-center py-4">
      <ActivityIndicator size="small" color="#075952" />
      <Text className="text-gray-600 ml-2">Loading...</Text>
    </View>
  );

  //  ------------------- HOME PAGE -------------------
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View className="bg-green_2 p-2 flex-row items-center"></View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading.refreshing}
            onRefresh={onRefresh}
            colors={["#075952"]}
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
        <View className="bg-white mt-4 px-4">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-[24px] font-bold text-black pl-3">
              Continue Your Trip
            </Text>
          </View>

          {loading.currentTrip ? (
            renderLoadingSpinner()
          ) : currentTrip ? (
            <TouchableOpacity onPress={handleCurrentTripPress}>
              <TripBox {...currentTrip} />
            </TouchableOpacity>
          ) : (
            <View className="bg-gray-50 rounded-xl p-4 items-center">
              <Text className="text-gray-500">No active trips</Text>
            </View>
          )}
        </View>

        {/* -------------------------------------- Picture Section --------------------- */}
        <TouchableOpacity className="mt-6" activeOpacity={0.8}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop",
            }}
            className="w-full h-48"
            resizeMode="cover"
          />
          <View className="absolute bottom-4 left-4">
            <Text className="text-white text-xl font-bold mb-1">
              See Invite From
            </Text>
            <Text className="text-white text-xl font-bold">Your Friend</Text>
          </View>
        </TouchableOpacity>

        {/* ---------------------------- Trip Invitations Section -------------------*/}
        <View className="mt-6 px-4">
          <Text className="text-[24px] font-bold text-black pl-3">
            Trip Invitations
          </Text>

          {loading.invitations ? (
            renderLoadingSpinner()
          ) : tripInvitations.length > 0 ? (
            <FlatList
              data={tripInvitations}
              keyExtractor={(item) => item.trip_id.toString()}
              renderItem={({ item }) => (
                <View className="mt-3">
                  <InviteBox
                    {...item}
                    onPressCard={handlePreviewTrip}
                    onJoin={handleJoinTrip}
                    onReject={handleRejectTrip}
                  />
                </View>
              )}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          ) : (
            <View className="py-8 items-center">
              <Text className="text-gray-500">No trip invitations</Text>
            </View>
          )}
        </View>

        {/* -------------------------------------- Picture Section --------------------- */}
        <TouchableOpacity className="mt-6" activeOpacity={0.8}>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?cs=srgb&dl=pexels-jaime-reimer-1376930-2662116.jpg&fm=jpg",
            }}
            className="w-full h-48"
            resizeMode="cover"
          />
          <View className="absolute bottom-4 left-4">
            <Text className="text-white text-xl font-bold mb-1">
              See Guides From
            </Text>
            <Text className="text-white text-xl font-bold">Others</Text>
          </View>
        </TouchableOpacity>

        {/* ---------------------------------- Guides Section -------------------*/}
        <View className="mt-6 mb-8">
          <View className="px-4 mb-4">
            <Text className="text-[24px] font-bold text-black pl-3">Guides</Text>
          </View>

          {loading.guidePlans ? (
            renderLoadingSpinner()
          ) : (
            <FlatList
              data={guidePlans.slice(0, 4)} // แสดงแค่ 4 อันแรก
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleGuidePress(item)}>
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

        {/* Bottom spacing for tab bar */}
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}