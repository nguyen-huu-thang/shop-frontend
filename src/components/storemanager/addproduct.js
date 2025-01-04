import React, { useState } from "react";
import Input from "../storemanager/input";
import Select from "./treeSelect";
import Text from "../storemanager/text";
import Attributes from "../storemanager/attributes";
import mapCategories from "../storemanager/treemapCategories";
import productApi from "../../api/productApi";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    locationAddress: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    attributes: {}, // Lưu thuộc tính ở đây
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const categories = mapCategories();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAttributesChange = (updatedAttributes) => {
    console.log(updatedAttributes);
    // Chuyển mảng thành đối tượng để lưu trong formData.attributes
    const attributesObject = updatedAttributes.reduce((acc, row) => {
      const [key, ...values] = row;
      if (key.trim() !== "") {
        acc[key] = values.filter((val) => typeof val === "string" && val.trim() !== "");
        console.log(acc)
      }
      return acc;
    }, {});
  
    setFormData((prev) => ({ ...prev, attributes: attributesObject }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData) 
    try {
      const product = await productApi.createProduct(formData);
      console.log(product)
      setMessage(`Sản phẩm "${product.name}" đã được thêm thành công!`);
      setFormData({
        name: "",
        locationAddress: "",
        description: "",
        price: "",
        stock: "",
        categoryId: "",
        attributes: {}, // Reset attributes
      });
    } catch (error) {
      setMessage("Lỗi khi tạo sản phẩm: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input label="Tên sản phẩm" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
      <Input label="Địa chỉ" name="locationAddress" value={formData.locationAddress} onChange={handleChange} error={errors.locationAddress} />
      <Input label="Giá" name="price" value={formData.price} onChange={handleChange} error={errors.price} />
      <Input label="Số lượng" name="stock" value={formData.stock} onChange={handleChange} error={errors.stock} />
      <Select label="Danh mục" name="categoryId" value={formData.categoryId} onChange={handleChange} options={categories} error={errors.categoryId} />
      <Text label="Mô tả" name="description" value={formData.description} onChange={handleChange} error={errors.description} />
      
      {/* Component Attributes */}
      <Attributes
        initialData={Object.entries(formData.attributes)} // Chuyển attributes thành mảng
        onChange={handleAttributesChange} // Xử lý khi dữ liệu thuộc tính thay đổi
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {loading ? "Đang xử lý..." : "Thêm sản phẩm"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default AddProduct;
