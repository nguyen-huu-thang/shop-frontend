import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../redux/categorySlice';

const CategoryList = ({ children }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories()); // Tải danh mục khi component được render
  }, [dispatch]);

  if (loading) {
    return <div>Đang tải danh mục...</div>;
  }

  if (error) {
    return <div>Không thể tải danh mục: {error}</div>;
  }

  return <>{children}</>; // Render các component con khi dữ liệu sẵn sàng
};

export default CategoryList;
