import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    Alert,
    TextInput,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import Feather from "@expo/vector-icons/Feather";

import Header from "@/components/common/Header";
import TransportationIcon from "@/components/common/TransportIcon";
import NoteItem from "@/components/plan/NoteItem";

import {
    addActivitiesNote,
    getActivitiesNote,
    updateActivitiesNote,
} from "@/service/APIserver/Note";
import { get_more_detail } from "@/service/APIserver/userService";
import { getActivitiesDetails } from "@/service/APIserver/activity";

const EventDetails = () => {
    const { plan_id, event_detail_id } = useLocalSearchParams<{
        plan_id: string;
        event_detail_id: string;
    }>();

    const router = useRouter();
    const [eventDetail, setEventDetail] = useState<ActivityEventBox | null>(
        null
    );
    const [notes, setNotes] = useState<Note[]>([]);
    const [userName, setUserName] = useState<string>("");
    const [userId, setUserId] = useState<string>("");
    const [userProfile, setUserProfile] = useState<string>();
    const [userNotes, setUserNote] = useState<Note | undefined>();
    const [commentNotes, setCommentNotes] = useState<Note[]>([]);

    const handleBackPress = () => {
        router.back();
    };

    const handleAddNote = async () => {
        try {
            const NewNote = await addActivitiesNote(
                parseInt(plan_id),
                parseInt(event_detail_id),
                "write your notes here!!"
            );
            if (!NewNote) {
                Alert.alert("Failed to create new note.");
                return;
            }
            setNotes(prev => [...prev, NewNote]);
        } catch (error) {
            Alert.alert("Failed to create new note.");
        }
    };

    const handleSaveEdit = async (noteId: number, editText: string) => {
        try {
            const res = await updateActivitiesNote(
                parseInt(plan_id),
                noteId,
                editText
            );
            if (res) {
                setNotes(prev =>
                    prev.map(note =>
                        note.id === noteId
                            ? { ...note, note_text: editText }
                            : note
                    )
                );
            } else {
                Alert.alert("Failed to update note.");
            }
        } catch (error) {
            Alert.alert("Failed to update note.");
        }
    };

    // Fetch initial data
    useEffect(() => {
        if (event_detail_id && plan_id) {
            const parsedTripId = parseInt(plan_id);
            const parsedActivityId = parseInt(event_detail_id);

            const fetchUserDetails = async () => {
                try {
                    const user = await get_more_detail(parsedTripId);
                    setUserName(user.username || "");
                    setUserProfile(
                        user?.user_image ||
                            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop"
                    );
                    setUserId(user.user_id);
                } catch (error) {
                    Alert.alert("Failed to fetch user details.");
                }
            };

            const fetchEventDetails = async () => {
                try {
                    // Fetch event details
                    const activity = await getActivitiesDetails(
                        parsedTripId,
                        parsedActivityId
                    );

                    if (activity) {
                        setEventDetail(activity);
                    }

                    // Fetch notes from API
                    const relatedNotes = await getActivitiesNote(
                        parsedTripId,
                        parsedActivityId
                    );
                    setNotes(relatedNotes);
                } catch (error) {
                    Alert.alert("Failed to fetch event details.");
                }
            };

            fetchUserDetails();
            fetchEventDetails();

            console.log(`event_detail_id: ${event_detail_id}`);
            console.log(`plan_id: ${plan_id}`);
        }
    }, [event_detail_id, plan_id]);

    // Filter notes when userId or notes change
    useEffect(() => {
        if (userId && notes.length >= 0) {
            const myNote = notes.find(note => note.refer_user_id === userId);
            const otherNotes = notes.filter(
                note => note.refer_user_id !== userId
            );

            setUserNote(myNote);
            setCommentNotes(otherNotes);
        }
    }, [userId, notes]);

    useEffect(() => {
        console.log("EventDetail updated:", eventDetail);
    }, [eventDetail]);

    return (
        <View className="flex-1 bg-white">
            <Header title="" onBackPress={handleBackPress} />

            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 50,
                }}
            >
                {/* Transportation and Time Info */}
                <View className="mb-4 mr-4 ml-4 mt-6">
                    <View className="flex-row items-stretch gap-x-2">
                        {/* Transportation Section */}
                        <View className="bg-green_2 rounded-lg px-8 py-4">
                            <View className="items-center">
                                <TransportationIcon
                                    transportation={eventDetail?.transportation}
                                    color="#ffffff"
                                    size={30}
                                />
                                <Text className="text-white font-medium text-base mt-2">
                                    {eventDetail?.transportation}
                                </Text>
                            </View>
                        </View>

                        {/* Time Section */}
                        <View className="flex-1 bg-white rounded-lg px-6 py-4 border border-gray_border">
                            <View className="flex-row items-center justify-around">
                                {/* Start Time */}
                                <View className="items-center">
                                    <Text className="text-gray-500 text-xl font-medium mb-2">
                                        Start
                                    </Text>
                                    <Text className="text-black text-2xl font-bold">
                                        {eventDetail?.time_begin}
                                    </Text>
                                </View>

                                {/* Clock Icon */}
                                <Feather
                                    name="clock"
                                    size={30}
                                    color="#6B7280"
                                />

                                {/* End Time */}
                                <View className="items-center">
                                    <Text className="text-gray-500 text-xl font-medium mb-2">
                                        End
                                    </Text>
                                    <Text className="text-black text-2xl font-bold">
                                        {eventDetail?.time_end}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Title Section */}
                <View className="mx-4 mb-4 bg-white rounded-lg border border-gray_border p-6">
                    <Text className="text-xl font-bold text-black mb-3">
                        Title
                    </Text>
                    <Text className="text-base text-gray-700">
                        {eventDetail?.title || "No title"}
                    </Text>
                </View>

                {/* Note Section */}
                <View className="mx-4 mb-4 bg-white rounded-lg border border-gray_border p-6">
                    <Text className="text-xl font-bold text-black mb-3">
                        Note
                    </Text>

                    {/* User's Note */}
                    {userNotes ? (
                        <NoteItem
                            note={userNotes}
                            userId={userId}
                            onSave={handleSaveEdit}
                        />
                    ) : (
                        <View className="flex-col justify-center mb-3">
                            <View className="bg-white rounded-lg p-4 border border-gray_border">
                                <View className="flex-row items-start">
                                    <Image
                                        source={{ uri: userProfile }}
                                        className="w-8 h-8 rounded-full mr-3"
                                    />
                                    <View className="flex-1">
                                        <Text className="font-medium text-gray-900 text-sm mb-1">
                                            {userName}
                                        </Text>
                                        <Text className="text-gray-500 text-sm">
                                            You have no notes yet
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={handleAddNote}
                                className="bg-green_2 rounded-lg py-3 mt-3"
                            >
                                <Text className="text-white text-center font-medium">
                                    Add Note
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Other Users' Comments */}
                    {commentNotes.length === 0 ? (
                        <View className="bg-white rounded-lg p-4 border border-gray_border flex items-center justify-center">
                            <Text className="text-sm font-normal text-dark_gray">
                                No Others Comment
                            </Text>
                        </View>
                    ) : (
                        commentNotes.map(note => (
                            <NoteItem
                                key={note.id}
                                note={note}
                                userId={userId}
                                onSave={handleSaveEdit}
                            />
                        ))
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default EventDetails;
