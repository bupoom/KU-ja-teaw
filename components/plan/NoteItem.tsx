import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";

type Props = {
  note: Note;
  userId: number;
  onSave: (id: number, text: string) => void;
};

export default function NoteItem({ note, userId, onSave}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(note.note_text);

  return (
    <View className="mb-3 bg-white rounded-lg p-3 border border-gray_border">
      <View className="flex-row items-start">
        <Image source={{ uri: note.user_profile }} className="w-8 h-8 rounded-full mr-3" />
        <View className="flex-1">
          <Text className="font-medium text-gray-900 text-sm mb-1">
            {note.user_name}
          </Text>
          {isEditing ? (
            <View>
              <TextInput
                value={editText}
                onChangeText={setEditText}
                multiline
                className="border border-gray-300 rounded-lg p-3 text-gray-700 min-h-[80px]"
                style={{ textAlignVertical: "top" }}
              />
              <View className="flex-row gap-2 mt-2">
                <TouchableOpacity
                  onPress={() => {
                    onSave(note.id, editText);
                    setIsEditing(false);
                  }}
                  className="bg-green_2 px-4 py-2 rounded-lg flex-1"
                >
                  <Text className="text-white text-center font-medium">Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setIsEditing(false)}
                  className="bg-white px-4 py-2 rounded-lg flex-1 border border-gray_border"
                >
                  <Text className="text-gray-700 text-center font-medium">Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              disabled={note.refer_user_id !== userId}
              onPress={() => setIsEditing(true)}
              className="border border-gray_border mt-2 p-2 rounded-lg"
            >
              <Text className="text-gray-700 text-sm leading-5">
                {note.note_text || "Tab to add a note..."}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
