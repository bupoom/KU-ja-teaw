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
    router.push(`/guides/${guide_id}`)
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


export const MockDataGuides: GuideDetails[] = [
  {
    id: 1,
    title: "Trip to Paris",
    duration: 5,
    copies: 473,
    price: 1200,
    rating: 4.8,
    image: "https://a.storyblok.com/f/239725/4096x2731/c3337fde3a/01_fr_par_hero_eiffeltower.png/m/3840x2560/filters:quality(70)",
    highlights: "Experience the sparkling lights of the Eiffel Tower at night Discover timeless art at the world-famous Louvre Museum Enjoy a romantic Seine River cruise with stunning city views",
    guideId: "guide_paris_001",
    creator: "Keen_Kung",
    creator_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
  },
  {
    id: 2,
    title: "Pattaya Guide",
    duration: 7,
    copies: 1976,
    price: 800,
    rating: 4.5,
    image: "https://a.storyblok.com/f/239725/4096x2731/c3337fde3a/01_fr_par_hero_eiffeltower.png/m/3840x2560/filters:quality(70)",
    highlights: "Experience the sparkling lights of the Eiffel Tower at night Discover timeless art at the world-famous Louvre Museum Enjoy a romantic Seine River cruise with stunning city views",
    guideId: "guide_pattaya_002",
    creator: "Keen_Kung",
    creator_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
  },
  {
    id: 3,
    title: "Bangkok Explorer",
    duration: 4,
    copies: 1520,
    price: 950,
    rating: 4.7,
    image: "https://a.storyblok.com/f/239725/4096x2731/c3337fde3a/01_fr_par_hero_eiffeltower.png/m/3840x2560/filters:quality(70)",
    highlights: "Experience the sparkling lights of the Eiffel Tower at night Discover timeless art at the world-famous Louvre Museum Enjoy a romantic Seine River cruise with stunning city views",
    guideId: "guide_bangkok_003",
    creator: "Keen_Kung",
    creator_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
  },
  {
    id: 4,
    title: "Chiang Mai Adventure",
    duration: 6,
    copies: 890,
    price: 700,
    rating: 4.6,
    image: "https://a.storyblok.com/f/239725/4096x2731/c3337fde3a/01_fr_par_hero_eiffeltower.png/m/3840x2560/filters:quality(70)",
    highlights: "Experience the sparkling lights of the Eiffel Tower at night Discover timeless art at the world-famous Louvre Museum Enjoy a romantic Seine River cruise with stunning city views",
    guideId: "guide_chiangmai_004",
    creator: "Keen_Kung",
    creator_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
  },
  {
    id: 5,
    title: "Tokyo Highlights",
    duration: 5,
    copies: 2103,
    price: 1500,
    rating: 4.9,
    image: "https://a.storyblok.com/f/239725/4096x2731/c3337fde3a/01_fr_par_hero_eiffeltower.png/m/3840x2560/filters:quality(70)",
    highlights: "Experience the sparkling lights of the Eiffel Tower at night Discover timeless art at the world-famous Louvre Museum Enjoy a romantic Seine River cruise with stunning city views",
    guideId: "guide_tokyo_005",
    creator: "Keen_Kung",
    creator_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
  },{
    id: 6,
    title: "Trip to Paris",
    image: "https://a.storyblok.com/f/239725/4096x2731/c3337fde3a/01_fr_par_hero_eiffeltower.png/m/3840x2560/filters:quality(70)",
    copies: 473,
    duration: 5,
    price: 35000,
    rating: 4.7,
    highlights: "Experience the sparkling lights of the Eiffel Tower at night Discover timeless art at the world-famous Louvre Museum Enjoy a romantic Seine River cruise with stunning city views",
    guideId: "GUIDE-PARIS-001",
    creator: "Keen_Kung",
    creator_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
  },
  {
    id: 7,
    title: "Tokyo Adventure",
    image: "https://a.storyblok.com/f/239725/4096x2731/c3337fde3a/01_fr_par_hero_eiffeltower.png/m/3840x2560/filters:quality(70)",
    copies: 892,
    duration: 7,
    price: 42000,
    rating: 4.9,
    highlights: "Experience the sparkling lights of the Eiffel Tower at night Discover timeless art at the world-famous Louvre Museum Enjoy a romantic Seine River cruise with stunning city views",
    guideId: "GUIDE-TOKYO-002",
    creator: "TokyoExplorer",
    creator_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
  },
  {
    id: 8,
    title: "Bali Beach Paradise",
    image: "https://a.storyblok.com/f/239725/4096x2731/c3337fde3a/01_fr_par_hero_eiffeltower.png/m/3840x2560/filters:quality(70)",
    copies: 651,
    duration: 4,
    price: 28000,
    rating: 4.6,
    highlights: "Experience the sparkling lights of the Eiffel Tower at night Discover timeless art at the world-famous Louvre Museum Enjoy a romantic Seine River cruise with stunning city views",
    guideId: "GUIDE-BALI-003",
    creator: "BeachLover99",
    creator_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
  },
  {
    id: 9,
    title: "Mountain Hiking Guide",
    image: "https://a.storyblok.com/f/239725/4096x2731/c3337fde3a/01_fr_par_hero_eiffeltower.png/m/3840x2560/filters:quality(70)",
    copies: 324,
    duration: 3,
    price: 15000,
    rating: 4.5,
    highlights: "Experience the sparkling lights of the Eiffel Tower at night Discover timeless art at the world-famous Louvre Museum Enjoy a romantic Seine River cruise with stunning city views",
    guideId: "GUIDE-MOUNTAIN-004",
    creator: "MountainMan",
    creator_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
  },
  {
    id: 10,
    title: "New York City Lights",
    image: "https://a.storyblok.com/f/239725/4096x2731/c3337fde3a/01_fr_par_hero_eiffeltower.png/m/3840x2560/filters:quality(70)",
    copies: 789,
    duration: 6,
    price: 30000,
    rating: 4.8,
    highlights: "Experience the sparkling lights of the Eiffel Tower at night Discover timeless art at the world-famous Louvre Museum Enjoy a romantic Seine River cruise with stunning city views",
    guideId: "GUIDE-NYC-005",
    creator: "CityGuide_NYC",
    creator_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
  },
  {
    id: 11,
    title: "Swiss Alps Experience",
    image: "https://a.storyblok.com/f/239725/4096x2731/c3337fde3a/01_fr_par_hero_eiffeltower.png/m/3840x2560/filters:quality(70)",
    copies: 445,
    duration: 8,
    price: 50000,
    rating: 4.9,
    highlights: "Experience the sparkling lights of the Eiffel Tower at night Discover timeless art at the world-famous Louvre Museum Enjoy a romantic Seine River cruise with stunning city views",
    guideId: "GUIDE-ALPS-006",
    creator: "AlpineAdventurer",
    creator_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
  }
];