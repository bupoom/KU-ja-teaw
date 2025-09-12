import { useRouter, usePathname } from "expo-router";
import { View, Image, Text, TouchableOpacity, Alert } from "react-native";
import { Feather, Ionicons } from '@expo/vector-icons';
import { calculateDuration } from "@/util/calculateDuration";

// Interface matching your latest mockData
interface GuideBoxProps {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
  guide_image: string;
  copies: number;
  owner_name: string;
  owner_image: string;
  owner_comments: string;
  onRemove?: (id:number) => void;
}

const GuideBox: React.FC<GuideBoxProps> = ({
  id,
  title,
  start_date,
  end_date,
  guide_image,
  copies,
  owner_name,
  owner_image,
  owner_comments,
  onRemove
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const give_bookmark = pathname === '/tabs/guide';

  const handleUnbookmark = () => {
    Alert.alert(
      "Remove Bookmark", 
      `Are you sure you want to remove "${title}" from bookmarks?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            // กด Remove เเล้วจะไปใช้ function onremove ที่หน้า place bookmark
            if (onRemove) {
              onRemove(id);
            }
            // You can also add API call here for real implementation
            // fetch API ลบ bookmark ทิ้ง
          }
        }
      ]
    );
  };

  const handleGuideBoxPress = (): void => {
    console.log(`id: ${id}`)
    router.push(`/guides/${id}`);
  };

  const duration = calculateDuration(start_date, end_date);

  // Generate sample description based on title
  const generateDescription = (title: string): string => {
    const descriptions = {
      'Ultimate Japan Travel Guide': 'I spend 10 days on this amazing journey and will tell everyone my plan here...',
      'European Backpacker\'s Paradise': 'Discover the best routes and hidden gems across Europe with this comprehensive guide...',
      'Thailand Island Hopping': 'Explore the most beautiful islands in Thailand with insider tips and recommendations...'
    };
    return descriptions[title as keyof typeof descriptions] || `I spend ${duration} days on this peaceful place and will tell everyone my plan here...`;
  };

  // Guide bookmark page layout
  if (pathname === '/tabs/guide' || pathname === '/tabs/guide/search_guide') {
    return (
      <TouchableOpacity
        key={id}
        className="bg-white rounded-xl p-3 mb-3 mr-1 ml-1 border border-gray_border"
        onPress={handleGuideBoxPress}
      >
        <View className="flex-row">
          {/* Guide Image */}
          <Image 
            source={{ uri: guide_image }} 
            className="w-20 h-20 rounded-xl"
          />
          
          {/* Guide Info */}
          <View className="flex-1 ml-5">
            <View className="flex-row justify-between items-start">
              <Text 
                className="text-[16px] font-sf-semibold text-black leading-6"
                numberOfLines={1}
              >
                {title.length > 20 ? title.substring(0, 20) + '...' : title}
              </Text>
              {give_bookmark && (
                <TouchableOpacity className="ml-2" onPress={handleUnbookmark}>
                  <Ionicons name="bookmark" size={24} color="#000000" />
                </TouchableOpacity>
              )}
            </View>
            
            {/* Stats Row */}
            <View className="flex-row items-center">
              <View className="flex-row items-center mr-4">
                <Feather name="copy" size={15} color="#666" />
                <Text className="text-[11px] text-dark_gray ml-1 font-sf-semibold">{copies} copied</Text>
              </View>
              <View className="flex-row items-center">
                <Feather name="calendar" size={15} color="#666" />
                <Text className="text-[11px] text-dark_gray ml-1 font-sf-semibold">{duration} days</Text>
              </View>
            </View>
            
            {/* Creator Info */}
            <View className="flex-row items-center">
              <Image 
                source={{ uri: owner_image }} 
                className="w-5 h-5 rounded-full mr-2"
              />
              <Text className="text-[11px] text-dark_gray ml-1 font-sf-semibold">{owner_name}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  } 
  
  // Home page layout (matching the design in your image)
else if (pathname === '/tabs') {
  return (
    <TouchableOpacity 
      className="mb-6 bg-white rounded-xl shadow-sm overflow-hidden mr-4"
      onPress={handleGuideBoxPress}
      activeOpacity={0.8}
      style={{
        width: 280,
        height: 340,
        shadowColor: '#000',
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
          className="text-lg font-bold text-black mb-2" 
          numberOfLines={2}
          style={{ 
            lineHeight: 22,
            height: 20,
          }}
        >
          {title}
        </Text>
        
        {/* Description */}
        <Text 
          className="text-sm text-gray-600 mb-1"
          style={{ 
            lineHeight: 18,
            height: 54,
            textAlign: 'left',
          }}
          numberOfLines={2}
        >
          {generateDescription(title)}
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
              className="text-[14px] font-semibold text-gray-800"
              numberOfLines={1}
            >
              {owner_name}
            </Text>
            <Text 
              className="text-xs text-gray-500"
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