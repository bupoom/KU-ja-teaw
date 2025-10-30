import { AuthService } from "@/service/authService";
import {
    GoogleSignin,
    GoogleSigninButton,
    isSuccessResponse
} from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";

// ✅ Temporary Type (ถ้ามีอยู่แล้วลบได้)
type UserDetails = {
    user_id: string;
    name: string;
    phone: string;
    profile_picture_link?: string;
    email: string;
};

export default function AuthScreen() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [serverStatus, setServerStatus] = useState("⌛ Checking server...");

    useEffect(() => {
        GoogleSignin.configure({
            webClientId:
                "135126503585-6jtgcr57tt7boqk36c4u0c0be24ocolf.apps.googleusercontent.com",
            profileImageSize: 150,
            offlineAccess: true,
        });
    }, []);

    const handleSignIn = async () => {
        if (serverStatus.startsWith("❌")) {
            return Alert.alert("Error", "Server not reachable yet.");
        }

        try {
            setIsSubmitting(true);
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();

            if (isSuccessResponse(response)) {
                const { idToken } = response.data;
                if (!idToken) return Alert.alert("Error", "Missing ID Token");
                const result = await AuthService.login(idToken);
                if (!result.success)
                    return Alert.alert("Error", "Account not found");

                if (!result.newUser) {
                    Alert.alert("Welcome Back");
                    router.push("/tabs/(home)");
                    return;
                }

                if (!result.user?.user_id)
                    return Alert.alert("Error", "Invalid user data");

                router.push({
                    pathname: "/auth/set_profile" as any,
                    params: {
                        userName: result.user.name,
                        userEmail: result.user.email,
                        userPhoto: result.user.profile_picture_link || "",
                    },
                });
            } else {
                Alert.alert("Cancelled", "Google sign-in cancelled.");
            }
        } catch (error) {
            console.error("Google Sign-In Error:", error);
            Alert.alert("Error", "Login failed");
        } finally {
            setIsSubmitting(false);
        }
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
                        source={require("../../assets/images/gg_signin.png")}
                        style={styles.authImage}
                        resizeMode="contain"
                    />
                </View>

                <Text style={styles.serverText}>
                    {serverStatus}
                </Text>

                <View style={styles.buttonContainer}>
                    <GoogleSigninButton
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={handleSignIn}
                        disabled={isSubmitting}
                        style={styles.googleButton}
                    />

                    {isSubmitting && (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="small" />
                            <Text style={styles.loadingText}>
                                Signing in...
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        flex: 1,
        paddingHorizontal: 30,
        alignItems: "center",
        justifyContent: "space-around",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginTop: 50,
    },
    subtitle: {
        fontSize: 16,
        textAlign: "center",
        paddingHorizontal: 20,
    },
    imageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        maxHeight: 300,
    },
    authImage: {
        width: "80%",
        height: "100%",
    },
    serverText: {
        marginTop: 5,
        color: "#34495e",
        fontSize: 14,
    },
    buttonContainer: {
        width: "100%",
        alignItems: "center",
        marginBottom: 50,
    },
    googleButton: {
        width: "100%",
        height: 48,
    },
    loadingContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
    },
    loadingText: {
        marginLeft: 10,
    },
});
