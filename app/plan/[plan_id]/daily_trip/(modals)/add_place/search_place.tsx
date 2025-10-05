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

type PlaceBoxType = PlaceBox; // สำหรับ mock data type

const SearchOrBookmarkPlace: React.FC = () => {
  const [mode, setMode] = useState<"search" | "bookmark">("search"); // ✅ toggle mode
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<PlaceBoxType[]>([]);
  const [bookmarkPlaces, setBookmarkPlaces] = useState<PlaceBoxType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const router = useRouter();
  const { plan_id, selectDate, start, end } = useLocalSearchParams<{
    plan_id: string;
    selectDate: string;
    start: string;
    end: string;
  }>();

  // Auto focus search bar เมื่อเข้า mode search
  const searchInputRef = useRef<TextInput>(null);
  useEffect(() => {
    if (mode === "search") searchInputRef.current?.focus();
  }, [mode]);

  // โหลด bookmark จาก API
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

  // ดึง bookmark ตอนเข้าโหมด bookmark
  useEffect(() => {
    if (mode === "bookmark") {
      fetchBookmarkPlaces();
    }
  }, [mode]);

  // Refresh control สำหรับ bookmark list
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchBookmarkPlaces();
    setRefreshing(false);
  }, []);

  // Search function
  const Search_with_query = (query: string): PlaceBoxType[] => {
    if (!query.trim()) return [];
    return mockPlaceBoxes.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.location.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Handle search (debounce)
  useEffect(() => {
    if (mode !== "search") return; // search ทำงานเฉพาะในโหมด search

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

  // Navigate to Add Place
  const handlePlacePress = (place: PlaceBoxType) => {
    router.push({
      pathname: `/plan/[plan_id]/daily_trip/(modals)/add_place/[place_id]`,
      params: {
        plan_id: plan_id as string,
        place_id: String(place.place_id),
        selectDate: selectDate,
        start: start,
        end: end,
      },
    });
  };

  // Empty UI
  const renderEmptyState = () => (
    <View className="flex-1 justify-center items-center px-8">
      {hasSearched ? (
        <View className="items-center">
          <Text className="text-gray-500 text-lg mb-2">No results found</Text>
          <Text className="text-gray-400 text-center">
            Try searching with different keywords
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

      {/* Toggle Mode Header */}
      <View className="flex-row justify-center mb-4 mt-4">
        <TouchableOpacity
          className={`px-6 py-3 rounded-full mx-2 ${
            mode === "search" ? "bg-green_2" : "bg-gray-200"
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
        <TouchableOpacity
          className={`px-6 py-3 rounded-full mx-2 ${
            mode === "bookmark" ? "bg-green_2" : "bg-gray-200"
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

      {/* Search Mode */}
      {mode === "search" && (
        <>
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

          <FlatList
            data={searchResults}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handlePlacePress(item)}>
                <PlaceBox {...item} />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
            className="m-2 pb-5"
            ListEmptyComponent={renderEmptyState}
          />
        </>
      )}

      {/* Bookmark Mode */}
      {mode === "bookmark" && (
        <FlatList
          data={bookmarkPlaces}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePlacePress(item)}>
              <PlaceBox {...item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          className="m-2 pb-5"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={() => (
            <View className="items-center py-16">
              <Feather name="bookmark" size={48} color="#D1D5DB" />
              <Text className="text-gray-500 mt-4 text-lg">
                No bookmarks yet
              </Text>
              <Text className="text-gray-400 mt-2 text-center px-8">
                Start exploring and bookmark your favorite places!
              </Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default SearchOrBookmarkPlace;
