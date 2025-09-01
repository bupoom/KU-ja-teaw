import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';


const AuthScreen = () => {
  const router = useRouter();

  const handleSignUp = () => {
    router.replace('/tabs/(home)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Sign UP Now</Text>
        
        <View style={styles.imageContainer}>
          <Image 
            source={require('../assets/images/gg_signin.png')}
            style={styles.authImage}
            resizeMode="contain"
          />
        </View>
        
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <View style={styles.buttonContent}>
            <Text style={styles.googleIcon}>G</Text>
            <Text style={styles.buttonText}>Sign UP with Google</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginTop: 50,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxHeight: 300,
  },
  authImage: {
    width: '80%',
    height: '100%',
  },
  signUpButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 50,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4285f4',
    marginRight: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#4285f4',
    borderRadius: 50,
    width: 24,
    height: 24,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonText: {
    color: '#2c3e50',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default AuthScreen;