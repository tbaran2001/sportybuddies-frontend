import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {Buddy, Match, Profile, Sport, Conversation, Message} from '../models/profile.ts';
import type {RootState} from "./store.ts";
import type {BaseQueryFn} from '@reduxjs/toolkit/query';

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://sportybuddies-api.azurewebsites.net/api/',
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
    // Handle different argument formats in RTK Query
    let logData;
    if (typeof args === 'string') {
        logData = {
            url: args,
            method: 'GET',
            body: undefined,
            headers: undefined
        };
    } else {
        logData = {
            url: args.url,
            method: args.method || 'GET',
            body: args.body,
            headers: args.headers
        };
    }

    console.log('🚀 API Request:', logData);

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
    refetchOnFocus: true,
    refetchOnReconnect: true,
    tagTypes: ['MyProfile', 'Profiles', 'Sports', 'RandomMatch', 'Buddies', 'Messages', 'Conversations'],
    endpoints: (builder) => ({
        login: builder.mutation<string, string>({
            query: (email) => ({
                url: 'auth/generate-and-create-test-user',
                method: 'POST',
                body: {email},
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
            providesTags: ['Sports'],
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
        getRandomMatch: builder.query<Match | null, string>({
            query: (profileId) => `matches/GetRandomMatch/${profileId}`,
            transformResponse: (response: { match: Match | null }) => response.match,
            providesTags: ['RandomMatch'],
        }),
        updateMatchSwipe: builder.mutation<void, { matchId: string; swipe: number }>({
            query: ({matchId, swipe}) => ({
                url: `matches/${matchId}`,
                method: 'PUT',
                body: {swipe},
            }),
            invalidatesTags: ['RandomMatch'],
        }),
        getProfileBuddies: builder.query<Buddy[], string>({
            query: (profileId) => `buddies/GetProfileBuddies/${profileId}`,
            transformResponse: (response: { buddies: Buddy[] }) => response.buddies,
        }),
        createConversation: builder.mutation<Conversation, { profileId: string; participantId: string }>({
            query: ({profileId, participantId}) => ({
                url: `conversations`,
                method: 'POST',
                body: {profileId, participantId},
            }),
            transformResponse: (response: { conversation: Conversation }) => response.conversation,
        }),
        getConversation: builder.query<Conversation, string>({
            query: (conversationId) => `conversations/${conversationId}`,
            transformResponse: (response: { conversation: Conversation }) => response.conversation,
        }),
        getConversationMessages: builder.query <Message[], string>({
            query: (conversationId) => `conversations/${conversationId}/messages`,
            transformResponse: (response: { messages: Message[] }) => response.messages,
            providesTags: ['Messages']
        }),
        sendMessage: builder.mutation<Message, { conversationId: string; profileId: string; content: string }>({
            query: ({conversationId, profileId, content}) => ({
                url: `conversations/${conversationId}/messages`,
                method: 'POST',
                body: {profileId, content},
            }),
            transformResponse: (response: { message: Message }) => response.message,
            invalidatesTags: ['Messages'],
        }),
        getProfileConversations: builder.query<Conversation[], string>({
            query: (profileId) => `conversations/GetByProfile/${profileId}`,
            transformResponse: (response: { conversations: Conversation[] }) => response.conversations,
        }),
        getLatestProfileConversation: builder.query<Conversation | null, string>({
            query: (profileId) => `conversations/GetLatestByProfile/${profileId}`,
            transformResponse: (response: { conversation: Conversation | null }) => response.conversation,
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
    useUpdateProfileLocationMutation,
    useGetRandomMatchQuery,
    useUpdateMatchSwipeMutation,
    useGetProfileBuddiesQuery,
    useCreateConversationMutation,
    useGetConversationQuery,
    useGetConversationMessagesQuery,
    useSendMessageMutation,
    useGetProfileConversationsQuery,
    useGetLatestProfileConversationQuery,
} = api;
