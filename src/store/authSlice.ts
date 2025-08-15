import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const getTokenFromStorage = (): string | null => {
    try {
        return localStorage.getItem('authToken');
    } catch (error) {
        console.error('Error reading token from localStorage:', error);
        return null;
    }
};

const setTokenInStorage = (token: string): void => {
    try {
        localStorage.setItem('authToken', token);
    } catch (error) {
        console.error('Error saving token to localStorage:', error);
    }
};

const removeTokenFromStorage = (): void => {
    try {
        localStorage.removeItem('authToken');
    } catch (error) {
        console.error('Error removing token from localStorage:', error);
    }
};

interface AuthState {
    token: string | null;
}

const initialState: AuthState = {
    token: getTokenFromStorage(),
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
            setTokenInStorage(token);
        },
        logOut: (state) => {
            state.token = null;
            removeTokenFromStorage();
        },
    },
});

export const { setToken, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: { auth: AuthState }) => state.auth.token;