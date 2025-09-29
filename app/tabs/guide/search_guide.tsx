import GuideBox from "@/components/GuideBox";
import { mockGuideBoxes } from "@/mock/mockDataComplete";
import { Entypo, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
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
import { SearchGuideByInput } from "@/service/APIserver/bookmarkService";

//  สิ่งที่ต้องแก้ไขเพิ่มเติมคือ
//  - ใส่ API Function
//  - ใส่ routing ไปยัง dynamic page นั้นๆ
//  - เขียนฟังชั่นค้นหาใหม่

const SearchGuideScreen: React.FC = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState<string>("");
    // แก้ไข type เป็น GuideBox[] แทน GuideDetails[]
    const [searchResults, setSearchResults] = useState<GuideBox[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasSearched, setHasSearched] = useState<boolean>(false);

    // Auto focus เมื่อเข้าหน้ามาจะทำให้ page มีแป้นพิมและ cursor อยู่บน search bar ทันที
    const searchInputRef = useRef<TextInput>(null);
    useEffect(() => {
        searchInputRef.current?.focus();
    }, []);

    // Search function API??? - แก้ไข return type และ filter logic
    const Search_with_query = async (query: string) => {
        if (!query.trim()) {
            return [];
        }
        const results = await SearchGuideByInput(query)
        setSearchResults(results); ;
    };

    // Handle search ด้วยการ limit เวลา
    useEffect(() => {
        const delayedSearch = setTimeout(() => {
            if (!searchQuery.trim()) {
                setSearchResults([]);
                setHasSearched(false);
                setLoading(false);
                return;
            }

            setLoading(true);
            // จำลองการ loading
            setTimeout(() => {
                Search_with_query(searchQuery);
                console.log("query result : " , searchResults)
                setHasSearched(true);
                setLoading(false);
            }, 500);
        }, 700); // Debounce 500ms

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
                        Enter keywords to find guides you are looking for
                    </Text>
                </View>
            )}
        </View>
    );

    // Handle navigation to GuideDetails screen
    const handleGuidePress = (guide: GuideBox) => {
        router.push(`./guides/${guide.id}`);
        console.log("Navigate to guide details:", guide.id);
    };

    return (
        <SafeAreaView className="h-full bg-white py-14">
            <StatusBar barStyle="dark-content" backgroundColor="#075952" />

            {/* Search Header */}
            <View className="bg-white p-4">
                <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-1 border border-gray_border">
                    <Feather
                        name="search"
                        size={20}
                        color="#666"
                        className="mr-3"
                    />
                    <TextInput
                        ref={searchInputRef}
                        className="flex-1"
                        placeholder="Search guides..."
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
                        onPress={() => handleGuidePress(item)}
                    >
                        <GuideBox guideData={item} />
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id.toString()}
                className="m-2 pb-5"
                ListEmptyComponent={renderEmptyState}
            />
        </SafeAreaView>
    );
};

export default SearchGuideScreen;
