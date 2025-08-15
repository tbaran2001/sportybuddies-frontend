import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {Profile, Sport} from '../models/profile.ts';
import type {RootState} from "./store.ts";
import type {BaseQueryFn} from '@reduxjs/toolkit/query';

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://localhost:7280/api/',
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }

        headers.set('content-type', 'application/json');

        return headers;
    },
});

const baseQueryWithLogging: BaseQueryFn = async (args, api, extraOptions) => {
    console.log('🚀 API Request:', {
        url: args.url,
        method: args.method,
        body: args.body,
        headers: args.headers
    });

    const result = await baseQuery(args, api, extraOptions);

    if (result.error) {
        console.error('❌ API Error:', result.error);
    } else {
        console.log('✅ API Response:', result.data);
    }

    return result;
};

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithLogging,
    tagTypes: ['MyProfile'],
    endpoints: (builder) => ({
        login: builder.mutation<string, string>({
            query: (email) => ({
                url: 'auth/generate-and-create-test-user',
                method: 'POST',
                body: { email },
            }),
            transformResponse: (response: { message: string; userId: string; token: string }) => response.token,
        }),
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
    }),
});

export const {
    useLoginMutation,
    useGetProfilesQuery,
    useGetProfileQuery,
    useGetMyProfileQuery,
    useGetSportsQuery,
    useAddProfileSportMutation,
    useRemoveProfileSportMutation,
    useUpdateProfileMutation,
    useUpdateProfilePartialMutation,
    useUpdateProfilePreferencesMutation,
} = api;
