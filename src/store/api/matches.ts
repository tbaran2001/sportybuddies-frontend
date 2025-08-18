import {api} from "./api.ts";
import type {Match, Buddy} from '../../models/profile';

export const matchesEndpoints = api.injectEndpoints({
    endpoints: (builder) => ({
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
    }),
    overrideExisting: false,
});

export const {
    useGetRandomMatchQuery,
    useUpdateMatchSwipeMutation,
    useGetProfileBuddiesQuery,
} = matchesEndpoints;