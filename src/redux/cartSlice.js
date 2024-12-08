import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: localStorage.getItem("carts") ? JSON.parse(localStorage.getItem("carts")) : [],
  statusTab: false,
  isConfirmingRemove: false,  // Trạng thái hiển thị thông báo xác nhận
  productToRemove: null, // Sản phẩm cần xóa khi người dùng xác nhận
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { productId, quantity } = action.payload;
      const indexProductId = state.items.findIndex(item => item.productId === productId);
      if (indexProductId >= 0) {
        state.items[indexProductId].quantity += quantity;
      } else {
        state.items.push({ productId, quantity });
      }
      localStorage.setItem("carts", JSON.stringify(state.items));
    },
    
    changeQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const indexProductId = state.items.findIndex(item => item.productId === productId);
      
      if (quantity > 0) {
        state.items[indexProductId].quantity = quantity;
      } else if (quantity === 0) {
        // Nếu số lượng giảm về 0, yêu cầu xác nhận
        state.isConfirmingRemove = true;
        state.productToRemove = productId; // Gán sản phẩm cần xóa
      }
      
      localStorage.setItem("carts", JSON.stringify(state.items));
    },

    confirmRemoveItem(state) {
      // Xóa sản phẩm sau khi người dùng xác nhận
      if (state.productToRemove !== null) {
        state.items = state.items.filter(item => item.productId !== state.productToRemove);
        state.productToRemove = null; // Reset sản phẩm cần xóa
        state.isConfirmingRemove = false; // Tắt thông báo xác nhận
      }
      localStorage.setItem("carts", JSON.stringify(state.items));
    },

    cancelRemoveItem(state) {
      // Hủy bỏ việc xóa sản phẩm
      state.productToRemove = null;
      state.isConfirmingRemove = false; // Tắt thông báo xác nhận
    }
  },
});

export const { addToCart, changeQuantity, confirmRemoveItem, cancelRemoveItem } = cartSlice.actions;
export default cartSlice.reducer;
