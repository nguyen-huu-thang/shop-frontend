import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Kiểm tra xem sản phẩm đã có trong giỏ hay chưa
      const existingItem = state.items.find((item) => item.id === action.payload.id);

      if (existingItem) {
        // Nếu sản phẩm đã có trong giỏ, tăng số lượng
        existingItem.quantity += action.payload.quantity;
      } else {
        // Nếu sản phẩm chưa có trong giỏ, thêm mới
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1, // Đảm bảo quantity có giá trị mặc định là 1 nếu không có
        });
      }
    },
    changeQuantity(state, action){
      const {productId, quantity} = action.payload;
      const indexProductId = (state.items).findIndex(item => item.productId === productId);
      if(quantity > 0){
          state.items[indexProductId].quantity = quantity;
      }else{
          state.items = (state.items).filter(item => item.productId !== productId);
      }
      localStorage.setItem("carts", JSON.stringify(state.items));
    },
  },
});

export const { addToCart, changeQuantity } = cartSlice.actions;
export default cartSlice.reducer;
