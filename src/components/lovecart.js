import React from 'react';
import { Link } from 'react-router-dom';

const LoveCart = ({ data, onRemove }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition">
      <img src={data.interfaceImage} alt={data.name} className="w-full h-48 object-cover mb-4 rounded-lg" />
      <h3 className="text-xl font-bold text-gray-800">{data.name}</h3>
      <p className="text-gray-500">{data.description}</p>
      <p className="text-red-500 font-semibold">{data.price}đ</p>
      
      <div className="flex justify-between items-center mt-4">
        <Link to={`/${data.slug}`} className="text-blue-600 hover:underline">Chi tiết</Link>
        <button 
          onClick={() => onRemove(data.id)} 
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
          Xóa khỏi yêu thích
        </button>
      </div>
    </div>
  );
};

export default LoveCart;
