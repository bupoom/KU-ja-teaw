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
} from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

import { mockGuideDetails, mockFlights } from "@/mock/mockDataComplete";

import Feather from "@expo/vector-icons/Feather";
import Header from "@/components/Header";
import { FlightBox } from "@/components/FlightBox";
import ActivityPlaceEnd from "@/components/ActivityPlaceEnd";
import ActivityEventEnd from "@/components/ActivityEventEnd";
import CustomButton from "@/components/CustomButton";
import { truncateText } from "@/util/truncateText";
import { organizeActivitiesByDay } from "@/util/organizedActivityByDay";
import { formatDate } from "@/util/formatDate";
import { formatDateRange } from "@/util/formatDateRange";

interface DailyActivity {
  date: string;
  activities: (ActivityPlaceBox | ActivityEventBox)[];
}

export default function GuideDetail() {
  const router = useRouter();
  const { guide_id } = useLocalSearchParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [guideDetail, setGuideDetail] = useState<GuideDetails | null>(null);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [showFlights, setShowFlights] = useState<boolean>(true);
  const [dailyActivities, setDailyActivities] = useState<DailyActivity[]>([]);
  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>({});
  const [showDescriptionModal, setShowDescriptionModal] =
    useState<boolean>(false);

  const handleBackPress = () => {
    router.back();
  };

  const addBookmark = () => {
    console.log("Add to Guide Bookmark");
  };

  const copyGuide = () => {
    console.log("Copy Guide");
  };

  const toggleDescriptionModal = () => {
    setShowDescriptionModal(!showDescriptionModal);
  };

  const fetchGuidesDetails = async (): Promise<GuideDetails | null> => {
    try {
      const allGuide = mockGuideDetails;
      const guideDetail = allGuide.find((guide) => {
        return guide.id === parseInt(guide_id as string);
      });
      return guideDetail || null;
    } catch (error) {
      console.error("Error in fetchGuidesDetails:", error);
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

  const toggleFlights = () => {
    setShowFlights(!showFlights);
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

  const loadData = async () => {
    try {
      setLoading(true);
      const guideData = await fetchGuidesDetails();
      console.log(guideData);
      setGuideDetail(guideData);

      if (guideData && guideData.trip_id) {
        const [flightsData, activitiesData] = await Promise.all([
          fetchFlights(guideData.trip_id),
          organizeActivitiesByDay(guideData.trip_id),
        ]);
        setFlights(flightsData);
        setDailyActivities(activitiesData);

        const initialExpandedState: Record<string, boolean> = {};
        activitiesData.forEach((day, index) => {
          initialExpandedState[day.date] = index === 0;
        });
        setExpandedDays(initialExpandedState);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load guide details");
      console.error("Error loading guide details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(guide_id);
    if (guide_id) {
      loadData();
    }
  }, [guide_id]);

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

  if (!guideDetail) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <Header title="" onBackPress={handleBackPress} />
        <View className="flex-1 justify-center items-center">
          <Text>Guide not found</Text>
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
          paddingBottom: showDescriptionModal ? 0 : 50,
        }}
      >
        {/* Hero Image */}
        <Image
          source={{
            uri: guideDetail.guide_image,
          }}
          className="w-full h-64"
          resizeMode="cover"
        />

        {/* Content Section - Touchable */}
        <TouchableOpacity
          onPress={toggleDescriptionModal}
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
                    uri: guideDetail.owner_image,
                  }}
                  className="w-16 h-16 rounded-full"
                  resizeMode="cover"
                />
                <View className="flex-col justify-center ml-4">
                  <Text className="text-xl font-bold text-black">
                    {truncateText(guideDetail.title, 25)}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    Owner: {guideDetail.owner_name}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    Email: {guideDetail.owner_email}
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
                <Text className="text-gray-600 text-sm font-bold mb-2">
                  Trip Date:
                </Text>
                <Text className="text-gray-600 text-sm font-bold mb-2">
                  Group:
                </Text>
                <Text className="text-gray-600 text-sm font-bold mb-2">
                  Referenced:
                </Text>
              </View>
              <View className="flex-1 ml-2">
                <Text className="text-black text-sm font-medium mb-2">
                  {formatDateRange(
                    guideDetail.start_date,
                    guideDetail.end_date
                  )}
                </Text>
                <Text className="text-black text-sm font-medium mb-2">
                  {guideDetail.group_members} Persons
                </Text>
                <Text className="text-black text-sm font-medium mb-2">
                  {guideDetail.copies} times
                </Text>
              </View>
            </View>
          </View>

          {/* Total Cost Section */}
          <View className="border-t border-gray-200 pt-4">
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-bold text-black">Total Cost:</Text>
              <Text className="text-lg font-bold text-black">
                {(guideDetail.budget ?? 0).toLocaleString()} Baht
              </Text>
            </View>
          </View>

          {/* Tap indicator */}
          <View className="flex-row justify-center mt-3">
            <Text className="text-xs text-gray-400">
              Tap to view description
            </Text>
          </View>
        </TouchableOpacity>

        {/* Flight Section */}
        {flights.length > 0 && (
          <View className="bg-white p-6 m-6 border-gray_border border-2 rounded-xl">
            <TouchableOpacity
              onPress={toggleFlights}
              className="flex-row justify-between items-center mb-4"
            >
              <Text className="text-xl font-bold text-black">International Flight</Text>
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
                    <Feather name="sun" size={22} color="#666" />
                    <Text className="text-lg font-semibold text-black ml-2">
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
                      <View
                        key={`${activity.id}-${isActivityPlace(activity) ? "place" : "event"}`}
                        className="mb-3"
                      >
                        {isActivityPlace(activity) ? (
                          <ActivityPlaceEnd activity={activity} />
                        ) : (
                          <ActivityEventEnd activity={activity} />
                        )}
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        <CustomButton onPress={addBookmark} title="Add Guide Bookmark" />
      </ScrollView>

      {/* Description Modal - Fixed Structure */}
      <Modal
        visible={showDescriptionModal}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleDescriptionModal}
      >
        <View className="flex-1">
          {/* Full screen backdrop */}
          <TouchableOpacity
            className="absolute inset-0 bg-black/50"
            onPress={toggleDescriptionModal}
            activeOpacity={1}
          />

          {/* Modal content positioned at bottom */}
          <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6">
            {/* Modal Header */}
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold text-black">Description</Text>
              <TouchableOpacity onPress={toggleDescriptionModal}>
                  <Feather name="x" size={24} color="black" />
                </TouchableOpacity>
            </View>

            {/* Modal Content */}
            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="flex-row items-center mb-4">
                <Image
                  source={{ uri: guideDetail.owner_image }}
                  className="w-12 h-12 rounded-full mr-3"
                />
                <View>
                  <Text className="text-lg font-semibold text-black">
                    {guideDetail.title}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    by {guideDetail.owner_name}
                  </Text>
                </View>
              </View>

              <Text className="text-base text-gray-700 leading-6">
                {guideDetail.description ||
                  "No description available for this guide."}
              </Text>
            </ScrollView>

            {/* Modal Footer */}
            <View className="mt-6 pt-4 border-t border-gray-200">
              <TouchableOpacity
                onPress={toggleDescriptionModal}
                className="bg-green_2 py-3 px-6 rounded-lg"
              >
                <Text className="text-white text-center font-semibold">
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
