import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  SafeAreaView, 
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { AuthService } from '@/service/authService';

const GetStartScreen = () => {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const loggedIn = await AuthService.isLoggedIn();
        if (loggedIn) {
          router.replace('/tabs/(home)');
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      } finally {
        setIsCheckingAuth(false); // ตั้งค่าให้เสร็จสิ้นการตรวจสอบ
      }
    };

    checkLogin();
  }, []);

  const handleGetStart = () => {
    router.push('/auth'); // ใช้ push แทน replace
  };

  // แสดง loading ขณะตรวจสอบ authentication
  if (isCheckingAuth) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#22c55e" />
          <Text className="text-gray-600 mt-4 text-lg">starting...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Hero Image Section */}
      <View className="h-[60%] w-full">
        <Image 
          source={require('../assets/images/start_img.png')} 
          className="w-full h-full"
          resizeMode="cover" 
        />
      </View>

      {/* Content Section */}
      <View className="flex-1 px-4 py-6 bg-white mt-4">
        {/* Text Content */}
        <View className="items-center mt-4">
          <Text className="font-sf-semibold text-3xl font-bold text-black text-center mb-4 leading-9">
            Welcome to KU JA TEAW 🏔️🌿
          </Text>
          
          <View className="font-sf space-y-1">
            <Text className="text-base text-black text-center leading-6">
              Your journey with close friends starts here
            </Text>
            <Text className="text-base text-black text-center leading-6">
              Plan your perfect trip
            </Text>
            <Text className="text-base text-black text-center leading-6">
              Let&apos;s Travel
            </Text>
          </View>
        </View>
        
        {/* Get Started Button */}
        <View className="px-4 pb-4 mt-10">
          <TouchableOpacity 
            className="bg-green_2 py-4 rounded-xl w-full items-center shadow-lg"
            onPress={handleGetStart}
          >
            <Text className="text-white text-lg font-semibold">
              Get Start
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GetStartScreen;