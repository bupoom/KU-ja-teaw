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
import TripBox, { CurrentTripData } from "@/components/TripBox";
import InviteBox  from "@/components/InviteBox";
import { MockDataGuides } from "@/mock/data/guide_box";
import { InviteTripData } from "@/mock/data/invite_box";
import { MockDataPlace } from "@/mock/data/place_box";

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
  const router = useRouter();

  // ------------------------------- จำลองการ Fetch ------------------------------
  const fetchCurrentTrip = async (): Promise<void> => {
    setLoading((prev) => ({ ...prev, currentTrip: true }));
    try {
      setCurrentTrip(CurrentTripData);
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
      setTripInvitations(InviteTripData);
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
      const PlacesData: PlaceDetails[] = MockDataPlace;
      setPlacesToVisit(PlacesData);
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
      const mockData: GuideDetails[] = MockDataGuides;
      setGuidePlans(mockData);
    } catch (error) {
      console.error("Failed to fetch guide plans:", error);
      setError("Failed to load guide plans");
    } finally {
      setLoading((prev) => ({ ...prev, guidePlans: false }));
    }
  };

  // -------------------------------- API Action Functions ------------------------
  const handlePreviewTrip = (trip: TripDetails): void => {
    router.push(`/trips/${trip.id}`);
  };

  const handleJoinTrip = async (trip: TripDetails): Promise<void> => {
    // handle join trip
    Alert.alert("Success", "You have successfully joined the trip!", [
      {
        text: "OK",
        onPress: () => {
          router.push(`/trips/${trip.id}`);
          setTripInvitations((prev) =>
            prev.filter((inv) => inv.id !== trip.id)
          );
        },
      },
    ]);
  };

  const handleRejectTrip = async (trip: TripDetails): Promise<void> => {
    setTripInvitations((prev) => prev.filter((inv) => inv.id !== trip.id));
  };

  const onRefresh = async (): Promise<void> => {
    // refresh function
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
  // ------------------------------ ------------- ----------------------------------------------------------
  // ------------------------- Render Functions ------------------------------------------------------------
  const renderLoadingSpinner = (): JSX.Element => (
    <View className="flex-row justify-center items-center py-4">
      <ActivityIndicator size="small" color="#075952" />
      <Text className="text-gray-600 ml-2">Loading...</Text>
    </View>
  );

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

        <View className='bg-green_2 h-[15px]'></View>

        {/* ------------------------------- Continue Your Trip Section ------------------------------- */}
        <View className="bg-white mt-2 pl-4 pr-4">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-[24px] font-sf-bold text-black">
              Continue Your Trip
            </Text>
          </View>

          {loading.currentTrip ? (
            renderLoadingSpinner()
          ) : currentTrip ? (
            <View>
              <TripBox {...currentTrip} />
            </View>
          ) : (
            <View className="bg-gray-50 rounded-xl p-4 items-center">
              <Text className="text-gray-500">No active trips</Text>
            </View>
          )}
        </View>

        {/* -------------------------------------- Picture Section --------------------- */}
        <TouchableOpacity className="mt-4" activeOpacity={0.8}>
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
              renderItem={({ item }) => (
                <InviteBox
                  {...item}
                  onPressCard={handlePreviewTrip}
                  onJoin={handleJoinTrip}
                  onReject={handleRejectTrip}
                />
              )}
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
              renderItem={({ item }) => (
                <View>
                  <PlaceBox {...item} />
                </View>
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 16,
                marginBottom: 10,
              }}
              ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
            />
          )}
        </View>
        {/* ------------------------------------------------------------------------------------- */}
        {/* -------------------------------------- Picture Section --------------------- */}
        <TouchableOpacity className="mt-4" activeOpacity={0.8}>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?cs=srgb&dl=pexels-jaime-reimer-1376930-2662116.jpg&fm=jpg",
            }}
            className="w-full h-60"
            resizeMode="cover"
          />
          <View className="absolute bottom-4 left-4">
            <Text className="text-white text-xl font-bold mb-1">
              See Guides From
            </Text>
            <Text className="text-white text-xl font-bold">Others</Text>
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
              renderItem={({ item }) => (
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
