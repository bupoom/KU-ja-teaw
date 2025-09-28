import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
    StatusBar,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SearchPlaceByInput } from "@/service/APIserver/bookmarkService";

const SearchScreen: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchResults, setSearchResults] = useState<SearchPlaces[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasSearched, setHasSearched] = useState<boolean>(false);
    const router = useRouter();

    // Auto focus เมื่อเข้าหน้ามาจะทำให้ page มีแป้นพิมและ cursor อยู่บน search bar ทันที
    const searchInputRef = useRef<TextInput>(null);

    // Search function API??? - เปลี่ยน return type เป็น PlaceBox[]
    const Search_with_query = async (
        query: string
    ): Promise<SearchPlaces[]> => {
        if (!query.trim()) {
            return [];
        }
        const search_result = SearchPlaceByInput(query);

        return search_result;
    };

    // Handle search ด้วยการ limit เวลา
    useEffect(() => {
        searchInputRef.current?.focus();
        const delayedSearch = setTimeout(() => {
            if (!searchQuery.trim()) {
                setSearchResults([]);
                setHasSearched(false);
                setLoading(false);
                return;
            }

            setLoading(true);
            // จำลองการ loading
            setTimeout(async () => {
                const results = await Search_with_query(searchQuery);
                setSearchResults(results);
                setHasSearched(true);
                setLoading(false);
            }, 300);
        }, 500); // Debounce 500ms

        return () => clearTimeout(delayedSearch);
    }, [searchQuery]);

    // Render empty state
    const renderEmptyState = () => (
        <View className="flex-1 justify-center items-center px-8">
            {hasSearched ? (
                <View className="items-center">
                    <Text className="text-gray-500 text-lg mb-2">
                        No results found
                    </Text>
                    <Text className="text-gray-400 text-center">
                        Try searching with different keywords
                    </Text>
                </View>
            ) : (
                <View className="items-center">
                    <Text className="text-gray-500 text-lg mb-2">
                        Start searching
                    </Text>
                    <Text className="text-gray-400 text-center">
                        Enter keywords to find what you are looking for
                    </Text>
                </View>
            )}
        </View>
    );

    // Handle navigation to PlaceDetails screen
    const handlePlacePress = (GOOGLEAPI: string) => {
        router.push({
            pathname: "/dynamicPage/places/[place_id]" as any,
            params: { 
                id: GOOGLEAPI,
                type: 'api',
                from_bookmark: 1,
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
                        <ActivityIndicator
                            size="small"
                            color="#6b7280"
                            className="ml-2"
                        />
                    )}
                    <TouchableOpacity onPress={() => setSearchQuery("")}>
                        <Entypo
                            name="circle-with-cross"
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Search Results */}
            <FlatList
                data={searchResults}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{ marginBottom: 10 }}
                        onPress={() => handlePlacePress(item.placeId)}
                    >
                        <Text className="bg-white rounded-xl p-3 mr-1 ml-1 border border-gray_border">
                            {item.text}
                        </Text>
                        {/* <PlaceBox {...item} /> */}
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.placeId}
                className="m-2 pb-5"
                ListEmptyComponent={renderEmptyState}
            />
        </SafeAreaView>
    );
};

export default SearchScreen;
