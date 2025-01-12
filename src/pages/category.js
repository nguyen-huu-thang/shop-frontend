import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux"; // Lấy dữ liệu từ Redux
import Navbar from "../components/navbar";
import ProductCart from "../components/productcart"; // Component hiển thị sản phẩm
import productApi from "../api/productApi";
import Banner from "../components/banner";
const Category = () => {
  const { category } = useParams(); // Lấy danh mục từ URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categoryMap = {
    fashion: { name: "Thời trang", id: "2" },
    shoes: { name: "Giày dép", id: "10" },
    "book-bag": { name: "Túi sách", id: "11" },
    electronics: { name: "Điện tử", id: "3" },
    healthy: { name: "Sức khỏe", id: "12" },
    beauty: { name: "Làm đẹp", id: "4" },
    housewares: { name: "Đồ gia dụng", id: "5" },
    decoration: { name: "Đồ trang trí", id: "6" },
    "mother-and-baby": { name: "Mẹ và bé", id: "9" },
    book: { name: "Sách", id: "7" },
    stationery: { name: "Văn phòng phẩm", id: "8" },
  };

  const categoryInfo = categoryMap[category] || { name: "Danh mục không xác định", id: null };
  const categoryTree = useSelector((state) => state.categories.categoryTree);

  const findLowestNodes = (parentId, tree) => {
    if (!tree || tree.length === 0) return [];
  
    const lowestNodeIds = [];
    const stack = [...tree];
  
    while (stack.length > 0) {
      const currentNode = stack.pop();
  
      if (currentNode.hierarchyPathById.includes(`/${parentId}`)) {
        if (!currentNode.children || currentNode.children.length === 0) {
          lowestNodeIds.push(currentNode.id);
        } else {
          stack.push(...currentNode.children);
        }
      }
    }
  
    return lowestNodeIds;
  };
  
  useEffect(() => {
    const fetchProducts = async () => {
      if (!categoryInfo.id) {
        setLoading(false);
        setError("Danh mục không hợp lệ.");
        return;
      }
  
      try {
        setLoading(true);
        setError(null);
  
        const childIds = findLowestNodes(categoryInfo.id, categoryTree);
        console.log("Các node thấp nhất của danh mục:", childIds);
  
        const allProducts = [];
  
        for (const childId of childIds) {
          try {
            const response = await productApi.getProductsByCategoryId(childId);
  
            if (response) {
              allProducts.push(...response);
            }
          } catch (error) {
            if (error.response && error.response.status === 404) {
              console.warn(`Không tìm thấy sản phẩm cho categoryId ${childId}`);
            } else {
              console.error(`Lỗi khi gọi API cho categoryId ${childId}:`, error);
            }
          }
        }
  
        setProducts(allProducts);
      } catch (err) {
        console.error("Lỗi khi tải sản phẩm:", err);
        setError("Lỗi khi tải sản phẩm.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [categoryInfo.id, categoryTree]);

  return (
    <div>
      <Navbar />
      <Banner />
      <div className="mx-auto w-full">
        <nav className="text-gray-700 mb-3 border-t border-b py-3 bg-gray-200 w-full">
          <div className="mx-auto px-5">
            <Link to="/" className="hover:underline">Trang chủ</Link>
            <span className="mx-2">/</span>
            <span>{categoryInfo.name}</span>
          </div>
        </nav>
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-3 py-3 px-5">{categoryInfo.name}</h1>
          <div className="flex justify-center items-center space-x-2 mb-3 py-3 px-5">
            <span className="text-lg font-semibold underline">Sản phẩm nổi bật</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>
        <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-2 m-10">
          {products
            .filter((product) => product && product.price !== null)
            .map((product, key) => (
              <ProductCart key={key} data={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
