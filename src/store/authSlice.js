import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    token:  null,
    isAuth: null,
    userName:  null,
    error: null,
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload.accessToken;
            state.userName = action.payload.user.name;
            state.isAuth = true;
            state.error = null;
            // localStorage.setItem('token', action.payload.accessToken);
            // localStorage.setItem('userName', action.payload.user.name);
            // localStorage.setItem('isAuth', "true");
        },
        loginFailure: (state, action) => {
            state.token = null;
            state.isAuth = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.token = null;
            state.error = null;
            state.isAuth = false;
            // localStorage.removeItem('userName');
            // localStorage.removeItem("token");
            // localStorage.removeItem("isAuth");
        },
        isAuth: (state, action) => {
                if(action.payload) {
                    const {accessToken, user} = action.payload
                    state.token = action.payload.accessToken;
                    state.userName = action.payload.user.name;
                    state.isAuth = true;
                    state.error = null;
                    // localStorage.setItem('token', accessToken);
                    // localStorage.setItem('userName', user.name);
                    // localStorage.setItem('isAuth', "true");
                } else {
                    console.log("data",action.payload);
                    state.token = null;
                    state.error = null;
                    state.isAuth = false;
                    // localStorage.removeItem('userName');
                    // localStorage.removeItem("token");
                    // localStorage.removeItem("isAuth");

                }
        },
    },
});

export const {
    loginSuccess,
    loginFailure,
    isAuth,
    logout
} = authSlice.actions;

export default authSlice.reducer;