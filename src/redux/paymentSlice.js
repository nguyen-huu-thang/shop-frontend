import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedItems: [], // Danh sách sản phẩm được chọn để thanh toán
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    addToPayment(state, action) {
      state.selectedItems.push(action.payload);
    },
    removeFromPayment(state, action) {
      state.selectedItems = state.selectedItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
    clearPayment(state) {
      state.selectedItems = [];
    },
  },
});

export const { addToPayment, removeFromPayment, clearPayment } = paymentSlice.actions;

export default paymentSlice.reducer;
