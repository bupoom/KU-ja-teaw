import { Link } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
const set_profile = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>set_profile</Text>
      <Link href="/tabs" asChild>
        <TouchableOpacity style={{ marginTop: 20, padding: 10, backgroundColor: "#007AFF", borderRadius: 5 }}>
          <Text>Go to Home</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default set_profile;
