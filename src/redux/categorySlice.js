import { createSlice } from '@reduxjs/toolkit';
import categoryApi from '../api/categoryApi';

const initialState = {
  items: [], // Danh sách danh mục
  loading: false, // Trạng thái tải
  error: null, // Trạng thái lỗi
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
      state.error = null;
    },
    loadCategoriesSuccess(state, action) {
      state.loading = false;
      state.items = action.payload; // Cập nhật danh sách danh mục
    },
    loadCategoriesFailure(state, action) {
      state.loading = false;
      state.error = action.payload; // Lưu thông báo lỗi
    },
  },
});

// Actions
export const { startLoading, loadCategoriesSuccess, loadCategoriesFailure } = categorySlice.actions;

// Thunk để tải danh mục
export const fetchCategories = () => async (dispatch) => {
  dispatch(startLoading());
  try {
    const data = await categoryApi.getAllCategories();

    // Xây dựng cây danh mục
    const categoryMap = {};

    // Tạo map để quản lý danh mục
    data.forEach((category) => {
      categoryMap[category.id] = { ...category, children: [] };
    });

    // Gán children cho từng danh mục dựa trên parentId
    data.forEach((category) => {
      const parentId = category.hierarchyPathById
        .split("/")
        .slice(-2, -1)[0]; // Lấy parentId từ hierarchyPathById

      if (parentId && categoryMap[parentId]) {
        categoryMap[parentId].children.push(categoryMap[category.id]);
      }
    });

    // Lọc ra các node cuối (leaf nodes)
    const leafNodes = Object.values(categoryMap).filter(
      (category) => category.children.length === 0
    );

    // Thành công: Dispatch node cuối cùng
    dispatch(loadCategoriesSuccess(leafNodes));
  } catch (error) {
    dispatch(loadCategoriesFailure(error.message));
  }
};


export default categorySlice.reducer;
