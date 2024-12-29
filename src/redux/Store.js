import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../slices/cartSlice";
import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice"
export const Store = configureStore({
    reducer:{
        cart: cartSlice,
        auth: authReducer,
        profile: profileReducer,
    }
})