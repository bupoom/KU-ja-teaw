// components/SearchBar.tsx
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onChangeText?: (text: string) => void;
  value?: string;
  editable?: boolean;
  onPress?: () => void; // For non-editable search bars that navigate to search page
  showSearchIcon?: boolean;
  containerStyle?: string;
  inputStyle?: string;
  iconColor?: string;
  iconSize?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  onSearch,
  onFocus,
  onBlur,
  onChangeText,
  value,
  editable = true,
  onPress,
  showSearchIcon = true,
  containerStyle = "",
  inputStyle = "",
  iconColor = "#666",
  iconSize = 20
}) => {
  const [searchQuery, setSearchQuery] = useState(value || "");

  const handleChangeText = (text: string) => {
    setSearchQuery(text);
    onChangeText?.(text);
  };

  const handleSearch = () => {
    onSearch?.(searchQuery);
  };

  const handleSubmitEditing = () => {
    handleSearch();
  };

  // Non-editable search bar (clickable, navigates to search page)
  if (!editable && onPress) {
    return (
      <View className={`px-4 -mt-6 mb-6 ${containerStyle}`}>
        <TouchableOpacity
          onPress={onPress}
          className="bg-white rounded-full px-4 py-3 shadow-sm border border-gray_border flex-row items-center"
        >
          {showSearchIcon && (
            <Feather name="search" size={iconSize} color={iconColor} />
          )}
          <View className="ml-3 flex-1">
            <TextInput
              placeholder={placeholder}
              className={`text-gray-400 ${inputStyle}`}
              editable={false}
              pointerEvents="none"
            />
          </View>
        </TouchableOpacity>
        <View className="mt-4 w-full h-px bg-gray-300" />
      </View>
    );
  }

  // Editable search bar (for actual search functionality)
  return (
    <View className={`px-4 mb-4 ${containerStyle}`}>
      <View className="bg-white rounded-full px-4 py-3 shadow-sm border border-gray-200 flex-row items-center">
        {showSearchIcon && (
          <TouchableOpacity onPress={handleSearch}>
            <Feather name="search" size={iconSize} color={iconColor} />
          </TouchableOpacity>
        )}
        <TextInput
          value={searchQuery}
          onChangeText={handleChangeText}
          onSubmitEditing={handleSubmitEditing}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`flex-1 ml-3 text-gray-800 ${inputStyle}`}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
      </View>
    </View>
  );
};

export default SearchBar;