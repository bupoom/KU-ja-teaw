import {
    Alert,
    Image,
    Linking,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useEffect, useState } from "react";

import Header from "@/components/common/Header";
import NoteItem from "@/components/plan/NoteItem";

import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { getPlaceDetails } from "@/service/APIserver/placeDetail";
import {
    addActivitiesNote,
    getActivitiesNote,
    updateActivitiesNote,
} from "@/service/APIserver/Note";
import { get_more_detail } from "@/service/APIserver/userService";
import { truncateText } from "@/util/truncateText";

const PlaceDetailPage = () => {
    const { plan_id, place_detail_id, place_id } = useLocalSearchParams<{
        plan_id: string;
        place_detail_id: string;
        place_id: string;
    }>();

    const router = useRouter();
    const [placeDetail, setPlaceDetail] = useState<PlaceDetails | null>(null);
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
                parseInt(place_detail_id),
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
        if (place_detail_id && plan_id) {
            const parsedTripId = parseInt(plan_id);
            const parsedActivityId = parseInt(place_detail_id);

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

            const fetchPlaceDetails = async () => {
                try {
                    const detail = await getPlaceDetails(place_id, "place");
                    if (detail) {
                        setPlaceDetail(detail);
                    }
                    const relatedNotes = await getActivitiesNote(
                        parsedTripId,
                        parsedActivityId
                    );
                    setNotes(relatedNotes);
                } catch (error) {
                    Alert.alert("Failed to fetch place details.");
                }
            };

            fetchUserDetails();
            fetchPlaceDetails();

            console.log(`place_detail_id: ${place_detail_id}`);
            console.log(`plan_id: ${plan_id}`);
            console.log(`place_id: ${place_id}`);
        }
    }, [place_detail_id, plan_id, place_id]);

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
        console.log("PlaceDetail updated:", placeDetail);
    }, [placeDetail]);

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
                {/* Place Image */}
                <Image
                    source={{ uri: placeDetail?.place_image }}
                    className="w-full h-60"
                    resizeMode="cover"
                />

                {/* Place Info Container */}
                <View className="mx-4 mt-4 mb-4 bg-white rounded-lg border border-gray_border p-6">
                    {/* Title */}
                    <Text className="text-2xl font-bold text-black mb-3">
                        {placeDetail?.title}
                    </Text>

                    {/* Categories */}
                    {placeDetail?.categories &&
                        placeDetail.categories.length > 0 && (
                            <View className="flex-row flex-wrap mb-3">
                                {placeDetail.categories.map(
                                    (category, index) => (
                                        <View
                                            key={index}
                                            className="bg-white rounded-xl px-2 py-1 mr-2 mb-1 border border-gray_border"
                                        >
                                            <Text className="text-xs text-dark_gray">
                                                {category}
                                            </Text>
                                        </View>
                                    )
                                )}
                            </View>
                        )}

                    {/* Rating */}
                    <View className="flex-row items-center mb-3">
                        <Ionicons name="star" size={16} color="#FFD700" />
                        <Text className="text-sm text-gray-600 ml-2">
                            {placeDetail?.rating} (
                            {(placeDetail?.review_count ?? 0).toLocaleString()}{" "}
                            Reviews)
                        </Text>
                    </View>

                    {/* Location with map icon */}
                    <View className="flex-row items-center mb-3">
                        <Ionicons
                            name="location-outline"
                            size={18}
                            color="#666"
                        />
                        {placeDetail?.map_link && (
                            <TouchableOpacity
                                onPress={() =>
                                    Linking.openURL(placeDetail.map_link!)
                                }
                                className="flex-row items-center"
                            >
                                <Text className="text-sm text-gray-600 ml-2 mr-2">
                                    {truncateText(placeDetail.location, 30)}
                                </Text>
                                <Feather
                                    name="external-link"
                                    size={14}
                                    color="#666"
                                />
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Official website */}
                    {placeDetail?.official_link && (
                        <View className="flex-row items-center mb-4 ">
                            <MaterialCommunityIcons
                                name="web"
                                size={18}
                                color="#666"
                            />
                            <TouchableOpacity
                                onPress={() =>
                                    Linking.openURL(placeDetail.official_link!)
                                }
                                className="flex-row items-center"
                            >
                                <Text
                                    className="text-sm text-blue_button ml-2 mr-2"
                                    numberOfLines={1}
                                >
                                    {placeDetail.official_link.replace(
                                        /(^\w+:|^)\/\//,
                                        ""
                                    )}
                                </Text>
                                <Feather
                                    name="external-link"
                                    size={16}
                                    color="#666"
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                {/* Overview Section */}
                <View className="mx-4 mb-4 bg-white rounded-lg border border-gray_border p-6">
                    <Text className="text-xl font-bold text-black mb-3">
                        Overview
                    </Text>
                    <Text className="text-sm leading-5 text-gray-700">
                        {placeDetail?.description}
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

export default PlaceDetailPage;
