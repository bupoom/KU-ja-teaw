import PlanHeader from "@/components/PlanHeader";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const DailyTripsIndex = () => {
  const { plan_id } = useLocalSearchParams<{ plan_id: string }>();
  const [showSelectAdd, setShowSelectAdd] = useState(false);
  const [showSelectNotiMap, setShowSelectNotiMap] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false); // เพิ่ม state สำหรับเช็คสถานะของปุ่ม list
  const slideAnim = useRef(new Animated.Value(0)).current;
  const listSlideAnim = useRef(new Animated.Value(0)).current; // เพิ่ม animation สำหรับ list

  const handleAddPress = () => {
    setShowSelectAdd(true);
    Animated.spring(slideAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  };

  const closeModal = () => {
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start(() => {
      setShowSelectAdd(false);
    });
  };

  const handleAddPlace = () => {
    console.log("Add Place clicked");
    closeModal();
    router.push(`/plan/${plan_id}/daily_trip/(modals)/add_place/select_time`);
  };

  const handleAddEvent = () => {
    console.log("Add Event clicked");
    closeModal();
    router.push(`/plan/${plan_id}/daily_trip/(modals)/add_event/select_time`);
  };

  const handleAddVote = () => {
    console.log("Add Vote clicked");
    closeModal();
    router.push(`/plan/${plan_id}/daily_trip/(modals)/add_vote/select_type_vote`);
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
    
    console.log("Close List view clicked");
    // ปิด container เร็วขึ้น ไม่ต้องรอ animation
    setTimeout(() => setShowSelectNotiMap(false), 100);
  };

  const handleMapPress = () => {
    console.log("Map view clicked");
    handleCloseList();
    router.push(`/plan/${plan_id}/daily_trip/map`);
  };

  const handleNotificationPress = () => {
    console.log("Notification view clicked");
    handleCloseList();
    router.push(`/plan/${plan_id}/daily_trip/notification`);
  };

  // Animation for Add Button
  const optionTranslateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [200, 0],
  }); // Slide up effect ของ 3 ปุ่ม Add

  const buttonRotation = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  }); // Rotate effect ของปุ่ม Add จาก + เป็น x

  return (
    <SafeAreaView className="flex-1">
      <PlanHeader planId={plan_id} />
      <Text>Daily Trip</Text>

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
          <Feather name="list" size={24} color="black" />
        )}
      </TouchableOpacity>

      {/* Show Options Add*/}
      {showSelectAdd && (
        <View className="absolute inset-0 bg-black/20">
          <TouchableOpacity
            className="flex-1"
            onPress={closeModal}
            activeOpacity={1}
          >
            <View className="absolute bottom-28 right-4">
              <Animated.View
                style={{
                  transform: [{ translateY: optionTranslateY }],
                }}
              >
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
                    className="flex-row items-center justify-end w-48 py-3 px-4 mb-4 bg-white rounded-lg shadow-lg border border-gray-200"
                    onPress={handleAddPlace}
                  >
                    <Text className="text-base mr-3 text-gray-800 font-medium">
                      Add Place
                    </Text>
                    <Ionicons name="location" size={24} color="#284D44" />
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
            <View className="absolute bottom-12 left-10 flex-row items-center gap-2">
              {/* Close Button - ยังคงอยู่ที่เดิม */}
              <TouchableOpacity
                className="w-16 h-16 bg-white rounded-full border border-gray_border items-center justify-center"
                onPress={handleCloseList}
              >
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>

              {/* Map Button - เลื่อนออกมาทางขวา */}
              <Animated.View
                style={{
                  transform: [
                    {
                      translateX: listSlideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-80, 0], // เลื่อนจากซ้ายมาขวา
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

              {/* Notification Button - เลื่อนออกมาทางขวา ช้ากว่า Map */}
              <Animated.View
                style={{
                  transform: [
                    {
                      translateX: listSlideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-160, 0], // เลื่อนจากซ้ายมาขวา ระยะไกลกว่า
                      }),
                    },
                  ],
                  opacity: listSlideAnim,
                }}
              >
                <TouchableOpacity
                  className="w-16 h-16 bg-white rounded-full border border-gray_border items-center justify-center"
                  onPress={handleNotificationPress}
                >
                  <Ionicons
                    name="notifications-outline"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </Animated.View>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default DailyTripsIndex;
