import client from "../client";

const endpoints = {
    bookmark: {
        getbookmarkPlaces: "/api/users/bookmarks/places",
        unbookmarkPlace: "/api/users/bookmarks/places",
        getbookmarkGuides: "/api/users/bookmarks/guides",
        unbookmarkGuide: "/api/users/bookmarks/guides",
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

export const getBookmarkGuideList = async (): Promise<GuideBox[]> => {
    try {
        console.log("fetching User Bookmark..");
        const response = (await client.get(
            endpoints.bookmark.getbookmarkGuides
        )) as { data: { guide_bookmarks: any[] } };

        const bookmarks = response.data.guide_bookmarks || [];
        const guides: GuideBox[] = [];

        for (let i = 0; i < bookmarks.length; i++) {
            const serverData = bookmarks[i];
            guides.push({
                id: serverData.gbookmark_id,
                title: serverData.trip_url, // อย่าลืมเปลี่ยนกลับด้วยตัวกุในอนาคต
                start_date: "",
                end_date: "",
                guide_image: serverData.trip_picture_path,
                copies: -1,
                owner_name: serverData.trip_owner,
                owner_image: "",
                description: "",
                trip_id: serverData.trip_id,
            });
        }

        return guides;
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};

export const UnbookmarkByGuideId = async (
    bookmarkid: number
): Promise<boolean> => {
    try {
        console.log("Delete User Bookmark by bookmarkID:", bookmarkid);
        
        const response = await client.delete(
            `${endpoints.bookmark.unbookmarkGuide}/${bookmarkid}`
        ) as {data: {message : string}};
        
        console.log("API Response:", response.data);
        
        // Object mapping แทน switch case
        const messageMap: Record<string, string> = {
            "Removed Guide from user's bookmark": "completed",
            "Guide doesn't exist inside user's bookmark": "guideId not in user bookmark list",
            "trip_id is required": "invalid guideId"
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

export const UnbookmarkByPlaceId = async (
    bookmarkid: number
): Promise<boolean> => {
    try {
        console.log("Delete User Bookmark by bookmarkID:", bookmarkid);
        
        const response = await client.delete(
            `${endpoints.bookmark.unbookmarkPlace}/${bookmarkid}`
        ) as {data: {message : string}};
        
        console.log("API Response:", response.data);
        
        // Object mapping แทน switch case
        const messageMap: Record<string, string> = {
            "Place from user's bookmark removed": "completed",
            "Place doesn't exist in user's bookmark": "placeId not in user bookmark list",
            "place_id is required": "invalid placeId"
        };
        
        const message = response.data.message || "";
        const result = messageMap[message] || "invalid placeId";
        
        console.log("Processed result:", result);
        return result === "completed";
        
    } catch (error) {
        console.error("Unbookmark error:", error);
        throw error;
    }
};
