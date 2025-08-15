import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
}

const initialState: AuthState = {
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (
            state,
            action: PayloadAction<{ token: string }>
        ) => {
            const { token } = action.payload;
            state.token = token;
        },
        logOut: (state) => {
            state.token = null;
        },
    },
});

export const { setToken, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: { auth: AuthState }) => state.auth.token;