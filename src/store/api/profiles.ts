import {api} from "./api.ts";
import type {Profile} from '../../models/profile';

export const profileEndpoints = api.injectEndpoints({
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
        updateProfile: builder.mutation<Profile, {
            profileId: string;
            name: string;
            description: string;
            gender: number;
            dateOfBirth: string
        }>({
            query: ({profileId, ...body}) => ({
                url: `profiles/${profileId}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['MyProfile'],
        }),
        updateProfilePartial: builder.mutation<void, {
            profileId: string;
            name?: string;
            description?: string;
            gender?: number;
            dateOfBirth?: string;
        }>({
            query: ({profileId, ...body}) => ({
                url: `profiles/${profileId}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['MyProfile'],
        }),
        updateProfilePreferences: builder.mutation<void, {
            profileId: string;
            minAge: number;
            maxAge: number;
            maxDistance: number;
            preferredGender: number;
        }>({
            query: ({profileId, ...body}) => ({
                url: `profiles/${profileId}/preferences`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['MyProfile'],
        }),
        updateProfileLocation: builder.mutation<void, {
            profileId: string;
            latitude: number;
            longitude: number;
            address: string;
        }>({
            query: ({profileId, ...body}) => ({
                url: `profiles/${profileId}/location`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['MyProfile'],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetProfilesQuery,
    useGetProfileQuery,
    useGetMyProfileQuery,
    useUpdateProfileMutation,
    useUpdateProfilePartialMutation,
    useUpdateProfilePreferencesMutation,
    useUpdateProfileLocationMutation,
} = profileEndpoints;