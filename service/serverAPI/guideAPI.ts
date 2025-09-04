export const GUIDE_API_CONFIG = {
  BASE_URL: "https://api.JATEAWIHERE.com/v1",
  API_KEY: process.env.EXPO_PUBLIC_GUIDE_API_KEY, // API Key จาก environment
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    // Authorization: `Bearer ${process.env.EXPO_PUBLIC_GUIDE_API_KEY}`, // ถ้าต้องใช้ Bearer token
  },
};

export const fetchAllGuides = async (): Promise<GuideDetails[]> => {
  console.log("Fetching all guides...");
  
  const endpoint = `${GUIDE_API_CONFIG.BASE_URL}/guides`;
  
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: GUIDE_API_CONFIG.headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch guides: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Fetched guides successfully:", data.length, "guides");
    
    return data;
  } catch (error) {
    console.error("Error fetching guides:", error);
    throw error;
  }
};

export const fetchGuideById = async (guideId: number): Promise<GuideDetails> => {
  console.log("Fetching guide with ID:", guideId);
  
  const endpoint = `${GUIDE_API_CONFIG.BASE_URL}/guides/${guideId}`;
  
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: GUIDE_API_CONFIG.headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch guide: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Fetched guide successfully:", data.title);
    return data;
  } catch (error) {
    console.error("Error fetching guide:", error);
    throw error;
  }
};

export const searchGuides = async (query: string): Promise<GuideDetails[]> => {
  console.log("Searching guides with query:", query);
  
  const endpoint = `${GUIDE_API_CONFIG.BASE_URL}/guides/search?q=${encodeURIComponent(query)}`;
  
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: GUIDE_API_CONFIG.headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to search guides: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Search completed:", data.length, "guides found");
    return data;
  } catch (error) {
    console.error("Error searching guides:", error);
    throw error;
  }
};