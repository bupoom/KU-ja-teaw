import { View, Text, TouchableOpacity, Switch, Alert, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';;

const Setting = () => {
    const router = useRouter();
    const [notificationEnabled, setNotificationEnabled] = useState(true);
    const [notificationDays, setNotificationDays] = useState('1'); // ใช้ state แทน let

    const onChangeNumber = (value: string) => {
        // กรองให้เป็นตัวเลขเท่านั้น
        const numericValue = value.replace(/[^0-9]/g, '');
        setNotificationDays(numericValue);
    }

    const handleLogout = () => {
        // delete login data
        router.replace('/')
    };

    return (
        <View className="flex-1 bg-white">
            {/* Settings Content */}
            <View className="px-4 mt-10">
                {/* Notification Setting */}
                <View className='px-3 mx-3 border-2 border-gray-300 rounded-xl'>
                    <View className="flex-row items-center justify-between">
                        <Text className="ml-2 text-base font-medium">Notification</Text>
                        <Switch
                            value={notificationEnabled}
                            onValueChange={setNotificationEnabled}
                            trackColor={{ false: '#E5E5E5', true: '#34D399' }}
                            thumbColor={notificationEnabled ? '#FFFFFF' : '#FFFFFF'}
                        />
                    </View>
                    
                    {/* Notification Before Setting */}
                    <View className="flex-row items-center ml-2 mb-3">
                        <Ionicons name="time-outline" size={20} color="#666" />
                        <Text className="text-base text-gray-600 ml-3">Notification Before : </Text>
                        <TextInput
                            value={notificationDays}
                            onChangeText={onChangeNumber}
                            placeholder="1"
                            keyboardType="numeric"
                            className="px-2 py-1 min-w-[50px] text-center mx-2"
                            maxLength={2}
                        />
                        <Text className="text-base text-gray-600">Days</Text>
                    </View>
                </View>

                {/* Logout Option */}
                <View className='px-3 my-5 mx-3 border-2 border-gray-300 rounded-xl'>
                    <TouchableOpacity 
                        onPress={handleLogout}
                        className="flex-row items-center justify-between py-4"
                    >
                        <Text className="text-base font-medium ml-2 ">Logout</Text>
                        <Ionicons name="exit-outline" size={20} color="black" />
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

export default Setting