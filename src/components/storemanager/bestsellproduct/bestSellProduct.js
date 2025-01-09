import React, { useEffect, useState } from "react";
import productApi from "../../../api/productApi";
import DeleteAllBestSellProduct from "./deleteAllFromBestSell";
import GetInterfaceProduct from "../getInterfaceProduct";
import DeleteFromBestSell from "./deleteFromBestSell";

function BestSellProduct() {
  const [bestSellProducts, setBestSellProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshBestSellProducts = async () => {
    const bestsell = JSON.parse(localStorage.getItem("bestSells")) || [];
    if (bestsell.length === 0) {
      setBestSellProducts([]);
      return;
    }

    try {
      const products = await Promise.all(
        bestsell.map(async (id) => {
          const product = await productApi.getProductById(id);
          return product;
        })
      );
      setBestSellProducts(products);
    } catch (err) {
      setError("Không thể tải danh sách sản phẩm bán chạy.");
    }
  };

  useEffect(() => {
    refreshBestSellProducts();
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
        <DeleteAllBestSellProduct onRefresh={refreshBestSellProducts} />
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
          {bestSellProducts.length > 0 ? (
            bestSellProducts.map((product) => (
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
                  <DeleteFromBestSell productId={product.id} onRefresh={refreshBestSellProducts} />
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


export default BestSellProduct;

