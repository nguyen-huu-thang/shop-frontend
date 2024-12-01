import React, { useState } from "react";
import productApi from "../../../api/productApi";

const GetProductById = () => {
  const [id, setId] = useState("");
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("");

  const handleFetch = async () => {
    try {
      const data = await productApi.getProductById(id);
      setProduct(data);
      setMessage("");
    } catch (error) {
      setMessage("Failed to fetch product.");
    }
  };

  return (
    <div>
      <h2>Get Product By ID</h2>
      <input
        type="number"
        placeholder="Enter Product ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={handleFetch}>Fetch</button>
      {message && <p>{message}</p>}
      {product && (
        <div>
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
          <p>Stock: {product.stock}</p>
          <p>Description: {product.description}</p>
          <p>Unique Features: {product.uniqueFeatures}</p>
          <p>Featured: {product.isFeatured ? "Yes" : "No"}</p>
          <p>Location: {product.city}, {product.district}</p>
          <p>Category: {product.category ? product.category.name : "N/A"}</p>
        </div>
      )}
    </div>
  );
};

export default GetProductById;
