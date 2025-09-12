import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  SafeAreaView, 
  Alert,
  ActivityIndicator 
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  GoogleSignin, 
  GoogleSigninButton,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,  
} from "@react-native-google-signin/google-signin";
import { loginWithGoogleToken, UserData } from '@/service/login';

const AuthScreen: React.FC = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "135126503585-6jtgcr57tt7boqk36c4u0c0be24ocolf.apps.googleusercontent.com",
      profileImageSize: 150,
      offlineAccess: true,
    });
  }, []);

  const handleGoogleSignIn = async (): Promise<void> => {
    try {
      setIsSubmitting(true);
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      
      if (isSuccessResponse(response)) {
        const { data } = response;
        if (!data.idToken) {
          Alert.alert("Error", "Failed to get authentication token.");
          return;
        }
        const userData: UserData = await loginWithGoogleToken(data.idToken);
        const userInfo = {
          idToken: data.idToken,
          name: userData.name || data.user.name || 'Unknown User',
          email: userData.email || data.user.email || '',
          photo: userData.profile_picture_url || data.user.photo || '',
          userId: userData.user_id,
          accessToken: userData.access_token,
          refreshToken: userData.refresh_token,
        };
        if 
        console.log('Google Sign-In Success:', userInfo);
        Alert.alert(
          "Sign In Successful",
          `Welcome ${userInfo.name}!`,
          [
            {
              text: "OK",
              onPress: () => {
                // Navigate to home with user data
                router.replace({
                  pathname: '/auth/set_profile' as any,
                  params: {
                    userName: userInfo.name,
                    userEmail: userInfo.email,
                    userPhoto: userInfo.photo,
                    idToken: userInfo.idToken,
                    userId: userInfo.userId,
                    accessToken: userInfo.accessToken,
                  },
                });
              },
            },
          ]
        );
      } else {
        Alert.alert("Cancelled", "Google sign-in was cancelled.");
      }
      
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            Alert.alert("Cancelled", "Google sign-in was cancelled.");
            break;
          case statusCodes.IN_PROGRESS:
            Alert.alert("In Progress", "Google sign-in is already in progress.");
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            Alert.alert("Error", "Play services are not available.");
            break;
          default:
            Alert.alert("Error", `Sign-in failed: ${error.code}`);
            break;
        }
      } else {
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred. Please try again.";
        Alert.alert("Error", errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkipSignIn = (): void => {
    Alert.alert(
      "Skip Sign In",
      "Are you sure you want to continue without signing in?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Continue",
          onPress: () => {
            router.replace('/tabs/(home)' as any);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Sign Up Now</Text>
        <Text style={styles.subtitle}>
          Join us and discover amazing features
        </Text>
        
        <View style={styles.imageContainer}>
          <Image 
            source={require('../../assets/images/gg_signin.png')}
            style={styles.authImage}
            resizeMode="contain"
          />
        </View>
        
        <View style={styles.buttonContainer}>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={handleGoogleSignIn}
            disabled={isSubmitting}
            style={styles.googleButton}
          />
          
          {isSubmitting && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#4285f4" />
              <Text style={styles.loadingText}>Signing in...</Text>
            </View>
          )}
          
          <TouchableOpacity 
            style={[styles.skipButton, isSubmitting && styles.disabledButton]}
            onPress={handleSkipSignIn}
            disabled={isSubmitting}
          >
            <Text style={[styles.skipText, isSubmitting && styles.disabledText]}>
              Skip for now
            </Text>
          </TouchableOpacity>
        </View>
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
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxHeight: 300,
    marginVertical: 20,
  },
  authImage: {
    width: '80%',
    height: '100%',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 50,
  },
  googleButton: {
    width: '100%',
    height: 48,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#4285f4',
  },
  skipButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  skipText: {
    fontSize: 16,
    color: '#4285f4',
    textAlign: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledText: {
    color: '#bdc3c7',
  },
});

export default AuthScreen;