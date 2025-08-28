import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';

const GetStartScreen = () => {
  const router = useRouter();

  const handleGetStart = () => {
    router.replace('/auth');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* รูปที่กุแคปมาเพราะโหลดจาก figma ไม่เป็น ไอสาสสสส */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/start_img.png')}
          style={styles.heroImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Welcome to KU JA TEAW 🌊🌴</Text>
        <Text style={styles.subtitle}>Your journey with close friends starts here</Text>
        <Text style={styles.description}>Plan your perfect trip</Text>
        <Text style={styles.cta}>Let&apos;s Travel</Text>

        {/* Get Started */}
        <TouchableOpacity style={styles.getStartButton} onPress={handleGetStart}>
          <Text style={styles.buttonText}>Get Start</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    flex: 2,
    width: '100%',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 5,
  },
  cta: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 20,
  },
  getStartButton: {
    backgroundColor: '#2d5a3d',
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default GetStartScreen;