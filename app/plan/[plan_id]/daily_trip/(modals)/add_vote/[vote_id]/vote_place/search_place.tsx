import PlaceBox from "@/components/PlaceBox";
import { mockPlaceBoxes } from "@/mock/mockDataComplete";
import { Entypo, Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    SafeAreaView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";


// --- helpers ---
const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
const hhmm = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;
const ymd = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const isYMD = (s?: string) => !!s && /^\d{4}-\d{2}-\d{2}$/.test(s);
const isHHmm = (s?: string) => !!s && /^\d{2}:\d{2}$/.test(s);

const parseTime = (ymdStr: string, hhmmStr: string) => {
  const [y, m, d] = ymdStr.split("-").map(Number);
  const [hh, mm] = hhmmStr.split(":").map(Number);
  return new Date(y, m - 1, d, hh, mm, 0, 0);
};

// Infer the item type from your mock data
type Item = (typeof mockPlaceBoxes)[number];

const SearchScreen: React.FC = () => {
  // === receive from SelectTime ===
  const { plan_id, date: dateStr, start: startStr, end: endStr } =
    useLocalSearchParams<{
      plan_id?: string;
      date?: string; // "YYYY-MM-DD"
      start?: string; // "HH:mm"
      end?: string; // "HH:mm"
    }>();

  // === normalize to Date objects with safe defaults ===
  const date = useMemo<Date>(() => {
    if (isYMD(dateStr)) return new Date(`${dateStr}T00:00:00`);
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, [dateStr]);

  const start = useMemo<Date>(() => {
    if (isYMD(dateStr) && isHHmm(startStr)) return parseTime(dateStr!, startStr!);
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }, [dateStr, startStr, date]);

  const end = useMemo<Date>(() => {
    if (isYMD(dateStr) && isHHmm(endStr)) return parseTime(dateStr!, endStr!);
    const d = new Date(date);
    d.setHours(12, 0, 0, 0);
    return d;
  }, [dateStr, endStr, date]);

  const router = useRouter();

  // === search UI state ===
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  // Auto-focus on mount
  const searchInputRef = useRef<TextInput>(null);
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  // === mock search ===
  const searchWithQuery = (query: string): Item[] => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return mockPlaceBoxes.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q)
    );
  };

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        setHasSearched(false);
        setLoading(false);
        return;
      }
      setLoading(true);
      setTimeout(() => {
        const results = searchWithQuery(searchQuery);
        setSearchResults(results);
        setHasSearched(true);
        setLoading(false);
      }, 300);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Empty state
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

  // === navigate to place_details and pass along window ===
    const handlePlacePress = (place: Item) => {
    useRouter().push({
        pathname:
        "/plan/[plan_id]/daily_trip/(modals)/add_place/place_detail",
        params: {
        plan_id: String(plan_id ?? ""),
        // param name MUST match the bracket filename: [place_detail].tsx
        place_detail: String(place.id),
        date: ymd(date),        // "YYYY-MM-DD"
        start: hhmm(start),     // "HH:mm"
        end: hhmm(end),         // "HH:mm"
        },
    });
    };

  return (
    <SafeAreaView className="h-full bg-white py-14">
      <StatusBar barStyle="dark-content" backgroundColor="#075952" />

      {/* Search Header */}
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
            <ActivityIndicator size="small" color="#6b7280" className="ml-2" />
          )}
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Entypo name="circle-with-cross" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Selected window helper (optional) */}
        <View className="mt-3 px-2">
          <Text className="text-xs text-gray-500">
            Plan {String(plan_id)} • {ymd(date)} • {hhmm(start)} → {hhmm(end)}
          </Text>
        </View>
      </View>

      {/* Search Results */}
      <FlatList
        data={searchResults}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ marginBottom: 10 }}
            onPress={() => handlePlacePress(item)}
          >
            <PlaceBox {...item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => String(item.id)}
        className="m-2 pb-5"
        ListEmptyComponent={renderEmptyState}
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
            