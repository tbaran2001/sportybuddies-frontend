import type {Profile, Sport} from "./models/profile.ts";
import {getAuthToken} from "./utils/auth.ts";

export const getProfiles = async (): Promise<Profile[]> => {
    const response = await fetch('https://localhost:7280/api/profiles');
    const data = await response.json();
    return data.profiles;
};

export const getProfile = async (profileId: string): Promise<Profile> => {
    const response = await fetch(`https://localhost:7280/api/profiles/${profileId}`);
    const data = await response.json();
    return data.profile;
};

export const getMyProfile = async (): Promise<Profile> => {
    const response = await fetch('https://localhost:7280/api/profiles/me', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + getAuthToken()
        }
    });
    const data = await response.json();
    return data.profile;
};

export const getSports = async (): Promise<Sport[]> => {
    const response = await fetch('https://localhost:7280/api/sports', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + getAuthToken()
        }
    });
    const data = await response.json();
    return data.sports;
}

export const addProfileSports = async (profileId: string, sportId: string): Promise<void> => {
    await fetch(`https://localhost:7280/api/profiles/${profileId}/AddProfileSport`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + getAuthToken(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({sportId: sportId}),
    });
}

export const removeProfileSports = async (profileId: string, sportId: string): Promise<void> => {
    await fetch(`https://localhost:7280/api/profiles/${profileId}/RemoveProfileSport`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + getAuthToken(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({sportId: sportId}),
    });
}
