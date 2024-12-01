import React, { useState } from "react";
import productApi from "../../../api/productApi";

const UpdateProduct = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    stock: "",
    description: "",
    uniqueFeatures: "",
    isFeatured: false,
    city: "",
    district: "",
    categoryId: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleUpdate = async () => {
    try {
      const updatedProduct = await productApi.updateProduct(formData.id, {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      });
      setMessage(`Product "${updatedProduct.name}" updated successfully!`);
    } catch (error) {
      setMessage("Failed to update product.");
    }
  };

  return (
    <div>
      <h2>Update Product</h2>
      <input
        type="number"
        name="id"
        placeholder="Product ID"
        value={formData.id}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
      />
      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={formData.stock}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <textarea
        name="uniqueFeatures"
        placeholder="Unique Features"
        value={formData.uniqueFeatures}
        onChange={handleChange}
      />
      <label>
        <input
          type="checkbox"
          name="isFeatured"
          checked={formData.isFeatured}
          onChange={handleChange}
        />
        Featured
      </label>
      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
      />
      <input
        type="text"
        name="district"
        placeholder="District"
        value={formData.district}
        onChange={handleChange}
      />
      <input
        type="text"
        name="categoryId"
        placeholder="Category ID"
        value={formData.categoryId}
        onChange={handleChange}
      />
      <button onClick={handleUpdate}>Update</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateProduct;
