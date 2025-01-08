import { createSlice } from '@reduxjs/toolkit';
import categoryApi from '../api/categoryApi';

const initialState = {
  items: JSON.parse(sessionStorage.getItem('categories')) || [], // Lấy danh mục từ sessionStorage nếu có
  loading: false,
  error: null,
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
  // Kiểm tra nếu danh mục đã được lưu trong sessionStorage
  const storedCategories = sessionStorage.getItem('categories');
  if (storedCategories) {
    dispatch(loadCategoriesSuccess(JSON.parse(storedCategories)));
    return;
  }

  // Nếu chưa có trong sessionStorage, gọi API
  dispatch(startLoading());
  try {
    const data = await categoryApi.getAllCategories();

    // Xây dựng cây danh mục
    const categoryMap = {};

    data.forEach((category) => {
      categoryMap[category.id] = { ...category, children: [] };
    });

    data.forEach((category) => {
      const parentId = category.hierarchyPathById
        .split("/")
        .slice(-2, -1)[0]; // Lấy parentId từ hierarchyPathById

      if (parentId && categoryMap[parentId]) {
        categoryMap[parentId].children.push(categoryMap[category.id]);
      }
    });

    const leafNodes = Object.values(categoryMap).filter(
      (category) => category.children.length === 0
    );

    // Lưu danh mục vào sessionStorage
    sessionStorage.setItem('categories', JSON.stringify(leafNodes));

    // Thành công: Dispatch danh mục
    dispatch(loadCategoriesSuccess(leafNodes));
  } catch (error) {
    dispatch(loadCategoriesFailure(error.message));
  }
};


export default categorySlice.reducer;
