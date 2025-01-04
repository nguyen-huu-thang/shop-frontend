import React, { useState, useEffect } from "react";
import productApi from "../../api/productApi";
import Attributes from "../storemanager/attributes";

const EditProduct = ({ product, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    id: product.id,
    name: product.name || "",
    price: product.price || "",
    stock: product.stock || "",
    description: product.description || "",
    categoryId: product.categoryId || "",
    attributes: product.attributes || {},
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAttributesChange = (updatedAttributes) => {
    const attributesObject = updatedAttributes.reduce((acc, row) => {
      const [key, ...values] = row;
      if (key.trim() !== "") {
        acc[key] = values.filter((val) => typeof val === "string" && val.trim() !== "");
      }
      return acc;
    }, {});
    setFormData((prev) => ({ ...prev, attributes: attributesObject }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = await productApi.updateProduct(formData.id, {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      });
      onUpdate(updatedProduct); // Gửi sản phẩm đã cập nhật về component cha
      onClose(); // Đóng form chỉnh sửa
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Chỉnh sửa sản phẩm</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Tên sản phẩm</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Giá</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Số lượng</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Mô tả</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium">Thuộc tính</label>
            <Attributes
              initialData={Object.entries(formData.attributes || {})}
              onChange={handleAttributesChange}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
