import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
  Alert,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import GuideBox from "@/components/GuideBox";
import { mockGuideBoxes } from "@/mock/mockDataComplete";

// Import interfaces
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
  trip_id: number;
}

const GuideBookmarkScreen = () => {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [guides, setGuides] = useState<GuideBox[]>(mockGuideBoxes);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setGuides(mockGuideBoxes);
    setRefreshing(false);
  }, []);

  const handleSearch = () => {
    router.push("/tabs/guide/search_guide");
  };

  const handleRemoveGuides = useCallback((guidesId: number) => {
    setGuides((prevGuides) =>
      prevGuides.filter((guides) => guides.id !== guidesId)
    );
  }, []);

  const handleGuidePress = (guide: GuideBox) => {
    router.push(`/guides/${guide.trip_id}`);
    console.log("Navigate to guide:", guide.trip_id);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="#284D44" />

      <View className="bg-green_2 pb-6 px-4 pt-20">
        <Text className="text-white text-[35px] font-sf-bold text-center pt-2">
          Guide Bookmark
        </Text>
      </View>

      <View className="px-4 py-4 bg-white">
        <TouchableOpacity
          onPress={handleSearch}
          className="flex-row items-center bg-gray-50 rounded-full px-4 py-3 border border-gray_border"
        >
          <Feather name="search" size={20} color="#666" />
          <Text className="text-gray-400 ml-3 flex-1">Search...</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={guides}
        renderItem={({ item }) => (
          <GuideBox
            id={item.id}
            title={item.title}
            start_date={item.start_date}
            end_date={item.end_date}
            guide_image={item.guide_image}
            copies={item.copies}
            owner_name={item.owner_name}
            owner_image={item.owner_image}
            owner_comments={item.owner_comments}
            onRemove={handleRemoveGuides}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        className="flex-1 bg-white mb-20"
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={() => (
          <View className="items-center py-16">
            <Feather name="bookmark" size={48} color="#d1d5db" />
            <Text className="text-gray-500 mt-4 text-lg">No bookmarks yet</Text>
            <Text className="text-gray-400 mt-2 text-center px-8">
              Start bookmarking guides to see them here!
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default GuideBookmarkScreen;
