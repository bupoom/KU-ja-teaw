import React, { useState, useEffect, useRef } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { mockUserDetails } from "@/mock/mockDataComplete";
import { search_user, invite_user } from "@/service/APIserver/groupPage";
import { Alert } from "react-native";

const SearchFriend = () => {
  const { plan_id } = useLocalSearchParams<{ plan_id: string }>();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const searchInputRef = useRef<TextInput>(null);

  // focus ตอนเข้าหน้า
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  // debounce search 500ms
  useEffect(() => {
  const delayed = setTimeout(async () => {
    if (!query.trim()) {
      setResults([]);
      setHasSearched(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await search_user(query, parseInt(plan_id));
      setResults(res);
    } catch (err) {
      console.error("Search failed:", err);
      setResults([]);
    } finally {
      setHasSearched(true);
      setLoading(false);
    }
  }, 500);

  return () => clearTimeout(delayed);
  }, [query]);

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setHasSearched(false);
  };

  const handleAdd = async (username: string) => {
    try {
      await invite_user(username, parseInt(plan_id!));
      console.log(`✅ Success to add username: ${username} to trip`);
      Alert.alert("Success", `${username} has been invited to the trip`);
    } catch (err) {
      console.error("❌ Failed to invite:", err);
      Alert.alert("Error", "Failed to invite user");
    }
  };


  // empty state
  const renderEmptyState = () => (
    <View className="flex-1 justify-center items-center px-8 mt-10">
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
            Enter your friend’s name
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white py-20">
      {/* Title */}
      <View className="items-center mt-6 mb-4">
        <Text className="text-xl font-bold text-black">
          Enter your Username Friends
        </Text>
      </View>

      {/* Search Bar */}
      <View className="bg-white p-4">
        <View className="flex-row items-center bg-gray-50 rounded-full px-4 py-2 border border-gray_border">
          <Feather name="search" size={20} color="#666" />
          <TextInput
            ref={searchInputRef}
            className="text-black ml-3 flex-1"
            placeholder="Search to Add Member"
            value={query}
            onChangeText={setQuery}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="search"
          />
          {loading && (
            <ActivityIndicator size="small" color="#6b7280" className="ml-2" />
          )}
          {query.length > 0 && (
            <TouchableOpacity onPress={handleClear} className="ml-2">
              <Entypo name="circle-with-cross" size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Results */}
      <FlatList
        data={results}
        keyExtractor={(item) => item.user_id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        ListEmptyComponent={renderEmptyState}
        renderItem={({ item }) => (
          <View className="flex-row items-center bg-white border border-gray_border rounded-xl p-4 mb-3">
            {/* Avatar */}
            <Image
              source={{
                uri:
                  item.profile_picture_link || "https://via.placeholder.com/80",
              }}
              className="w-14 h-14 rounded-full mr-4"
            />

            {/* Info */}
            <View className="flex-1">
              <Text className="text-base font-semibold text-black">
                {item.name}
              </Text>
              <Text className="text-xs text-gray-600">{item.email}</Text>
              <Text className="text-xs text-gray-600">Tel: {item.phone}</Text>
            </View>

            {/* Add button */}
            <TouchableOpacity
              className="px-4 py-2 bg-green_2 rounded-lg"
              onPress={() => handleAdd(item.name)}
            >
              <Text className="text-white text-sm font-semibold">Add</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default SearchFriend;
