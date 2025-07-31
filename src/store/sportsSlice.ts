import type {Sport} from "../models/profile.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface SportsState {
    sports: Sport[];
}

const initialState: SportsState = {
    sports: [],
};

const sportsSlice = createSlice({
    name: 'sports',
    initialState,
    reducers: {
        setSports: (state, action: PayloadAction<Sport[]>) => {
            state.sports = action.payload;
        }
    }
});

export const {setSports} = sportsSlice.actions;
export const sportsReducer = sportsSlice.reducer;