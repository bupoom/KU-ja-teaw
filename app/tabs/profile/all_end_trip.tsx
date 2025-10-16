import Header from "@/components/common/Header";
import TripBox from "@/components/TripBox";
import { fetchEndedTrips } from "@/service/APIserver/tripApi";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    RefreshControl,
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const AllEndTripsScreen: React.FC = () => {
    const router = useRouter();
    const [endTrips, setEndTrips] = useState<TripBox[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const loadData = async () => {
        try {
            const tripsData = await fetchEndedTrips();
            setEndTrips(tripsData);
        } catch (error) {
            Alert.alert("Error", "Failed to load end trips data");
            console.error("Error loading end trips:", error);
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadData();
        setRefreshing(false);
    };

    const handleTrip = (trip_id: number) => {
        router.push(`/dynamicPage/trips/${trip_id}`);
    };

    useEffect(() => {
        loadData();
    }, []);

    if (loading) {
        return (
            <SafeAreaView className="flex-1 bg-white">
                <StatusBar barStyle="dark-content" />

                {/* Header */}
                <Header
                    title="All End Trips"
                    onBackPress={() => {
                        router.back();
                    }}
                />

                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="green_2" />
                    <Text className="mt-4 text-gray-600">Loading trips...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <Header
                title="All End Trips"
                onBackPress={() => {
                    router.back();
                }}
            />

            {/* Debug info - remove this in production */}
            {/* <View className="bg-yellow-100 p-2 mx-4 my-2 rounded">
        <Text className="text-xs">Debug: Found {endTrips.length} end trips</Text>
      </View> */}

            {/* Content */}
            {endTrips.length === 0 ? (
                <View className="flex-1 justify-center items-center px-4">
                    <Text className="text-[18px] font-sf-bold text-gray-400 mt-4">
                        No End Trips
                    </Text>
                    <Text className="text-[14px] text-gray-400 text-center mt-2">
                        You haven&apos;t completed any trips yet
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={endTrips}
                    renderItem={({ item }) => (
                        <TripBox
                            tripData={item}
                            onPress={() => handleTrip(item.trip_id)}
                        />
                    )}
                    keyExtractor={item => item.trip_id.toString()}
                    contentContainerStyle={{ padding: 16 }}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={["#10B981"]}
                            tintColor="#10B981"
                        />
                    }
                    ItemSeparatorComponent={() => <View className="h-3" />}
                    ListFooterComponent={() => <View className="h-6" />}
                />
            )}
        </SafeAreaView>
    );
};

export default AllEndTripsScreen;
