import React, { useEffect, useState } from "react";
import productApi from "../../../api/productApi";

const GetProducts = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productApi.getProducts();
        setProducts(data);
      } catch (error) {
        setMessage("Failed to fetch products.");
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      {message && <p>{message}</p>}
      {products.length > 0 ? (
        <table border="1" style={{ width: "100%", textAlign: "left" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Description</th>
              <th>Unique Features</th>
              <th>Is Featured</th>
              <th>City</th>
              <th>District</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td>{product.description}</td>
                <td>{product.uniqueFeatures}</td>
                <td>{product.isFeatured ? "Yes" : "No"}</td>
                <td>{product.city}</td>
                <td>{product.district}</td>
                <td>{product.categoryId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default GetProducts;
