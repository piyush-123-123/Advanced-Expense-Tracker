
import {createSlice} from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

const initialState = {
    isAuthenticated: !!token,
    token: token || "",
    userId: userId || "",
};
const authSlice=createSlice({
    name: "auth",
    initialState:initialState,
    reducers: {
        login(state,action){
            state.isAuthenticated=true;
            state.token=action.payload.token;
            state.userId=action.payload.userId;
        },
        logout(state){
            state.isAuthenticated=false;
            state.token="";
            state.userId="";
        }
    }
})
export const authActions = authSlice.actions;
export default authSlice.reducer;