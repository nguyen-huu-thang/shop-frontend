// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   items: localStorage.getItem("carts") ? JSON.parse(localStorage.getItem("carts")) : [],
//   statusTab: false,
//   isConfirmingRemove: false,  // Trạng thái hiển thị thông báo xác nhận
//   productToRemove: null,
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const { productId, quantity } = action.payload;
//       const indexProductId = state.items.findIndex(item => item.productId === productId);
//       if (indexProductId >= 0) {
//         state.items[indexProductId].quantity += quantity;
//       } else {
//         state.items.push({ productId, quantity });
//       }
//       localStorage.setItem("carts", JSON.stringify(state.items));
//     },
    
//     changeQuantity(state, action) {
//       const { productId, quantity } = action.payload;
//       const indexProductId = state.items.findIndex(item => item.productId === productId);
      
//       if (quantity > 0) {
//         state.items[indexProductId].quantity = quantity;
//       } else if (quantity === 0) {
//         // Nếu số lượng giảm về 0, yêu cầu xác nhận
//         state.isConfirmingRemove = true;
//         state.productToRemove = productId; // Gán sản phẩm cần xóa
//       }
      
//       localStorage.setItem("carts", JSON.stringify(state.items));
//     },

//     confirmRemoveItem(state) {
//       // Xóa sản phẩm sau khi người dùng xác nhận
//       if (state.productToRemove !== null) {
//         state.items = state.items.filter(item => item.productId !== state.productToRemove);
//         state.productToRemove = null; // Reset sản phẩm cần xóa
//         state.isConfirmingRemove = false; // Tắt thông báo xác nhận
//       }
//       localStorage.setItem("carts", JSON.stringify(state.items));
//     },

//     cancelRemoveItem(state) {
//       // Hủy bỏ việc xóa sản phẩm
//       state.productToRemove = null;
//       state.isConfirmingRemove = false; // Tắt thông báo xác nhận
//     }
//   },
// });

// export const { addToCart, changeQuantity, confirmRemoveItem, cancelRemoveItem } = cartSlice.actions;
// export default cartSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartApi from "../api/cartApi";

// Thunk để lấy tất cả sản phẩm trong giỏ hàng
export const fetchCartItems = createAsyncThunk("cart/fetchCartItems", async (_, { rejectWithValue }) => {
  try {
    const response = await cartApi.getAllCartItemUser();
    console.log(response);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Thunk để thêm sản phẩm vào giỏ hàng
export const createCartItem = createAsyncThunk("cart/createCartItem", async (data, { rejectWithValue }) => {
  try {
    const response = await cartApi.createCartItem(data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Thunk để cập nhật số lượng sản phẩm
export const updateCartItem = createAsyncThunk("cart/updateCartItem", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await cartApi.updateCartItem(id, data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Thunk để xóa sản phẩm khỏi giỏ hàng
export const deleteCartItem = createAsyncThunk("cart/deleteCartItem", async (id, { rejectWithValue }) => {
  try {
    const response = await cartApi.deleteCartItem(id);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Danh sách sản phẩm trong giỏ hàng
    isLoading: false, // Trạng thái đang tải
    error: null, // Trạng thái lỗi
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createCartItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index].quantity = action.payload.quantity; // Cập nhật số lượng
        }
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload.id); // Xóa sản phẩm
      });
  },
});

export default cartSlice.reducer;

