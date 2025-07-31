import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {Profile, Sport} from '../models/profile.ts';
import {getAuthToken} from '../utils/auth.ts';

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://localhost:7280/api/',
    prepareHeaders: (headers) => {
        const token = getAuthToken();
        headers.set('authorization', `Bearer ${token}`);
        headers.set('content-type', 'application/json');
        return headers;
    },
});


export const api = createApi({
    reducerPath: 'api',
    baseQuery,
    tagTypes: ['MyProfile'],
    endpoints: (builder) => ({
        getProfiles: builder.query<Profile[], void>({
            query: () => 'profiles',
            transformResponse: (response: { profiles: Profile[] }) => response.profiles,
        }),
        getProfile: builder.query<Profile, string>({
            query: (profileId) => `profiles/${profileId}`,
            transformResponse: (response: { profile: Profile }) => response.profile,
        }),
        getMyProfile: builder.query<Profile, void>({
            query: () => 'profiles/me',
            transformResponse: (response: { profile: Profile }) => response.profile,
            providesTags: ['MyProfile'],
        }),
        getSports: builder.query<Sport[], void>({
            query: () => 'sports',
            transformResponse: (response: { sports: Sport[] }) => response.sports,
        }),
        addProfileSport: builder.mutation<void, { profileId: string; sportId: string }>({
            query: ({profileId, sportId}) => ({
                url: `profiles/${profileId}/AddProfileSport`,
                method: 'POST',
                body: {sportId},
            }),
            invalidatesTags: ['MyProfile'],
        }),
        removeProfileSport: builder.mutation<void, { profileId: string; sportId: string }>({
            query: ({profileId, sportId}) => ({
                url: `profiles/${profileId}/RemoveProfileSport`,
                method: 'POST',
                body: {sportId},
            }),
            invalidatesTags: ['MyProfile'],
        }),
        updateProfile: builder.mutation<Profile, { profileId: string; name: string; description: string; gender: number; dateOfBirth: string }>({
            query: ({profileId, ...body}) => ({
                url: `profiles/${profileId}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['MyProfile'],
        }),
    }),
});

export const {
    useGetProfilesQuery,
    useGetProfileQuery,
    useGetMyProfileQuery,
    useGetSportsQuery,
    useAddProfileSportMutation,
    useRemoveProfileSportMutation,
    useUpdateProfileMutation,
} = api;
