import { useRouter, usePathname } from "expo-router";
import { View, Image, Text, TouchableOpacity , Alert} from "react-native";
import { Feather, Ionicons } from '@expo/vector-icons';


const GuideBox = ({ // Component ของ guide ใน Guide Book mark
  id,
  title,
  duration,
  copies,
  price,
  rating,
  image,
  highlights,
  guideId,
  creator,
  creator_image,
}: GuideDetails) =>  {
  const pathname = usePathname()
  const give_bookmark  = pathname === '/tabs/guide'
  const router = useRouter()

  const handleUnbookmark  = () => {
    Alert.alert('unbookmark แล้วไอโง่');
  }

  const handleGuideBoxPress = (guide_id: number): void => {
    router.push('/guides/[guides_id].tsx')
    // Alert.alert("Navigate to Guide Plan", `Going to ${guide_title}`)
  };

  const text_wrap = (text: string, maxCharsPerLine: number = 40): string => {
    if (!text) return '';
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';
    
    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;

      if (testLine.length <= maxCharsPerLine) {
        currentLine = testLine;
      } else {
        if (currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          lines.push(word.substring(0, maxCharsPerLine - 3) + '...');
          currentLine = '';
        }
        if (lines.length >= 2) {
          break;
        }
      }
    }
    if (currentLine && lines.length < 2) {
      lines.push(currentLine);
    }
    if (lines.length >= 2) {
      const remainingWords = words.slice(
        words.findIndex(word => 
          lines.join(' ').split(' ').length <= words.indexOf(word)
        )
      );
      if (remainingWords.length > 0 || currentLine) {
        const lastLine = lines[1] || lines[0];
        if (lastLine.length <= maxCharsPerLine - 3) {
          lines[lines.length - 1] = lastLine + '...';
        } else {
          lines[lines.length - 1] = lastLine.substring(0, maxCharsPerLine - 3) + '...';
        }
      }
    }
    return lines.slice(0, 2).join('\n');
  }

  if (pathname === '/tabs/guide' || pathname === '/tabs/guide/search_guide') {
    return (
      <TouchableOpacity
        key={id}
        className="bg-white w-full rounded-lg p-3 mb-1 shadow-sm border border-gray-100"
        onPress={() => handleGuideBoxPress(id)}
      >
        <View className="flex-row">
          {/* Guide Image */}
          <Image source={{ uri: image }} className="w-20 h-20 rounded-xl"/>
          {/* Guide Info */}
          <View className="flex-1 ml-5">
            <View className="flex-row justify-between items-start mb-2">
              <Text className="text-lg font-semibold text-gray-800 flex-1">{title}</Text>
              {give_bookmark && (
                <TouchableOpacity className="ml-2" onPress={handleUnbookmark} >
                  <Ionicons name= {"bookmark"} size={24}  color={"#004D40"}/>
                </TouchableOpacity>
              )}
            </View>  
            {/* Stats Row */}
            <View className="flex-row items-center mb-2">
              <View className="flex-row items-center mr-4">
                <Feather name="copy" size={14} color="#666" />
                <Text className="text-sm text-gray-600 ml-1">{copies} copied</Text>
              </View>
              <View className="flex-row items-center">
                <Feather name="calendar" size={14} color="#666" />
                <Text className="text-sm text-gray-600 ml-1">{duration} days</Text>
              </View>
            </View>
            {/* creator Info */}
            <View className="flex-row items-center">
              <Image source={{ uri: creator_image }} className="w-5 h-5 rounded-full mr-2"/>
              <Text className="text-sm text-gray-600">{creator}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  } else if (pathname === '/tabs'){
    return (
      <TouchableOpacity 
        className="flex-1 mb-6 bg-white rounded-xl shadow-sm overflow-hidden"
        onPress={() => handleGuideBoxPress(id)}
        activeOpacity={0.8}
      >
        {/* Main Image */}
        <Image 
          source={{ uri: image }} 
          className="w-52 h-32 rounded-xl mb-2"
          resizeMode="cover"
        />

        {/* Content Container */}
        <View className="p-4">
          {/* Title */}
          <Text className="text-lg font-bold text-black mb-2" >{title}</Text>
          {/* Description */}
          <Text 
          className="text-sm text-gray-600 mb-3"
          style={{ 
            lineHeight: 22,
            textAlign: 'left',
            flexWrap: 'wrap'
          }}>
            {text_wrap(highlights)}
          </Text>

          {/* Author Section */}
          <View className="flex-row items-center">
            <Image 
              source={{ uri: creator_image }} 
              className="w-8 h-8 rounded-full mr-3"
              resizeMode="cover"
            />
            <Text className="text-sm font-medium text-gray-800">
              {creator}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

export default GuideBox;