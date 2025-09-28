import apiClient from "../client";

const endpoints = {
    place: {
        getPlaceDetails:"/api/places",
    },
};

const parseValues = (str: string): string[] =>  {
  return str
    .split(",")                
    .map(s => s.trim())        
    .filter(s => s.length > 0);
}

// ID string คือ place หรือ  API (google)
// type คือ place หรือ api

const checkOverview = (text: string): string => {
    return (text == '' )? "No description  for this place." : text;
}

export const getPlaceDetails = async (Id:string , type :string): Promise<PlaceDetails> => {
    try {
        console.log("start : fetching Place Deatails with places ID : " ,Id);
        const response = (await apiClient.get(
            `${endpoints.place.getPlaceDetails}/${Id}/${type}`
        )) as {
            data: any;
        };

        const Data = response.data;
        console.log("end : data: " , Data)
        const map_link_: string = `https://www.google.com/maps/place/?q=${Data.address}`
        console.log("Google maps link : " , map_link_)
        return {
            id:Data.place_id ,
            title:Data.name ,
            description:checkOverview(Data.overview) ,
            rating:Data.rating ,
            review_count:Data.rating_count ,
            location:Data.address ,
            place_image:Data.places_picture_url ,
            categories:await parseValues(Data.categories) ,
            map_link:map_link_,
            latitude:Data.lat ,
            longitude:Data.lon ,
            official_link:Data.website_url,
        };

    } catch (error) {
        console.error("Response data:", error);
        throw error;
        
    }
};
