import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Header from "@/components/common/Header";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { formatDateTimeNote } from "@/util/formatFucntion/formatDateTimeNote";

const getUnreadCount = async (plan_id: number, user_id: number) => {
  return { unread_count: 2 };
  // const res = await fetch(`${API_BASE_URL}/notification/unread_count?plan_id=${plan_id}&user_id=${user_id}`);
  // return await res.json();
};

const getNotificationByPlan = async (plan_id: number, user_id: number) => {
  return {
    count: 5,
    noti: [
      {
        noti_id: 1,
        noti_title: "OSHI",
        noti_text: "WE LOVE OSHI",
        noti_date: "2023-05-05",
        noti_time: "06:55:00",
      },
      {
        noti_id: 2,
        noti_title: "OSHI",
        noti_text: "WE LOVE OSHI",
        noti_date: "2025-08-31",
        noti_time: "06:55:00",
      },
      {
        noti_id: 3,
        noti_title: "Vote Created",
        noti_text: "New vote for 'Dinner Place' has been started.",
        noti_date: "2025-10-05",
        noti_time: "10:00:00",
      },
      {
        noti_id: 4,
        noti_title: "Member Joined",
        noti_text: "Alice joined your trip.",
        noti_date: "2025-10-04",
        noti_time: "09:00:00",
      },
      {
        noti_id: 5,
        noti_title: "Trip Updated",
        noti_text: "Your itinerary has been changed.",
        noti_date: "2025-10-03",
        noti_time: "14:45:00",
      },
    ],
  };
  // const res = await fetch(`${API_BASE_URL}/notification/all?plan_id=${plan_id}&user_id=${user_id}`);
  // return await res.json();
};

const Notification = () => {
  const [notifications, setNotifications] = useState<NotificationBox[]>([]);
  const [displayedNotifications, setDisplayedNotifications] = useState<
    NotificationBox[]
  >([]);
  const [showSeeAllButton, setShowSeeAllButton] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { plan_id } = useLocalSearchParams<{ plan_id: string }>();
  const user_id = 1;

  const handleBack = () => router.back();

  const handleSeeAll = () => {
    setDisplayedNotifications(notifications);
    setShowSeeAllButton(false);
  };

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const planIdNum = parseInt(plan_id);

      // -------------------------------
      // Step 1: เช็ค unread_count ก่อน
      // -------------------------------
      const unreadRes = await getUnreadCount(planIdNum, user_id);
      const unread_count = unreadRes.unread_count ?? 0;
      console.log("Unread count:", unread_count);

      // -------------------------------
      // Step 2: ดึง noti ทั้งหมด เเล้ว backend จะset unread_count = 0
      // -------------------------------
      const notiRes = await getNotificationByPlan(planIdNum, user_id);
      const { noti } = notiRes;
      setNotifications(noti);

      // -------------------------------
      // ✅ Step 3: จัดการตาม unread_count
      // -------------------------------
      if (unread_count !== 0) {
        // แสดง noti ตามจำนวน unread_count
        const unreadList = noti.slice(0, unread_count);
        setDisplayedNotifications(unreadList);
        setShowSeeAllButton(noti.length > unread_count);
      } else {
        // แสดง 10 อันแรก
        const latestTen = noti.slice(0, 10);
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
          <Text className="text-gray-500 mt-3">Loading notifications...</Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
        >
          <View className="py-4">
            <FlatList
              data={displayedNotifications}
              keyExtractor={(item) => item.noti_id.toString()}
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
