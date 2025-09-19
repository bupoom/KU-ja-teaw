import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

import {
  mockTripDetails,
  mockFlights,
  mockTripMembers,
  mockNotes,
} from "@/mock/mockDataComplete";

import Feather from "@expo/vector-icons/Feather";
import Header from "@/components/Header";
import { FlightBox } from "@/components/FlightBox";
import ActivityPlaceEnd from "@/components/ActivityPlaceEnd";
import ActivityEventEnd from "@/components/ActivityEventEnd";
import CustomButton from "@/components/CustomButton";
import MemberBoxEnd from "@/components/MemberBoxEnd";
import WeatherIcon from "@/components/WeatherIcon";

import { truncateText } from "@/util/truncateText";
import { organizeActivitiesByDay } from "@/util/organizedActivityByDay";
import { formatDate } from "@/util/formatDate";
import { formatDateRange } from "@/util/formatDateRange";
import { formatDateTimeNote } from "@/util/formatDateTimeNote";

interface DailyActivity {
  date: string;
  activities: (ActivityPlaceBox | ActivityEventBox)[];
}

export default function TripDetail() {
  const router = useRouter();
  const { trip_id } = useLocalSearchParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [tripDetail, setTripDetail] = useState<TripDetails | null>(null);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [showFlights, setShowFlights] = useState<boolean>(true);
  const [dailyActivities, setDailyActivities] = useState<DailyActivity[]>([]);
  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>({});
  const [tripMembers, setTripMembers] = useState<TripMember[]>([]);
  const [showMembers, setShowMembers] = useState<boolean>(true);

  // Modal states
  const [showOverviewModal, setShowOverviewModal] = useState<boolean>(false);
  const [showActivityModal, setShowActivityModal] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);

  // Notes and activity data
  const [overviewNotes, setOverviewNotes] = useState<Note[]>([]);
  const [activityNotes, setActivityNotes] = useState<Note[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    ActivityPlaceBox | ActivityEventBox | null
  >(null);
  const [shareDescription, setShareDescription] = useState<string>("");

  const handleBackPress = () => {
    router.back();
  };

  const copyGuide = () => {
    console.log("Copy Guide");
  };

  const parsedTripId = Array.isArray(trip_id)
    ? parseInt(trip_id[0], 10) // ถ้าเป็น array เอา index แรก 10 บอกเลขฐาน
    : parseInt(trip_id ?? "0", 10);

  const fetchTripsDetails = async (): Promise<TripDetails | null> => {
    try {
      const allTrip = mockTripDetails;
      const tripDetail = allTrip.find((trip) => {
        return trip.trip_id === parseInt(trip_id as string);
      });
      return tripDetail || null;
    } catch (error) {
      console.error("Error in fetchTripsDetails:", error);
      return null;
    }
  };

  const fetchFlights = async (trip_id: number): Promise<Flight[]> => {
    try {
      const relatedFlights = mockFlights.filter(
        (flight) => flight.trip_id === trip_id
      );
      return relatedFlights;
    } catch (error) {
      console.error("Error in fetchFlights:", error);
      return [];
    }
  };

  const fetchTripMembers = async (trip_id: number): Promise<TripMember[]> => {
    try {
      const relatedMembers = mockTripMembers.filter(
        (member) => member.trip_id === trip_id
      );
      return relatedMembers;
    } catch (error) {
      console.error("Error in fetchTripMembers:", error);
      return [];
    }
  };

  const fetchOverviewNotes = async (trip_id: number): Promise<Note[]> => {
    try {
      const overviewNotes = mockNotes.filter(
        (note) => note.trip_id === trip_id && note.reference_type === "overview"
      );

      // Sort by owner first, then by created_at
      return overviewNotes.sort((a, b) => {
        // Find if user is owner
        const memberA = tripMembers.find((m) => m.id === a.refer_user_id);
        const memberB = tripMembers.find((m) => m.id === b.refer_user_id);

        const isOwnerA = memberA?.role === "owner";
        const isOwnerB = memberB?.role === "owner";

        if (isOwnerA && !isOwnerB) return -1;
        if (!isOwnerA && isOwnerB) return 1;

        // If both are owners or both are not owners, sort by date
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      });
    } catch (error) {
      console.error("Error in fetchOverviewNotes:", error);
      return [];
    }
  };

  const fetchActivityNotes = async (
    trip_id: number,
    reference_id: number,
    reference_type: "place" | "event"
  ): Promise<Note[]> => {
    try {
      const activityNotes = mockNotes.filter(
        (note) =>
          note.trip_id === trip_id &&
          note.reference_id === reference_id &&
          note.reference_type === reference_type
      );

      // Sort by owner first, then by created_at
      return activityNotes.sort((a, b) => {
        const memberA = tripMembers.find((m) => m.id === a.refer_user_id);
        const memberB = tripMembers.find((m) => m.id === b.refer_user_id);

        const isOwnerA = memberA?.role === "owner";
        const isOwnerB = memberB?.role === "owner";

        if (isOwnerA && !isOwnerB) return -1;
        if (!isOwnerA && isOwnerB) return 1;

        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      });
    } catch (error) {
      console.error("Error in fetchActivityNotes:", error);
      return [];
    }
  };

  const toggleFlights = () => {
    setShowFlights(!showFlights);
  };

  const toggleMembers = () => {
    setShowMembers(!showMembers);
  };

  const toggleDay = (date: string) => {
    setExpandedDays((prev) => ({
      ...prev,
      [date]: !prev[date],
    }));
  };

  const isActivityPlace = (
    activity: ActivityPlaceBox | ActivityEventBox
  ): activity is ActivityPlaceBox => {
    return "location" in activity;
  };

  const handleOverviewModal = async () => {
    if (tripDetail) {
      const notes = await fetchOverviewNotes(tripDetail.trip_id);
      setOverviewNotes(notes);
      setShowOverviewModal(true);
    }
  };

  const handleActivityModal = async (
    activity: ActivityPlaceBox | ActivityEventBox
  ) => {
    setSelectedActivity(activity);
    const referenceType = isActivityPlace(activity) ? "place" : "event";
    const notes = await fetchActivityNotes(
      activity.trip_id,
      activity.id,
      referenceType
    );
    setActivityNotes(notes);
    setShowActivityModal(true);
  };

  const handleShareModal = () => {
    setShowShareModal(true);
  };

  const handleShareConfirm = () => {
    console.log("Share trip with description:", shareDescription);
    setShowShareModal(false);
    setShareDescription("");
    // Here you would make API call to share the trip
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const tripData = await fetchTripsDetails();
      console.log(tripData);
      setTripDetail(tripData);

      if (tripData && tripData.trip_id) {
        const [flightsData, activitiesData, membersData] = await Promise.all([
          fetchFlights(tripData.trip_id),
          organizeActivitiesByDay(tripData.trip_id),
          fetchTripMembers(tripData.trip_id),
        ]);
        setFlights(flightsData);
        setDailyActivities(activitiesData);
        setTripMembers(membersData);

        const initialExpandedState: Record<string, boolean> = {};
        activitiesData.forEach((day, index) => {
          initialExpandedState[day.date] = index === 0;
        });
        setExpandedDays(initialExpandedState);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load trip details");
      console.error("Error loading trip details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(trip_id);
    if (trip_id) {
      loadData();
    }
  }, [trip_id]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <Header title="" onBackPress={handleBackPress} />
        <View className="flex-1 justify-center items-center">
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!tripDetail) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <Header title="" onBackPress={handleBackPress} />
        <View className="flex-1 justify-center items-center">
          <Text>Trip not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Header title="" onBackPress={handleBackPress} />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      >
        {/* Hero Image */}
        <Image
          source={{
            uri: tripDetail.trip_image,
          }}
          className="w-full h-64"
          resizeMode="cover"
        />

        {/* Content Section - Touchable */}
        <TouchableOpacity
          onPress={handleOverviewModal}
          className="bg-white p-6 m-4 border-gray_border border-2 rounded-xl"
          activeOpacity={0.7}
        >
          {/* Title Section */}
          <View className="flex-row items-start justify-between mb-4">
            <View className="flex-1 mr-4">
              {/* Author Info */}
              <View className="flex-row items-center mb-1">
                <Image
                  source={{
                    uri: tripDetail.owner_image,
                  }}
                  className="w-16 h-16 rounded-full"
                  resizeMode="cover"
                />
                <View className="flex-col justify-center ml-4">
                  <Text className="text-xl font-bold text-black">
                    {truncateText(tripDetail.trip_name, 25)}
                  </Text>
                  <Text className="text-sm text-gray-500 font-medium">
                    Owner: {tripDetail.owner_name}
                  </Text>
                  <Text className="text-sm text-gray-500 font-medium">
                    Email: {tripDetail.owner_email}
                  </Text>
                </View>
              </View>
            </View>

            {/* Copy/Share Icon */}
            <TouchableOpacity
              className="w-8 h-8 items-center justify-center"
              style={{ alignSelf: "flex-start" }}
              onPress={(e) => {
                e.stopPropagation();
                copyGuide();
              }}
            >
              <Feather name="copy" size={16} color="black" />
            </TouchableOpacity>
          </View>

          {/* Trip Details */}
          <View className="mb-4">
            <View className="flex-row">
              <View>
                <Text className="text-gray-600 text-sm font-medium mb-2">
                  Trip Date:
                </Text>
                <Text className="text-gray-600 text-sm font-medium mb-2">
                  Group:
                </Text>
                <Text className="text-gray-600 text-sm font-medium mb-2">
                  Referenced:
                </Text>
              </View>
              <View className="flex-1 ml-2">
                <Text className="text-black text-sm font-medium mb-2">
                  {formatDateRange(tripDetail.start_date, tripDetail.end_date)}
                </Text>
                <Text className="text-black text-sm font-medium mb-2">
                  {tripDetail.group_members} Persons
                </Text>
                <Text className="text-black text-sm font-medium mb-2">
                  {tripDetail.copies || 0} times
                </Text>
              </View>
            </View>
          </View>

          {/* Total Cost Section */}
          <View className="border-t border-gray-200 pt-4">
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-bold text-black">Total Cost:</Text>
              <Text className="text-lg font-bold text-black">
                {(tripDetail.budget ?? 0).toLocaleString()} Baht
              </Text>
            </View>
          </View>

          {/* Tap indicator */}
          <View className="flex-row justify-center mt-3">
            <Text className="text-xs text-gray-400">Tap to view overview</Text>
          </View>
        </TouchableOpacity>

        {/* Members Section */}
        {tripMembers.length > 0 && (
          <View className="bg-white p-6 m-4 border-gray_border border-2 rounded-xl">
            <TouchableOpacity
              onPress={toggleMembers}
              className="flex-row justify-between items-center mb-4"
            >
              <Text className="text-xl font-bold text-black">Member</Text>
              <Feather
                name={showMembers ? "chevron-up" : "chevron-down"}
                size={20}
                color="black"
              />
            </TouchableOpacity>

            {showMembers && (
              <View>
                {tripMembers.map((member) => (
                  <MemberBoxEnd
                    key={member.id}
                    user_image={member.user_image}
                    user_name={member.name}
                    role={member.role}
                    email={member.email}
                    phone={member.phone}
                  />
                ))}
              </View>
            )}
          </View>
        )}

        {/* Flight Section */}
        {flights.length > 0 && (
          <View className="bg-white p-6 m-4 border-gray_border border-2 rounded-xl">
            <TouchableOpacity
              onPress={toggleFlights}
              className="flex-row justify-between items-center mb-6"
            >
              <Text className="text-xl font-bold text-black">
                International Flight
              </Text>
              <Feather
                name={showFlights ? "chevron-up" : "chevron-down"}
                size={20}
                color="black"
              />
            </TouchableOpacity>

            {showFlights && (
              <View>
                {flights.map((flight) => (
                  <FlightBox
                    key={flight.id}
                    id={flight.id}
                    departure_airport={flight.departure_airport}
                    arrival_airport={flight.arrival_airport}
                    departure_date={flight.departure_date}
                    arrival_date={flight.arrival_date}
                    airline={flight.airline}
                    departure_country={flight.departure_country}
                    arrival_country={flight.arrival_country}
                    trip_id={flight.trip_id}
                  />
                ))}
              </View>
            )}
          </View>
        )}

        {/* Travel Place Section */}
        {dailyActivities.length > 0 && (
          <View className="bg-white p-6 m-4 border-gray_border border-2 rounded-xl">
            <Text className="text-xl font-bold text-black mb-4">
              Travel Place
            </Text>

            {dailyActivities.map((day) => (
              <View key={day.date} className="mb-4">
                <TouchableOpacity
                  onPress={() => toggleDay(day.date)}
                  className="flex-row justify-between items-center mb-3 p-3 bg-gray-50 rounded-xl"
                >
                  <View className="flex-row items-center">
                    <WeatherIcon trip_id={parsedTripId} date={day.date} />
                    <Text className="text-lg font-semibold text-black ml-3">
                      {formatDate(day.date)}
                    </Text>
                  </View>
                  <Feather
                    name={
                      expandedDays[day.date] ? "chevron-up" : "chevron-down"
                    }
                    size={20}
                    color="black"
                  />
                </TouchableOpacity>

                {expandedDays[day.date] && (
                  <View>
                    {day.activities.map((activity) => (
                      <TouchableOpacity
                        key={`${activity.id}-${isActivityPlace(activity) ? "place" : "event"}`}
                        className="mb-3"
                        onPress={() => handleActivityModal(activity)}
                      >
                        {isActivityPlace(activity) ? (
                          <ActivityPlaceEnd activity={activity} />
                        ) : (
                          <ActivityEventEnd activity={activity} />
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        <CustomButton onPress={handleShareModal} title="Shared Trip" isShared />
      </ScrollView>

      {/* Overview Modal */}
      <Modal
        visible={showOverviewModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowOverviewModal(false)}
      >
        <View className="flex-1">
          <TouchableOpacity
            className="absolute inset-0 bg-black/50"
            onPress={() => setShowOverviewModal(false)}
            activeOpacity={1}
          />

          <View className="flex-1 justify-end">
            <View className="bg-white rounded-t-3xl p-6 max-h-4/5">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-xl font-bold text-black">Overview</Text>
                <TouchableOpacity onPress={() => setShowOverviewModal(false)}>
                  <Feather name="x" size={24} color="black" />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                {overviewNotes.map((note) => (
                  <View
                    key={note.id}
                    className="flex-row p-3 mb-3 bg-gray-50 rounded-lg"
                  >
                    <Image
                      source={{ uri: note.user_profile }}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <View className="flex-1">
                      <Text className="text-sm font-semibold text-black mb-1">
                        {note.user_name}
                      </Text>
                      <Text className="text-sm text-gray-700 mb-2">
                        {note.note_text}
                      </Text>
                      <Text className="text-xs text-gray-500">
                        {formatDateTimeNote(note.created_at)}
                      </Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
              <View className="mt-6 pt-4 border-t border-gray-200">
                <TouchableOpacity
                  onPress={() => setShowOverviewModal(false)}
                  className="bg-green_2 py-3 px-6 rounded-lg"
                >
                  <Text className="text-white text-center font-semibold">
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Activity Modal */}
      <Modal
        visible={showActivityModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowActivityModal(false)
        }
      >
        <View className="flex-1">
          <TouchableOpacity
            className="absolute inset-0 bg-black/50"
            onPress={() => setShowActivityModal(false)}
            activeOpacity={1}
          />

          <View className="flex-1 justify-end">
            <View className="bg-white rounded-t-3xl p-6 max-h-4/5">
              <View className="flex-row justify-start items-center mb-4 ml-4">
                <WeatherIcon
                  trip_id={selectedActivity?.trip_id ?? 0}
                  date={selectedActivity?.date ?? ""}
                />

                <Text className="text-xl font-medium text-black ml-4">
                  {truncateText((selectedActivity
                    ? `${formatDate(selectedActivity.date)}: ${truncateText(selectedActivity.title)}`
                    : "Activity Notes"), 30)}
                </Text>
                <TouchableOpacity
                  onPress={() => setShowActivityModal(false)}
                  className="flex-1 items-end"
                >
                  <Feather name="x" size={24} color="black" />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                {activityNotes.length > 0 ? (
                  activityNotes.map((note) => (
                    <View
                      key={note.id}
                      className="flex-row p-3 mb-3 bg-gray-50 rounded-lg"
                    >
                      <Image
                        source={{ uri: note.user_profile }}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <View className="flex-1">
                        <Text className="text-sm font-semibold text-black mb-1">
                          {note.user_name}
                        </Text>
                        <Text className="text-sm text-gray-700 mb-2">
                          {note.note_text}
                        </Text>
                        <Text className="text-xs text-gray-500">
                          {formatDateTimeNote(note.created_at)}
                        </Text>
                      </View>
                    </View>
                  ))
                ) : (
                  <View className="items-center py-8">
                    <Text className="text-gray-500">
                      No notes for this activity yet
                    </Text>
                  </View>
                )}
              </ScrollView>
              <View className="mt-6 pt-4 border-t border-gray-200">
                <TouchableOpacity
                  onPress={() => setShowActivityModal(false)}
                  className="bg-green_2 py-3 px-6 rounded-lg"
                >
                  <Text className="text-white text-center font-semibold">
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Share Modal */}
      <Modal
        visible={showShareModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowShareModal(false)}
      >
        <View className="flex-1">
          <TouchableOpacity
            className="absolute inset-0 bg-black/50"
            onPress={() => setShowShareModal(false)}
            activeOpacity={1}
          />

          <View className="flex-1 justify-center items-center p-6">
            <View className="bg-white rounded-2xl p-6 w-full max-w-sm">
              <Text className="text-xl font-bold text-black mb-4 text-center">
                Shared Trip
              </Text>

              <View className="mb-4">
                <Text className="text-sm text-gray-600 mb-2">
                  Input Descriptions
                </Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-3 text-sm"
                  placeholder="Enter description for sharing..."
                  multiline
                  numberOfLines={4}
                  value={shareDescription}
                  onChangeText={setShareDescription}
                  textAlignVertical="top"
                />
              </View>

              <Text className="text-xs text-gray-500 mb-6 text-center">
                This trip is shared with others{"\n"}
                Excluding notes and member information
              </Text>

              <View className="flex-row justify-between">
                <TouchableOpacity
                  onPress={() => setShowShareModal(false)}
                  className="flex-1 mr-2 py-3 px-4 bg-gray-200 rounded-lg"
                >
                  <Text className="text-center font-semibold text-gray-700">
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleShareConfirm}
                  className="flex-1 ml-2 py-3 px-4 bg-blue_button rounded-lg"
                >
                  <Text className="text-center font-semibold text-white">
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
