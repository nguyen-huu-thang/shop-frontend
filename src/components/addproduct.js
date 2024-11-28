import React, { useState } from "react";
import postProduct from "../api/postProduct";
function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: null,
    interfaceImage: null,
  });

  const [errors, setErrors] = useState({
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "price") {
      const regex = /^\d+(\.\d{1,2})?$/;
      
      if (value === "") {
        setErrors({
          ...errors,
          price: "",
        });
      } else if (regex.test(value)) {
        setErrors({
          ...errors,
          price: "",
        });
        setFormData({
          ...formData,
          [name]: value,
        });
      } else {
        setErrors({
          ...errors,
          price: "Giá không hợp lệ. Vui lòng nhập số hợp lệ với tối đa 2 chữ số thập phân.",
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  const handleImageChange = (e) => {
    const { name, files } = e.target;
    
    if (name === "interfaceImage") {
      setFormData({
        ...formData,
        interfaceImage: files[0],
      });
    } else if (name === "productImages") {
      setFormData({
        ...formData,
        productImages: Array.from(files),
      });
    }
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = {};

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    //Tạo form sumbit và gửi lên server
    const response = await postProduct(formData);
    if (response.success) {
      alert("Product added successfully!");
      setFormData({
        name: "",
        price: "",
        category: "",
        description: "",
        image: null,
        interfaceImage: null,
      });
      setErrors({});
    } else {
      alert("There was an error: " + response.message);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Thêm sản phẩm</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Tên</label>
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
          <label className="block text-sm font-medium">Giá</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          {/* Hiển thị thông báo lỗi dưới ô nhập giá nếu có */}
          {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Loại sản phẩm</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="" disabled selected>Select Category</option>
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
          <label className="block text-sm font-medium">Mô tả</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Phần chọn ảnh giao diện */}
        <div>
          <label className="block text-sm font-medium">Ảnh giao diện</label>
          <input
            type="file"
            name="interfaceImage"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Phần chọn ảnh sản phẩm */}
        <div>
          <label className="block text-sm font-medium">Ảnh giới thiệu</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
          Thêm sản phẩm
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
