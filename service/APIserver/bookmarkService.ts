import client from "../client";

const endpoints = {
  bookmark: {
    getBookmarkPlaces: "/api/users/bookmarks/places",
    getBookmarkGuides: "/api/users/bookmarks/guides",
  },
};

export const getBookmarkPlaceList = async (): Promise<PlaceBox[]> => {
  try {
    console.log("fetching User Bookmark..");
    const response = await client.get(endpoints.bookmark.getBookmarkPlaces);

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
    const response = await client.get(endpoints.bookmark.getBookmarkGuides);

    const bookmarks = response.data.bookmarks || [];
    const guides: PlaceBox[] = [];

    for (let i = 0; i < bookmarks.length; i++) {
      const serverData = bookmarks[i];
      guides.push({
        id: serverData.bookmark_id,
        title: serverData.name, // 👈 ใช้ name จาก API
        rating: parseFloat(serverData.rating), // 👈 แปลง string → number
        review_count: serverData.rating_count,
        location: serverData.address,
        place_image: serverData.places_picture_path, // 👈 ใช้ places_picture_path
        place_id: serverData.place_id,
      });
    }

    return guides;
  } catch (error) {
    console.error("Response data:", error);
    throw error;
  }
}