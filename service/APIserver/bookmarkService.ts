import { getBookmarkTrips } from '@/service/bookmarkService';
import client from "../client";

const endpoints = {
  auth: {
    getBookmarkGuide: "/api/users/bookmarks/guides",

  }
};

// export const updateUserDetails = async (username: string, phone: string, profile: File) => {
export const getBookmarkGuideList = async (): Promise<GuideBox[]> => {
  try {
    const response = client
    return response.data;
  } catch (error) {
    console.error("Error fetching bookmark trips:", error);
    throw error;
  }
};


export const getUserDetailById = async  (userId:string ) => {
  
}