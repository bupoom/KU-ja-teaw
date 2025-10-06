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

  const fetchNoti = async () => {
    try {
      setLoading(true);
      //   const response = await getNotificationByPlan(parseInt(plan_id), 1);
      const response = {
        noti: [
          {
            noti_id: 458,
            noti_title: "New Vote Created",
            noti_text: "A new vote for 'Best Restaurant' has been started.",
            noti_date: "2025-10-05",
            noti_time: "14:30",
          },
          {
            noti_id: 457,
            noti_title: "Trip Updated",
            noti_text: "Your trip itinerary has been updated.",
            noti_date: "2025-10-05",
            noti_time: "12:00",
          },
          {
            noti_id: 456,
            noti_title: "Member Joined",
            noti_text: "Alice has joined your trip group.",
            noti_date: "2025-10-04",
            noti_time: "18:45",
          },
          {
            noti_id: 455,
            noti_title: "Vote Result Announced",
            noti_text: "Results for 'Dinner Place' voting are now available.",
            noti_date: "2025-10-04",
            noti_time: "10:10",
          },
          {
            noti_id: 454,
            noti_title: "New Comment",
            noti_text: "Bob commented on your trip discussion.",
            noti_date: "2025-10-03",
            noti_time: "22:20",
          },
          {
            noti_id: 453,
            noti_title: "Trip Reminder",
            noti_text: "Your trip starts in 3 days. Get ready!",
            noti_date: "2025-10-02",
            noti_time: "08:00",
          },
          {
            noti_id: 452,
            noti_title: "Poll Created",
            noti_text: "New poll: 'Which place should we visit first?'",
            noti_date: "2025-10-01",
            noti_time: "15:30",
          },
          {
            noti_id: 451,
            noti_title: "Member Left",
            noti_text: "John has left your trip group.",
            noti_date: "2025-09-30",
            noti_time: "09:45",
          },
          {
            noti_id: 450,
            noti_title: "Trip Created",
            noti_text:
              "Your trip 'Kyoto Adventure' has been successfully created.",
            noti_date: "2025-09-29",
            noti_time: "11:00",
          },
          {
            noti_id: 449,
            noti_title: "Trip Created",
            noti_text:
              "Your trip 'Kyoto Adventure' has been successfully created.",
            noti_date: "2025-09-29",
            noti_time: "11:00",
          },
          {
            noti_id: 448,
            noti_title: "Trip Created",
            noti_text:
              "Your trip 'Kyoto Adventure' has been successfully created.",
            noti_date: "2025-09-29",
            noti_time: "11:00",
          },
        ],
        last_seen_noti_id: 453,
        unread_count: 3,
      };
      const { noti, last_seen_noti_id, unread_count } = response;
      setNotifications(noti)
      // -------------------------------
      // ถ้ามี unread (unread_count !== 0)
      // → แสดงอันใหม่ทั้งหมด (id > last_seen_noti_id)
      // และเติมอันเก่าเพิ่มจนถึง last_seen_noti_id
      // -------------------------------
      if (unread_count !== 0) {
        // noti ใหม่ทั้งหมด
        const unreadList = noti.filter((n) => n.noti_id > last_seen_noti_id);

        setDisplayedNotifications(unreadList);
        setShowSeeAllButton(noti.length > unreadList.length);
      } else {
        // -------------------------------
        // ถ้า unread_count === 0
        // → แสดง 10 อันล่าสุดเท่านั้น
        // -------------------------------
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
    fetchNoti();
  }, [plan_id]);

  const renderNotificationItem = ({ item }: { item: NotificationBox }) => (
    <View
      className={`rounded-lg p-4 mx-6 mb-3 border shadow-sm bg-white border-gray_border"
      }`}
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
