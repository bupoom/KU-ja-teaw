import { View, Text, SafeAreaView, StatusBar, ScrollView, FlatList, TouchableOpacity } from "react-native";
import Header from "@/components/common/Header";
import { useRouter, useLocalSearchParams } from "expo-router";
import { mockNotifications } from "@/mock/mockDataComplete";
import { useEffect, useState } from "react";
import { formatDateTimeNote } from "@/util/formatFucntion/formatDateTimeNote";

const notification = () => {
  const [notifications, setNotifications] = useState<NotificationBox[]>([]);
  const [oldNotiIds, setOldNotiIds] = useState<number[]>([]);
  const [displayedNotifications, setDisplayedNotifications] = useState<NotificationBox[]>([]);
  const [showSeeAllButton, setShowSeeAllButton] = useState(false);
  const [showingAll, setShowingAll] = useState(false);

  const router = useRouter();
  const { plan_id } = useLocalSearchParams<{ plan_id: string }>();
  
  const handleBack = () => {
    router.back();
  };

  const handleSeeAll = () => {
    setDisplayedNotifications(notifications);
    setShowSeeAllButton(false);
    setShowingAll(true);
  };

  useEffect(() => {
    const filteredNotifications = mockNotifications.filter(
      (notification) => notification.trip_id === parseInt(plan_id)
    );
    setNotifications(filteredNotifications);
  }, [plan_id]);

  useEffect(() => {
    if (notifications.length === 0) return;

    const firstNotificationId = notifications[0]?.id; // ถ้าอันเเรกสุดที่ส่งมามันเรียงตามเวลาจะเป็นอันล่าสุดเสมอ
    const isFirstIdInOldNoti = oldNotiIds.includes(firstNotificationId); // ถ้าอันล่าสุดที่ส่งมาอยู่ใน oldNotiIds เเปลว่าไม่มี noti ใหม่

    if (isFirstIdInOldNoti) {
      // ถ้า id แรกอยู่ใน oldNotiIds แสดง 10 อันแรก
      const limitedNotifications = notifications.slice(0, 10);
      setDisplayedNotifications(limitedNotifications);
      
      // แสดงปุ่ม See All ถ้ามีมากกว่า 10 อัน
      setShowSeeAllButton(notifications.length > 10);
    } else {
      // ถ้า id แรกไม่อยู่ใน oldNotiIds
      // หา index ของ notification แรกที่อยู่ใน oldNotiIds
      const firstOldIndex = notifications.findIndex(noti => 
        oldNotiIds.includes(noti.id)
      );
      
      if (firstOldIndex === -1) {
        // ถ้าไม่มี old notification เลย แสดงทั้งหมด
        setDisplayedNotifications(notifications);
        setShowSeeAllButton(false);
      } else {
        // แสดงจนถึง old notification แรก แล้วเติมให้ครบ 10
        let notificationsToShow = notifications.slice(0, firstOldIndex);
        
        if (notificationsToShow.length < 10 && notifications.length > firstOldIndex) {
          // เติมให้ครบ 10 อัน
          const remaining = 10 - notificationsToShow.length;
          const additionalNotifications = notifications.slice(
            firstOldIndex, 
            firstOldIndex + remaining
          );
          notificationsToShow = [...notificationsToShow, ...additionalNotifications];
        }
        
        setDisplayedNotifications(notificationsToShow);
        
        // แสดงปุ่ม See All ถ้ามีมากกว่าที่แสดง
        setShowSeeAllButton(notifications.length > notificationsToShow.length);
      }
    }
  }, [notifications, oldNotiIds]);

  const renderNotificationItem = ({ item }: { item: NotificationBox }) => (
    <View className="bg-white rounded-lg p-4 mx-6 mb-3 border border-gray_border shadow-sm">
      <Text className="text-base font-semibold text-black mb-2">
        {item.title}
      </Text>
      <Text className="text-sm text-gray-600 mb-2">
        {item.message}
      </Text>
      <Text className="text-xs text-gray-500">
        {formatDateTimeNote(item.created_at)}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="#ffffff" />
      <Header title="Notification" onBackPress={handleBack} />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <View className="py-4">
          <FlatList
            data={displayedNotifications}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderNotificationItem}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
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
    </SafeAreaView>
  );
};

export default notification;