import CustomButton from "@/components/common/CustomButton";
import Header from "@/components/common/Header";
import { mockPlaceDetails } from "@/mock/mockDataComplete";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const PlaceDetailVote = () => {
  const { plan_id, vote_id, place_id } = useLocalSearchParams<{
    plan_id: string;
    vote_id: string;
    place_id: string;
  }>();
  const [placeDetail, setPlaceDetail] = useState<PlaceDetails>();
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  useEffect(() => {
    if (place_id) {
      const place = mockPlaceDetails.find(
        (place) => place.id === parseInt(place_id)
      );
      setPlaceDetail(place);
    }
  }, [place_id]);

  if (!placeDetail) {
    return (
      <View className="flex-1 bg-white">
        <Header title="Place Details" />
        <View className="flex-1 justify-center items-center">
          <Text>Loading...</Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <Header title="" onBackPress={handleBackPress} />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      >
        {/* Place Image */}
        <Image
          source={{ uri: placeDetail.place_image }}
          className="w-full h-60"
          resizeMode="cover"
        />

        {/* Place Info Container */}
        <View className="mx-4 mt-4 mb-4 bg-white rounded-lg border border-gray_border p-6">
          {/* Title */}
          <Text className="text-2xl font-bold text-black mb-3">
            {placeDetail.title}
          </Text>

          {/* Categories */}
          {placeDetail.categories && placeDetail.categories.length > 0 && (
            <View className="flex-row flex-wrap mb-3">
              {placeDetail.categories.map((category, index) => (
                <View
                  key={index}
                  className="bg-white rounded-xl px-2 py-1 mr-2 mb-1 border border-gray_border"
                >
                  <Text className="text-xs text-dark_gray">{category}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Rating */}
          <View className="flex-row items-center mb-3">
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text className="text-sm text-gray-600 ml-2">
              {placeDetail.rating} (
              {(placeDetail.review_count ?? 0).toLocaleString()} Reviews)
            </Text>
          </View>

          {/* Location with map icon */}
          <View className="flex-row items-center mb-3">
            <Ionicons name="location-outline" size={18} color="#666" />
            {placeDetail.map_link && (
              <TouchableOpacity
                onPress={() => Linking.openURL(placeDetail.map_link!)}
                className="flex-row items-center"
              >
                <Text className="text-sm text-gray-600 ml-2 mr-2">
                  {placeDetail.location}
                </Text>
                <Feather name="external-link" size={14} color="#666" />
              </TouchableOpacity>
            )}
          </View>

          {/* Official website */}
          {placeDetail.official_link && (
            <View className="flex-row items-center mb-4 ">
              <MaterialCommunityIcons name="web" size={18} color="#666" />
              <TouchableOpacity
                onPress={() => Linking.openURL(placeDetail.official_link!)}
                className="flex-row items-center"
              >
                <Text
                  className="text-sm text-blue_button ml-2 mr-2"
                  numberOfLines={1}
                >
                  {placeDetail.official_link.replace(/(^\w+:|^)\/\//, "")}
                </Text>
                <Feather name="external-link" size={16} color="#666" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Overview Section */}
        <View className="mx-4 mb-4 bg-white rounded-lg border border-gray_border p-6">
          <Text className="text-xl font-bold text-black mb-3">Overview</Text>
          <Text className="text-sm leading-5 text-gray-700">
            {placeDetail.description}
          </Text>
        </View>

        {/* Add Button - Fixed at bottom */}
        <View className="mx-4">
          <CustomButton
            title="Add Place to Voting"
            onPress={() => {
                router.replace(`/plan/${plan_id}/daily_trip/(modals)/add_vote/vote_place/${vote_id}/result_vote`)
              console.log("Add place to Voting");
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default PlaceDetailVote;
