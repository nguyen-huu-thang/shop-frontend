import React, { useState } from "react";
import productApi from "../../../api/productApi";

const UpdateProduct = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = async () => {
    try {
      const product = await productApi.updateProduct(id, { name, price });
      setMessage(`Product "${product.name}" updated successfully!`);
    } catch (error) {
      setMessage("Failed to update product.");
    }
  };

  return (
    <div>
      <h2>Update Product</h2>
      <input
        type="number"
        placeholder="Product ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={handleUpdate}>Update</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateProduct;
