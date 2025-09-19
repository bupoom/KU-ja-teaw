import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
} from "react-native";
import { usePathname, useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";

import { mockTripDetails } from "@/mock/mockDataComplete";
import { mockNotes } from "@/mock/mockDataComplete";
import { mockFileGroups } from "@/mock/mockDataComplete";
import { mockFlights } from "@/mock/mockDataComplete";
import { mockTripMembers } from "@/mock/mockDataComplete";

import PlanHeader from "@/components/PlanHeader";

const index = () => {
  const { plan_id } = useLocalSearchParams<{ plan_id: string }>();
  const user_id = 1;

  // State management
  const [userRole, setUserRole] = useState<string>("");
  const [overviewNotes, setOverviewNotes] = useState<Note[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const canEdit = userRole === "owner" || userRole === "editor";

  useEffect(() => {
    if (plan_id) {
      // Fetch user role
      const memberData = mockTripMembers.find(
        (member) =>
          member.trip_id === parseInt(plan_id) && member.id === user_id
      );
      if (memberData) {
        setUserRole(memberData.role);
      }

      // Fetch overview notes
      const notes = mockNotes.filter(
        (note) =>
          note.trip_id === parseInt(plan_id) &&
          note.reference_type === "overview"
      );
      setOverviewNotes(notes);
    }
  }, [plan_id]);

  const handleEditNote = (note: Note) => {
    // Only allow editing if user owns the note and has edit permission
    if (note.refer_user_id === user_id && canEdit) {
      setEditingNoteId(note.id);
      setEditText(note.note_text);
    }
  };

  const handleSaveEdit = (noteId: number) => {
    // Update note logic would go here
    setOverviewNotes((prev) =>
      prev.map((note) =>
        note.id === noteId ? { ...note, note_text: editText } : note
      )
    );
    setEditingNoteId(null);
    setEditText("");
  };

  const handleCancelEdit = () => {
    setEditingNoteId(null);
    setEditText("");
  };

  // Show only user's notes in main view
  const userNotes = overviewNotes.filter(
    (note) => note.refer_user_id === user_id
  );

  const commentNotes = overviewNotes.filter(
    (note) => note.refer_user_id !== user_id
  );

  const renderNoteItem = (note: Note) => (
    <View
      key={note.id}
      className="mb-3 bg-white rounded-lg p-3 border border-gray_border"
    >
      <View className="flex-row items-start">
        {/* User Avatar and Name */}
        <Image
          source={{ uri: note.user_profile }}
          className="w-8 h-8 rounded-full mr-3"
        />
        <View className="flex-1">
          <Text className="font-medium text-gray-900 text-sm mb-1">
            {note.user_name}
          </Text>

          {/* Note Text */}
          {editingNoteId === note.id ? (
            <View className="space-y-2">
              <TextInput
                value={editText}
                onChangeText={setEditText}
                multiline
                className="border border-gray-300 rounded-lg p-3 text-gray-700 min-h-[80px] bg-white"
                style={{ textAlignVertical: "top" }}
              />
              <View className="flex-row space-x-2 gap-2 mt-1">
                <TouchableOpacity
                  onPress={() => handleSaveEdit(note.id)}
                  className="bg-green_2 px-4 py-2 rounded-lg flex-1"
                >
                  <Text className="text-white text-center font-medium">
                    Save
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleCancelEdit}
                  className="bg-white px-4 py-2 rounded-lg flex-1 border border-gray_border"
                >
                  <Text className="text-gray-700 text-center font-medium">
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity onPress={() => handleEditNote(note)}>
              <Text className="text-gray-700 text-sm leading-5">
                {note.note_text}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      <PlanHeader planId={plan_id!} />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Notes Section */}
        <View className="mx-4 mt-4 bg-white">
          {/* Notes Header */}
          <TouchableOpacity
            className="flex-row items-center justify-between py-4"
            onPress={() => setIsModalVisible(true)}
          >
            <Text className="text-xl font-bold text-black ml-6">Notes</Text>
            <Feather
              name={isModalVisible ? "chevron-up" : "chevron-down"}
              size={24}
              color="#000"
            />
          </TouchableOpacity>

          {/* Notes Content */}
          <View className="pb-4">
            {userNotes.length === 0 ? (
              <View className="bg-gray-50 rounded-lg p-4">
                <Text className="text-gray-500 text-center">
                  You have no notes yet
                </Text>
              </View>
            ) : (
              userNotes.map((note) => renderNoteItem(note))
            )}
          </View>
        </View>

        {/* International Flight Section */}
        <View className="mx-4 mt-6 bg-white">
          <TouchableOpacity className="flex-row items-center justify-between py-4">
            <Text className="text-xl font-bold text-black ml-6">
              International Flight
            </Text>
            <Feather name="chevron-down" size={24} color="#000" />
          </TouchableOpacity>
          <View className="pb-4">
            <View className="bg-gray-50 rounded-lg p-4 ml-2">
              <Text className="text-gray-500 text-center">Coming soon...</Text>
            </View>
          </View>
        </View>

        {/* Group File Section */}
        <View className="mx-4 mt-6 bg-white">
          <TouchableOpacity className="flex-row items-center justify-between py-4">
            <Text className="text-xl font-bold text-black ml-6">
              Group File
            </Text>
            <Feather name="chevron-down" size={24} color="#000" />
          </TouchableOpacity>
          <View className="pb-4">
            <View className="bg-gray-50 rounded-lg p-4">
              <Text className="text-gray-500 text-center">Coming soon...</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* All Notes Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView className="flex-1 bg-white">
          {/* Modal Header */}
          <View className="flex-row items-center justify-center p-4 border-b border-gray-200 relative">
            <Text className="text-lg font-semibold text-gray-900 ml-2">
              All Notes
            </Text>
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center absolute top-4 right-4"
            >
              <Feather name="x" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View>
            <Text className="text-xs font-semibold text-gray-400 flex-1 justify-end mr-2">
              ( {commentNotes.length} notes )
            </Text>
          </View>

          {/* Modal Content */}
          <ScrollView className="flex-1 p-4">
            {commentNotes.length === 0 ? (
              <Text className="text-gray-500 text-center py-8">
                No notes available
              </Text>
            ) : (
              commentNotes.map((note) => renderNoteItem(note))
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default index;