import apiClient from "../client";
import { changeDateformat } from "@/util/formatFucntion/makeDateCorrect";

const endpoints = {
    bookmark: {
        place: "/api/users/bookmarks/places",
        guide: "/api/users/bookmarks/guides",
        autoComplete: "/api/places/autocomplete",
        searchGuideByid: "/api/search/guides",
    },
};

// getBookmarkPlaceList && getBookmarkGuideList อยู่หน้า tabs/place หรือ guide/index
// UnbookmarkByPlaceId && UnbookmarkByGuideId อยู่ใน component

// ------------------------------ Place --------------------------------------
// fetch user bookmark ทั้งหมด
export const getBookmarkPlaceList = async (): Promise<PlaceBox[]> => {
    try {
        console.log("fetching User Bookmark..");
        const response = (await apiClient.get(endpoints.bookmark.place)) as {
            data: { bookmarks: any[] };
        };

        const bookmarks = response.data.bookmarks || [];
        const places: PlaceBox[] = [];

        for (let i = 0; i < bookmarks.length; i++) {
            const serverData = bookmarks[i];
            places.push({
                id: serverData.bookmark_id,
                title: serverData.name,
                rating: parseFloat(serverData.rating),
                review_count: serverData.rating_count,
                location: serverData.address,
                place_image: serverData.places_picture_path,
                place_id: serverData.place_id,
            });

            console.log(places[i]);
        }
        return places;
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};
// เพิ่ม bookmark user ด้วย Id
export const addPlaceToBookmark = async (
    bookmarkid: number
): Promise<boolean> => {
    try {
        console.log("Deleting User Bookmark by bookmarkID:", bookmarkid);
        const response = (await apiClient.post(
            `${endpoints.bookmark.place}/${bookmarkid}`
        )) as { data: { message: string } };
        const messageMap: Record<string, string> = {
            "Bookmark added": "completed",
            "Place already bookmarked by user":
                "placeId not in user bookmark list",
            "place_id is required": "invalid placeId",
        };
        const message = response.data.message || "";
        const result = messageMap[message] || "invalid placeId";

        console.log("bookmark completed!!", result);
        return result === "completed";
    } catch (error) {
        console.error("bookmark error:", error);
        throw error;
    }
};
// ลบ bookmark user
export const UnbookmarkByPlaceId = async (
    bookmarkid: number
): Promise<boolean> => {
    try {
        console.log("Delete User Bookmark by bookmarkID:", bookmarkid);

        const response = (await apiClient.delete(
            `${endpoints.bookmark.place}/${bookmarkid}`
        )) as { data: { message: string } };

        console.log("API Response:", response.data);

        // Object mapping แทน switch case
        const messageMap: Record<string, string> = {
            "Place from user's bookmark removed": "completed",
            "Place doesn't exist in user's bookmark":
                "placeId not in user bookmark list",
            "place_id is required": "invalid placeId",
        };

        const message = response.data.message || "";
        const result = messageMap[message] || "invalid placeId";

        console.log("Unbookmark completed!! :", result);
        return result === "completed";
    } catch (error) {
        console.error("Unbookmark error:", error);
        throw error;
    }
};

export const SearchPlaceByInput = async (
    input: string
): Promise<SearchPlaces[]> => {
    try {
        console.log("fetching by user input...");
        const response = (await apiClient.get(
            `${endpoints.bookmark.autoComplete}/${input}`
        )) as {
            data: { suggestions: any[] };
        };

        const data = response.data.suggestions || [];
        const places: SearchPlaces[] = [];

        for (let i = 0; i < data.length; i++) {
            const Data = data[i];
            places.push({
                text: Data.placePrediction.text.text,
                placeId: Data.placePrediction.placeId,
            });
        }
        console.log("result : ", places);
        return places;
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};

// ------------------------------ Guide --------------------------------------
// fetch user bookmark ทั้งหมด
export const getBookmarkGuideList = async (): Promise<GuideBox[]> => {
    try {
        console.log("fetching User Bookmark..");
        const response = (await apiClient.get(endpoints.bookmark.guide)) as {
            data: { guide_bookmarks: any[] };
        };

        const bookmarks = response.data.guide_bookmarks || [];
        const guides: GuideBox[] = [];

        for (let i = 0; i < bookmarks.length; i++) {
            const serverData = bookmarks[i];
            guides.push({
                id: serverData.gbookmark_id,
                title: serverData.trip_url, // อย่าลืมเปลี่ยนกลับด้วยตัวกุในอนาคต
                start_date: changeDateformat(serverData.start_date), // อย่าลืมเปลี่ยนกลับด้วยตัวกุในอนาคต
                end_date: changeDateformat(serverData.end_date), // อย่าลืมเปลี่ยนกลับด้วยตัวกุในอนาคต
                guide_image: serverData.trip_picture_path,
                copies: Number(serverData.likes),
                owner_name: serverData.trip_owner,
                owner_image: serverData.trip_owner_picture_path, // earnแก้อยู่
                description: "",
                trip_id: serverData.trip_id,
            });
        }
        console.log("FUCK REACT NATIVE : ", guides[0]);
        return guides;
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};
// เพิ่ม bookmark user ด้วย Id
export const BookmarkByGuideId = async (
    // ยังไม่เอาไปแปะที่ไหน
    bookmarkid: number
): Promise<string> => {
    try {
        console.log("Add User Guide Bookmark by bookmarkID:", bookmarkid);

        const response = (await apiClient.post(
            `${endpoints.bookmark.guide}/${bookmarkid}`
        )) as { data: { message: string } };
        console.log("API Response:", response.data);
        const message = response.data.message || "";

        console.log("Processed result:", message);
        return message;
    } catch (error) {
        console.error("Unbookmark error:", error);
        throw error;
    }
};

// ลบ bookmark user
export const UnbookmarkByGuideId = async (
    bookmarkid: number
): Promise<boolean> => {
    try {
        console.log("Delete User Bookmark by bookmarkID:", bookmarkid);

        const response = (await apiClient.delete(
            `${endpoints.bookmark.guide}/${bookmarkid}`
        )) as { data: { message: string } };

        console.log("API Response:", response.data);

        // Object mapping แทน switch case
        const messageMap: Record<string, string> = {
            "Removed Guide from user's bookmark": "completed",
            "Guide doesn't exist inside user's bookmark":
                "guideId not in user bookmark list",
            "trip_id is required": "invalid guideId",
        };

        const message = response.data.message || "";
        const result = messageMap[message] || "invalid guideId";

        console.log("Processed result:", result);
        return result === "completed";
    } catch (error) {
        console.error("Unbookmark error:", error);
        throw error;
    }
};

export const SearchGuideByInput = async (
    input: string
): Promise<GuideBox[]> => {
    try {
        console.log("fetching Search results by user input...");
        const response = (await apiClient.get(
            `${endpoints.bookmark.searchGuideByid}/${input}`
        )) as {
            data: any[];
        };

        const bookmarks = response.data || [];
        const guides: GuideBox[] = [];

        for (let i = 0; i < bookmarks.length; i++) {
            const Data = bookmarks[i];
            guides.push({
                id: Data.trip_id,
                title: Data.guide_name,
                start_date: Data.start_date,
                end_date: Data.end_date,
                guide_image: Data.guide_poster_link,
                copies: Data.total_copied,
                owner_name: Data.owner_name,
                owner_image: "",
                description: "",
                trip_id: Data.trip_id,
            });
        }
        console.log("result : ", guides);
        return guides;
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};