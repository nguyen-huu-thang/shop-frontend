import React, { useState } from "react";
import productApi from "../api/productApi"; // Import hàm createProduct từ API (đảm bảo API này được export đúng cách)

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

  const [loading, setLoading] = useState(false);  // Để theo dõi trạng thái đang gửi
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
    } else if (name === "image") {
      setFormData({
        ...formData,
        image: files[0],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = {};

    // Kiểm tra nếu giá trị không hợp lệ trước khi gửi
    if (!formData.name || !formData.price || !formData.category || !formData.description || !formData.image || !formData.interfaceImage) {
      formErrors.general = "Vui lòng điền đầy đủ thông tin sản phẩm!";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      setLoading(true);
      setSuccessMessage("");
      setErrorMessage("");

      // Gửi dữ liệu đến API createProduct
      const response = await productApi.createProduct(formData);

      if (response.success) {
        setSuccessMessage("Sản phẩm đã được thêm thành công!");
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
        setErrorMessage("Đã có lỗi xảy ra: " + response.message);
      }
    } catch (error) {
      setErrorMessage("Lỗi kết nối với server: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Thêm sản phẩm</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tên sản phẩm */}
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

        {/* Giá */}
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
          {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
        </div>

        {/* Loại sản phẩm */}
        <div>
          <label className="block text-sm font-medium">Loại sản phẩm</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="" disabled>Chọn loại sản phẩm</option>
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

        {/* Mô tả */}
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

        {/* Ảnh giao diện */}
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

        {/* Ảnh sản phẩm */}
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

        {/* Hiển thị trạng thái gửi */}
        {loading && <p>Đang gửi sản phẩm...</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
          Thêm sản phẩm
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
