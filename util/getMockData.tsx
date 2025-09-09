import { mockNotes, mockFlights, mockFileGroups
    , mockActivityPlaceBoxes, mockActivityEventBoxes
    , mockVotes, mockActivityVotePlaces, mockActivityVoteEvents
    , mockNotifications, mockTripMembers, mockTripBoxes
    , mockTransportationOptions, mockUserDetails
    , mockCreateTripData, mockPlaceBoxes, mockPlaceDetails
    , mockTripInvitations, mockGuideBoxes, mockTripGuideDetails
 } from "@/mock/mockDataComplete";

export const getNotesByTripId = (tripId: number): Note[] => {
  return mockNotes.filter(note => note.trip_id === tripId);
};

export const getFlightsByTripId = (tripId: number): Flight[] => {
  return mockFlights.filter(flight => flight.trip_id === tripId);
};

export const getFilesByTripId = (tripId: number): FileGroup[] => {
  return mockFileGroups.filter(file => file.trip_id === tripId);
};

export const getActivityPlacesByTripId = (tripId: number): ActivityPlaceBox[] => {
  return mockActivityPlaceBoxes.filter(activity => activity.trip_id === tripId);
};

export const getActivityEventsByTripId = (tripId: number): ActivityEventBox[] => {
  return mockActivityEventBoxes.filter(activity => activity.trip_id === tripId);
};

export const getVotesByTripId = (tripId: number): Vote[] => {
  return mockVotes.filter(vote => vote.trip_id === tripId);
};

export const getNotificationsByTripId = (tripId: number): NotificationBox[] => {
  return mockNotifications.filter(notification => notification.trip_id === tripId);
};

export const getActivityVotePlacesByTripId = (tripId: number): ActivityVotePlace[] => {
  return mockActivityVotePlaces.filter(vote => vote.trip_id === tripId);
};

export const getActivityVoteEventsByTripId = (tripId: number): ActivityVoteEvent[] => {
  return mockActivityVoteEvents.filter(vote => vote.trip_id === tripId);
};

export const getTripMemberById = (id: number): TripMember | undefined => {
  return mockTripMembers.find(member => member.id === id);
};

// API Simulation Functions
export const fetchTripDetailsComplete = async (tripId: number) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const tripBox = mockTripBoxes.find(trip => trip.trip_id === tripId);
  if (!tripBox) throw new Error('Trip not found');
  
  return {
    trip: tripBox,
    notes: getNotesByTripId(tripId),
    flights: getFlightsByTripId(tripId),
    files: getFilesByTripId(tripId),
    activityPlaces: getActivityPlacesByTripId(tripId),
    activityEvents: getActivityEventsByTripId(tripId),
    votes: getVotesByTripId(tripId),
    activityVotePlaces: getActivityVotePlacesByTripId(tripId),
    activityVoteEvents: getActivityVoteEventsByTripId(tripId),
    notifications: getNotificationsByTripId(tripId),
    members: mockTripMembers
  };
};

// Default export
const mockDataFixed = {
  transportationOptions: mockTransportationOptions,
  userDetails: mockUserDetails,
  createTripData: mockCreateTripData,
  flights: mockFlights,
  fileGroups: mockFileGroups,
  notifications: mockNotifications,
  tripMembers: mockTripMembers,
  notes: mockNotes,
  placeBoxes: mockPlaceBoxes,
  placeDetails: mockPlaceDetails,
  activityPlaceBoxes: mockActivityPlaceBoxes,
  activityEventBoxes: mockActivityEventBoxes,
  votes: mockVotes,
  activityVotePlaces: mockActivityVotePlaces,
  activityVoteEvents: mockActivityVoteEvents,
  tripBoxes: mockTripBoxes,
  tripInvitations: mockTripInvitations,
  guideBoxes: mockGuideBoxes,
  tripGuideDetails: mockTripGuideDetails
};

export default mockDataFixed;