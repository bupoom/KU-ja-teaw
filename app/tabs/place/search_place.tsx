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
} from 'react-native';
import { Feather , Entypo } from '@expo/vector-icons';
import PlaceBox , { MockDataPlace }  from '@/components/PlaceBox';

//  สิ่งที่ต้องแก้ไขเพิ่มเติมคือ
//  - ใส่ API Function 
//  - ใส่ routing ไปยังหน้านั้นๆ
//  - เขียนฟังชั่นค้นหาใหม่

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<PlaceDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  
  // Auto focus เมื่อเข้าหน้ามาจะทำให้ page มีแป้นพิมและ cursor อยู่บน search bar ทันที
  const searchInputRef = useRef<TextInput>(null);
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  // Search function API???
  const Search_with_query = (query: string): PlaceDetails[] => {
    if (!query.trim()) {
      return [];
    }

    return MockDataPlace.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.location.toLowerCase().includes(query.toLowerCase())
    );
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
          renderItem={({ item }) => (
            <TouchableOpacity style={{ marginBottom: 10 }}>
              <PlaceBox {...item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          className="m-2 pb-5"
          ListEmptyComponent={renderEmptyState}
        />
    </SafeAreaView>
  );
};

export default SearchScreen;