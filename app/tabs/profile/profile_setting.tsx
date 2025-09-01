import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const EditProfile = () => {
    const router = useRouter();
    const [name, setName] = useState('Oshi');
    const [phoneNumber, setPhoneNumber] = useState('0877788877');

    const handleSave = () => {
        // Validation
        if (!name.trim()) {
            Alert.alert("Error", "Please enter your name");
            return;
        }
        if (!phoneNumber.trim()) {
            Alert.alert("Error", "Please enter your phone number");
            return;
        }

        // Save logic here
        Alert.alert("Success", "Profile updated successfully!");
        // Save API here console.log("Profile saved:", { name, phoneNumber });
        Alert.alert(name);
        Alert.alert(phoneNumber);
        router.back()
    };

    const handleEditAvatar = () => {
        Alert.alert(
            "Edit Avatar",
            "Choose an option",
            [
                {
                    text: "Camera",
                    onPress: () => console.log("Open camera")
                },
                {
                    text: "Gallery",
                    onPress: () => console.log("Open gallery")
                },
                {
                    text: "Cancel",
                    style: "cancel"
                }
            ]
        );
    };

    return (
        <View className="flex-1 bg-gray-50">
            <View className="px-6 mt-12">
                {/* Avatar Section */}
                <View className="items-center mb-8">
                    <View className="relative">
                        {/* Avatar Circle */}
                        <View className="w-24 h-24 bg-gray-300 rounded-full items-center justify-center">
                            <Ionicons name="person" size={40} color="#666" />
                        </View>
                        
                        {/* Edit Button */}
                        <TouchableOpacity 
                            onPress={handleEditAvatar}
                            className="absolute -bottom-1 -right-1 w-8 h-8 bg-gray-400 rounded-full items-center justify-center"
                        >
                            <Ionicons name="pencil" size={16} color="white" />
                        </TouchableOpacity>
                    </View>
                    
                    <Text className="text-gray-600 text-sm mt-2">Edit your avatar pic</Text>
                </View>

                {/* Name Field */}
                <View className="mb-6">
                    <Text className="text-gray-800 text-base font-medium mb-2">Name</Text>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter your name"
                        className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-base"
                    />
                </View>

                {/* Phone Number Field */}
                <View className="mb-8">
                    <Text className="text-gray-800 text-base font-medium mb-2">Phone Number</Text>
                    <TextInput
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        placeholder="Enter your phone number"
                        keyboardType="phone-pad"
                        className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-base"
                    />
                </View>

                {/* Save Button */}
                <TouchableOpacity 
                    onPress={handleSave}
                    className="bg-green-700 rounded-lg py-4 items-center"
                >
                    <Text className="text-white text-base font-semibold">Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default EditProfile