import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import loveReducer from "./loveSlice";
import categoryReducer from "./categorySlice";
const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        love: loveReducer,
        categories: categoryReducer,
    },
});

export default store;
