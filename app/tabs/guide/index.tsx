import GuideBox from "@/components/GuideBox";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
    FlatList,
    RefreshControl,
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { getBookmarkGuideList } from "@/service/APIserver/bookmarkService";

const GuideBookmarkScreen = () => {
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);
    const [guides, setGuides] = useState<GuideBox[]>([]);

    useEffect(() => {
        fetchPlaceBox();
    }, []);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        fetchPlaceBox();
        setRefreshing(false);
    }, []);

    const fetchPlaceBox = async () => {
        try {
            console.log("Fetching bookmark guides...");
            const data = await getBookmarkGuideList();
            setGuides(data);
            console.log("Fetched guides count:", data.length);
        } catch (error) {
            console.error("Error fetching guides:", error);
        }
    };

    // ✅ สร้าง handleRemove function ที่ถูกต้อง
    const handleRemove = useCallback((guideId: number) => {
        console.log("Removing guide from local state:", guideId);
        
        // อัพเดท local state โดยเอา guide ที่ถูกลบออก
        setGuides(prevGuides => prevGuides.filter(guide => guide.id !== guideId));
        
        console.log("Guide removed from local state");
    }, []);

    const handleSearch = () => {
        router.push("/tabs/guide/search_guide");
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
                        guideData={item} 
                        onRemove={() => {console.log("Remove bookmark")}}//handleRemove}
                    />
                )}
                keyExtractor={item => item.id.toString()}
                className="flex-1 bg-white mb-20"
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 20,
                }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                ListEmptyComponent={() => (
                    <View className="items-center py-16">
                        <Feather name="bookmark" size={48} color="#d1d5db" />
                        <Text className="text-gray-500 mt-4 text-lg">
                            No bookmarks yet
                        </Text>
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