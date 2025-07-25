import {configureStore} from "@reduxjs/toolkit";
import {profilesReducer} from "./profilesSlice.ts";
import {myProfileReducer} from "./myProfileSlice.ts";
import {sportsReducer} from "./sportsSlice.ts";

export const store = configureStore({
    reducer: {
        profiles: profilesReducer,
        myProfile: myProfileReducer,
        sports: sportsReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;