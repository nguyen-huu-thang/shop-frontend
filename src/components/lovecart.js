import React from 'react';
import { Link } from 'react-router-dom';
import { FaShareSquare } from "react-icons/fa";

const LoveCart = ({ data, onRemove }) => {
  return (
    <div className="border p-2 my-2 hover:shadow-lg transition w-full bg-white">
      {/* Khung chứa thông tin sản phẩm */}
      <div className="flex space-x-4 justify-between">
        <Link to={`/${data.slug}`} className='flex items-center'>
          {/* Ảnh sản phẩm */}
          <img 
            src={data.interfaceImage} 
            alt={data.name} 
            className="w-16 h-16 object-cover rounded-lg"
          />
          {/* Thông tin sản phẩm */}
          <div className="flex-1">
            {/* Tên sản phẩm */}
            <h3 className="text-xl font-bold text-gray-800">{data.name}</h3>
            
            {/* Phân loại sản phẩm */}
            <p className="text-gray-600">{data.category}</p>
          </div>
        </Link>
        
        {/* Thao tác xóa sản phẩm */}
        <div className="flex space-x-2 my-2">
          {/* Button chia sẻ */}
          <button 
            className="bg-blue-500 text-white px-4 py-1 rounded-lg flex items-center hover:bg-blue-600"
          >
            <FaShareSquare className="mr-2" /> Chia sẻ
          </button>
          
          {/* Button xóa */}
          <button 
            onClick={() => onRemove(data.id)} 
            className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600">
            Xóa khỏi yêu thích
          </button>
        </div>
      </div>
    </div>
  );
};
export default LoveCart;
