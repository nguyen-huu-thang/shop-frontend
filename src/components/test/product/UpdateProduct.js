import React, { useState, useEffect } from "react";
import productApi from "../../../api/productApi";

const UpdateProduct = ({ productId }) => {
  const [formData, setFormData] = useState({
    name: "",
    locationAddress: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    attribute: {},
  });

  const [dataArray, setDataArray] = useState([[""]]); // Tương ứng với dữ liệu trong #test-prd-add

  useEffect(() => {
    // Lấy dữ liệu sản phẩm theo ID để điền vào form
    const fetchProductData = async () => {
      try {
        const product = await productApi.getProductById(productId);
        setFormData({
          name: product.name || "",
          locationAddress: product.locationAddress || "",
          description: product.description || "",
          price: product.price || "",
          stock: product.stock || "",
          categoryId: product.categoryId || "",
          attribute: product.attribute || {},
        });

        // Chuyển đổi attribute thành mảng dataArray
        const initialArray = Object.entries(product.attribute || {}).map(
          ([key, values]) => [key, ...values]
        );
        setDataArray(initialArray.length > 0 ? initialArray : [[""]]);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [productId]);

  // Cập nhật các trường nhập liệu cơ bản
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleKeyDown = (e, row, col) => {
    // Logic giống với phần đã viết
    // Thêm hoặc xóa input khi nhấn Enter
    // (copy từ hàm handleKeyDown trong file AddProduct.jsx)
  };

  const handleInputChange = (e, row, col) => {
    const newValue = e.target.value;
    const newDataArray = [...dataArray];

    if (!newDataArray[row]) newDataArray[row] = [];
    newDataArray[row][col] = newValue;

    setDataArray(newDataArray);
    updateAttributes(newDataArray);
  };

  const updateAttributes = (array) => {
    const attribute = array.reduce((acc, row) => {
      if (row.length > 1) {
        const [key, ...values] = row;
        acc[key] = values.filter((value) => value.trim() !== "");
      }
      return acc;
    }, {});
    setFormData({ ...formData, attribute });
  };

  const handleSubmit = async () => {
    try {
      const response = await productApi.updateProduct(productId, formData);
      console.log("Product updated:", response);

      // Thông báo hoặc reset trạng thái nếu cần
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <h2>Update Product</h2>
      <div>
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
          {dataArray.map((row, rowIndex) => (
            <div key={rowIndex}>
              {row.map((value, colIndex) => (
                <input
                  key={`${rowIndex}_${colIndex}`}
                  type="text"
                  name={`${rowIndex}_${colIndex}`}
                  placeholder={colIndex === 0 ? "Attribute Name. Enter" : "Attribute Value. Enter"}
                  value={value}
                  onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                  onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                />
              ))}
            </div>
          ))}
        </div>

        <button onClick={handleSubmit}>Update Product</button>
      </div>
    </div>
  );
};

export default UpdateProduct;
