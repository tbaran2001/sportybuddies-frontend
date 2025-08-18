import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {RootState} from "../store.ts";
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
    endpoints: () => ({}),
});