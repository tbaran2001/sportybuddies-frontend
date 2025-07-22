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

