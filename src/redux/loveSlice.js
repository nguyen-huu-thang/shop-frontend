import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: localStorage.getItem("lovedItems") ? JSON.parse(localStorage.getItem("lovedItems")) : [],
};

const loveSlice = createSlice({
  name: 'love',
  initialState,
  reducers: {
    addToLove: (state, action) => {
      const {productId}= action.payload;
      // Kiểm tra xem sản phẩm đã tồn tại trong danh sách yêu thích chưa
      const indexProductId = state.items.findIndex(item => item.productId === productId);
      if (indexProductId === -1) { 
        state.items.push({ productId });
        localStorage.setItem("lovedItems", JSON.stringify(state.items));
      }
    },
    removeFromLove: (state, action) => {
      const {productId} = action.payload;
      // Lọc sản phẩm cần xóa ra khỏi danh sách yêu thích
      state.items = state.items.filter(item => item.productId !== productId);
      localStorage.setItem("lovedItems", JSON.stringify(state.items));
    },
  },
});

export const { addToLove, removeFromLove } = loveSlice.actions;
export default loveSlice.reducer;
