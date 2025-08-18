import {api} from "./api.ts";

export const authEndpoints = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<string, string>({
            query: (email) => ({
                url: 'auth/generate-and-create-test-user',
                method: 'POST',
                body: {email},
            }),
            transformResponse: (response: { message: string; userId: string; token: string }) => response.token,
        }),
    }),
    overrideExisting: false,
});

export const {useLoginMutation} = authEndpoints;