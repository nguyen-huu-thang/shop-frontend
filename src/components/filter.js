import React, { useState } from 'react';

const Filter = ({ categories, onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  // Hàm xử lý khi thay đổi category
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Hàm xử lý khi thay đổi giá trị min/max
  const handlePriceInputChange = (event) => {
    const { name, value } = event.target;

    // Chỉ cho phép nhập ký tự số
    if (/^\d*$/.test(value)) {
      setPriceRange({
        ...priceRange,
        [name]: value, // Không chuyển thành số để giữ giá trị rỗng khi nhập
      });
    }
  };

  // Hàm xử lý khi nhấn nút Lọc
  const handleApplyFilter = () => {
    const min = priceRange.min === '' ? 0 : parseInt(priceRange.min, 10);
    const max = priceRange.max === '' ? Number.MAX_SAFE_INTEGER : parseInt(priceRange.max, 10);

    onFilterChange(selectedCategory, [min, max]);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md mb-4 bg-white">
      <h3 className="text-xl font-semibold mb-3">Lọc sản phẩm</h3>
      
      {/* Lọc theo Category */}
      <div className="mb-3">
        <label htmlFor="category" className="block text-gray-700 font-medium">Danh mục</label>
        <select 
          id="category" 
          value={selectedCategory} 
          onChange={handleCategoryChange} 
          className="w-full p-2 border rounded-lg"
        >
          <option value="">Tất cả</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Lọc theo Giá (Min - Max) */}
      <div className="mb-3">
        <label className="block text-gray-700 font-medium">Khoảng giá</label>
        <div className="flex space-x-2">
          <input
            type="text"
            name="min"
            value={priceRange.min}
            onChange={handlePriceInputChange}
            placeholder="Từ"
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="text"
            name="max"
            value={priceRange.max}
            onChange={handlePriceInputChange}
            placeholder="Đến"
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <p className="text-gray-500 text-sm mt-2"></p>
      </div>

      {/* Nút áp dụng */}
      <div className="mt-3">
        <button 
          onClick={handleApplyFilter} 
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Áp dụng
        </button>
      </div>
    </div>
  );
};

export default Filter;
