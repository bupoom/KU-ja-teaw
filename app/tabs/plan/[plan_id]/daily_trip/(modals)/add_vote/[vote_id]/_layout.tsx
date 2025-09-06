import { Stack } from "expo-router";
export default () => (
  <Stack screenOptions={{ presentation: "modal" }}>
    {/* Vote Place */}
    <Stack.Screen name="vote_place/index" options={{ title: "Vote Place" }}/>
    <Stack.Screen name="vote_place/select_time" options={{ title: "Select Time" }}/>
    <Stack.Screen name="vote_place/search_place" options={{ title: "Search Place" }}/>
    <Stack.Screen name="vote_place/place_detail" options={{ title: "Place Detail" }}/>
    {/* Vote Event */}
    <Stack.Screen name="vote_event/index" options={{ title: "Vote Event" }}/>
    <Stack.Screen name="vote_event/select_time" options={{ title: "Select Time" }}/>
    <Stack.Screen name="vote_event/select_transport" options={{ title: "Transport" }}/>
  </Stack>
);
