import type {Profile} from "../models/profile.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface ProfilesState {
    profiles: Profile[];
}

const initialState: ProfilesState = {
    profiles: [],
};

const profilesSlice = createSlice({
    name: 'profiles',
    initialState,
    reducers: {
        setProfiles: (state, action: PayloadAction<Profile[]>) => {
            state.profiles = action.payload;
        }
    }
})

export const {setProfiles} = profilesSlice.actions;
export const profilesReducer = profilesSlice.reducer;