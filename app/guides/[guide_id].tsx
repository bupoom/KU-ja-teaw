import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Header from "@/components/Header";
import { mockTripGuideDetails } from "@/mock/mockDataComplete";
import { useState, useEffect } from "react";
import Feather from "@expo/vector-icons/Feather";

interface Trip_Guide_Details {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
  guide_image: string;
  copies: number;
  owner_name: string;
  owner_image: string;
  owner_comments: string;
  owner_email: string;
  group_members: number;
  budget: number;
  trip_id: number;
  note?: Note[];
}

export default function GuideDetail() {
  const router = useRouter();
  const { guide_id } = useLocalSearchParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [guideDetail, setGuideDetail] = useState<Trip_Guide_Details | null>(
    null
  );

  const handleBackPress = () => {
    router.back();
  };

  // แก้ไข function ให้ return object เดียว
  const fetchGuidesDetails = async (): Promise<Trip_Guide_Details | null> => {
    try {
      const allGuide = mockTripGuideDetails;
      const guideDetail = allGuide.find((guide) => {
        return guide.id === parseInt(guide_id as string);
      });
      console.log(guideDetail);
      return guideDetail || null;
    } catch (error) {
      console.error("Error in fetchGuidesDetails:", error);
      return null;
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const guideData = await fetchGuidesDetails();
      console.log(guideData);
      setGuideDetail(guideData);
    } catch (error) {
      Alert.alert("Error", "Failed to load guide details");
      console.error("Error loading guide details:", error);
    } finally {
      setLoading(false);
    }
  };

  // เพิ่ม useEffect เพื่อโหลดข้อมูลเมื่อ component mount
  useEffect(() => {
    console.log(guide_id);
    if (guide_id) {
      loadData();
    }
  }, [guide_id]);

  // เพิ่มการจัดการ loading และ error states
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

      <ScrollView className="flex-1">
        {/* Header */}
        <Header title="" onBackPress={handleBackPress} />

        {/* Hero Image */}
        <Image
          source={{
            uri: guideDetail.guide_image,
          }}
          className="w-full h-64"
          resizeMode="cover"
        />

        {/* Content Section */}
        <View className="bg-white p-6 m-4 border-gray_border border-2 rounded-xl">
          {/* Title Section */}
          <View className="flex-row items-start justify-between mb-6">
            <View className="flex-1 mr-4">
              {/* Author Info */}
              <View className="flex-row items-center mb-1">
                <Image
                  source={{
                    uri: guideDetail.owner_image,
                  }}
                  className="w-12 h-12 rounded-full"
                  resizeMode="cover"
                />
                <View className="flex-col justify-center ml-4">
                  <Text className="text-xl font-bold text-black">
                    {guideDetail.title}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    Author: {guideDetail.owner_name}
                  </Text>
                  <Text className="text-xs text-gray-500">
                    Email: {guideDetail.owner_email}
                  </Text>
                </View>
              </View>
            </View>

            {/* Copy/Share Icon */}
            <TouchableOpacity className="w-8 h-8 border border-gray-300 rounded-lg items-center justify-center">
              <Feather name="copy" size={14} color="black" />
            </TouchableOpacity>
          </View>

          {/* Trip Details */}
          <View className="mb-6">
            <View className="flex-row">
              <View className="w-20">
                <Text className="text-gray-600 text-sm mb-2">Trip Date:</Text>
                <Text className="text-gray-600 text-sm mb-2">Group:</Text>
                <Text className="text-gray-600 text-sm mb-2">Referenced:</Text>
              </View>
              <View className="flex-1">
                <Text className="text-black text-sm font-medium mb-2">
                  {guideDetail.start_date} - {guideDetail.end_date}
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
              <Text className="text-lg font-bold text-black">
                Total Cost:
              </Text>
              <Text className="text-lg font-bold text-black">
                {guideDetail.budget.toLocaleString()} Baht
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}