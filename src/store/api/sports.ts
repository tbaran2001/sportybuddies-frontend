import {api} from "./api.ts";
import type {Sport} from '../../models/profile';

export const sportsEndpoints = api.injectEndpoints({
    endpoints: (builder) => ({
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
    }),
    overrideExisting: false,
});

export const {
    useGetSportsQuery,
    useAddProfileSportMutation,
    useRemoveProfileSportMutation,
} = sportsEndpoints;