import React, { useState } from 'react';

const Filter = ({ categories, onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000000]);

  // Hàm xử lý khi thay đổi category
  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setSelectedCategory(value);
    onFilterChange(value, priceRange);
  };

  // Hàm xử lý khi thay đổi giá
  const handlePriceChange = (event) => {
    const value = event.target.value.split(',').map(Number);
    setPriceRange(value);
    onFilterChange(selectedCategory, value);
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

      {/* Lọc theo giá */}
      <div>
        <label htmlFor="price" className="block text-gray-700 font-medium">Giá</label>
        <input
          type="range"
          id="price"
          min="0"
          max="1000000"
          step="10000"
          value={priceRange.join(',')}
          onChange={handlePriceChange}
          className="w-full"
        />
        <div className="flex justify-between text-gray-600 mt-1">
          <span>{priceRange[0]}đ</span>
          <span>{priceRange[1]}đ</span>
        </div>
      </div>
    </div>
  );
};

export default Filter;
