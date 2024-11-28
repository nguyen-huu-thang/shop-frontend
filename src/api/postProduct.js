const postProduct = async (formData) => {
    try {
      // Tạo đối tượng FormData để gửi lên backend
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("description", formData.description);
  
      // Thêm ảnh vào FormData (nếu có)
      if (formData.image) {
        data.append("image", formData.image);
      }
      if (formData.interfaceImage) {
        data.append("interfaceImage", formData.interfaceImage);
      }
  
      // Gửi yêu cầu POST tới API
      const response = await fetch("http://localhost:5000/products", {
        method: "POST",
        body: data,
      });
  
      if (response.ok) {
        // Nếu thành công, trả về dữ liệu sản phẩm đã thêm
        const result = await response.json();
        return { success: true, data: result };
      } else {
        throw new Error("Error adding product.");
      }
    } catch (error) {
      console.error("Error:", error);
      return { success: false, message: error.message };
    }
  };
  
  export default postProduct;
  