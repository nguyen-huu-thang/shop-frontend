import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromLove } from '../redux/loveSlice';
import { products } from '../product';
import LoveCart from '../components/lovecart';
import Navbar from '../components/navbar';
const Love = () => {
  // Lấy danh sách sản phẩm yêu thích từ Redux store
  const lovedItems = useSelector((store) => store.love.items);
  
  // Tạo danh sách sản phẩm yêu thích dựa trên ID từ lovedItems
  const lovedProducts = products.filter(product =>
    lovedItems.some(lovedItem => lovedItem.productId === product.id)
  );

  const dispatch = useDispatch();

  // Hàm xử lý xóa sản phẩm khỏi yêu thích
  const handleRemoveFromLove = (productId) => {
    dispatch(removeFromLove({ productId }));
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-5 bg-white mb-5 mt-3">
        <h2 className="text-2xl font-bold text-gray-800 mb-5">Danh sách yêu thích</h2>
        <div className="grid grid-cols-3 gap-4">
          {lovedProducts.length === 0 ? (
            <p className="text-center text-gray-500">Chưa có sản phẩm yêu thích nào.</p>
          ) : (
            lovedProducts.map((product) => (
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
