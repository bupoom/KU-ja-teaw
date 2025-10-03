import { calculateDuration } from "@/util/calculationFunction/calculateDuration";
import { truncateText } from "@/util/truncateText";
import { Feather, Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { UnbookmarkByGuideId } from "@/service/APIserver/bookmarkService";

// Define GuideBox interface
interface GuideBoxProps {
    guideData: GuideBox;
    onRemove?: (id: number) => void;
}

const GuideBox: React.FC<GuideBoxProps> = ({ guideData, onRemove }) => {
    const pathname = usePathname();
    const router = useRouter();
    const give_bookmark = pathname === "/tabs/guide";

    const {
        id,
        title,
        start_date,
        end_date,
        guide_image,
        copies,
        owner_name,
        owner_image,
        description,
        trip_id,
    } = guideData;

    const handleUnbookmark = () => {
        console.log("handleUnbookmark called for id:", id);

        Alert.alert("Remove Bookmark", `remove "${title}" from bookmarks?`, [
            {
                text: "Cancel",
                style: "cancel",
                onPress: () => console.log("Cancel pressed"),
            },
            {
                text: "Remove",
                style: "destructive",
                onPress: async () => {
                    console.log("Remove button pressed for id:", id);

                    try {
                        console.log("Calling UnbookmarkByGuideId API...");

                        // ✅ แก้ไข: ใช้ await กับ async function
                        const res = await UnbookmarkByGuideId(id);
                        console.log("API result:", res);

                        // ✅ เช็ค result ที่ถูกต้อง
                        if (res) {
                            if (onRemove) {
                                console.log("Calling onRemove function");
                                onRemove(id);
                            } else {
                                console.log("onRemove function not provided");
                            }
                        }
                    } catch (error) {
                        console.error("Error removing bookmark:", error);
                        Alert.alert(
                            "Error",
                            `Failed to remove "${title}" from bookmarks`
                        );
                    }
                },
            },
        ]);
    };

    const handleGuideBoxPress = (id: number, isFromBookmark: number): void => {
        router.push({
            pathname: "/dynamicPage/guides/[guide_id]",
            params: {
                guide_id: id.toString(),
                isFromBookmark: isFromBookmark.toString(),
            },
        });
    };

    const duration = calculateDuration(start_date, end_date);

    // Guide bookmark page layout
    if (pathname === "/tabs/guide" || pathname === "/tabs/guide/search_guide") {
        const isFromBookmark = pathname === "/tabs/guide" ? 1 : 0;
        return (
            <TouchableOpacity
                key={id}
                className="bg-white rounded-xl p-3 mb-3 mr-1 ml-1 border border-gray_border"
                onPress={() => {
                    handleGuideBoxPress(trip_id, isFromBookmark);
                }}
            >
                <View className="flex-row">
                    {/* Guide Image */}
                    <Image
                        source={
                            guide_image && guide_image.startsWith("https://")
                                ? { uri: guide_image }
                                : require("../assets/images/error.png")
                        }
                        className="w-20 h-20 rounded-xl"
                        onError={error =>
                            console.log("Guide image load error:", error)
                        }
                    />

                    {/* Guide Info */}
                    <View className="flex-1 ml-5">
                        <View className="flex-row justify-between items-start mb-1">
                            <Text
                                className="text-lg font-sf-semibold text-black"
                                numberOfLines={1}
                            >
                                {truncateText(title, 20)}
                            </Text>
                            {give_bookmark && (
                                <TouchableOpacity
                                    className="ml-2"
                                    onPress={e => {
                                        e.stopPropagation(); // ป้องกัน event bubbling
                                        console.log("Bookmark icon pressed");
                                        handleUnbookmark();
                                    }}
                                >
                                    <Ionicons
                                        name="bookmark"
                                        size={24}
                                        color="#000000"
                                    />
                                </TouchableOpacity>
                            )}
                        </View>

                        {/* Stats Row */}
                        <View className="flex-row items-center mb-2">
                            <View className="flex-row items-center mr-4">
                                <Feather name="copy" size={15} color="#666" />
                                <Text className="text-sm text-dark_gray ml-1 font-sf-semibold">
                                    {copies} copied
                                </Text>
                            </View>
                            <View className="flex-row items-center">
                                <Feather
                                    name="calendar"
                                    size={15}
                                    color="#666"
                                />
                                <Text className="text-sm text-dark_gray ml-1 font-sf-semibold">
                                    {duration} days
                                </Text>
                            </View>
                        </View>

                        {/* Creator Info */}
                        <View className="flex-row items-center">
                            <Image
                                source={
                                    owner_image &&
                                    owner_image.startsWith("https://")
                                        ? { uri: owner_image }
                                        : require("../assets/images/error.png")
                                }
                                className="w-5 h-5 rounded-full mr-2"
                                onError={error =>
                                    console.log("Owner image error:", error)
                                }
                            />
                            <Text className="text-sm text-dark_gray ml-1 font-sf-semibold">
                                {owner_name}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    // Home page layout (matching the design in your image)
    else if (pathname === "/tabs") {
        return (
            <TouchableOpacity
                className="mb-6 bg-white rounded-xl shadow-sm overflow-hidden mr-4"
                onPress={() => {
                    handleGuideBoxPress(trip_id, 0);
                }}
                activeOpacity={0.8}
                style={{
                    width: 280,
                    height: 340,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 2,
                }}
            >
                {/* Main Image */}
                <Image
                    source={{ uri: guide_image }}
                    className="w-full rounded-t-xl"
                    style={{ height: 180 }}
                    resizeMode="cover"
                />

                {/* Content Container */}
                <View className="p-4 flex-1">
                    {/* Title */}
                    <Text
                        className="text-xl font-bold text-black mb-2"
                        numberOfLines={2}
                        style={{
                            lineHeight: 22,
                            height: 20,
                        }}
                    >
                        {truncateText(title, 30)}
                    </Text>

                    {/* Description */}
                    <Text
                        className="text-xs text-gray-600 mb-1 font-semibold"
                        style={{
                            lineHeight: 18,
                            height: 54,
                            textAlign: "left",
                        }}
                        numberOfLines={2}
                    >
                        {description}
                    </Text>

                    {/* Author Section - ใช้ Spacer เพื่อดันลงด้านล่าง */}
                    <View className="flex-row items-center">
                        <Image
                            source={{ uri: owner_image }}
                            className="w-12 h-12 rounded-full mr-5"
                            resizeMode="cover"
                        />
                        <View className="flex-1">
                            <Text
                                className="text-base font-semibold text-gray-800"
                                numberOfLines={1}
                            >
                                {owner_name}
                            </Text>
                            <Text
                                className="text-xs text-gray-500 font-semibold"
                                numberOfLines={1}
                            >
                                {copies} References
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    return null;
};

export default GuideBox;
