import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import productApi from "../../api/productApi";
import DeleteProduct from "./deleteproduct";
function ViewProduct() {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedProducts, setExpandedProducts] = useState({});
  const { items: categories, loading: categoryLoading } = useSelector((state) => state.categories);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await productApi.getProducts();
        setProductList(products);
      } catch (err) {
        setError("Không thể tải danh sách sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleToggleDescription = (productId) => {
    setExpandedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const handleDelete = (productId) => {
    setProductList((prev) => prev.filter((product) => product.id !== productId));
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Danh sách sản phẩm</h2>
      <table className="min-w-full border-collapse table-fixed">
        <thead>
          <tr>
            <th className="border p-2 text-left w-1/6">Tên</th>
            <th className="border p-2 text-left w-1/6">Ảnh mô tả</th>
            <th className="border p-2 text-left w-1/12">Giá tiền</th>
            <th className="border p-2 text-left w-1/12">Số lượng</th>
            <th className="border p-2 text-left w-1/6">Loại sản phẩm</th>
            <th className="border p-2 text-left w-1/6">Đặc tính</th>
            <th className="border p-2 text-left w-1/3">Mô tả</th>
            <th className="border p-2 text-left w-1/12">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {productList.length > 0 ? (
            productList.map((product) => {
              const isExpanded = expandedProducts[product.id] || false;
              return (
                <tr key={product.id}>
                  <td className="border p-2 break-words">{product.name}</td>
                  <td className="border p-2">
                    <img
                      src={product.imageUrl || "/default-image.png"}
                      alt={product.name}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="border p-2">
                    {product.price ? product.price.toLocaleString() + " đ" : "N/A"}
                  </td>
                  <td className="border p-2">{product.stock || "N/A"}</td>
                  <td className="border p-2">
                    {categoryLoading
                      ? 'Đang tải...'
                      : categories.find((cat) => cat.id === product.categoryId)?.description || 'Không xác định'}
                  </td>
                  <td className="border p-2 break-words">
                    {Object.entries(product.attributes || {})
                      .map(([key, values]) => `${key}: ${values.join(", ")}`)
                      .join("; ")}
                  </td>
                  <td className="border p-2 break-words">
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
                    <Link
                      to={`/storemanager/view/edit/${product.id}`}
                      className="text-blue-600 hover:underline mr-2"
                    >
                      Edit
                    </Link>
                    <DeleteProduct
                      productId={product.id}
                      onDelete={handleDelete}
                    />
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="8" className="border p-2 text-center">
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
