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
import {
  getBookmarkPlaceList,
  SearchPlaceByInput,
} from "@/service/APIserver/bookmarkService";
import { useRouter, useLocalSearchParams } from "expo-router";

type PlaceBoxType = PlaceBoxProps;

const SearchPlaceVote: React.FC = () => {
  const [mode, setMode] = useState<"search" | "bookmark">("search");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchPlaces[]>([]);
  const [bookmarkPlaces, setBookmarkPlaces] = useState<PlaceBoxType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const router = useRouter();
  const { plan_id, vote_id, selectDate, start, end } = useLocalSearchParams<{
    plan_id: string;
    vote_id: string;
    selectDate: string;
    start: string;
    end: string;
  }>();

  const searchInputRef = useRef<TextInput>(null);

  // auto focus
  useEffect(() => {
    if (mode === "search") searchInputRef.current?.focus();
  }, [mode]);

  // fetch bookmark
  const fetchBookmarkPlaces = async () => {
    try {
      console.log("Fetching bookmarks...");
      setLoading(true);
      const data = await getBookmarkPlaceList();
      if (Array.isArray(data)) setBookmarkPlaces(data);
      else setBookmarkPlaces([]);
    } catch (err) {
      console.error("Failed to fetch bookmarks:", err);
      setBookmarkPlaces([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mode === "bookmark") fetchBookmarkPlaces();
  }, [mode]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchBookmarkPlaces();
    setRefreshing(false);
  }, []);

  // search api
  const searchWithQuery = async (query: string): Promise<SearchPlaces[]> => {
    if (!query.trim()) return [];
    const SearchResult = await SearchPlaceByInput(query.toLowerCase());
    return SearchResult;
  };

  // debounce search
  useEffect(() => {
    if (mode !== "search") return;

    const delayedSearch = setTimeout(async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        setHasSearched(false);
        setLoading(false);
        return;
      }

      setLoading(true);
      const results = await searchWithQuery(searchQuery);
      setSearchResults(results);
      setHasSearched(true);
      setLoading(false);
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery, mode]);

  // 🔹 Handle navigation
  const handleSearchPlacePress = (GOOGLEAPI: string) => {
    router.push({
      pathname:
        "/plan/[plan_id]/daily_trip/(modals)/add_vote/vote_place/[vote_id]/[place_id]" as any,
      params: {
        place_id: GOOGLEAPI,
        type: "api",
        plan_id: plan_id,
        vote_id: vote_id,
      },
    });
  };

  const handleBookmarkPlacePress = (placeId: number) => {
    router.push({
      pathname:
        "/plan/[plan_id]/daily_trip/(modals)/add_vote/vote_place/[vote_id]/[place_id]" as any,
      params: {
        place_id: placeId.toString(),
        type: "place",
        plan_id: plan_id,
        vote_id: vote_id,
      },
    });
  };

  // 🔹 Empty states
  const renderSearchEmptyState = () => (
    <View className="flex-1 justify-center items-center px-8">
      {hasSearched ? (
        <View className="items-center">
          <Feather name="search" size={48} color="#D1D5DB" />
          <Text className="text-gray-500 text-lg mb-2 mt-4">
            No results found
          </Text>
          <Text className="text-gray-400 text-center">
            Try searching with different keywords
          </Text>
        </View>
      ) : (
        <View className="items-center">
          <Feather name="search" size={48} color="#D1D5DB" />
          <Text className="text-gray-500 text-lg mb-2 mt-4">
            Start searching
          </Text>
          <Text className="text-gray-400 text-center">
            Enter keywords to find places
          </Text>
        </View>
      )}
    </View>
  );

  const renderBookmarkEmptyState = () => (
    <View className="flex-1 justify-center items-center px-8 py-16">
      <Feather name="bookmark" size={48} color="#D1D5DB" />
      <Text className="text-gray-500 mt-4 text-lg font-semibold">
        No bookmarks yet
      </Text>
      <Text className="text-gray-400 mt-2 text-center">
        Start exploring and bookmark your favorite places!
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white py-14">
      <StatusBar barStyle="dark-content" backgroundColor="#075952" />

      {/* Toggle Mode Buttons */}
      <View className="flex-row justify-center p-4 mt-4">
        <TouchableOpacity
          className={`justify-center items-center rounded-full w-[48%] py-4 ${
            mode === "search"
              ? "bg-green_2"
              : "bg-white border border-gray_border"
          }`}
          onPress={() => setMode("search")}
          activeOpacity={0.7}
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
              : "bg-white border border-gray_border"
          }`}
          onPress={() => setMode("bookmark")}
          activeOpacity={0.7}
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

      {/* 🔍 Search Mode */}
      {mode === "search" && (
        <>
          <View className="bg-white px-4 pb-4">
            <View className="flex-row items-center bg-gray-50 rounded-full px-4 py-3 border border-gray_border">
              <Feather name="search" size={20} color="#666" />
              <TextInput
                ref={searchInputRef}
                className="text-black ml-3 flex-1"
                placeholder="Search places..."
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
              {searchQuery.length > 0 && (
                <TouchableOpacity
                  onPress={() => setSearchQuery("")}
                  className="ml-2"
                >
                  <Entypo name="circle-with-cross" size={24} color="#666" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <FlatList
            data={searchResults}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ marginBottom: 10 }}
                onPress={() => handleSearchPlacePress(item.placeId)}
              >
                <Text className="bg-white rounded-xl p-3 mr-1 ml-1 border border-gray_border">
                  {item.text}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.placeId}
            contentContainerStyle={{
              paddingHorizontal: 8,
              paddingBottom: 20,
              flexGrow: 1,
            }}
            ListEmptyComponent={renderSearchEmptyState}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}

      {/* 📍 Bookmark Mode */}
      {mode === "bookmark" && (
        <>
          {loading ? (
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator size="large" color="#075952" />
              <Text className="mt-4 text-gray-500">Loading bookmarks...</Text>
            </View>
          ) : (
            <FlatList
              data={bookmarkPlaces}
              renderItem={({ item }) => (
                <View style={{ marginBottom: 10 }}>
                  <PlaceBox
                    {...item}
                    onPressPlace={() =>
                      handleBookmarkPlacePress(Number(item.place_id))
                    }
                  />
                </View>
              )}
              keyExtractor={(item, index) =>
                item.id?.toString() || `bookmark-${index}`
              }
              contentContainerStyle={{
                paddingHorizontal: 8,
                paddingBottom: 20,
                flexGrow: 1,
              }}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={["#075952"]}
                  tintColor="#075952"
                />
              }
              ListEmptyComponent={renderBookmarkEmptyState}
              showsVerticalScrollIndicator={false}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default SearchPlaceVote;
