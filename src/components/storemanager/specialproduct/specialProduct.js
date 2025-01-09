import React, { useEffect, useState } from 'react'
import productApi from '../../../api/productApi'
import GetInterfaceProduct from "../getInterfaceProduct";
import DeleteFromSpecial from './deleteFromSpecial';
import DeleteAllSpecialProduct from './deleteAllFromSpecial';

function SpecialProduct() {
  const [specialProducts, setSpecialProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshSpecialProducts = async () => {
    try {
      const products = await productApi.getSpecialProducts(); // API call lấy sản phẩm bán chạy
      setSpecialProducts(products);
    } catch (err) {
      setError("Không thể tải danh sách sản phẩm ưu đãi.");
    }
  };

  useEffect(() => {
    refreshSpecialProducts();
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold mb-2">Danh sách sản phẩm bán chạy</h2>
        <DeleteAllSpecialProduct onRefresh={refreshSpecialProducts} />
      </div>
      <table className="min-w-full border-collapse table-fixed">
        <thead>
          <tr>
            <th className="border p-2 text-left w-1/6">Tên</th>
            <th className="border p-2 text-left w-1/6">Ảnh mô tả</th>
            <th className="border p-2 text-left w-1/12">Giá tiền</th>
            <th className="border p-2 text-left w-1/12">Số lượng</th>
            <th className="border p-2 text-left w-1/6">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {specialProducts.length > 0 ? (
            specialProducts.map((product) => (
              <tr key={product.id}>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">
                  <GetInterfaceProduct productId={product.id} />
                </td>
                <td className="border p-2">
                  {product.price ? product.price.toLocaleString() + " đ" : "N/A"}
                </td>
                <td className="border p-2">{product.stock || "N/A"}</td>
                <td className="border p-2">
                  <DeleteFromSpecial productId={product.id} onRefresh={refreshSpecialProducts} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="border p-2 text-center">
                Không có sản phẩm.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SpecialProduct;

