import { View, Text, SafeAreaView } from "react-native";
import Header from "@/components/Header";
import { usePathname, useRouter } from "expo-router";
import { useEffect } from "react";

const index = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleBackPress = () => {
    // router.push(`/tabs/(home)`);
    // router.dismissAll();
    // console.log(`Current before back  ${pathname}`)
    router.back();
  };

  useEffect(() => {
    console.log(pathname)
  }, []);

  return (
    <SafeAreaView>
      <Header title="plan wtf" onBackPress={handleBackPress}></Header>
      <View className="flex items-center justify-center">
        <Text>index</Text>
      </View>
    </SafeAreaView>
  );
};
export default index;
