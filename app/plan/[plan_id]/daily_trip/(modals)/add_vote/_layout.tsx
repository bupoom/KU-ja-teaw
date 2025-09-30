import { Stack } from "expo-router";

export default function VoteLayout() {
  return (
    <Stack
      screenOptions={{
        presentation: "modal",
        headerShadowVisible: false,
        headerShown: false,
      }}
    >
      {/* Vote Place */}
      <Stack.Screen name="vote_place/select_time" />
      <Stack.Screen name="vote_place/[vote_id]/search_place" />
      <Stack.Screen name="vote_place/[vote_id]/[place_id]" />
      <Stack.Screen name="vote_place/[vote_id]/result_vote" />
      <Stack.Screen name="vote_place/[vote_id]/owner_decision" />

      {/* Vote Event */}
      <Stack.Screen name="vote_event/select_time" />
      <Stack.Screen name="vote_event/[vote_id]/result_vote" />
      <Stack.Screen name="vote_event/[vote_id]/owner_decision" />

      {/* select_type_vote */}
      <Stack.Screen name="select_type_vote" />
    </Stack>
  );
}
