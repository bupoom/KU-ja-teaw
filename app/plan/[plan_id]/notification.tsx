import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    ScrollView,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from "react-native";
import Header from "@/components/common/Header";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { formatDateTimeNote } from "@/util/formatFucntion/formatDateTimeNote";
import {
    getNotification,
    getNotiNumber,
} from "@/service/APIserver/notification";
import { AuthService } from "@/service/authService";

const Notification = () => {
    const [notifications, setNotifications] = useState<NotificationBox[]>([]);
    const [displayedNotifications, setDisplayedNotifications] = useState<
        NotificationBox[]
    >([]);
    const [showSeeAllButton, setShowSeeAllButton] = useState(false);
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const { plan_id } = useLocalSearchParams<{ plan_id: string }>();

    const handleBack = () => router.back();

    const handleSeeAll = () => {
        setDisplayedNotifications(notifications);
        setShowSeeAllButton(false);
    };

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const userData = await AuthService.getUserData();
            if (!userData) {
                Alert.alert("Failed to load User Data..");
                return;
            }

            const user_id = userData.user_id;
            const plan_Id = parseInt(plan_id);
            const unread_count = await getNotiNumber(plan_Id);

            const notiRes = await getNotification(plan_Id, user_id);
            setNotifications(notiRes);

            // สมมติว่า notiRes เรียงจากเก่า → ใหม่
            const noti = notiRes;

            if (unread_count !== 0) {
                // ✅ ดึงจากท้าย (เพราะ unread อยู่ล่างสุด)
                const unreadList = noti.slice(-unread_count);
                setDisplayedNotifications(unreadList);
                setShowSeeAllButton(noti.length > unread_count);
            } else {
                // ✅ แสดง 10 อันล่าสุด (ท้าย list)
                const latestTen = noti.slice(-10);
                setDisplayedNotifications(latestTen);
                setShowSeeAllButton(noti.length > 10);
            }
        } catch (err) {
            console.error("❌ Failed to fetch notifications:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, [plan_id]);

    const renderNotificationItem = ({ item }: { item: NotificationBox }) => (
        <View
            className={`rounded-lg p-4 mx-6 mb-3 border shadow-sm bg-white border-gray_border`}
        >
            <Text className="text-base font-semibold text-black mb-2">
                {item.noti_title}
            </Text>
            <Text className="text-sm text-gray-600 mb-2">{item.noti_text}</Text>
            <Text className="text-xs text-gray-500">
                {formatDateTimeNote(`${item.noti_date} ${item.noti_time}`)}
            </Text>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <Header title="Notification" onBackPress={handleBack} />

            {loading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#075952" />
                    <Text className="text-gray-500 mt-3">
                        Loading notifications...
                    </Text>
                </View>
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 50 }}
                >
                    <View className="py-4">
                        <FlatList
                            data={displayedNotifications}
                            keyExtractor={item => item.noti_id.toString()}
                            renderItem={renderNotificationItem}
                            scrollEnabled={false}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={
                                <View className="items-center mt-10">
                                    <Text className="text-gray-500 text-base">
                                        No new notifications
                                    </Text>
                                </View>
                            }
                        />

                        {showSeeAllButton && (
                            <TouchableOpacity
                                onPress={handleSeeAll}
                                className="bg-green_2 mx-6 mt-4 py-4 rounded-lg"
                            >
                                <Text className="text-white text-center font-semibold text-lg">
                                    See All Notifications
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

export default Notification;
