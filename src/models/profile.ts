export interface Sport {
    id: string;
    name: string;
    description: string;
}

export interface Location {
    latitude: number;
    longitude: number;
    address: string;
}

export interface Preferences {
    minAge: number;
    maxAge: number;
    maxDistance: number;
    preferredGender: number;
}

export interface Profile {
    id: string;
    name: string;
    description: string | null;
    mainPhotoUrl: string | null;
    createdOn: string;
    gender: number;
    dateOfBirth: string;
    preferences: Preferences;
    location: Location | null;
    sports: Sport[];
}

export interface Match {
    id: string;
    oppositeMatchId: string;
    profileId: string;
    matchedProfile: Profile;
    matchDateTime: string;
    swipe: number | null;
    swipeDateTime: string | null;
    distance: number;
}

export interface Buddy {
    id: string;
    oppositeBuddyId: string;
    profileId: string;
    matchedProfile: Profile;
    createdOn: string;
    conversationId: string | null;
}

export interface Conversation {
    id: string;
    creatorId: string;
    participants: Participant[];
}

export interface Participant {
    id: string;
    conversationId: string;
    profile: Profile;
    createdOn: string;
}