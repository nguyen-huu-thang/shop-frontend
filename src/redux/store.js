import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import loveReducer from "./loveSlice";
import categoryReducer from "./categorySlice";
import suggestReducer from "./suggestSlice";
const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        love: loveReducer,
        categories: categoryReducer,
        suggest: suggestReducer,
    },
});

export default store;
