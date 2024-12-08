import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import loveReducer from "./loveSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        love: loveReducer,
    },
});

export default store;
