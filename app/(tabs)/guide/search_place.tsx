import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StatusBar,
  Image 
} from 'react-native';
import { Feather , Entypo  } from '@expo/vector-icons';


//  สิ่งที่ต้องแก้ไขเพิ่มเติมคือ
//  - ใส่ API Function 
//  - ใส่ routing ไปยังหน้านั้นๆ
//  - เขียนฟังชั่นค้นหาใหม่

// Type definition สำหรับข้อมูลที่จะแสดง (ปรับตามข้อมูลจริงของคุณ)
interface SearchResult {
  id: number;
  title: string;
  image: string;
  copies: number;
  duration: number;
  user: string;
  userAvatar: string;
}

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  
  // ข้อมูลปลอมสำหรับทดสอบ
  const mockData: SearchResult[] = [
    {
      id: 1,
      title: "Trip to Paris",
      image: "https://images2.alphacoders.com/546/546391.jpg",
      copies: 473,
      duration: 5,
      user: "Keen_Kung",
      userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    },
    {
      id: 2,
      title: "Tokyo Adventure",
      image: "https://images2.alphacoders.com/546/546391.jpg",
      copies: 892,
      duration: 7,
      user: "TokyoExplorer",
      userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    },
    {
      id: 3,
      title: "Bali Beach Paradise",
      image: "https://images2.alphacoders.com/546/546391.jpg",
      copies: 651,
      duration: 4,
      user: "BeachLover99",
      userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    },
    {
      id: 4,
      title: "Mountain Hiking Guide",
      image: "https://images2.alphacoders.com/546/546391.jpg",
      copies: 324,
      duration: 3,
      user: "MountainMan",
      userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    },
    {
      id: 5,
      title: "New York City Lights",
      image: "https://images2.alphacoders.com/546/546391.jpg",
      copies: 789,
      duration: 6,
      user: "CityGuide_NYC",
      userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    },
    {
      id: 6,
      title: "Swiss Alps Experience",
      image: "https://images2.alphacoders.com/546/546391.jpg",
      copies: 445,
      duration: 8,
      user: "AlpineAdventurer",
      userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    },
    {
      id: 7,
      title: "Safari in Kenya",
      image: "https://images2.alphacoders.com/546/546391.jpg",
      copies: 278,
      duration: 10,
      user: "WildlifeFan",
      userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    },
    {
      id: 8,
      title: "Rome Historical Tour",
      image: "https://images2.alphacoders.com/546/546391.jpg",
      copies: 567,
      duration: 4,
      user: "HistoryBuff",
      userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    },
    {
      id: 9,
      title: "Iceland Northern Lights",
      image: "https://images2.alphacoders.com/546/546391.jpg",
      copies: 834,
      duration: 5,
      user: "AuroraHunter",
      userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    },
    {
      id: 10,
      title: "Santorini Sunset",
      image: "https://images2.alphacoders.com/546/546391.jpg",
      copies: 692,
      duration: 3,
      user: "GreekIslands",
      userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    }
  ];
  
  // Reference สำหรับ TextInput เพื่อให้ focus ได้
  const searchInputRef = useRef<TextInput>(null);

  // Auto focus เมื่อ component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100); // เพิ่ม delay เล็กน้อยเพื่อให้แน่ใจว่า component render เสร็จแล้ว
    
    return () => clearTimeout(timer);
  }, []);

  // Function สำหรับค้นหาข้อมูลในตัวอย่าง
  const searchMockData = (query: string): SearchResult[] => {
    if (!query.trim()) {
      return [];
    }

    return mockData.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.user.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Handle search with debounce
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        setHasSearched(false);
        setLoading(false);
        return;
      }

      setLoading(true);
      // จำลองการ loading
      setTimeout(() => {
        const results = searchMockData(searchQuery);
        setSearchResults(results);
        setHasSearched(true);
        setLoading(false);
      }, 300);
    }, 500); // Debounce 500ms

    return () => clearTimeout(delayedSearch);
  }, [searchQuery]);

  // Render แต่ละ item ในผลการค้นหา
  const renderSearchResult = ({ item }: { item: SearchResult }) => (
    <TouchableOpacity 
        key={item.id}
        className="bg-white rounded-2xl p-3 m-3 shadow-slate-200 shadow-md border border-gray-100"
    >
        <View className="flex-row">
        {/* Guide Image */}
            <Image source={{ uri: item.image }} className="w-20 h-20 rounded-xl mr-4"/>
                {/* Guide Info */}
                <View className="flex-1">
                    <View className="flex-row justify-between items-start mb-2">
                        <Text className="text-lg font-semibold text-gray-800 flex-1">{item.title} </Text>
                    </View>
                {/* Stats Row */}
                <View className="flex-row items-center mb-2">
                  <View className="flex-row items-center mr-4">
                    <Feather name="copy" size={14} color="#666" />
                    <Text className="text-sm text-gray-600 ml-1">{item.copies} copied</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Feather name="calendar" size={14} color="#666" />
                    <Text className="text-sm text-gray-600 ml-1">{item.duration} days</Text>
                  </View>
                </View>

                {/* user Info */}
                <View className="flex-row items-center">
                  <Image
                    source={{ uri: item.userAvatar }}
                    className="w-5 h-5 rounded-full mr-2"
                  />
                  <Text className="text-sm text-gray-600">{item.user}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
  );

  // Render empty state
  const renderEmptyState = () => (
    <View className="flex-1 justify-center items-center px-8">
      {hasSearched ? (
        <View className="items-center">
          <Text className="text-gray-500 text-lg mb-2">No results found</Text>
          <Text className="text-gray-400 text-center">
            Try searching with different keywords
          </Text>
        </View>
      ) : (
        <View className="items-center">
          <Text className="text-gray-500 text-lg mb-2">Start searching</Text>
          <Text className="text-gray-400 text-center">
            Enter keywords to find what you&apos;re looking for
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView className="h-full bg-white py-14">
        <StatusBar barStyle="dark-content" backgroundColor="#075952" />

        {/* Search Header */}
        <View className="bg-white p-4">
            <View className="flex-row items-center bg-gray-100 rounded-full p-3">
                <Feather name="search" size={20} color="#666" className="mr-3" />
                <TextInput
                    ref={searchInputRef}
                    className="flex-1"
                    placeholder="Search..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="search"
                    clearButtonMode="while-editing" // iOS only
                />
                {loading && (
                  <ActivityIndicator size="small" color="#6b7280" className="ml-2" />
                )}
                <Entypo name="circle-with-cross" size={24} color="black" onPress={() => setSearchQuery("")}/>
            </View>
        </View>

        {/* Search Results */}
        <FlatList
            data={searchResults}
            renderItem={renderSearchResult}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={renderEmptyState}
        />
    </SafeAreaView>
  );
};

export default SearchScreen;