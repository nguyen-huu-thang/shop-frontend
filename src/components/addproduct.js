import React, { useState } from "react";

function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.category || !formData.description || !formData.image) {
      alert("Please fill all fields before submitting.");
      return;
    }

    // Send data to backend or local mock for testing
    console.log("Product data submitted:", formData);
    alert("Product added successfully!");

    // Reset form
    setFormData({
      name: "",
      price: "",
      category: "",
      description: "",
      image: null,
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="fashion">Thời trang</option>
            <option value="shoes-bags">Giày dép - Túi sách</option>
            <option value="electronics">Điện tử - Công nghệ</option>
            <option value="health-beauty">Sức khỏe - Làm đẹp</option>
            <option value="home-goods">Đồ gia dụng</option>
            <option value="decor">Đồ trang trí</option>
            <option value="mother-baby">Mẹ và bé</option>
            <option value="books-stationery">Sách - Văn phòng phẩm</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium">Product Image</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
