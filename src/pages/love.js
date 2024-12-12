import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromLove } from '../redux/loveSlice';
import { products } from '../product';
import LoveCart from '../components/lovecart';
import Navbar from '../components/navbar';
import Filter from '../components/filter';
import { GoMultiSelect } from "react-icons/go";
const Love = () => {
  // Lấy danh sách sản phẩm yêu thích từ Redux store
  const lovedItems = useSelector((store) => store.love.items);
  
  // Tạo danh sách sản phẩm yêu thích dựa trên ID từ lovedItems
  const lovedProducts = products.filter(product =>
    lovedItems.some(lovedItem => lovedItem.productId === product.id)
  );

  const [filteredProducts, setFilteredProducts] = useState(lovedProducts); // Lưu danh sách sản phẩm đã lọc
  const [showFilter, setShowFilter] = useState(false);
  const dispatch = useDispatch();

  // Hàm xử lý xóa sản phẩm khỏi yêu thích
  const handleRemoveFromLove = (productId) => {
    dispatch(removeFromLove({ productId }));
  };

  const handleFilterChange = (category, priceRange) => {
    let filtered = lovedProducts;

    // Lọc theo category
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }

    // Lọc theo giá
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Cập nhật sản phẩm sau khi lọc
    setFilteredProducts(filtered);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-5 bg-gray-300 mb-2 mt-2 flex-1">
        <div className='flex justify-between'>
          <h2 className="text-2xl font-bold text-black mb-2">Danh mục yêu thích</h2>
          {/* Biểu tượng để hiển thị Filter */}
          <div className="mb-4">
            <button
              className="flex items-center space-x-2 p-2 bg-blue-500 text-white rounded-md"
              onClick={() => setShowFilter(!showFilter)} // Toggle hiển thị Filter
            >
              <GoMultiSelect size={24} />
              <span>Lọc sản phẩm</span>
            </button>
          </div>
        </div>

        {/* Hiển thị Filter nếu showFilter là true */}
        {showFilter && (
          <Filter 
            categories={['fashion', 'shoes', 'electronics','health and beauty','housewares','decoration','book','stationery','mother and baby','book bag']}
            onFilterChange={handleFilterChange} 
          />
        )}
        
        <div className="grid grid-cols-1">
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500">Chưa có sản phẩm yêu thích nào.</p>
          ) : (
            filteredProducts.map((product) => (
              <LoveCart 
                key={product.id} 
                data={product} 
                onRemove={handleRemoveFromLove} 
              />
            ))
          )}
        </div>
      </div>
    </div>

  );
};

export default Love;
