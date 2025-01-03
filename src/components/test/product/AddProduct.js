import React, { useState } from "react";
import productApi from "../../../api/productApi";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    locationAddress: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    attributes: {},
  });

  const [dataArray, setDataArray] = useState([[""]]); // Initialize with one empty attribute row
  const [message, setMessage] = useState("");

  // Cập nhật các trường nhập liệu cơ bản
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Đồng bộ dataArray vào attributes
  const updateAttributes = () => {
    const attributes = {};
    dataArray.forEach((row) => {
      if (row.length > 0 && row[0].trim() !== "") {
        attributes[row[0]] = row.slice(1).filter((val) => val.trim() !== "");
      }
    });
    setFormData((prevData) => ({
      ...prevData,
      attributes,
    }));
  };

  // Cập nhật giá trị trong dataArray khi người dùng nhập
  const handleInputChange = (e, rowIdx, colIdx) => {
    const value = e.target.value;
    const updatedArray = [...dataArray];
    updatedArray[rowIdx][colIdx] = value;
    setDataArray(updatedArray);
  };

  // Thêm cột hoặc dòng mới khi nhấn Enter
  const handleKeyDown = (e, rowIdx, colIdx) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Ngăn việc gửi form
      const value = e.target.value.trim();
      if (value !== "") {
        const updatedArray = [...dataArray];
        if (colIdx === 0) {
          // Thêm dòng mới nếu đang ở cột đầu tiên
          updatedArray.push([""]);
        } else {
          // Thêm cột mới trong cùng dòng
          updatedArray[rowIdx].push("");
        }
        setDataArray(updatedArray);
      }
    }
  };

  // Gửi sản phẩm mới khi nhấn nút
  const handleSubmit = async (e) => {
    e.preventDefault();
    updateAttributes(); // Cập nhật attributes trước khi gửi
    try {
      const product = await productApi.createProduct({
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        categoryId: parseInt(formData.categoryId),
      });
      setMessage(`Product "${product.name}" created successfully!`);
      // Đặt lại form
      setFormData({
        name: "",
        locationAddress: "địa chỉ/sản phẩm/Việt Nam",
        description: "",
        price: "",
        stock: "",
        categoryId: "",
        attributes: {},
      });
      setDataArray([[""]]);
    } catch (error) {
      setMessage("Failed to create product.");
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="locationAddress"
          placeholder="Location Address"
          value={formData.locationAddress}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="categoryId"
          placeholder="Category ID"
          value={formData.categoryId}
          onChange={handleChange}
          required
        />
        <h3>Attributes</h3>
        <div id="test-prd-add">
          {dataArray.map((row, rowIdx) => (
            <div key={rowIdx} style={{ marginBottom: "8px" }}>
              {row.map((value, colIdx) => (
                <input
                  key={`${rowIdx}_${colIdx}`}
                  type="text"
                  placeholder={colIdx === 0 ? "Attribute Name" : "Value"}
                  value={value}
                  onChange={(e) => handleInputChange(e, rowIdx, colIdx)}
                  onKeyDown={(e) => handleKeyDown(e, rowIdx, colIdx)}
                />
              ))}
            </div>
          ))}
        </div>
        <button type="submit">Add Product</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddProduct;
