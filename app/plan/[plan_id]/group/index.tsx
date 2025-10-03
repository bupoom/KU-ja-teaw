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
import { Ionicons } from "@expo/vector-icons";
import { get_more_detail } from "@/service/APIserver/userService";
import {
  get_trip_member,
  edit_role,
  delete_mem,
} from "@/service/APIserver/groupPage";

const GroupIndex = () => {
  const { plan_id } = useLocalSearchParams<{ plan_id: string }>();
  const router = useRouter();

  const [members, setMembers] = useState<TripMember[]>([]);
  const [role, setRole] = useState<string>("");
  const [refreshing, setRefreshing] = useState(false);
  const [user_id, setUserID] = useState<string>("");

  const isOwner = role === "Owner";

  // refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetch_user_detail();
    fetch_member_detail();
    setTimeout(() => setRefreshing(false), 800);
  }, []);

  const fetch_user_detail = async () => {
    try {
      const detail = await get_more_detail(parseInt(plan_id));
      setUserID(detail.user_id);
      setRole(detail.role);
    } catch (err) {
      console.error("Failed to fetch user more detail", err);
    }
  };

  const fetch_member_detail = async () => {
    try {
      const detail = await get_trip_member(parseInt(plan_id));
      setMembers(detail);
    } catch (err) {
      console.error("Failed to fetch members detail", err);
    }
  };

  useEffect(() => {
    fetch_user_detail();
    fetch_member_detail();
  }, [plan_id]);

  // handle role toggle with confirm
  const handleToggleRole = (id: number, currentRole: string) => {
    if (!isOwner) return;

    const newRole = currentRole === "Viewer" ? "Editor" : "Viewer";

    Alert.alert(
      "Change Role",
      `Do you want to change this member from ${currentRole} to ${newRole}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          style: "default",
          onPress: () => {
            const editrole = async () => {
              try {
                await edit_role(parseInt(plan_id), id, newRole);
              } catch (err) {
                console.error("Failed to edit member role", err);
              }
            };
            editrole();
            setMembers((prev) =>
              prev.map((m) => {
                if (m.id === id && m.role !== "Owner") {
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
            const deletejaa = async () => {
              try {
                await delete_mem(parseInt(plan_id), id);
              } catch (err) {
                console.error(`Failed to delete ${name}`, err);
              }
            };
            deletejaa();
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
      {/* {isOwner && (
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
      )} */}

      {/* Members List */}
      <ScrollView
        className={`flex-1 px-4 mt-4`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {members.map((mem) => (
          <View key={mem.id} className="flex-row items-stretch mb-4">
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
                role={mem.role as "Owner" | "Editor" | "Viewer"}
                onPress={
                  isOwner && mem.role !== "Owner"
                    ? () => handleToggleRole(mem.id, mem.role)
                    : undefined
                }
                className="px-4 py-1 rounded-lg text-xs font-semibold items-start"
              />
            </View>

            {/* Right box */}
            {isOwner ? (
              mem.role !== "Owner" ? (
                // ปุ่มลบ (สำหรับ member ที่ไม่ใช่ Owner)
                <TouchableOpacity
                  className="ml-2 w-12 bg-white border border-gray_border rounded-xl justify-center items-center"
                  onPress={() => handleDelete(mem.id, mem.name)}
                >
                  <Feather name="trash-2" size={22} color="black" />
                </TouchableOpacity>
              ) : (
                // กล่องเปล่า (ถ้าเป็น Owner)
                <View className="ml-2 w-12 bg-white border border-gray_border rounded-xl" />
              )
            ) : null}
          </View>
        ))}
      </ScrollView>
      {isOwner && (
        <TouchableOpacity
          className="absolute bottom-12 right-4 flex-row items-center px-5 py-3 rounded-full bg-green_2"
          activeOpacity={0.8}
          onPress={() => {
            router.push(`/plan/${plan_id}/group/search_friend`);
          }}
        >
          <Ionicons name="search" size={22} color="white" />
          <Text className="text-white font-medium ml-2">Add Member</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default GroupIndex;
