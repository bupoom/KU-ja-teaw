import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  RefreshControl,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import PlaceBox from "@/components/PlaceBox";
import { mockPlaceBoxes } from "@/mock/mockDataComplete";
import { getBookmarkPlaceList } from "@/service/APIserver/bookmarkService";
import { useRouter, useLocalSearchParams } from "expo-router";

const SearchPlaceVote: React.FC = () => {
  const [mode, setMode] = useState<"search" | "bookmark">("search");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<PlaceBox[]>([]);
  const [bookmarkPlaces, setBookmarkPlaces] = useState<PlaceBox[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);

  const router = useRouter();
  const { plan_id, vote_id } = useLocalSearchParams<{
    plan_id: string;
    vote_id: string;
  }>();

  // Fetch bookmark list
  const fetchBookmarkPlaces = async () => {
    try {
      setLoading(true);
      const data = await getBookmarkPlaceList();
      setBookmarkPlaces(data);
    } catch (err) {
      console.error("Failed to fetch bookmarks:", err);
    } finally {
      setLoading(false);
    }
  };

  // Refresh control for bookmark list
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchBookmarkPlaces();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    if (mode === "bookmark") {
      fetchBookmarkPlaces();
    }
  }, [mode]);

  // Handle navigation
  const handlePlacePress = (place: PlaceBox) => {
    router.push(
      `/plan/${plan_id}/daily_trip/(modals)/add_vote/vote_place/${vote_id}/${place.place_id}`
    );
  };

  // Auto focus search bar
  const searchInputRef = useRef<TextInput>(null);
  useEffect(() => {
    if (mode === "search") searchInputRef.current?.focus();
  }, [mode]);

  // Mock search function
  const Search_with_query = (query: string): PlaceBox[] => {
    if (!query.trim()) return [];
    return mockPlaceBoxes.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.location.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Handle search with debounce
  useEffect(() => {
    if (mode !== "search") return;
    const delayedSearch = setTimeout(() => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        setHasSearched(false);
        setLoading(false);
        return;
      }

      setLoading(true);
      setTimeout(() => {
        const results = Search_with_query(searchQuery);
        setSearchResults(results);
        setHasSearched(true);
        setLoading(false);
      }, 300);
    }, 500);
    return () => clearTimeout(delayedSearch);
  }, [searchQuery, mode]);

  // Render empty state
  const renderEmptyState = () => (
    <View className="flex-1 justify-center items-center px-8 py-10">
      {hasSearched || mode === "bookmark" ? (
        <View className="items-center">
          <Text className="text-gray-500 text-lg mb-2">No results found</Text>
          <Text className="text-gray-400 text-center">
            Try searching or add more bookmarks
          </Text>
        </View>
      ) : (
        <View className="items-center">
          <Text className="text-gray-500 text-lg mb-2">Start searching</Text>
          <Text className="text-gray-400 text-center">
            Enter keywords to find what you are looking for
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView className="h-full bg-white py-14">
      <StatusBar barStyle="dark-content" backgroundColor="#075952" />

      {/* Mode toggle */}
      <View className="flex-row justify-center p-4 mt-4">
        <TouchableOpacity
          className={`justify-center items-center rounded-full w-[48%] py-4 ${
            mode === "search"
              ? "bg-green_2"
              : "bg-white border border-gray_border rounded-full"
          }`}
          onPress={() => setMode("search")}
        >
          <Text
            className={`font-semibold ${
              mode === "search" ? "text-white" : "text-black"
            }`}
          >
            Search
          </Text>
        </TouchableOpacity>
        <View className="w-[2%]" />
        <TouchableOpacity
          className={`justify-center items-center rounded-full w-[48%] py-4 ${
            mode === "bookmark"
              ? "bg-green_2"
              : "bg-white border border-gray_border rounded-full"
          }`}
          onPress={() => setMode("bookmark")}
        >
          <Text
            className={`font-semibold ${
              mode === "bookmark" ? "text-white" : "text-black"
            }`}
          >
            Bookmark
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search Header */}
      {mode === "search" && (
        <View className="bg-white p-4">
          <View className="flex-row items-center bg-gray-50 rounded-full px-4 py-1 border border-gray_border">
            <Feather name="search" size={20} color="#666" />
            <TextInput
              ref={searchInputRef}
              className="text-black ml-3 flex-1"
              placeholder="Search..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="search"
            />
            {loading && (
              <ActivityIndicator
                size="small"
                color="#6b7280"
                className="ml-2"
              />
            )}
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Entypo name="circle-with-cross" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* List */}
      <FlatList
        data={mode === "search" ? searchResults : bookmarkPlaces}
        renderItem={({ item }) => (
            <PlaceBox
              id={item.id}
              title={item.title}
              rating={item.rating}
              review_count={item.review_count}
              location={item.location}
              place_image={item.place_image}
              place_id={item.place_id ?? 0}
              onPressPlace={() => handlePlacePress(item)}
            />
        )}
        keyExtractor={(item) => item.id.toString()}
        className="m-2 pb-5"
        refreshControl={
          mode === "bookmark" ? (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          ) : undefined
        }
        ListEmptyComponent={renderEmptyState}
      />
    </SafeAreaView>
  );
};

export default SearchPlaceVote;
