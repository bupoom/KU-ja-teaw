import PlanHeader from "@/components/PlanHeader";
import RoleTag from "@/components/common/RoleTag";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from "react-native";
import { useEffect, useState, useCallback } from "react";
import { Feather } from "@expo/vector-icons";

import { mockTripMembers } from "@/mock/mockDataComplete";

const GroupIndex = () => {
  const { plan_id } = useLocalSearchParams<{ plan_id: string }>();
  const router = useRouter();

  const [members, setMembers] = useState<TripMember[]>([]);
  const [role, setRole] = useState<string>("viewer");
  const [refreshing, setRefreshing] = useState(false);

  const user_id = 1; // current user
  const isOwner = role === "owner";

  // refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  }, []);

  useEffect(() => {
    const member = mockTripMembers.filter(
      (user) => user.trip_id === parseInt(plan_id)
    );
    setMembers(member);

    const user = member.find((mem) => mem.id === user_id);
    setRole(user?.role ?? "viewer");
  }, [plan_id]);

  // handle role toggle with confirm
  const handleToggleRole = (id: number, currentRole: string) => {
    if (!isOwner) return;

    const newRole = currentRole === "viewer" ? "editor" : "viewer";

    Alert.alert(
      "Change Role",
      `Do you want to change this member from ${currentRole} to ${newRole}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          style: "default",
          onPress: () => {
            setMembers((prev) =>
              prev.map((m) => {
                if (m.id === id && m.role !== "owner") {
                  return { ...m, role: newRole };
                }
                return m;
              })
            );
          },
        },
      ]
    );
  };

  // handle delete member with confirm
  const handleDelete = (id: number, name: string) => {
    if (!isOwner) return;

    Alert.alert(
      "Remove Member",
      `Are you sure you want to remove ${name} from this trip?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setMembers((prev) => prev.filter((m) => m.id !== id));
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <PlanHeader planId={plan_id} />

      {/* Search Bar (เฉพาะ Owner เท่านั้นที่เห็น) */}
      {isOwner && (
        <TouchableOpacity
          className="flex-row items-center mx-4 mt-4 mb-4 px-4 py-3 bg-gray-50 rounded-full border border-gray_border"
          activeOpacity={0.7}
          onPress={() => {
            router.push(`/plan/${plan_id}/group/search_friend`);
          }}
        >
          <Feather name="search" size={18} color="#666" />
          <Text className="ml-3 flex-1 text-sm text-gray-500">
            Search other users...
          </Text>
        </TouchableOpacity>
      )}

      {/* Members List */}
      <ScrollView
        className={`flex-1 px-4`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {members.map((mem) => (
          <View key={mem.id} className="flex-row items-stretch mb-2 mt-2">
            {/* Left box: User Info */}
            <View className="flex-1 flex-row items-center bg-white border border-gray_border rounded-xl p-4">
              {/* Avatar */}
              <Image
                source={{
                  uri:
                    mem.user_image ||
                    "https://via.placeholder.com/80?text=Avatar",
                }}
                className="w-14 h-14 rounded-full mr-4"
              />

              {/* Info */}
              <View className="flex-1">
                <Text className="text-base font-semibold text-black">
                  {mem.name}
                </Text>
                <Text className="text-xs text-dark_gray font-medium">
                  {mem.email}
                </Text>
                <Text className="text-xs text-dark_gray font-medium">
                  Tel: {mem.phone}
                </Text>
              </View>

              {/* Role Tag */}
              <RoleTag
                role={mem.role as "owner" | "editor" | "viewer"}
                onPress={
                  isOwner && mem.role !== "owner"
                    ? () => handleToggleRole(mem.id, mem.role)
                    : undefined
                }
                className="px-4 py-1 rounded-lg text-xs font-semibold items-start"
              />
            </View>

            {/* Right box */}
            {isOwner ? (
              mem.role !== "owner" ? (
                // ปุ่มลบ (สำหรับ member ที่ไม่ใช่ owner)
                <TouchableOpacity
                  className="ml-2 w-12 bg-white border border-gray_border rounded-xl justify-center items-center"
                  onPress={() => handleDelete(mem.id, mem.name)}
                >
                  <Feather name="trash-2" size={22} color="black" />
                </TouchableOpacity>
              ) : (
                // กล่องเปล่า (ถ้าเป็น owner)
                <View className="ml-2 w-12 bg-white border border-gray_border rounded-xl" />
              )
            ) : null}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default GroupIndex;
