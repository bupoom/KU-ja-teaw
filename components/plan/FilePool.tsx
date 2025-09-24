import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { formatDateTime } from "@/util/formatFucntion/formatDateTime";
import { formatFileSize } from "@/util/formatFucntion/formatFileSize";

type Props = {
  files: FileGroup[];
  canEdit: boolean;
  handleDownloadFile: (file: FileGroup) => void;
  handleDeleteFile: (fileId: number) => void;
};

export default function FilePool({
  files,
  canEdit,
  handleDeleteFile,
  handleDownloadFile,
}: Props) {
  return (
    <View>
      {files.map((file) => (
        <View
          key={file.id}
          className="flex-row items-center py-3 border-b border-gray-100 last:border-b-0"
        >
          <View className="flex-1 mr-3">
            <Text className="text-sm font-medium text-gray-900 mb-1">
              {file.file_name}
            </Text>
            <Text className="text-xs text-gray-500">
              {formatFileSize(file.file_size_mb)}
            </Text>
          </View>
          <View className="w-16 mr-3">
            <Text className="text-xs text-gray-600 text-center">
              {file.uploaded_by}
            </Text>
          </View>
          <View className="w-16 mr-3">
            <Text className="text-xs text-gray-600 text-center">
              {formatDateTime(file.uploaded_date).date}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => handleDownloadFile(file)}
            className="mr-2 p-1"
          >
            <Feather name="download" size={16} color="#6B7280" />
          </TouchableOpacity>
          {canEdit && (
            <TouchableOpacity
              onPress={() => handleDeleteFile(file.id)}
              className="p-1"
            >
              <Feather name="trash-2" size={16} color="#EF4444" />
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
}
