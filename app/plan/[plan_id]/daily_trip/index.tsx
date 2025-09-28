import { router, useLocalSearchParams } from "expo-router";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Animated,
  ScrollView,
  Image,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { RefreshControl } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import PlanHeader from "@/components/PlanHeader";
import DateSelector from "@/components/plan/DateSelector";
import WeatherIcon from "@/components/common/WeatherIcon";
import TransportationIcon from "@/components/common/TransportIcon";

import { extractDates } from "@/util/extractDates";
import { formatDate } from "@/util/formatFucntion/formatDate";
import { truncateText } from "@/util/truncateText";

import {
  mockActivityEventBoxes,
  mockActivityPlaceBoxes,
  mockActivityVoteEvents,
  mockActivityVotePlaces,
  mockTripDetails,
  mockTripMembers,
} from "@/mock/mockDataComplete";

interface Activity {
  activities:
    | ActivityPlaceBox
    | ActivityEventBox
    | ActivityVotePlace
    | ActivityVoteEvent;
}

const DailyTripsIndex = () => {
  const { plan_id } = useLocalSearchParams<{ plan_id: string }>();
  const user_id = 1;
  const [role, setRole] = useState<string>("viewer");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const trip = mockTripDetails.find(
      (trip) => trip.trip_id === parseInt(plan_id)
    );
    if (trip) {
      setDates(extractDates(trip.start_date, trip.end_date));

      const memberData = mockTripMembers.find(
        (member) =>
          member.trip_id === parseInt(plan_id) && member.id === user_id
      );
      setRole(memberData?.role ?? "viewer");
      fetchActivity(trip.start_date);
    }
  }, [plan_id]);

  // <---------------------------- Refresh -------------------------------->
  const onRefresh = () => {
    if (!selectDate) return; // กัน error ถ้ายังไม่เลือกวัน
    setRefreshing(true);

    // โหลดข้อมูลใหม่
    fetchActivity(selectDate);

    // ปิดสถานะ refreshing หลัง 1 วิ (กัน UI ค้าง)
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  // <---------------------------- Dates ---------------------------------->

  // get date durations
  const [dates, setDates] = useState<string[]>([]);
  const [selectDate, setSelectDate] = useState<string>("");

  const handleselectDate = (date: string) => {
    console.log(`Date : ${date}`);
    setSelectDate(date);
    setDailyActivities([]);
    fetchActivity(date);
    console.log(`Activity in (${date}): ${dailyActivities}`);
  };

  // <----------------------------- Check Activity Type ------------------------------->
  const isActivityPlace = (
    activity:
      | ActivityPlaceBox
      | ActivityEventBox
      | ActivityVotePlace
      | ActivityVoteEvent
  ): activity is ActivityPlaceBox => {
    return "location" in activity;
  };

  const isActivityEvent = (
    activity:
      | ActivityPlaceBox
      | ActivityEventBox
      | ActivityVotePlace
      | ActivityVoteEvent
  ): activity is ActivityEventBox => {
    return "transportation" in activity;
  };

  const isActivityVotePlace = (
    activity:
      | ActivityPlaceBox
      | ActivityEventBox
      | ActivityVotePlace
      | ActivityVoteEvent
  ): activity is ActivityVotePlace => {
    return "vote_type" in activity && activity.vote_type === "place";
  };

  const isActivityVoteEvent = (
    activity:
      | ActivityPlaceBox
      | ActivityEventBox
      | ActivityVotePlace
      | ActivityVoteEvent
  ): activity is ActivityVoteEvent => {
    return "vote_type" in activity && activity.vote_type === "event";
  };

  // <------------------------------------- Fetch Data ------------------------------------->

  const [dailyActivities, setDailyActivities] = useState<
    (
      | ActivityPlaceBox
      | ActivityEventBox
      | ActivityVotePlace
      | ActivityVoteEvent
    )[]
  >([]);

  const fetchActivity = (date: string) => {
    const tripId = parseInt(plan_id);

    // รวม filter ทีเดียว
    const allActivities = [
      ...mockActivityPlaceBoxes,
      ...mockActivityEventBoxes,
      ...mockActivityVotePlaces,
      ...mockActivityVoteEvents,
    ].filter(
      (activity) => activity.trip_id === tripId && activity.date === date
    );

    // ฟังก์ชัน parse เวลาแบบกันพลาด
    const parseTime = (time?: string): number => {
      if (!time) return Number.MAX_SAFE_INTEGER; // ถ้าไม่มีเวลา ให้ไปอยู่ท้าย
      const parts = time.split(":").map(Number);
      const [h, m, s] = [parts[0], parts[1] ?? 0, parts[2] ?? 0];
      return h * 3600 + m * 60 + s;
    };

    // sort ตามเวลา
    const sortedActivities = allActivities.sort(
      (a, b) => parseTime(a.time_begin) - parseTime(b.time_begin)
    );
    setDailyActivities(sortedActivities);
  };

  useEffect(() => {
    console.log("Updated dailyActivities:", dailyActivities);
  }, [dailyActivities]);

  // <------------------------------------ Notification --------------------------------------------->
  const [notifications, setNotifications] = useState<NotificationBox[]>([]);
  const [newNotifications, setNewNotifications] = useState(false);

  // <------------------------------------- Add and List Button ------------------------------------->

  //Animation State
  const [showSelectAdd, setShowSelectAdd] = useState(false);
  const [showSelectNotiMap, setShowSelectNotiMap] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false); // เพิ่ม state สำหรับเช็คสถานะของปุ่ม list
  const [isAddOpen, setIsAddOpen] = useState(false); // เพิ่ม state สำหรับเช็คสถานะของปุ่ม add
  const slideAnim = useRef(new Animated.Value(0)).current;
  const listSlideAnim = useRef(new Animated.Value(0)).current; // เพิ่ม animation สำหรับ list

  // <-------------------------------------- Render Item -------------------------------------------->

  // ปรับ signature
  const renderActivityPlace = (
    activity: ActivityPlaceBox,
    index: number,
    onPress: (activity_id: number) => void,
    onDelete: (activity_id: number) => void
  ) => {
    return (
      <TouchableOpacity
        key={`${activity.id}-${index}`}
        className="flex-row p-3 bg-white border border-gray_border rounded-lg mb-1"
        onPress={() => onPress(activity.id)}
        activeOpacity={0.7}
      >
        <Image
          source={{
            uri:
              activity.place_image ||
              "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
          }}
          className="w-20 h-20 rounded-lg"
          resizeMode="cover"
        />
        <View className="flex-1 ml-3">
          <Text className="text-base font-semibold text-black mb-1">
            {truncateText(activity.title, 50)}
          </Text>
          <View className="flex-row items-center mb-2">
            <Feather name="clock" size={14} color="#666" />
            <Text className="text-xs text-dark_gray ml-2 font-semibold">
              {activity.time_begin} - {activity.time_end}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Feather name="map-pin" size={14} color="#666" />
            <Text
              className="text-xs text-dark_gray ml-2 font-semibold"
              numberOfLines={1}
            >
              {activity.location}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          className="mr-4 items-center justify-center"
          onPress={() => onDelete(activity.id)}
        >
          <MaterialIcons name="delete-outline" size={26} color="black" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const renderActivityEvent = (
    activity: ActivityEventBox,
    index: number,
    onPress: (activity_id: number) => void,
    onDelete: (activity_id: number) => void
  ) => {
    return (
      <TouchableOpacity
        key={`${activity.id}-${index}`}
        className="flex-row items-center p-3 bg-white border border-gray_border rounded-lg mb-1"
        onPress={() => onPress(activity.id)}
      >
        <View className="w-12 h-12 bg-white items-center justify-center ml-4 ">
          <TransportationIcon transportation={activity.transportation} />
        </View>
        <View className="flex-1 ml-7">
          <Text className="text-base font-semibold text-black mb-1">
            {activity.title}
          </Text>
          <View className="flex-row items-center font-semibold">
            <Feather name="clock" size={14} color="#666" />
            <Text className="text-xs text-dark_gray ml-1 font-semibold">
              {activity.time_begin} - {activity.time_end}
            </Text>
            {activity.transportation && (
              <>
                <Text className="text-sm text-gray-400 mx-2 font-semibold">
                  •
                </Text>
                <Text className="text-xs text-dark_gray font-semibold">
                  {activity.transportation}
                </Text>
              </>
            )}
          </View>
        </View>
        <TouchableOpacity
          className="mr-4 items-center justify-center"
          onPress={() => onDelete(activity.id)}
        >
          <MaterialIcons name="delete-outline" size={26} color="black" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const renderActivityVotePlace = (
    activity: ActivityVotePlace,
    index: number,
    onPress: (activity_id: number) => void,
    onDelete: (activity_id: number) => void
  ) => {
    return (
      <TouchableOpacity
        key={`${activity.id}-${index}`}
        className="flex-row p-3 bg-white border border-gray_border rounded-lg mb-1"
        onPress={() => onPress(activity.id)}
        activeOpacity={0.7}
      >
        <View className="w-20 h-20 rounded-lg items-center justify-center">
          <MaterialIcons name="how-to-vote" size={30} color="#000000" />
        </View>
        <View className="flex-1 ml-3">
          <Text className="text-base font-semibold text-black mb-1">
            Not Decide
          </Text>
          <View className="flex-row items-center mb-2">
            <Feather name="clock" size={14} color="#666" />
            <Text className="text-xs text-dark_gray ml-2 font-semibold">
              {activity.time_begin} - {activity.time_end}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Feather name="map-pin" size={14} color="#666" />
            <Text
              className="text-xs text-dark_gray ml-2 font-semibold"
              numberOfLines={1}
            >
              Not Decide
            </Text>
          </View>
        </View>

        <TouchableOpacity
          className="mr-4 items-center justify-center"
          onPress={() => onDelete(activity.id)}
        >
          <MaterialIcons name="delete-outline" size={26} color="black" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const renderActivityVoteEvent = (
    activity: ActivityVoteEvent,
    index: number,
    onPress: (activity_id: number) => void,
    onDelete: (activity_id: number) => void
  ) => {
    return (
      <TouchableOpacity
        key={`${activity.id}-${index}`}
        className="flex-row items-center p-3 bg-white border border-gray_border rounded-lg mb-1"
        onPress={() => onPress(activity.id)}
      >
        <View className="w-12 h-12 bg-white items-center justify-center ml-4 ">
          <FontAwesome6
            name="person-circle-question"
            size={24}
            color="#000000"
          />
        </View>
        <View className="flex-1 ml-7">
          <Text className="text-base font-semibold text-black mb-1">
            {activity.title}
          </Text>
          <View className="flex-row items-center font-semibold">
            <Feather name="clock" size={14} color="#666" />
            <Text className="text-xs text-dark_gray ml-1 font-semibold">
              {activity.time_begin} - {activity.time_end}
            </Text>
            <Text className="text-sm text-gray-400 mx-2 font-semibold">•</Text>
            <Text className="text-xs text-dark_gray font-semibold">
              Not Decide
            </Text>
          </View>
        </View>
        <TouchableOpacity
          className="mr-4 items-center justify-center"
          onPress={() => onDelete(activity.id)}
        >
          <MaterialIcons name="delete-outline" size={26} color="black" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  // <-------------------------------------- Handle Function ---------------------------------------->
  const handleAddPress = () => {
    setIsAddOpen(true);
    setShowSelectAdd(true);
    Animated.spring(slideAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();

    const newNoti: NotificationBox = {
      id: notifications.length + 1,
      title: "New Activity Added",
      message: "You added a new activity to your trip.",
      created_at: new Date().toISOString(),
      trip_id: parseInt(plan_id),
    };
    setNotifications((prev) => [...prev, newNoti]);
    setNewNotifications(true); // ทำให้จุดแดงขึ้น

    console.log("Add Button clicked");
  };

  const closeAddPress = () => {
    setIsAddOpen(false);
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
    }).start();

    setTimeout(() => setShowSelectAdd(false), 100);
    console.log("Class Add Button clicked");
  };

  const handleListPress = () => {
    setIsListOpen(true);
    setShowSelectNotiMap(true); // เปิด container เลย
    Animated.spring(listSlideAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    console.log("List view clicked");
  };

  const handleCloseList = () => {
    setIsListOpen(false); // icon กลับทันที
    Animated.spring(listSlideAnim, {
      toValue: 0,
      useNativeDriver: true,
    }).start();

    // ปิด container เร็วขึ้น ไม่ต้องรอ animation
    setTimeout(() => setShowSelectNotiMap(false), 100);
    console.log("Close List view clicked");
  };

  const handleAddPlace = () => {
    console.log("Add Place clicked");
    closeAddPress();
    router.push(`/plan/${plan_id}/daily_trip/(modals)/add_place/select_time`);
  };

  const handleAddEvent = () => {
    console.log("Add Event clicked");
    closeAddPress();
    router.push(`/plan/${plan_id}/daily_trip/(modals)/add_event/select_time`);
  };

  const handleAddVote = () => {
    console.log("Add Vote clicked");
    closeAddPress();
    router.push(`/plan/${plan_id}/daily_trip/(modals)/add_vote/select_type`);
  };

  const handleMapPress = () => {
    console.log("Map view clicked");
    handleCloseList();
    router.push(`/plan/${plan_id}/daily_trip/map`);
  };

  const handleNotificationPress = () => {
    console.log("Notification view clicked");
    handleCloseList();
    setNewNotifications(false); // reset dot เมื่อกด
    router.push(`/plan/${plan_id}/daily_trip/notification`);
  };

  // <----------------------- Function Activity -------------------------------->

  const handleActivityPlace = (activityId: number) => {
    console.log(`Go to Activity Details`);
    console.log(`activity_id: ${activityId}`);
    router.push(`/plan/${plan_id}/daily_trip/placeDetails/${activityId}`);
  };

  const handleActivityEvent = (activityId: number) => {
    console.log(`Go to Activity Details`);
    router.push(`/plan/${plan_id}/daily_trip/eventDetails/${activityId}`);
  };

  const handleActivityVotePlace = () => {
    console.log(`Go to Activity Details`);
  };

  const handleActivityVoteEvent = () => {
    console.log(`Go to Activity Details`);
  };

  const handleDeleteActivity = (activityId: number) => {
    setDailyActivities((prev) =>
      prev.filter((activity) => activity.id !== activityId)
    );

    // ถ้าอยาก log ดูว่าเหลืออะไรบ้าง
    console.log(
      "After delete:",
      dailyActivities.filter((a) => a.id !== activityId)
    );
  };

  // <---------------------------- Animation ----------------------------->

  // Animation for Add Button
  const optionTranslateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [150, 0],
  }); // Slide up effect ของ 3 ปุ่ม Add

  const buttonRotation = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  }); // Rotate effect ของปุ่ม Add จาก + เป็น x

  // <----------------------------------------------------------------------------------------------->

  return (
    <SafeAreaView className="flex-1 bg-white">
      <PlanHeader planId={plan_id} />
      <DateSelector dates={dates} onDateSelect={handleselectDate} />

      <View className="flex-row justify-between items-center mx-4 my-2 p-4 rounded-lg border border-gray_border">
        <Text className="text-black font-bold text-xl">
          {formatDate(selectDate)}
        </Text>
        <WeatherIcon trip_id={parseInt(plan_id)} date={selectDate} size={30} />
      </View>

      <ScrollView
        className="flex-1 p-4"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={
          dailyActivities.length === 0
            ? { flex: 1, justifyContent: "center", alignItems: "center" }
            : { paddingBottom: 100 }
        }
      >
        {dailyActivities.length === 0 ? (
          <Text className="text-gray-500 text-base font-medium justify-center flex-1">
            No Activities Today
          </Text>
        ) : (
          dailyActivities.map((activity, index) => (
            <View key={`${activity.id}-${index}`} className="mb-2">
              {isActivityPlace(activity) &&
                renderActivityPlace(
                  activity,
                  index,
                  handleActivityPlace,
                  handleDeleteActivity
                )}
              {isActivityEvent(activity) &&
                renderActivityEvent(
                  activity,
                  index,
                  handleActivityEvent,
                  handleDeleteActivity
                )}
              {isActivityVotePlace(activity) &&
                renderActivityVotePlace(
                  activity,
                  index,
                  handleActivityVotePlace,
                  handleDeleteActivity
                )}
              {isActivityVoteEvent(activity) &&
                renderActivityVoteEvent(
                  activity,
                  index,
                  handleActivityVoteEvent,
                  handleDeleteActivity
                )}
            </View>
          ))
        )}
      </ScrollView>

      {/* <---------------------------Add and List Button -----------------------------> */}
      {/* Add Button */}
      <TouchableOpacity
        className="absolute bottom-12 right-10 w-16 h-16 rounded-full bg-green_2 justify-center items-center"
        onPress={handleAddPress}
        activeOpacity={0.8}
      >
        <Animated.View
          style={{
            transform: [{ rotate: buttonRotation }],
          }}
        >
          <Ionicons name="add" size={28} color="white" />
        </Animated.View>
      </TouchableOpacity>

      {/* List Button */}
      <TouchableOpacity
        className="absolute bottom-12 left-10 w-16 h-16 rounded-full bg-white justify-center items-center border border-gray_border"
        onPress={isListOpen ? handleCloseList : handleListPress}
        activeOpacity={0.8}
      >
        {isListOpen ? (
          <AntDesign name="close" size={24} color="black" />
        ) : (
          <View>
            <Feather name="list" size={24} color="black" />
            {newNotifications && (
              <View className="absolute top-0 right-0 w-2 h-2 bg-super_red rounded-full" />
            )}
          </View>
        )}
      </TouchableOpacity>

      {/* Show Options Add*/}
      {showSelectAdd && (
        <View className="absolute inset-0 bg-black/0">
          <TouchableOpacity
            className="flex-1"
            onPress={closeAddPress}
            activeOpacity={1}
          >
            <View className="absolute bottom-28 right-4">
              <Animated.View
                style={{
                  transform: [{ translateY: optionTranslateY }],
                }}
              >
                {/* Add Place Option */}
                <Animated.View
                  style={{
                    transform: [
                      {
                        translateY: slideAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [20, 0],
                        }),
                      },
                    ],
                    opacity: slideAnim,
                  }}
                >
                  <TouchableOpacity
                    className="flex-row items-center justify-end w-48 py-3 px-4 mb-3 bg-white rounded-lg shadow-lg border border-gray-200"
                    onPress={handleAddPlace}
                  >
                    <Text className="text-base mr-3 text-gray-800 font-medium">
                      Add Place
                    </Text>
                    <Ionicons name="location" size={24} color="#284D44" />
                  </TouchableOpacity>
                </Animated.View>

                {/* Add Event Option */}
                <Animated.View
                  style={{
                    transform: [
                      {
                        translateY: slideAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [40, 0],
                        }),
                      },
                    ],
                    opacity: slideAnim,
                  }}
                >
                  <TouchableOpacity
                    className="flex-row items-center justify-end w-48 py-3 px-4 mb-3 bg-white rounded-lg shadow-lg border border-gray-200"
                    onPress={handleAddEvent}
                  >
                    <Text className="text-base mr-3 text-gray-800 font-medium">
                      Add Event
                    </Text>
                    <MaterialIcons
                      name="emoji-transportation"
                      size={24}
                      color="#284D44"
                    />
                  </TouchableOpacity>
                </Animated.View>

                {/* Add Vote Option */}
                <Animated.View
                  style={{
                    transform: [
                      {
                        translateY: slideAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [60, 0],
                        }),
                      },
                    ],
                    opacity: slideAnim,
                  }}
                >
                  <TouchableOpacity
                    className="flex-row items-center justify-end w-48 py-3 px-4 mb-3 bg-white rounded-lg shadow-lg border border-gray-200"
                    onPress={handleAddVote}
                  >
                    <Text className="text-base mr-3 text-gray-800 font-medium">
                      Add Vote
                    </Text>
                    <MaterialIcons
                      name="how-to-vote"
                      size={24}
                      color="#284D44"
                    />
                  </TouchableOpacity>
                </Animated.View>
              </Animated.View>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {/* Show Options List */}
      {showSelectNotiMap && (
        <View className="absolute inset-0 bg-white/0">
          <TouchableOpacity className="flex-1" activeOpacity={1}>
            <View className="absolute bottom-12 left-10 flex-col items-center justify-center gap-2">
              {/* Notification Button */}
              <Animated.View
                style={{
                  transform: [
                    {
                      translateY: listSlideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [160, 0],
                      }),
                    },
                  ],
                  opacity: listSlideAnim,
                }}
              >
                <TouchableOpacity
                  className="w-16 h-16 bg-white rounded-full border border-gray_border items-center justify-center"
                  onPress={() => {
                    handleNotificationPress();
                    setNewNotifications(false); // reset noti เมื่อกด
                  }}
                >
                  <View>
                    <Ionicons
                      name="notifications-outline"
                      size={24}
                      color="black"
                    />
                    {newNotifications && (
                      <View className="absolute top-0 right-0 w-2 h-2 bg-super_red rounded-full" />
                    )}
                  </View>
                </TouchableOpacity>
              </Animated.View>

              {/* Map Button - เด้งจากด้านล่างขึ้นมา */}
              <Animated.View
                style={{
                  transform: [
                    {
                      translateY: listSlideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [80, 0], // เริ่มต่ำกว่าเดิม 80px แล้วเลื่อนขึ้นมา
                      }),
                    },
                  ],
                  opacity: listSlideAnim,
                }}
              >
                <TouchableOpacity
                  className="w-16 h-16 bg-white rounded-full border border-gray_border items-center justify-center"
                  onPress={handleMapPress}
                >
                  <Feather name="map" size={24} color="black" />
                </TouchableOpacity>
              </Animated.View>

              {/* Close Button - ยังคงอยู่ที่เดิม */}
              <TouchableOpacity
                className="w-16 h-16 bg-white rounded-full border border-gray_border items-center justify-center"
                onPress={handleCloseList}
              >
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default DailyTripsIndex;
