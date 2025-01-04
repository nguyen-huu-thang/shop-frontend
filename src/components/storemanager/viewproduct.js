import React, { useEffect, useState, useCallback } from "react";
import productApi from "../../api/productApi";  // Import API đã tạo trước đó
import categoryApi from "../../api/categoryApi"; // Import API
import EditProduct from "./editproduct";
import DeleteProduct from "./deleteproduct";
function ViewProduct() {
  const [productList, setProductList] = useState([]);  // Khởi tạo productList là một mảng rỗng
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedProducts, setExpandedProducts] = useState({});
  const [categoryMap, setCategoryMap] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await productApi.getProducts(); 
        setProductList(products);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const fetchCategoryName = useCallback(
    async (categoryId) => {
      if (categoryMap[categoryId]) return; // Nếu danh mục đã tồn tại, không cần gọi API
      try {
        const category = await categoryApi.getCategoryById(categoryId);
        setCategoryMap((prev) => ({
          ...prev,
          [categoryId]: category.description, // Lưu thông tin danh mục
        }));
      } catch (error) {
        console.error(`Failed to fetch category for ID ${categoryId}:`, error);
      }
    },
    [categoryMap] // Phụ thuộc vào categoryMap
  );

  useEffect(() => {
    if (productList.length > 0) {
      productList.forEach((product) => {
        if (product.categoryId) {
          fetchCategoryName(product.categoryId);
        }
      });
    }
  }, [productList]);
  
  const handleToggleDescription = (productId) => {
    setExpandedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId], // Toggle trạng thái mở rộng cho sản phẩm cụ thể
    }));
  };
  
  // Hàm xử lý xóa sản phẩm
  const handleDelete = (productId) => {
    // Xóa sản phẩm khỏi danh sách sau khi xóa thành công
    setProductList((prev) => prev.filter((product) => product.id !== productId));
  };

  // Hàm chỉnh sửa sản phẩm
  const handleEdit = (product) => {
    setSelectedProduct(product); // Mở modal chỉnh sửa
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProductList((prev) =>
      prev.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
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
      <h2 className="text-2xl font-semibold mb-4 overflow-y-auto">Danh sách sản phẩm</h2>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2 text-left" style={{width:"10%"}}>Tên</th>
            <th className="border p-2 text-left" style={{width:"10%"}}>Ảnh mô tả</th>
            <th className="border p-2 text-left" style={{width:"5%"}}>Giá tiền</th>
            <th className="border p-2 text-left" style={{width:"5%"}}>Số lượng</th>
            <th className="border p-2 text-left" style={{width:"10%"}}>Loại sản phẩm</th>
            <th className="border p-2 text-left" style={{width:"10%"}}>Đặc tính</th>
            <th className="border p-2 text-left" style={{width:"20%"}}>Mô tả</th>
            <th className="border p-2 text-left" style={{width:"5%"}}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {productList && productList.length > 0 ? (
            productList.map((product) => {
              const isExpanded = expandedProducts[product.id] || false; // Lấy trạng thái mở rộng, mặc định là false

              return (
                <tr key={product.id}>
                  <td className="border p-2">{product.name}</td>
                  <td className="border p-2">{product.price}</td>
                  <td className="border p-2">{product.price}</td>
                  <td className="border p-2">{product.stock}</td>
                  <td className="border p-2">{categoryMap[product.categoryId] || "Đang tải..."}</td>
                  <td className="border p-2">  {Object.entries(product.attributes).map(([key, values]) => `${key}: ${values.join(", ")}`).join("; ")}</td>
                  <td className="border p-2">
                    {isExpanded ? (
                      <>
                        {product.description}
                        <span
                          onClick={() => handleToggleDescription(product.id)}
                          className="text-blue-600 hover:underline cursor-pointer ml-1"
                        >
                          Thu gọn
                        </span>
                      </>
                    ) : (
                      <>
                        {product.description.slice(0, 150)}...
                        <span
                          onClick={() => handleToggleDescription(product.id)}
                          className="text-blue-600 hover:underline cursor-pointer ml-1"
                        >
                          Xem thêm
                        </span>
                      </>
                    )}
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleEdit(product.id)}
                      className="text-blue-600 hover:underline mr-2"
                    >
                      Edit
                    </button>
                    <DeleteProduct
                      productId={product.id} // Truyền ID sản phẩm cần xóa
                      onDelete={handleDelete} // Callback để cập nhật danh sách sản phẩm
                    />
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5" className="border p-2 text-center">
                Không có sản phẩm nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {selectedProduct && (
        <EditProduct
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onUpdate={handleUpdateProduct}
        />
      )}
    </div>
  );
}

export default ViewProduct;
