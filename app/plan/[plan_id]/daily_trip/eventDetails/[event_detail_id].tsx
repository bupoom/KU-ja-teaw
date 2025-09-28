import { View, Text, ScrollView, Image, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import Feather from "@expo/vector-icons/Feather";

import Header from "@/components/common/Header";
import TransportationIcon from "@/components/common/TransportIcon";
import NoteItem from "@/components/plan/NoteItem";

import { truncateText } from "@/util/truncateText";

import {
  mockActivityEventBoxes,
  mockTripMembers,
} from "@/mock/mockDataComplete";

const event_detail_id = () => {
  const { plan_id, event_detail_id } = useLocalSearchParams<{
    plan_id: string;
    event_detail_id: string;
  }>();

  const user_id = 1;
  const router = useRouter();
  const [eventDetail, setEventDetail] = useState<ActivityEventBox | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [userProfile, setUserProfile] = useState<string>();
  const [userRole, setUserRole] = useState<string>("viewer");
  const userNotes = notes.find((note) => note.refer_user_id === user_id);
  const commentNotes = notes.filter((note) => note.refer_user_id !== user_id);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const canEdit = userRole === "owner" || userRole === "editor";

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
    if (event_detail_id && plan_id) {
      const parsedTripId = parseInt(plan_id);
      const parsedActivityId = parseInt(event_detail_id);

      const user = mockTripMembers.find(
        (user) => user.id === user_id && user.trip_id === parseInt(plan_id)
      );

      setUserRole(user?.role ?? "viewer");
      setUserName(user?.name ?? "You");
      setUserProfile(user?.user_image);

      const activity = mockActivityEventBoxes.find(
        (event) =>
          event.id === parsedActivityId && event.trip_id === parsedTripId
      );

      if (activity) {
        setEventDetail(activity);
        setEditTitle(activity.title);

        const relatedNotes = activity.notes ?? [];
        setNotes(relatedNotes);
      }

      console.log(`event_detail_id: ${event_detail_id}`);
      console.log(`plan_id: ${plan_id}`);
    }
  }, [event_detail_id, plan_id]);

  useEffect(() => {
    console.log("Notes updated:", notes);
  }, [notes]);

  useEffect(() => {
    console.log("PlaceDetail updated:", eventDetail);
  }, [eventDetail]);

  return (
    <ScrollView
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 50,
      }}
    >
      <Header title="" onBackPress={handleBackPress} />

      <View className="m-4">
        <View className="flex-row items-stretch gap-x-2">
          {/* Transportation Section */}
          <View className="bg-green_2 rounded-lg px-8 py-4">
            <View className="items-center">
              <TransportationIcon
                transportation={eventDetail?.transportation}
                color="#ffffff"
                size={30}
              />
              <Text className="text-white font-medium text-base mt-2">
                {eventDetail?.transportation}
              </Text>
            </View>
          </View>

          {/* Time Section */}
          <View className="flex-1 bg-white rounded-lg px-6 py-4 border border-gray_border">
            <View className="flex-row items-center justify-around">
              {/* Start Time */}
              <View className="items-center">
                <Text className="text-gray-500 text-xl font-medium mb-2">
                  Start
                </Text>
                <Text className="text-black text-2xl font-bold">
                  {eventDetail?.time_begin}
                </Text>
              </View>

              {/* Clock Icon */}
              <Feather name="clock" size={30} color="#6B7280" />

              {/* End Time */}
              <View className="items-center">
                <Text className="text-gray-500 text-xl font-medium mb-2">
                  End
                </Text>
                <Text className="text-black text-2xl font-bold">
                  {eventDetail?.time_end}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View className="mx-4 mb-4 bg-white rounded-lg border border-gray_border p-6">
        <Text className="text-xl font-bold text-black mb-3">Title</Text>

        {isEditingTitle ? (
          <View>
            <TextInput
              value={editTitle}
              onChangeText={setEditTitle}
              multiline
              className="border border-gray-300 rounded-lg p-3 text-gray-700 min-h-[60px]"
              style={{ textAlignVertical: "top" }}
            />
            <View className="flex-row gap-2 mt-2">
              <TouchableOpacity
                onPress={() => {
                  if (eventDetail) {
                    setEventDetail({ ...eventDetail, title: editTitle });
                  }
                  setIsEditingTitle(false);
                }}
                className="bg-green_2 px-4 py-2 rounded-lg flex-1"
              >
                <Text className="text-white text-center font-medium">Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setEditTitle(eventDetail?.title ?? "");
                  setIsEditingTitle(false);
                }}
                className="bg-white px-4 py-2 rounded-lg flex-1 border border-gray_border"
              >
                <Text className="text-gray-700 text-center font-medium">
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            disabled={!canEdit}
            onPress={() => setIsEditingTitle(true)}
            className="border border-gray_border mt-2 p-2 rounded-lg"
          >
            <Text className="text-sm text-gray-700">
              {truncateText(eventDetail?.title ?? "Tap to add a title...", 150)}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View className="mx-4 mb-4 bg-white rounded-lg border border-gray_border p-6">
        <Text className="text-xl font-bold text-black mb-3">Note</Text>
        {userNotes ? (
          <NoteItem note={userNotes} userId={user_id} onSave={handleSaveEdit} />
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
  );
};
export default event_detail_id;
