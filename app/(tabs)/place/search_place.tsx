import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Image 
} from 'react-native';
import { Feather , Entypo, Ionicons } from '@expo/vector-icons';


//  สิ่งที่ต้องแก้ไขเพิ่มเติมคือ
//  - ใส่ API Function 
//  - ใส่ routing ไปยังหน้านั้นๆ
//  - เขียนฟังชั่นค้นหาใหม่

// Type definition สำหรับข้อมูลที่จะแสดง
interface SearchResult {
  id: number;
  title: string;
  rating: number;
  total_rating: number;
  location: string;
  image: string;
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
      title: "Eiffel Tower Tour",
      rating: 4.8,
      total_rating: 1243,
      location: "Paris, France",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
    },
    {
      id: 2,
      title: "Tokyo City Lights",
      rating: 4.7,
      total_rating: 980,
      location: "Tokyo, Japan",
      image: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=800",
    },
    {
      id: 3,
      title: "Bali Beach Paradise",
      rating: 4.6,
      total_rating: 875,
      location: "Bali, Indonesia",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    },
    {
      id: 4,
      title: "Swiss Alps Adventure",
      rating: 4.9,
      total_rating: 1432,
      location: "Zermatt, Switzerland",
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
    },
    {
      id: 5,
      title: "New York City Tour",
      rating: 4.5,
      total_rating: 2034,
      location: "New York, USA",
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800",
    },
    {
      id: 6,
      title: "Rome Historical Walk",
      rating: 4.7,
      total_rating: 1120,
      location: "Rome, Italy",
      image: "https://images.unsplash.com/photo-1526481280695-3c720685208b?w=800",
    },
    {
      id: 7,
      title: "Santorini Sunset View",
      rating: 4.9,
      total_rating: 1543,
      location: "Santorini, Greece",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    },
  ];
  
  // Auto focus เมื่อเข้าหน้ามาจะทำให้ page มีแป้นพิมและ cursor อยู่บน search bar ทันที
  const searchInputRef = useRef<TextInput>(null);
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  // Search function API???
  const Search_with_query = (query: string): SearchResult[] => {
    if (!query.trim()) {
      return [];
    }

    return mockData.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.location.toLowerCase().includes(query.toLowerCase())
    );
  };

  const renderStars = (rating:number) => { // function คิดรูปดาว
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons key={i} name="star" size={14} color="#FFD700" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Ionicons key="half" name="star-half" size={14} color="#FFD700" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Ionicons key={`empty-${i}`} name="star-outline" size={14} color="#E0E0E0" />
      );
    }

    return stars;
  };

  // Handle search ด้วยการ limit เวลา
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
        const results = Search_with_query(searchQuery);
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
       className="bg-white rounded-2xl p-3 m-3 shadow-slate-200 shadow-sm border border-gray-100"
    >
      <View className="flex-row">
        {/* Place Image */}
        <Image
          source={{ uri: item.image }}
          className="w-20 h-20 rounded-xl mr-4"
        />
        
        {/* Place Info */}
        <View className="flex-1">
          <View className="flex-row justify-between items-start mb-2">
            <Text className="text-lg font-semibold text-gray-800 flex-1">
              {item.title}
            </Text>
          </View>
          {/* Rating Row */}
          <View className="flex-row items-center mb-2">
            <View className="flex-row items-center mr-2">
              {renderStars(item.rating)}
            </View>
            <Text className="text-sm text-gray-600 ml-1">
              {item.rating} ({item.total_rating})
            </Text>
          </View>
          {/* Location Info */}
          <View className="flex-row items-center">
            <Feather name="map-pin" size={14} color="#666" />
            <Text className="text-sm text-gray-600 ml-1">{item.location}</Text>
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