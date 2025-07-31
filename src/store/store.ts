import {configureStore} from "@reduxjs/toolkit";
import {profilesReducer} from "./profilesSlice.ts";
import {myProfileReducer} from "./myProfileSlice.ts";
import {sportsReducer} from "./sportsSlice.ts";
import {api} from "./api.ts";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        profiles: profilesReducer,
        myProfile: myProfileReducer,
        sports: sportsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;