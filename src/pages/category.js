import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {products} from '../product';
import Navbar from '../components/navbar';
import ProductCart from '../components/productcart';
const Category = () => {
  const { category } = useParams(); // Lấy category từ URL
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  const categoryMap = {
    "fashion": "Thời trang",
    "shoes": "Giày dép",
    "book bag": "Túi sách",
    "electronics": "Điện tử - Công nghệ",
    "health-and-beauty": "Sức khỏe - Làm đẹp",
    "housewares" : "Đồ gia dụng",
    "decoration": "Đồ trang trí",
    "mother-and-baby": "Mẹ và bé",
    "book": "Sách",
    "stationery": "Văn phòng phẩm"
  };

  // Lấy tên tiếng Việt từ category
  const categoryName = categoryMap[category] || "Danh mục không xác định";

  useEffect(() => {
    if (category) {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  }, [category]);

  return (
    <div>
        <Navbar />
        <div className="container mx-auto p-5">
        {/* Hiển thị tên danh mục bằng tiếng Việt */}
        <h1 className="text-2xl font-bold mb-5">{categoryName}</h1>
        {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
                <div key={product.id} className="border rounded-lg p-4 shadow-md">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p>Giá: {product.price}đ</p>
                </div>
            ))}
            </div>
        ) : (
            <p>Không có sản phẩm nào trong danh mục này.</p>
        )}
        </div>
    </div>

  );
};

export default Category;
