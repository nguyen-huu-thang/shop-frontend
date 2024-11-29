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
        </div>
      )}
    </div>
  );
};

export default GetProductById;
