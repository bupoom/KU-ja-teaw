import {
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";

import Header from "@/components/common/Header";
import NoteItem from "@/components/plan/NoteItem";

import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import {
  mockActivityPlaceBoxes,
  mockPlaceDetails,
  mockUserDetails,
} from "@/mock/mockDataComplete";

const PlaceDetailPage = () => {
  const { plan_id, place_detail_id } = useLocalSearchParams<{
    plan_id: string;
    place_detail_id: string;
  }>();

  const user_id = 1;
  const router = useRouter();
  const [placeDetail, setPlaceDetail] = useState<PlaceDetails | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [userProfile, setUserProfile] = useState<string>();
  const userNotes = notes.find((note) => note.refer_user_id === user_id);
  const commentNotes = notes.filter((note) => note.refer_user_id !== user_id);

  const handleBackPress = () => {
    router.back();
  };

  const handleAddNote = () => {
    const newNote: Note = {
      id: Math.max(...notes.map((n) => n.id), 0) + 1,
      trip_id: parseInt(plan_id!),
      refer_user_id: user_id,
      reference_type: "overview",
      note_text: "",
      user_name: userName ?? "You",
      user_profile:
        userProfile ??
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop",
      is_editable: true,
      created_at: new Date().toISOString(), // current timestamp
    };
    setNotes((prev) => [...prev, newNote]);
  };

  const handleSaveEdit = (noteId: number, editText: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === noteId ? { ...note, note_text: editText } : note
      )
    );
  };

  useEffect(() => {
    if (place_detail_id && plan_id) {
      const parsedTripId = parseInt(plan_id);
      const parsedActivityId = parseInt(place_detail_id);

      const user = mockUserDetails.find(
        (user) => user.user_id === String(user_id)
      );
      setUserName(user?.name || "");
      setUserProfile(userProfile);

      const activity = mockActivityPlaceBoxes.find(
        (place) =>
          place.id === parsedActivityId && place.trip_id === parsedTripId
      );

      if (activity) {
        const detail = mockPlaceDetails.find(
          (place) => place.id === activity.place_id
        );
        if (detail) {
          setPlaceDetail(detail);
        }
        
        const relatedNotes = activity.notes ?? [];
        setNotes(relatedNotes);
      }

      console.log(`place_detail_id: ${place_detail_id}`);
      console.log(`plan_id: ${plan_id}`);
    }
  }, [place_detail_id, plan_id]);

  useEffect(() => {
    console.log("Notes updated:", notes);
  }, [notes]);

  useEffect(() => {
    console.log("PlaceDetail updated:", placeDetail);
  }, [placeDetail]);

  return (
    <View className="flex-1 bg-white">
      <Header title="" onBackPress={handleBackPress} />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      >
        {/* Place Image */}
        <Image
          source={{ uri: placeDetail?.place_image }}
          className="w-full h-60"
          resizeMode="cover"
        />

        {/* Place Info Container */}
        <View className="mx-4 mt-4 mb-4 bg-white rounded-lg border border-gray_border p-6">
          {/* Title */}
          <Text className="text-2xl font-bold text-black mb-3">
            {placeDetail?.title}
          </Text>

          {/* Categories */}
          {placeDetail?.categories && placeDetail.categories.length > 0 && (
            <View className="flex-row flex-wrap mb-3">
              {placeDetail.categories.map((category, index) => (
                <View
                  key={index}
                  className="bg-white rounded-xl px-2 py-1 mr-2 mb-1 border border-gray_border"
                >
                  <Text className="text-xs text-dark_gray">{category}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Rating */}
          <View className="flex-row items-center mb-3">
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text className="text-sm text-gray-600 ml-2">
              {placeDetail?.rating} (
              {(placeDetail?.review_count ?? 0).toLocaleString()} Reviews)
            </Text>
          </View>

          {/* Location with map icon */}
          <View className="flex-row items-center mb-3">
            <Ionicons name="location-outline" size={18} color="#666" />
            {placeDetail?.map_link && (
              <TouchableOpacity
                onPress={() => Linking.openURL(placeDetail.map_link!)}
                className="flex-row items-center"
              >
                <Text className="text-sm text-gray-600 ml-2 mr-2">
                  {placeDetail.location}
                </Text>
                <Feather name="external-link" size={14} color="#666" />
              </TouchableOpacity>
            )}
          </View>

          {/* Official website */}
          {placeDetail?.official_link && (
            <View className="flex-row items-center mb-4 ">
              <MaterialCommunityIcons name="web" size={18} color="#666" />
              <TouchableOpacity
                onPress={() => Linking.openURL(placeDetail.official_link!)}
                className="flex-row items-center"
              >
                <Text
                  className="text-sm text-blue_button ml-2 mr-2"
                  numberOfLines={1}
                >
                  {placeDetail.official_link.replace(/(^\w+:|^)\/\//, "")}
                </Text>
                <Feather name="external-link" size={16} color="#666" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Overview Section */}
        <View className="mx-4 mb-4 bg-white rounded-lg border border-gray_border p-6">
          <Text className="text-xl font-bold text-black mb-3">Overview</Text>
          <Text className="text-sm leading-5 text-gray-700">
            {placeDetail?.description}
          </Text>
        </View>

        <View className="mx-4 mb-4 bg-white rounded-lg border border-gray_border p-6">
          <Text className="text-xl font-bold text-black mb-3">Note</Text>
          {userNotes ? (
            <NoteItem
              note={userNotes}
              userId={user_id}
              onSave={handleSaveEdit}
            />
          ) : (
            <View className="flex-col justify-center mb-3">
              <View className="bg-white rounded-lg p-4 border border-gray_border">
                <View className="flex-row items-start">
                  <Image
                    source={{ uri: userProfile }}
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <View className="flex-1">
                    <Text className="font-medium text-gray-900 text-sm mb-1">
                      {userName}
                    </Text>
                    <Text className="text-gray-500 text-sm">
                      You have no notes yet
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={handleAddNote}
                className="bg-green_2 rounded-lg py-3 mt-3"
              >
                <Text className="text-white text-center font-medium">
                  Add Note
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {commentNotes.length === 0 ? (
            <View className="bg-white rounded-lg p-4 border border-gray_border flex items-center justify-center">
              <Text className="text-sm font-normal text-dark_gray">
                No Others Comment
              </Text>
            </View>
          ) : (
            commentNotes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                userId={user_id}
                onSave={handleSaveEdit}
              />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default PlaceDetailPage;
