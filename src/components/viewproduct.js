import React, { useEffect, useState } from "react";
import productApi from "../api/productApi";  // Import API đã tạo trước đó
import categoryApi from "../api/categoryApi"; // Import API
function ViewProduct() {
  const [productList, setProductList] = useState([]);  // Khởi tạo productList là một mảng rỗng
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Gọi API để lấy danh sách sản phẩm khi component render
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await productApi.getProducts();  // Gọi API getProducts
        setProductList(products);  // Cập nhật danh sách sản phẩm
        setLoading(false);  // Đánh dấu là đã tải xong dữ liệu
      } catch (err) {
        setError("Failed to fetch products.");  // Nếu có lỗi, hiển thị thông báo lỗi
        setLoading(false);
      }
    };

    fetchProducts();  // Gọi hàm fetchProducts
  }, []);  // [] để chỉ gọi một lần khi component được render lần đầu

  // Hàm xử lý xóa sản phẩm
  const handleDelete = (index) => {
    const newProductList = [...productList];
    newProductList.splice(index, 1);
    setProductList(newProductList);
  };

  // Hàm chỉnh sửa sản phẩm
  const handleEdit = (index) => {
    alert(`Editing product ${productList[index].name}`);
  };

  // Hiển thị loading hoặc lỗi nếu có
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Danh sách sản phẩm</h2>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2 text-left">Tên</th>
            <th className="border p-2 text-left">Giá tiền</th>
            <th className="border p-2 text-left">Loại sản phẩm</th>
            <th className="border p-2 text-left">Mô tả</th>
            <th className="border p-2 text-left">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {productList && productList.length > 0 ? (
            productList.map((product, index) => (
              <tr key={product.id}>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">{product.price}</td>
                <td className="border p-2">{product.category}</td>
                <td className="border p-2">{product.description}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-blue-600 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="border p-2 text-center">Không có sản phẩm nào.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ViewProduct;
