import type {Profile} from "../models/profile.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface MyProfileState {
    myProfile: Profile | null;
}

const initialState: MyProfileState = {
    myProfile: null,
}

const myProfileSlice = createSlice({
    name: 'myProfile',
    initialState,
    reducers: {
        receivedMyProfile: (state, action: PayloadAction<Profile>) => {
            state.myProfile = action.payload;
        },
        addSportToMyProfile: (state, action: PayloadAction<Sport>) => {
            if (state.myProfile) {
                state.myProfile.sports.push(action.payload);
            }
        },
        removeSportFromMyProfile: (state, action: PayloadAction<string>) => {
            if (state.myProfile) {
                state.myProfile.sports = state.myProfile.sports.filter(
                    sport => sport.id !== action.payload
                );
            }
        }
    }
})

export const {receivedMyProfile, addSportToMyProfile, removeSportFromMyProfile} = myProfileSlice.actions;
export const myProfileReducer = myProfileSlice.reducer;