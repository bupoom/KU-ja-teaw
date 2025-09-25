import { Text } from "react-native";
import client from "../client";

const endpoints = {
    bookmark: {
        getbookmarkPlaces: "/api/users/bookmarks/places",
        unbookmarkPlace: "/api/users/bookmarks/places",
        getbookmarkGuides: "/api/users/bookmarks/guides",
        unbookmarkGuide: "/api/users/bookmarks/guides",
        autoComplete: "/api/places/autocomplete",
    },
};

// getBookmarkPlaceList && getBookmarkGuideList อยู่หน้า tabs/place หรือ guide/index
// UnbookmarkByPlaceId && UnbookmarkByGuideId อยู่ใน component

export const getBookmarkPlaceList = async (): Promise<PlaceBox[]> => {
    try {
        console.log("fetching User Bookmark..");
        const response = (await client.get(
            endpoints.bookmark.getbookmarkPlaces
        )) as {
            data: { bookmarks: any[] };
        };

        const bookmarks = response.data.bookmarks || [];
        const places: PlaceBox[] = [];

        for (let i = 0; i < bookmarks.length; i++) {
            const serverData = bookmarks[i];
            places.push({
                id: serverData.bookmark_id,
                title: serverData.name, // 👈 ใช้ name จาก API
                rating: parseFloat(serverData.rating), // 👈 แปลง string → number
                review_count: serverData.rating_count,
                location: serverData.address,
                place_image: serverData.places_picture_path, // 👈 ใช้ places_picture_path
                place_id: serverData.place_id,
            });
        }

        return places;
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};
