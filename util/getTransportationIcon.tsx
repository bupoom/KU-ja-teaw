export const getTransportationIcon = (transportation?: string) => {
    switch (transportation?.toLowerCase()) {
        case "car":
            return "truck";
        case "train":
            return "truck"; // Using truck as substitute for train
        case "bus":
            return "truck";
        case "plane":
            return "plane";
        case "boat":
            return "anchor";
        case "walk":
            return "user";
        default:
            return "navigation";
    }
};
