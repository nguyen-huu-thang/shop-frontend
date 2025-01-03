import React, { useEffect, useState } from "react";
import productApi from "../../api/productApi";  // Import API đã tạo trước đó
import categoryApi from "../../api/categoryApi"; // Import API
function ViewProduct() {
  const [productList, setProductList] = useState([]);  // Khởi tạo productList là một mảng rỗng
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedProducts, setExpandedProducts] = useState({});
  const [categoryMap, setCategoryMap] = useState({});

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

  const fetchCategoryName = async (categoryId) => {
    if (categoryMap[categoryId]) {
      return; // Nếu danh mục đã có trong map, không cần gọi API
    }
    try {
      const category = await categoryApi.getCategoryById(categoryId);
      setCategoryMap((prev) => ({
        ...prev,
        [categoryId]: category.description, // Lưu tên danh mục vào map
      }));
    } catch (error) {
      console.error(`Failed to fetch category for ID ${categoryId}:`, error);
    }
  };

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
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
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
    </div>
  );
}

export default ViewProduct;
