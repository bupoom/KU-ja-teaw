import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    Alert,
    Animated,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";

import CustomButton from "@/components/common/CustomButton";
import Header from "@/components/common/Header";
import ActivityEvent from "@/components/plan/ActivityEvent";
import ActivityPlace from "@/components/plan/ActivityPlace";
import { FlightBox } from "@/components/plan/FlightBox";
import WeatherIcon from "@/components/common/WeatherIcon";

import { formatDate } from "@/util/formatFucntion/formatDate";
import { formatDateRange } from "@/util/formatFucntion/formatDate&TimeRange";
import { organizeActivitiesByDay } from "@/util/organizedActivityByDay";
import { truncateText } from "@/util/truncateText";

import { getGuideDetails } from "@/service/APIserver/guideDetail";
import { BookmarkByGuideId } from "@/service/APIserver/bookmarkService";

interface DailyActivity {
    date: string;
    activities: (ActivityPlaceBox | ActivityEventBox)[];
}

export default function GuideDetail() {
    const router = useRouter();
    const { isFromBookmark } = useLocalSearchParams()
    console.log("variable is : ", isFromBookmark)
    const { guide_id } = useLocalSearchParams<{ guide_id: string }>();

    const [loading, setLoading] = useState<boolean>(true);
    const [guideDetail, setGuideDetail] = useState<GuideDetails | null>(null);
    const [flights, setFlights] = useState<Flight[]>([]);
    const [showFlights, setShowFlights] = useState<boolean>(true);
    const [dailyActivities, setDailyActivities] = useState<DailyActivity[]>([]);
    const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>(
        {}
    );
    const [showDescription, setShowDescription] = useState(false);

    // 🔹 Animation สำหรับ popup
    const slideAnim = useRef(new Animated.Value(0)).current; // 0 = ปิด, 1 = เปิด

    const handleBackPress = () => {
        router.back();
    };

    const addBookmark = async () => {
        const response = await BookmarkByGuideId(Number(guide_id))
        if (response === "Bookmark added") {
            Alert.alert("Added to Bookmark");
        } else {
            Alert.alert(response)
        }
    };

    const copyGuide = () => { // แก้ด้วย 
        router.push({
            pathname: '/dynamicPage/guides/set_plan_details',
            params: {
                guide_id: guide_id
            }
        });
        
    };

    const toggleDescription = () => {
        if (showDescription) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setShowDescription(false));
        } else {
            setShowDescription(true);
            Animated.timing(slideAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };

    const fetchGuidesDetails = async () => {
        try {
            const { GuideData ,FlightData } = await getGuideDetails(parseInt(guide_id as string));
            setGuideDetail(GuideData);
            setFlights(FlightData);
            return true;
        } catch (error) {
            console.log("In GuideDetails Screen Found error: " , error);
            return false;
        }
    };

    const toggleDay = (date: string) => {
        setExpandedDays(prev => ({
            ...prev,
            [date]: !prev[date],
        }));
    };

    const isActivityPlace = (
        activity: ActivityPlaceBox | ActivityEventBox
    ): activity is ActivityPlaceBox => {
        return "location" in activity; // ใน ActivityPlaceBox มี location อยู่
    };

    const loadData = async () => {
        try {
            setLoading(true);
            await fetchGuidesDetails();
            if (guideDetail) {
                const activitiesData = await organizeActivitiesByDay(
                    guideDetail.trip_id,
                    guideDetail.start_date,
                    guideDetail.end_date
                )
                setDailyActivities(activitiesData);
            }
            const initialExpandedState: Record<string, boolean> = {};
            dailyActivities.forEach((day, index) => {
                initialExpandedState[day.date] = index === 0;
            });
            setExpandedDays(initialExpandedState);
        } catch (error) {
            Alert.alert("Error", "Failed to load guide details");
            console.error("Error loading guide details:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (guide_id) {
            loadData();
        }
    }, [guide_id]);

    if (loading) {
        return (
            <SafeAreaView className="flex-1 bg-white">
                <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
                <Header title="" onBackPress={handleBackPress} />
                <View className="flex-1 justify-center items-center">
                    <Text>Loading...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (!guideDetail) {
        return (
            <SafeAreaView className="flex-1 bg-white">
                <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
                <Header title="" onBackPress={handleBackPress} />
                <View className="flex-1 justify-center items-center">
                    <Text>Guide not found</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <Header title="" onBackPress={handleBackPress} />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingBottom: 50 }}
            >
                {/* Hero Image */}
                <Image
                    source={{ uri: guideDetail.guide_image }}
                    className="w-full h-64"
                    resizeMode="cover"
                />

                {/* Content Section - Touchable */}
                <TouchableOpacity
                    onPress={toggleDescription}
                    className="bg-white p-6 m-4 border-gray_border border-2 rounded-xl"
                    activeOpacity={0.7}
                >
                    {/* Title Section */}
                    <View className="flex-row items-start justify-between mb-4">
                        <View className="flex-1 mr-4">
                            {/* Author Info */}
                            <View className="flex-row items-center mb-1">
                                <Image
                                    source={{ uri: guideDetail.owner_image }}
                                    className="w-16 h-16 rounded-full"
                                    resizeMode="cover"
                                />
                                <View className="flex-col justify-center ml-4">
                                    <Text className="text-xl font-bold text-black">
                                        {truncateText(guideDetail.title, 20)}
                                    </Text>
                                    <Text className="text-sm text-gray-500">
                                        Owner: {guideDetail.owner_name}
                                    </Text>
                                    <Text className="text-sm text-gray-500">
                                        Email: {guideDetail.owner_email}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Copy/Share Icon */}
                        <TouchableOpacity
                            className="w-8 h-8 items-center justify-center"
                            style={{ alignSelf: "flex-start" }}
                            onPress={e => {
                                e.stopPropagation();
                                copyGuide();
                            }}
                        >
                            <Feather name="copy" size={16} color="black" />
                        </TouchableOpacity>
                    </View>

                    {/* Trip Details */}
                    <View className="mb-4">
                        <View className="flex-row">
                            <View>
                                <Text className="text-gray-600 text-sm font-bold mb-2">
                                    Trip Date:
                                </Text>
                                <Text className="text-gray-600 text-sm font-bold mb-2">
                                    Group:
                                </Text>
                                <Text className="text-gray-600 text-sm font-bold mb-2">
                                    Referenced:
                                </Text>
                            </View>
                            <View className="flex-1 ml-2">
                                <Text className="text-black text-sm font-medium mb-2">
                                    {formatDateRange(
                                        guideDetail.start_date,
                                        guideDetail.end_date
                                    )}
                                </Text>
                                <Text className="text-black text-sm font-medium mb-2">
                                    {guideDetail.group_members} Persons
                                </Text>
                                <Text className="text-black text-sm font-medium mb-2">
                                    {guideDetail.copies} times
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Total Cost Section */}
                    <View className="border-t border-gray-200 pt-4">
                        <View className="flex-row justify-between items-center">
                            <Text className="text-lg font-bold text-black">
                                Total Cost:
                            </Text>
                            <Text className="text-lg font-bold text-black">
                                {(guideDetail.budget ?? 0).toLocaleString()}{" "}
                                Baht
                            </Text>
                        </View>
                    </View>

                    {/* Tap indicator */}
                    <View className="flex-row justify-center mt-3">
                        <Text className="text-xs text-gray-400">
                            Tap to view description
                        </Text>
                    </View>
                </TouchableOpacity>

                {/* Flight Section */}
                <View className="bg-white p-6 m-6 border-gray_border border-2 rounded-xl">
                    <TouchableOpacity
                        onPress={() => {setShowFlights(!showFlights);}}
                        className="flex-row justify-between items-center mb-4"
                    >
                        <Text className="text-xl font-bold text-black">
                            International Flight
                        </Text>
                        <Feather
                            name={showFlights ? "chevron-up" : "chevron-down"}
                            size={20}
                            color="black"
                        />
                    </TouchableOpacity>

                    {showFlights && (
                        <View>
                            {flights.map(flight => (
                                <FlightBox key={flight.id} {...flight} />
                            ))}
                        </View>
                    )}
                </View>

                {/* Travel Place Section */}
                <View className="bg-white p-6 m-4 border-gray_border border-2 rounded-xl">
                    <Text className="text-xl font-bold text-black mb-4">
                        Travel Place
                    </Text>

                    {dailyActivities.map(day => (
                        <View key={day.date} className="mb-4">
                            <TouchableOpacity
                                onPress={() => toggleDay(day.date)}
                                className="flex-row justify-between items-center mb-3 p-3 bg-gray-50 rounded-xl"
                            >
                                <View className="flex-row items-center">
                                    <WeatherIcon
                                        trip_id={parseInt(guide_id)}
                                        date={day.date}
                                        size={20}
                                    />
                                    <Text className="text-lg font-semibold text-black ml-2">
                                        {formatDate(day.date)}
                                    </Text>
                                </View>
                                <Feather
                                    name={
                                        expandedDays[day.date]
                                            ? "chevron-up"
                                            : "chevron-down"
                                    }
                                    size={20}
                                    color="black"
                                />
                            </TouchableOpacity>

                            {expandedDays[day.date] && (
                                <View>
                                    {day.activities.map(activity => (
                                        <View
                                            key={`${activity.id}-${
                                                isActivityPlace(activity)
                                                    ? "place"
                                                    : "event"
                                            }`}
                                            className="mb-3"
                                        >
                                            {isActivityPlace(activity) ? (
                                                <ActivityPlace
                                                    activity={activity}
                                                />
                                            ) : (
                                                <ActivityEvent
                                                    activity={activity}
                                                />
                                            )}
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>
                    ))}
                </View>

                {(isFromBookmark === "0") && <CustomButton
                    onPress={addBookmark}
                    title="Add Guide Bookmark"
                />}
            </ScrollView>

            {showDescription && (
                <View className="absolute inset-0">
                    {/* Backdrop */}
                    <TouchableOpacity
                        className="absolute inset-0 bg-black/50"
                        onPress={toggleDescription}
                        activeOpacity={1}
                    />
                    {/* Panel */}
                    <Animated.View
                        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6"
                        style={{
                            transform: [
                                {
                                    translateY: slideAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [400, 0], // เด้งขึ้นจากล่าง
                                    }),
                                },
                            ],
                        }}
                    >
                        {/* Modal Header */}
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-xl font-bold text-black">
                                Description
                            </Text>
                        </View>

                        {/* Content */}
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View className="flex-row items-center mb-4">
                                <Image
                                    source={{ uri: guideDetail.owner_image }}
                                    className="w-12 h-12 rounded-full mr-3"
                                />
                                <View>
                                    <Text className="text-lg font-semibold text-black">
                                        {guideDetail.title}
                                    </Text>
                                    <Text className="text-sm text-gray-500">
                                        by {guideDetail.owner_name}
                                    </Text>
                                </View>
                            </View>

                            <Text className="text-base text-gray-700 leading-6">
                                {guideDetail.description ||
                                    "No description available for this guide."}
                            </Text>
                        </ScrollView>

                        {/* Footer */}
                        <View className="mt-6 pt-4 border-t border-gray_border mb-5">
                            <TouchableOpacity
                                onPress={toggleDescription}
                                className="bg-green_2 py-3 px-6 rounded-lg"
                            >
                                <Text className="text-white text-center font-semibold">
                                    Close
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </View>
            )}
        </SafeAreaView>
    );
}
